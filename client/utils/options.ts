import type * as monaco from "monaco-editor";

export const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    wordWrap: "bounded",
    fontSize: 14,
    scrollBeyondLastLine: false,
    renderWhitespace: "selection",
    tabSize: 2,
    minimap: {
      enabled: true,
    },
  };
