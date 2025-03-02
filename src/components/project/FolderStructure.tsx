import React from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { ArrowLeft, ArrowRight, Folder, File, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FolderNodeProps {
  node: {
    name: string;
    type: 'file' | 'directory';
    children?: { name: string; type: 'file' | 'directory'; children?: any[] }[];
  };
  level?: number;
}

const FolderNode: React.FC<FolderNodeProps> = ({ node, level = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          'flex items-center py-1 px-2 rounded-md hover:bg-accent cursor-pointer',
          level > 0 && 'ml-4'
        )}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
          )
        ) : (
          <span className="w-4 mr-1" />
        )}
        {node.type === 'directory' ? (
          <Folder className="h-4 w-4 mr-2 text-blue-500" />
        ) : (
          <File className="h-4 w-4 mr-2 text-gray-500" />
        )}
        <span className="text-sm">{node.name}</span>
      </div>
      {hasChildren && isOpen && (
        <div className="ml-4">
          {node.children?.map((child, index) => (
            <FolderNode key={`${child.name}-${index}`} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const DEFAULT_STRUCTURE = {
  name: 'root',
  type: 'directory' as const,
  children: [
    {
      name: 'src',
      type: 'directory' as const,
      children: [
        {
          name: 'components',
          type: 'directory' as const,
          children: [
            { name: 'common', type: 'directory' as const, children: [] },
            { name: 'layouts', type: 'directory' as const, children: [] },
          ],
        },
        { name: 'pages', type: 'directory' as const, children: [] },
        { name: 'hooks', type: 'directory' as const, children: [] },
        { name: 'services', type: 'directory' as const, children: [] },
        { name: 'utils', type: 'directory' as const, children: [] },
        { name: 'types', type: 'directory' as const, children: [] },
        { name: 'styles', type: 'directory' as const, children: [] },
      ],
    },
    { name: 'public', type: 'directory' as const, children: [] },
    { name: 'package.json', type: 'file' as const },
    { name: 'tsconfig.json', type: 'file' as const },
    { name: 'README.md', type: 'file' as const },
  ],
};

export function FolderStructure() {
  const { state, dispatch } = useProject();

  React.useEffect(() => {
    if (!state.folderStructure.root.children?.length) {
      dispatch({
        type: 'UPDATE_FOLDER_STRUCTURE',
        payload: {
          root: DEFAULT_STRUCTURE,
        },
      });
    }
  }, [dispatch, state.folderStructure.root.children?.length]);

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: 'TECH_STACK_SELECTION' });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_STEP', payload: 'IMPLEMENTATION' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Structure</CardTitle>
          <CardDescription>
            This is the recommended folder structure for your project. You can
            customize it if needed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 bg-background">
            <FolderNode node={state.folderStructure.root} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 