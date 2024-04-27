import React, { useEffect, useRef } from 'react';
import * as a from 'monaco-editor/esm/vs/editor/editor.api';
import * as monaco from 'monaco-editor';
import { useEditor, useSelectedFile } from '@/state/editor/hooks';
import { getLanguageFromFile } from '@/utils';

const MonacoEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { selectedFile } = useSelectedFile();
  const { saveFile } = useEditor();

  useEffect(() => {
    if (editorRef.current && selectedFile && typeof selectedFile.content === 'string') {
      editorInstance.current = monaco.editor.create(editorRef.current, {
        value: selectedFile.content,
        language: getLanguageFromFile(selectedFile.path)
      });

      if (editorInstance.current) {
        editorInstance.current.onDidChangeModelContent(() => {
          const value = editorInstance.current?.getValue();
          if (selectedFile) {
            saveFile({
              ...selectedFile,
              content: value || ''
            });
          }
        });
      }

      monaco.editor.defineTheme('myCustomTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#292a2d'
        }
      });
      monaco.editor.setTheme('myCustomTheme');
    }

    return () => {
      if (editorInstance.current) {
        const value = editorInstance.current.getValue();
        if (selectedFile) {
          saveFile({
            ...selectedFile,
            content: value
          });
        }
        editorInstance.current && editorInstance.current.dispose();
      }
    };
  }, [selectedFile]);

  return <div ref={editorRef} style={{ height: '100%', width: '100%' }} />;
};

export default MonacoEditor;
