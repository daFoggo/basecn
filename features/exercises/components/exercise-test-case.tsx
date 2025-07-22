import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircleIcon,
  ArrowRight,
  Brackets,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";
import type { IExercise, ITab } from "../utils/types";

export interface ITestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}

export interface IExerciseTestCaseProps {
  exerciseData: IExercise;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export const ExerciseTestCase = ({
  exerciseData,
  isCollapsed = false,
  toggleCollapse,
}: IExerciseTestCaseProps) => {
  const TABS: ITab[] = [
    {
      label: "Trường hợp",
      value: "test-cases",
      icon: <Brackets />,
      contentComponent: <TestCasesContent testCases={exerciseData.testcases} />,
    },
    {
      label: "Kết quả",
      value: "results",
      icon: <Terminal />,
      contentComponent: <TestResultsContent />,
    },
  ];

  return (
    <Card className="flex flex-col w-full h-full overflow-x-auto">
      <CardHeader className="flex flex-col flex-1 min-h-0">
        <Tabs
          defaultValue={TABS[0].value}
          className="flex flex-col w-full h-full"
        >
          {isCollapsed ? (
            // Collapsed
            <div className="flex justify-between items-center h-full">
              <TabsList className="flex gap-1 w-full">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex justify-center items-center gap-1 px-2 py-3 h-auto"
                  >
                    {tab.icon}
                  </TabsTrigger>
                ))}
              </TabsList>
              {toggleCollapse && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleCollapse}
                  className="ml-2"
                >
                  <ChevronRight />
                </Button>
              )}
            </div>
          ) : (
            // Normal
            <>
              <div className="flex flex-shrink-0 justify-between items-center">
                <TabsList>
                  {TABS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-3"
                    >
                      {tab.icon}
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {toggleCollapse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapse}
                    className="ml-2 p-0 size-8"
                  >
                    <ChevronLeft />
                  </Button>
                )}
              </div>
              <div className="flex-1 min-h-0">
                {TABS.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:flex data-[state=active]:flex-col w-full h-full"
                  >
                    <div className="flex-1 overflow-auto">
                      {tab.contentComponent}
                    </div>
                  </TabsContent>
                ))}
              </div>
            </>
          )}
        </Tabs>
      </CardHeader>
    </Card>
  );
};

const TestCasesContent = ({ testCases }: { testCases: ITestCase[] }) => {
  if (testCases.length === 0) {
    return (
      <div className="py-8 text-muted-foreground text-sm text-center">
        <p>No test cases available</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue="0" className="w-full">
      <TabsList
        className="grid w-full"
        style={{ gridTemplateColumns: `repeat(${testCases.length}, 1fr)` }}
      >
        {testCases.map((testCase, index) => (
          <TabsTrigger
            key={testCase.id}
            value={index.toString()}
            className="text-xs"
          >
            Test case {index + 1}
          </TabsTrigger>
        ))}
      </TabsList>

      {testCases.map((testCase, index) => (
        <TabsContent key={testCase.id} value={index.toString()}>
          <TestCaseDetail testCase={testCase} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

const TestCaseDetail = ({ testCase }: { testCase: ITestCase }) => {
  return (
    <div className="p-4">
      <div className="items-center gap-4 grid grid-cols-1 md:grid-cols-3">
        <div className="space-y-1">
          <label className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Input
          </label>
          <div className="bg-muted p-2 rounded-md font-mono text-sm break-all">
            {testCase.input}
          </div>
        </div>

        <div className="flex justify-center">
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          <label className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
            Expected Output
          </label>
          <div className="bg-muted p-2 rounded-md font-mono text-sm break-all">
            {testCase.output}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestResultsContent = () => {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your code</AlertTitle>
      <AlertDescription>
        Please ensure your code is correct and try again. If the issue persists,
        check the console for errors or contact support.
      </AlertDescription>
    </Alert>
  );
};
