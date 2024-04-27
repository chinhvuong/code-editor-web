export interface IFileNode {
  path: string;
  content: string | Uint8Array;
  blob?: string;
}

export interface INode {
  path: string;
  content?: string | Uint8Array;
  blob?: string;
}

export interface IFileTree {
  [key: string]: IFileTree | IFileNode;
}

export interface ZipEntry {
  name: string;
  content: string | Uint8Array;
}

export interface FileTreeDisplayProps {
  fileTree: IFileTree;
  setFilesTree: (value: 'folder' | 'file', path: string, key: string) => void;
  setSelectedFile: (
    value: React.SetStateAction<{
      content?: string | undefined;
      blob?: string | undefined;
    }>
  ) => void;
  setSelectedTab: (value: React.SetStateAction<string>) => void;
  tabs: string[];
  setTabs: (value: React.SetStateAction<string[]>) => void;
  selectedTab: string;
  createNewType: 'folder' | 'file' | '';
  setCreatNewType: (value: React.SetStateAction<'folder' | 'file' | ''>) => void;
  selectedFolder: string;
  setSelectedFolder: (value: React.SetStateAction<string>) => void;
  handleEditFileTree: () => void;
}
