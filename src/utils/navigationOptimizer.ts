/**
 * Navigation and File Organization Optimizer
 * Provides utilities for better code navigation, maintainability, and organization
 * Includes auto-generated documentation, file mapping, and dependency tracking
 */

import fs from 'fs';
import path from 'path';

interface FileInfo {
  path: string;
  name: string;
  type: 'component' | 'hook' | 'utility' | 'type' | 'config' | 'style' | 'page' | 'other';
  dependencies: string[];
  exports: string[];
  imports: string[];
  size: number;
  lastModified: Date;
  complexity?: number;
}

interface NavigationMap {
  components: Record<string, FileInfo>;
  hooks: Record<string, FileInfo>;
  utilities: Record<string, FileInfo>;
  types: Record<string, FileInfo>;
  configs: Record<string, FileInfo>;
  pages: Record<string, FileInfo>;
}

interface ComponentDependency {
  component: string;
  dependencies: string[];
  dependents: string[];
  circularDependencies: string[];
  depth: number;
}

class NavigationOptimizer {
  private fileMap: Map<string, FileInfo> = new Map();
  private navigationMap: NavigationMap = {
    components: {},
    hooks: {},
    utilities: {},
    types: {},
    configs: {},
    pages: {},
  };

  /**
   * Analyze and categorize all files in the project
   */
  async analyzeProject(projectRoot: string): Promise<NavigationMap> {
    const srcPath = path.join(projectRoot, 'src');
    
    if (!fs.existsSync(srcPath)) {
      throw new Error('src directory not found');
    }

    await this.scanDirectory(srcPath);
    this.buildNavigationMap();
    this.analyzeDependencies();
    
    return this.navigationMap;
  }

  /**
   * Scan directory recursively
   */
  private async scanDirectory(dirPath: string): Promise<void> {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);
      
      if (item.isDirectory() && !this.shouldSkipDirectory(item.name)) {
        await this.scanDirectory(fullPath);
      } else if (item.isFile() && this.shouldAnalyzeFile(item.name)) {
        await this.analyzeFile(fullPath);
      }
    }
  }

  /**
   * Check if directory should be skipped
   */
  private shouldSkipDirectory(name: string): boolean {
    const skipDirs = ['node_modules', '.next', '.git', 'dist', 'build'];
    return skipDirs.includes(name) || name.startsWith('.');
  }

  /**
   * Check if file should be analyzed
   */
  private shouldAnalyzeFile(name: string): boolean {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    return extensions.some(ext => name.endsWith(ext));
  }

  /**
   * Analyze individual file
   */
  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const stats = fs.statSync(filePath);
      
      const fileInfo: FileInfo = {
        path: filePath,
        name: path.basename(filePath),
        type: this.determineFileType(filePath),
        dependencies: this.extractDependencies(content),
        exports: this.extractExports(content),
        imports: this.extractImports(content),
        size: stats.size,
        lastModified: stats.mtime,
        complexity: this.calculateComplexity(content),
      };

      this.fileMap.set(filePath, fileInfo);
    } catch (error) {
      console.warn(`Failed to analyze file ${filePath}:`, error);
    }
  }

  /**
   * Determine file type based on path and content
   */
  private determineFileType(filePath: string): FileInfo['type'] {
    const relativePath = path.relative(process.cwd(), filePath);
    
    if (relativePath.includes('/components/')) return 'component';
    if (relativePath.includes('/hooks/')) return 'hook';
    if (relativePath.includes('/utils/')) return 'utility';
    if (relativePath.includes('/types/')) return 'type';
    if (relativePath.includes('/config/')) return 'config';
    if (relativePath.includes('/pages/')) return 'page';
    if (relativePath.includes('/styles/')) return 'style';
    
    return 'other';
  }

  /**
   * Extract dependencies from file content
   */
  private extractDependencies(content: string): string[] {
    const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
    const dependencies: string[] = [];
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (importPath.startsWith('@/') || importPath.startsWith('./') || importPath.startsWith('../')) {
        dependencies.push(importPath);
      }
    }

    return dependencies;
  }

  /**
   * Extract exports from file content
   */
  private extractExports(content: string): string[] {
    const exports: string[] = [];
    
    // Named exports
    const namedExportRegex = /export\s+(?:const|function|class|interface|type)\s+(\w+)/g;
    let match;
    while ((match = namedExportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    // Default export
    const defaultExportRegex = /export\s+default\s+(?:function\s+)?(\w+)/;
    const defaultMatch = defaultExportRegex.exec(content);
    if (defaultMatch) {
      exports.push('default');
    }

    return exports;
  }

  /**
   * Extract imports from file content
   */
  private extractImports(content: string): string[] {
    const imports: string[] = [];
    
    const importRegex = /import\s+(?:{[^}]+}|\w+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports;
  }

  /**
   * Calculate file complexity (simple metric)
   */
  private calculateComplexity(content: string): number {
    const lines = content.split('\n').length;
    const functions = (content.match(/function|=>/g) || []).length;
    const classes = (content.match(/class/g) || []).length;
    const conditionals = (content.match(/if|else|switch|case/g) || []).length;
    
    return lines + functions + classes + conditionals;
  }

  /**
   * Build navigation map by file type
   */
  private buildNavigationMap(): void {
    for (const [filePath, fileInfo] of this.fileMap) {
      const category = fileInfo.type;
      const key = path.basename(filePath, path.extname(filePath));
      
      if (category in this.navigationMap) {
        (this.navigationMap as any)[category][key] = fileInfo;
      }
    }
  }

  /**
   * Analyze component dependencies
   */
  private analyzeDependencies(): void {
    // This would implement dependency analysis
    // For now, it's a placeholder
  }

  /**
   * Generate navigation documentation
   */
  generateNavigationDocs(): string {
    let docs = '# Project Navigation Guide\n\n';
    
    docs += '## Component Structure\n\n';
    for (const [name, info] of Object.entries(this.navigationMap.components)) {
      docs += `### ${name}\n`;
      docs += `- **Path**: ${info.path}\n`;
      docs += `- **Dependencies**: ${info.dependencies.length}\n`;
      docs += `- **Exports**: ${info.exports.join(', ')}\n`;
      docs += `- **Complexity**: ${info.complexity}\n\n`;
    }

    docs += '## Hooks\n\n';
    for (const [name, info] of Object.entries(this.navigationMap.hooks)) {
      docs += `### ${name}\n`;
      docs += `- **Path**: ${info.path}\n`;
      docs += `- **Dependencies**: ${info.dependencies.length}\n\n`;
    }

    docs += '## Utilities\n\n';
    for (const [name, info] of Object.entries(this.navigationMap.utilities)) {
      docs += `### ${name}\n`;
      docs += `- **Path**: ${info.path}\n`;
      docs += `- **Dependencies**: ${info.dependencies.length}\n\n`;
    }

    return docs;
  }

  /**
   * Find unused files
   */
  findUnusedFiles(): string[] {
    const unusedFiles: string[] = [];
    
    for (const [filePath, fileInfo] of this.fileMap) {
      const isUsed = Array.from(this.fileMap.values()).some(otherFile => 
        otherFile.dependencies.some(dep => dep.includes(fileInfo.name))
      );
      
      if (!isUsed && fileInfo.type !== 'page') {
        unusedFiles.push(filePath);
      }
    }

    return unusedFiles;
  }

  /**
   * Find circular dependencies
   */
  findCircularDependencies(): string[][] {
    const circular: string[][] = [];
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (filePath: string, path: string[]): void => {
      if (recursionStack.has(filePath)) {
        const cycleStart = path.indexOf(filePath);
        circular.push(path.slice(cycleStart));
        return;
      }

      if (visited.has(filePath)) return;

      visited.add(filePath);
      recursionStack.add(filePath);

      const fileInfo = this.fileMap.get(filePath);
      if (fileInfo) {
        for (const dep of fileInfo.dependencies) {
          const resolvedPath = this.resolveImportPath(filePath, dep);
          if (resolvedPath && this.fileMap.has(resolvedPath)) {
            dfs(resolvedPath, [...path, filePath]);
          }
        }
      }

      recursionStack.delete(filePath);
    };

    for (const filePath of this.fileMap.keys()) {
      if (!visited.has(filePath)) {
        dfs(filePath, []);
      }
    }

    return circular;
  }

  /**
   * Resolve import path to actual file path
   */
  private resolveImportPath(fromPath: string, importPath: string): string | null {
    // Simplified path resolution
    if (importPath.startsWith('@/')) {
      const relativePath = importPath.replace('@/', 'src/');
      const possiblePaths = [
        `${relativePath}.ts`,
        `${relativePath}.tsx`,
        `${relativePath}/index.ts`,
        `${relativePath}/index.tsx`,
      ];
      
      for (const possiblePath of possiblePaths) {
        if (this.fileMap.has(possiblePath)) {
          return possiblePath;
        }
      }
    }
    
    return null;
  }

  /**
   * Get file statistics
   */
  getStatistics() {
    const stats = {
      totalFiles: this.fileMap.size,
      byType: {} as Record<string, number>,
      totalSize: 0,
      averageComplexity: 0,
      mostComplex: [] as { name: string; complexity: number }[],
    };

    let totalComplexity = 0;

    for (const fileInfo of this.fileMap.values()) {
      stats.byType[fileInfo.type] = (stats.byType[fileInfo.type] || 0) + 1;
      stats.totalSize += fileInfo.size;
      
      if (fileInfo.complexity) {
        totalComplexity += fileInfo.complexity;
      }
    }

    stats.averageComplexity = totalComplexity / this.fileMap.size;

    // Find most complex files
    const sortedFiles = Array.from(this.fileMap.values())
      .filter(f => f.complexity)
      .sort((a, b) => (b.complexity || 0) - (a.complexity || 0))
      .slice(0, 10);

    stats.mostComplex = sortedFiles.map(f => ({
      name: f.name,
      complexity: f.complexity || 0,
    }));

    return stats;
  }
}

// Create global navigation optimizer instance
const navigationOptimizer = new NavigationOptimizer();

/**
 * Generate project navigation documentation
 */
export async function generateNavigationDocs(projectRoot: string = process.cwd()): Promise<string> {
  await navigationOptimizer.analyzeProject(projectRoot);
  return navigationOptimizer.generateNavigationDocs();
}

/**
 * Find unused files in project
 */
export async function findUnusedFiles(projectRoot: string = process.cwd()): Promise<string[]> {
  await navigationOptimizer.analyzeProject(projectRoot);
  return navigationOptimizer.findUnusedFiles();
}

/**
 * Get project statistics
 */
export async function getProjectStatistics(projectRoot: string = process.cwd()) {
  await navigationOptimizer.analyzeProject(projectRoot);
  return navigationOptimizer.getStatistics();
}

export default navigationOptimizer;
