import { Editor } from "@monaco-editor/react";
import { PageLoader } from "./page-loader";

interface ICodeEditorProps {
  selectedLanguage: string;
  code: string;
  handleEditorChange: (value: string | undefined) => void;
}

export const CodeEditor = ({
  selectedLanguage,
  code,
  handleEditorChange,
}: ICodeEditorProps) => {
  return (
    <Editor
      height="100%"
      language={selectedLanguage}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: "on",
        contextmenu: true,
        selectOnLineNumbers: true,
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        renderLineHighlight: "line",
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
          useShadows: false,
          verticalHasArrows: false,
          horizontalHasArrows: false,
        },
      }}
      loading={<PageLoader variant="terminal" text="Loading editor..." />}
    />
  );
};
