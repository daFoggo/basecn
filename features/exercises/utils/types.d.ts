import { ExerciseLevel } from "./constants";

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}
export interface IExercise {
  id: string;
  name: string;
  statement: string;
  testcases: ITestCase[];
  level: ExerciseLevel;
}

export interface IMessage {
  feedback: string;
  metadata: {
    messageId: string;
    timestamp: string;
    sender: "ai_tutor" | "user";
    type: "feedback" | "question";
  };
}

export interface ICodeEditorLanguage {
  value: string;
  label: string;
  extension: string;
}

export interface ITab {
  label: string;
  value: string;
  icon: ReactNode;
  contentComponent: ReactNode;
}
