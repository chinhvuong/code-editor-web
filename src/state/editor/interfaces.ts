export interface IFileTree {
  [key: string]:
    | IFileTree
    | {
        content: string | Uint8Array;
        blob?: string;
        path: string;
      };
}

export interface IFileNode {
  path: string;
  content: string | Uint8Array;
  blob?: string;
}

export interface IAddNode {
  type: 'file' | 'folder';
  rootPath: string;
  isProcessing: boolean;
}

export interface IEditor {
  fileNodes: IFileNode[];
  editingFiles: string[];
  fileTree: IFileTree;
  selectedFile: IFileNode | null;
  addNodeData: IAddNode;
}
