import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';

interface MonacoEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: string;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  value,
  onChange,
  language = 'python',
  theme = 'vs-dark',
  options = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize Monaco editor
      editorRef.current = monaco.editor.create(containerRef.current, {
        value,
        language,
        theme,
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        folding: true,
        showFoldingControls: 'always',
        ...options
      });

      // Listen for content changes
      editorRef.current.onDidChangeModelContent(() => {
        const newValue = editorRef.current?.getValue() || '';
        onChange(newValue);
      });

      return () => {
        editorRef.current?.dispose();
      };
    }
  }, []);

  // Update editor value when prop changes
  useEffect(() => {
    if (editorRef.current) {
      const currentValue = editorRef.current.getValue();
      if (currentValue !== value) {
        editorRef.current.setValue(value);
      }
    }
  }, [value]);

  // Update editor theme
  useEffect(() => {
    if (editorRef.current) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  return (
    <div className="h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};