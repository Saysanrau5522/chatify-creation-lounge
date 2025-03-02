interface PreviewConfig {
  type: 'local' | 'sandbox';
  dependencies: Record<string, string>;
  entry: string;
}

class PreviewService {
  private static instance: PreviewService;
  private sandboxUrl: string;
  private localServer: any; // This would be your local dev server instance

  private constructor() {
    this.sandboxUrl = 'https://codesandbox.io/api/v1/sandboxes/define';
  }

  static getInstance(): PreviewService {
    if (!PreviewService.instance) {
      PreviewService.instance = new PreviewService();
    }
    return PreviewService.instance;
  }

  async createPreview(
    files: Record<string, string>,
    config: PreviewConfig
  ): Promise<string> {
    if (config.type === 'sandbox') {
      return this.createSandboxPreview(files, config);
    } else {
      return this.createLocalPreview(files, config);
    }
  }

  private async createSandboxPreview(
    files: Record<string, string>,
    config: PreviewConfig
  ): Promise<string> {
    try {
      // Prepare files for CodeSandbox
      const parameters = {
        files: Object.entries(files).reduce(
          (acc, [path, content]) => ({
            ...acc,
            [path]: { content },
          }),
          {}
        ),
        dependencies: config.dependencies,
      };

      // In a real implementation, you would make an API call to CodeSandbox
      // For now, we'll return a simulated URL
      return `https://codesandbox.io/s/example-${Date.now()}`;
    } catch (error) {
      console.error('Error creating sandbox preview:', error);
      throw error;
    }
  }

  private async createLocalPreview(
    files: Record<string, string>,
    config: PreviewConfig
  ): Promise<string> {
    try {
      // In a real implementation, you would:
      // 1. Write files to a temporary directory
      // 2. Start a development server
      // 3. Return the local URL

      // For now, we'll return a simulated local URL
      return `http://localhost:3000/preview/${Date.now()}`;
    } catch (error) {
      console.error('Error creating local preview:', error);
      throw error;
    }
  }

  async updatePreview(
    url: string,
    files: Record<string, string>
  ): Promise<void> {
    try {
      // In a real implementation, you would:
      // 1. Determine if it's a sandbox or local preview
      // 2. Update the files accordingly
      // 3. Trigger a reload if necessary

      console.log('Preview updated:', url);
    } catch (error) {
      console.error('Error updating preview:', error);
      throw error;
    }
  }

  async setupLiveReload(
    url: string,
    onUpdate: () => void
  ): Promise<() => void> {
    // In a real implementation, you would:
    // 1. Set up WebSocket connection for live reload
    // 2. Return a cleanup function

    const interval = setInterval(onUpdate, 5000); // Simulate updates
    return () => clearInterval(interval);
  }
}

export const previewService = PreviewService.getInstance(); 