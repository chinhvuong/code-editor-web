import { useSelector } from 'react-redux';
import {
  addFileNode,
  addNode,
  clearEditor,
  saveFile,
  selectAddNodeData,
  selectEditingFiles,
  selectFileNode,
  selectFileTree,
  selectSelectedFile,
  setAddNodeData,
  setEditingFiles,
  setFileNodes,
  setSelectedFile
} from './slice';
import { IAddNode, IFileNode } from './interfaces';
import { useAppDispatch } from '@/state/hook';

export const useFileTree = () => {
  const fileTree = useSelector(selectFileTree);

  return fileTree;
};

export const useFileNodes = () => {
  const fileNodes = useSelector(selectFileNode);
  const dispatch = useAppDispatch();

  return {
    fileNodes: fileNodes,
    setFileNodes: (fileNodes: IFileNode[], regenerateFileTree: boolean = false) => {
      dispatch(
        setFileNodes({
          fileNodes,
          regenerateFileTree
        })
      );
    },
    addFileNode: (fileNode: IFileNode) => {
      dispatch(addFileNode(fileNode));
    }
  };
};

export const useEditingFile = () => {
  const editingFiles = useSelector(selectEditingFiles);
  const dispatch = useAppDispatch();

  return {
    editingFiles,
    setEditingFiles: (filePaths: string[]) => {
      dispatch(setEditingFiles(filePaths));
    }
  };
};

export const useSelectedFile = () => {
  const selectedFile = useSelector(selectSelectedFile);
  const dispatch = useAppDispatch();

  return {
    selectedFile,
    setSelectedFile: (filePath: string | null) => {
      dispatch(setSelectedFile(filePath));
    }
  };
};

export const useEditor = () => {
  const dispatch = useAppDispatch();

  return {
    saveFile: (file: IFileNode) => {
      dispatch(saveFile(file));
    },
    clearEditor: () => {
      dispatch(clearEditor());
    }
  };
};

export const useAddNode = () => {
  const addNodeData = useSelector(selectAddNodeData);
  const dispatch = useAppDispatch();

  return {
    addNodeData,
    setAddNodeData: (data: IAddNode) => {
      dispatch(setAddNodeData(data));
    },
    addNode: (path: string) => {
      dispatch(addNode(path));
    }
  };
};
