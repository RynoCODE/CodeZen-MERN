import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

interface Question {
  question: string;
  description: string;
  question_template: { language: string; template: string }[];
}

const QuestionSolver = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<"c" | "cpp" | "js">(
    "cpp"
  );
  const [code, setCode] = useState<string>("");
  const editorRef = useRef<any>(null);

  async function fetchQuestion() {
    try {
      const response = await fetch(`http://localhost:3000/fetchquestion/${id}`);
      const data = await response.json();
      setQuestion(data);
      if (data.question_template.length > 0) {
        const initialTemplate = data.question_template.find(
          (template) => template.language === selectedLanguage
        );
        if (initialTemplate) {
          setCode(parseTemplateCode(initialTemplate.template));
        }
      }
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  // function to generate a random 6digit uuid
  const generateUUID = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const parseTemplateCode = (template: string) => {
    return template
      .replace(/\\n/g, "\n") // Replace escaped newlines
      .replace(/\\t/g, "\t") // Replace escaped tabs
      .replace(/ {4}/g, "\t"); // Optionally convert 4 spaces to a tab
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  const handleLanguageChange = (newLanguage: "python" | "c" | "cpp" | "js") => {
    setSelectedLanguage(newLanguage);
    const newTemplate = question?.question_template.find(
      (template) => template.language === newLanguage
    );
    if (newTemplate) {
      setCode(parseTemplateCode(newTemplate.template));
    }
  };

  // Determine the language to be used in MonacoEditor
  const editorLanguage =
    selectedLanguage === "js" ? "javascript" : selectedLanguage;

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 bg-gray-800 text-white flex items-center justify-between">
        <h1 className="text-xl font-bold">
          {question ? question.question : "Loading..."}
        </h1>
        <div className="buttons flex gap-4">
          <button className="bg-blue-500 text-white p-2 mt-2 rounded">
            Run Code
          </button>
          <button className="bg-green-500 text-white p-2 mt-2 rounded">
            Submit Code
          </button>
        </div>
      </header>
      <main className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Problem Description</h2>
          <p className="text-gray-800 whitespace-pre-line">
            {question ? question.description : "Loading..."}
          </p>
          <div className="mt-4">
            <label htmlFor="language-select" className="block mb-2">
              Select Language:
            </label>
            <select
              id="language-select"
              className="p-2 border rounded"
              value={selectedLanguage}
              onChange={(e) =>
                handleLanguageChange(e.target.value as "c" | "cpp" | "js")
              }
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="js">JavaScript</option>
            </select>
          </div>
        </div>
        <div className="w-1/2 p-4 border-l">
          <MonacoEditor
            height="100%"
            language={editorLanguage}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
          />
        </div>
      </main>
    </div>
  );
};

export default QuestionSolver;
