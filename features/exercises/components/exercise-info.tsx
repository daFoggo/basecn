"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookMarked,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  FileClock,
  ScrollText,
} from "lucide-react";
import type { IExercise, ITab } from "../utils/types";
import { ExerciseDescription } from "./exercise-description";

export interface IExerciseInfoProps {
  exerciseData: IExercise;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
}

export const ExerciseInfo = ({
  exerciseData,
  isCollapsed = false,
  toggleCollapse,
}: IExerciseInfoProps) => {
  const TABS: ITab[] = [
    {
      label: "Description",
      value: "description",
      icon: <ScrollText />,
      contentComponent: <ExerciseDescription exerciseData={exerciseData} />,
    },
    {
      label: "Guidelines",
      value: "editorial",
      icon: <BookMarked />,
      contentComponent: <div>Editorial content goes here.</div>,
    },
    {
      label: "Solution",
      value: "solution",
      icon: <BookOpenCheck />,
      contentComponent: <div>Solution content goes here.</div>,
    },
    {
      label: "History",
      value: "history",
      icon: <FileClock />,
      contentComponent: <div>History content goes here.</div>,
    },
  ];

  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="flex flex-col p-4 w-full h-full min-h-0">
        <Tabs
          defaultValue={TABS[0].value}
          className="flex flex-col w-full h-full min-h-0"
        >
          {isCollapsed ? (
            <div className="flex flex-col h-full">
              <div className="flex flex-shrink-0 justify-center mb-3">
                {toggleCollapse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapse}
                    className="p-0 w-8 h-8"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Vertical tabs list */}
              <TabsList className="flex flex-col gap-2 bg-transparent p-0 h-auto">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex justify-center items-center data-[state=active]:bg-primary p-2 rounded-md w-10 h-10 data-[state=active]:text-primary-foreground"
                    title={tab.label}
                  >
                    <span className="text-sm">{tab.icon}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Hidden content in collapsed state */}
              <div className="hidden">
                {TABS.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    {tab.contentComponent}
                  </TabsContent>
                ))}
              </div>
            </div>
          ) : (
            // Expanded state - original layout with improvements
            <>
              <div className="flex flex-shrink-0 justify-between items-center mb-4 w-full">
                <div className="flex-1 overflow-x-auto">
                  <TabsList className="justify-start w-full">
                    {TABS.map((tab) => (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="flex items-center gap-2 px-3 py-2"
                      >
                        <span className="text-sm">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {toggleCollapse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleCollapse}
                    className="flex-shrink-0 ml-2 p-0 w-8 h-8"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Tab content */}
              <div className="flex-1 w-full min-h-0 overflow-hidden">
                {TABS.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:flex data-[state=active]:flex-col m-0 h-full overflow-hidden"
                  >
                    <div className="flex-1 w-full min-h-0 overflow-auto">
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
