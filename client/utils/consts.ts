import type * as monaco from "monaco-editor";

export const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    theme: "vs",
    wordWrap: "on",
    automaticLayout: true,
    autoIndent: "none",
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    glyphMargin: true,
    useTabStops: false,
    fontSize: 16,
  };
