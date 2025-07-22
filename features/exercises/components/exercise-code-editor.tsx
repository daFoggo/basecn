"use client";

import { AsyncButton } from "@/components/common/async-button";
import { CodeEditor } from "@/components/common/code-editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  Maximize,
  Minimize,
  Play,
  SquareChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IAIFeedbackParams } from "../services/ai-feedback";
import {
  CODE_EDITOR_LANGUAGE_TEMPLATES,
  CODE_EDITOR_LANGUAGES,
} from "../utils/constants";
import type { IExercise, IMessage } from "../utils/types";

interface IExerciseCodeEditorProps {
  exerciseData: IExercise;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  toggleTestCaseCollapse?: () => void;
  isFullscreen?: boolean;
  toggleFullscreen?: () => void;
  getFeedback: (params: IAIFeedbackParams) => Promise<IMessage>;
}

export const ExerciseCodeEditor = ({
  exerciseData,
  isCollapsed = false,
  toggleCollapse,
  toggleTestCaseCollapse,
  isFullscreen = false,
  toggleFullscreen,
  getFeedback,
}: IExerciseCodeEditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(CODE_EDITOR_LANGUAGE_TEMPLATES.python);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(
      CODE_EDITOR_LANGUAGE_TEMPLATES[
        language as keyof typeof CODE_EDITOR_LANGUAGE_TEMPLATES
      ] || ""
    );
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleRunCode = () => {
    console.log("Running code:", code);
    toggleTestCaseCollapse?.();
    toggleFullscreen?.();
  };

  const handleSubmitCode = () => {
    console.log("Submitting code:", code);
    toggleTestCaseCollapse?.();
    toggleFullscreen?.();
  };

  // Commented out old Gemini feedback call
  // const callGeminiFeedback = async () => {
  //   if (exerciseData.statement && code.trim()) {
  //     try {
  //       await getFeedback({
  //         code: code,
  //         exerciseStatement: exerciseData.statement,
  //       });
  //     } catch (error) {
  //       console.error("Lỗi khi gọi Gemini feedback:", error);
  //     }
  //   }
  // };

  // New AI feedback call
  const callAIFeedback = async () => {
    if (exerciseData.statement && code.trim()) {
      try {
        await getFeedback({
          inputs: {
            purpose: "Tìm hai chỉ số trong mảng sao cho tổng bằng target",
            example_code:
              "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}",
            user_code: code,
          },
          response_mode: "blocking",
          user: "abc-123",
        });
      } catch (error) {
        console.error("Lỗi khi gọi AI feedback:", error);
      }
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const initialTemplate =
      CODE_EDITOR_LANGUAGE_TEMPLATES[
        selectedLanguage as keyof typeof CODE_EDITOR_LANGUAGE_TEMPLATES
      ];

    if (code.trim() !== initialTemplate.trim() && code.trim() !== "") {
      debounceRef.current = setTimeout(() => {
        callAIFeedback();
      }, 30000);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [code, selectedLanguage, exerciseData.statement, getFeedback]);

  return (
    <Card
      className={cn(
        "flex flex-col justify-center h-full overflow-hidden",
        isCollapsed && "p-0 gap-0"
      )}
    >
      <CardHeader className="flex flex-row flex-shrink-0 justify-between items-center">
        <Select
          value={selectedLanguage}
          onValueChange={handleLanguageChange}
          defaultValue="python"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn ngôn ngữ" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Các ngôn ngữ hỗ trợ</SelectLabel>
              {CODE_EDITOR_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          {toggleFullscreen && (
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Maximize className="size-4" />
              )}
            </Button>
          )}

          {toggleCollapse && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse}>
              <ChevronLeft
                className={cn("size-4", isCollapsed && "rotate-180")}
              />
            </Button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <>
          <CardContent className="flex-1 p-0 min-h-0 overflow-hidden">
            <div className="h-full">
              <CodeEditor
                selectedLanguage={selectedLanguage}
                code={code}
                handleEditorChange={handleEditorChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 align-bottom">
            <AsyncButton
              onClick={handleRunCode}
              icon={<Play />}
              disabled={!code.trim()}
              variant="secondary"
            >
              Chạy
            </AsyncButton>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <AsyncButton icon={<SquareChevronUp />} disabled={!code.trim()}>
                  Nộp bài
                </AsyncButton>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận nộp bài</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn nộp bài này không? Bạn vẫn có thể quay
                    lại chỉnh sửa sau khi nộp
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmitCode}>
                    Xác nhận
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
