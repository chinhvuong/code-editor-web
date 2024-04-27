import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAddNode, IEditor, IFileNode, IFileTree } from './interfaces';
import { RootState } from '@/state/store';
import { convertToTree } from '@/modules/zip/ultils';
const initialState: IEditor = {
  fileNodes: [] as IFileNode[],
  editingFiles: [],
  fileTree: {} as IFileTree,
  selectedFile: null,
  addNodeData: {
    type: 'file',
    isProcessing: false,
    rootPath: ''
  }
};

const editorSlice = createSlice({
  name: 'editor',
  initialState: initialState,
  reducers: {
    setFileNodes: (
      state,
      action: PayloadAction<{
        fileNodes: IFileNode[];
        regenerateFileTree: boolean;
      }>
    ) => {
      if (state.fileNodes.length === 0 && action.payload.fileNodes) {
        state.editingFiles = [action.payload.fileNodes[0].path];
        state.selectedFile = action.payload.fileNodes[0];
      }
      state.fileNodes = action.payload.fileNodes;
      if (action.payload.regenerateFileTree) {
        state.fileTree = convertToTree(action.payload.fileNodes);
      }
    },
    addFileNode: (state, action: PayloadAction<IFileNode>) => {
      state.fileNodes.push(action.payload);
      state.fileTree = convertToTree(state.fileNodes);
      if (state.fileNodes.length === 0) {
        state.selectedFile = action.payload;
        state.editingFiles = [action.payload.path];
      }
    },
    setEditingFiles: (state, action: PayloadAction<string[]>) => {
      state.editingFiles = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        const file = state.fileNodes.find((f) => f.path === action.payload);
        if (file) {
          state.selectedFile = file;
          if (state.editingFiles.findIndex((f) => f === action.payload) === -1) {
            state.editingFiles.push(action.payload);
          }
        }
      } else {
        state.selectedFile = null;
      }
    },
    clearEditor: () => {
      return initialState;
    },
    saveFile: (state, action: PayloadAction<IFileNode>) => {
      const index = state.fileNodes.findIndex((f) => f.path === action.payload.path);
      if (index >= 0) {
        state.fileNodes[index] = action.payload;
      }
    },
    setAddNodeData: (state, action: PayloadAction<IAddNode>) => {
      state.addNodeData = action.payload;
    },
    addNode: (state, action: PayloadAction<string>) => {
      if (state.addNodeData.type === 'file') {
        const newFile = {
          content: '',
          path: action.payload
        };

        const fileNodes = [...state.fileNodes, newFile].sort((a, b) => (a.path > b.path ? 1 : 0));
        state.fileNodes = fileNodes;
        state.selectedFile = newFile;
        state.editingFiles.push(newFile.path);
        state.fileTree = convertToTree(fileNodes);
        state.addNodeData.isProcessing = false;
      } else {
        const newFolder = {
          path: action.payload + '/',
          content: ''
        };

        const fileNodes = [...state.fileNodes, newFolder].sort((a, b) => (a.path > b.path ? 1 : 0));
        state.fileNodes = fileNodes;
        // state.selectedFile = newFil
        // state.editingFiles.push(newFile.path)
        state.fileTree = convertToTree(fileNodes);
        state.addNodeData.isProcessing = true;
        state.addNodeData.rootPath = action.payload;
        state.addNodeData.type = 'file';
      }
    }
  }
});

export const {
  setFileNodes,
  setEditingFiles,
  setSelectedFile,
  addFileNode,
  clearEditor,
  saveFile,
  setAddNodeData,
  addNode
} = editorSlice.actions;

export const selectFileTree = (state: RootState) => state.editor.fileTree;
export const selectEditingFiles = (state: RootState) => state.editor.editingFiles;
export const selectFileNode = (state: RootState) => state.editor.fileNodes;
export const selectSelectedFile = (state: RootState) => state.editor.selectedFile;
export const selectAddNodeData = (state: RootState) => state.editor.addNodeData;

export default editorSlice.reducer;
