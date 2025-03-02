import React, { useEffect, useState, useCallback } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ArrowLeft, Play, Bug, RefreshCw, Code, Eye } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Alert, AlertDescription } from '../ui/alert';
import { aiService } from '../../services/aiService';
import { previewService } from '../../services/previewService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { toast } from '../ui/use-toast';

interface CodeViewerProps {
  code: string;
  language?: string;
  quality?: number;
  suggestions?: string[];
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = 'typescript',
  quality,
  suggestions = [],
}) => {
  return (
    <div className="space-y-4">
      {quality !== undefined && (
        <div className="flex items-center justify-between">
          <Badge
            variant={quality > 80 ? 'default' : quality > 60 ? 'secondary' : 'destructive'}
          >
            Quality Score: {quality}%
          </Badge>
          {suggestions.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}
      <ScrollArea className="h-[400px] w-full rounded-md border bg-muted p-4">
        <pre className="text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </ScrollArea>
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Suggestions:</h4>
          <ul className="text-sm space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-muted-foreground">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface PreviewFrameProps {
  url?: string;
  isLoading?: boolean;
}

const PreviewFrame: React.FC<PreviewFrameProps> = ({ url, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted rounded-md">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!url) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-muted rounded-md">
        <p className="text-muted-foreground">Preview not available</p>
      </div>
    );
  }

  return (
    <iframe
      src={url}
      className="w-full h-[400px] rounded-md border"
      title="Preview"
    />
  );
};

export function Implementation() {
  const { state, dispatch } = useProject();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [codeQuality, setCodeQuality] = useState<Record<string, { quality: number; suggestions: string[] }>>({});
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const analyzeCode = useCallback(async (files: Record<string, string>) => {
    const analysis: Record<string, { quality: number; suggestions: string[] }> = {};
    
    for (const [file, code] of Object.entries(files)) {
      const result = await aiService.analyzeCode(code);
      analysis[file] = {
        quality: result.quality,
        suggestions: result.suggestions,
      };
    }

    setCodeQuality(analysis);
  }, []);

  const generateInitialCode = async () => {
    setIsGenerating(true);
    try {
      const { code, explanation } = await aiService.generateCode(
        state.ideaRefinement.originalPrompt,
        {
          refinedIdea: state.ideaRefinement.refinedIdea,
          techStack: state.techStack,
          folderStructure: state.folderStructure,
        }
      );

      const files = {
        'src/App.tsx': code,
      };

      dispatch({
        type: 'UPDATE_IMPLEMENTATION',
        payload: {
          files,
        },
      });

      await analyzeCode(files);
      await updatePreview(files);
      toast({
        title: 'Code Generated',
        description: explanation,
      });
    } catch (error) {
      setCurrentError('Failed to generate initial code');
      toast({
        title: 'Error',
        description: 'Failed to generate code',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const updatePreview = async (files: Record<string, string>) => {
    setIsPreviewLoading(true);
    try {
      const url = await previewService.createPreview(files, {
        type: 'sandbox',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
          '@types/react': '^18.0.0',
          '@types/react-dom': '^18.0.0',
        },
        entry: 'src/index.tsx',
      });

      dispatch({
        type: 'UPDATE_IMPLEMENTATION',
        payload: {
          preview: {
            ...state.implementation.preview,
            url,
          },
        },
      });
    } catch (error) {
      console.error('Failed to update preview:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const handleFixErrors = async () => {
    setIsGenerating(true);
    try {
      const results = await Promise.all(
        Object.entries(state.implementation.files).map(async ([file, code]) => {
          const { fixedCode, remainingErrors } = await aiService.fixCode(
            code,
            state.implementation.errors.filter((e) => e.location.file === file)
          );
          return { file, code: fixedCode, errors: remainingErrors };
        })
      );

      const updatedFiles: Record<string, string> = {};
      const remainingErrors: typeof state.implementation.errors = [];

      results.forEach(({ file, code, errors }) => {
        updatedFiles[file] = code;
        remainingErrors.push(...errors);
      });

      dispatch({
        type: 'UPDATE_IMPLEMENTATION',
        payload: {
          files: updatedFiles,
          errors: remainingErrors,
        },
      });

      await analyzeCode(updatedFiles);
      await updatePreview(updatedFiles);

      setCurrentError(null);
      toast({
        title: remainingErrors.length ? 'Partially Fixed' : 'Fixed',
        description: remainingErrors.length
          ? `Fixed some errors, ${remainingErrors.length} remaining`
          : 'All errors have been fixed',
      });
    } catch (error) {
      setCurrentError('Failed to fix errors');
      toast({
        title: 'Error',
        description: 'Failed to fix errors',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'FOLDER_STRUCTURE' });
  };

  useEffect(() => {
    generateInitialCode();
  }, []);

  useEffect(() => {
    if (state.implementation.preview.url) {
      const cleanup = previewService.setupLiveReload(
        state.implementation.preview.url,
        () => {
          // Handle live reload updates
          analyzeCode(state.implementation.files);
        }
      );
      return cleanup;
    }
  }, [state.implementation.preview.url, analyzeCode]);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="code">
            <Code className="h-4 w-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="code" className="space-y-4">
          {Object.entries(state.implementation.files).map(([file, code]) => (
            <Card key={file}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{file}</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeViewer
                  code={code}
                  quality={codeQuality[file]?.quality}
                  suggestions={codeQuality[file]?.suggestions}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                See your application in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreviewFrame
                url={state.implementation.preview.url}
                isLoading={isPreviewLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Error Section */}
      {(currentError || state.implementation.errors.length > 0) && (
        <Alert variant="destructive">
          <AlertDescription>
            {currentError || `${state.implementation.errors.length} error(s) found in the code`}
          </AlertDescription>
        </Alert>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="space-x-2">
          {(currentError || state.implementation.errors.length > 0) && (
            <Button onClick={handleFixErrors} variant="secondary">
              <Bug className="mr-2 h-4 w-4" />
              Fix Errors
            </Button>
          )}
          <Button onClick={generateInitialCode} disabled={isGenerating}>
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4" />
            )}
            Regenerate Code
          </Button>
        </div>
      </div>
    </div>
  );
} 