"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useCallback, useRef, useState } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useAIFeedback } from "../hooks/use-get-ai-feedback-swr";
import { SAMPLE_EXERCISE } from "../utils/constants";
import { ExerciseChatPanel } from "./exercise-chat-panel";
import { ExerciseCodeEditor } from "./exercise-code-editor";
import { ExerciseInfo } from "./exercise-info";
import { ExerciseTestCase } from "./exercise-test-case";

const MIN_INFO_COLLAPSED_SIZE = 5;
const MIN_CODE_COLLAPSED_SIZE = 10;
const MIN_TEST_COLLAPSED_SIZE = 10;
const MIN_CHATBOT_COLLAPSED_SIZE = 5;
const CHATBOT_UNCOLLAPSED_SIZE = 50;

export const ExercisesDetail = () => {
  //-------------UI State Management----------------
  const [isFullscreen, setIsFullscreen] = useState(false);
  const initialInfoDefaultSize = 50;
  const initialCodeDefaultSize = 65;
  const initialTestDefaultSize = 35;
  const initialChatbotDefaultSize = MIN_CHATBOT_COLLAPSED_SIZE;

  const initialCodeTestContainerDefaultSize =
    100 - initialInfoDefaultSize - initialChatbotDefaultSize;

  const [infoPanelSize, setInfoPanelSize] = useState(initialInfoDefaultSize);
  const infoPanelRef = useRef<ImperativePanelHandle>(null);
  const isExerciseInfoCollapsed = infoPanelSize <= MIN_INFO_COLLAPSED_SIZE;

  const [codePanelSize, setCodePanelSize] = useState(initialCodeDefaultSize);
  const codePanelRef = useRef<ImperativePanelHandle>(null);
  const isCodeEditorCollapsed = codePanelSize <= MIN_CODE_COLLAPSED_SIZE;

  const [testPanelSize, setTestPanelSize] = useState(initialTestDefaultSize);
  const testPanelRef = useRef<ImperativePanelHandle>(null);
  const isTestCaseCollapsed = testPanelSize <= MIN_TEST_COLLAPSED_SIZE;

  const [chatbotPanelSize, setChatbotPanelSize] = useState(
    initialChatbotDefaultSize
  );
  const chatbotPanelRef = useRef<ImperativePanelHandle>(null);
  const isChatbotCollapsed = chatbotPanelSize <= MIN_CHATBOT_COLLAPSED_SIZE;

  const toggleExerciseInfoCollapse = useCallback(() => {
    if (!infoPanelRef.current || !chatbotPanelRef.current) return;

    if (isExerciseInfoCollapsed) {
      infoPanelRef.current.resize(initialInfoDefaultSize);
      chatbotPanelRef.current.resize(MIN_CHATBOT_COLLAPSED_SIZE);
    } else {
      infoPanelRef.current.resize(MIN_INFO_COLLAPSED_SIZE);
      chatbotPanelRef.current.resize(CHATBOT_UNCOLLAPSED_SIZE);
    }
  }, [
    isExerciseInfoCollapsed,
    initialInfoDefaultSize,
    CHATBOT_UNCOLLAPSED_SIZE,
  ]);

  const toggleChatbotCollapse = useCallback(() => {
    if (!chatbotPanelRef.current || !infoPanelRef.current) return;

    if (isChatbotCollapsed) {
      chatbotPanelRef.current.resize(CHATBOT_UNCOLLAPSED_SIZE);
      infoPanelRef.current.resize(MIN_INFO_COLLAPSED_SIZE);
    } else {
      chatbotPanelRef.current.resize(MIN_CHATBOT_COLLAPSED_SIZE);
      infoPanelRef.current.resize(initialInfoDefaultSize);
    }
  }, [isChatbotCollapsed, CHATBOT_UNCOLLAPSED_SIZE, initialInfoDefaultSize]);

  const toggleCodeEditorCollapse = useCallback(() => {
    if (codePanelRef.current) {
      if (isCodeEditorCollapsed) {
        codePanelRef.current.resize(initialCodeDefaultSize);
      } else {
        codePanelRef.current.resize(MIN_CODE_COLLAPSED_SIZE);
      }
    }
  }, [isCodeEditorCollapsed, initialCodeDefaultSize]);

  const toggleTestCaseCollapse = useCallback(() => {
    if (testPanelRef.current) {
      if (isTestCaseCollapsed) {
        testPanelRef.current.resize(initialTestDefaultSize);
      } else {
        testPanelRef.current.resize(MIN_TEST_COLLAPSED_SIZE);
      }
    }
  }, [isTestCaseCollapsed, initialTestDefaultSize]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  //-------------AI Feedback Management----------------
  // const { isGettingFeedback, messages, error, getFeedback, clearMessages } =
  //   useGeminiFeedback(SAMPLE_EXERCISE[0].id || "default");
  const { isGettingFeedback, messages, error, getFeedback, clearMessages } =
    useAIFeedback(SAMPLE_EXERCISE[0].id || "default");

  if (isFullscreen) {
    return (
      <div>
        <div className="h-[calc(100svh-var(--header-height))]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              ref={codePanelRef}
              defaultSize={50}
              minSize={MIN_CODE_COLLAPSED_SIZE}
              maxSize={75}
              className="py-4 sm:py-6 pr-3 pl-4 sm:pl-6"
              onResize={setCodePanelSize}
              id="code-editor-panel"
            >
              <ExerciseCodeEditor
                exerciseData={SAMPLE_EXERCISE[0]}
                isCollapsed={false}
                toggleCollapse={toggleCodeEditorCollapse}
                toggleTestCaseCollapse={toggleTestCaseCollapse}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
                getFeedback={getFeedback}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              ref={chatbotPanelRef}
              defaultSize={50}
              minSize={MIN_CHATBOT_COLLAPSED_SIZE}
              maxSize={75}
              className="py-4 sm:py-6 pr-4 sm:pr-6 pl-3"
              onResize={setChatbotPanelSize}
              id="chatbot-panel"
            >
              <ExerciseChatPanel
                isCollapsed={isChatbotCollapsed}
                toggleCollapse={toggleChatbotCollapse}
                isGettingFeedback={isGettingFeedback}
                messages={messages}
                error={error}
                clearMessages={clearMessages}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="h-[calc(100svh-var(--header-height))]">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref={infoPanelRef}
            defaultSize={initialInfoDefaultSize}
            minSize={MIN_INFO_COLLAPSED_SIZE}
            maxSize={70}
            onResize={setInfoPanelSize}
            className="py-4 sm:py-6 pr-3 pl-4 sm:pl-6"
            id="info-panel"
          >
            <ExerciseInfo
              exerciseData={SAMPLE_EXERCISE[0]}
              isCollapsed={isExerciseInfoCollapsed}
              toggleCollapse={toggleExerciseInfoCollapse}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={initialCodeTestContainerDefaultSize}
            minSize={30}
          >
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel
                ref={codePanelRef}
                defaultSize={initialCodeDefaultSize}
                minSize={MIN_CODE_COLLAPSED_SIZE}
                className="px-3 pt-4 sm:pt-6 pb-3"
                onResize={setCodePanelSize}
                id="code-editor-panel"
              >
                <ExerciseCodeEditor
                  exerciseData={SAMPLE_EXERCISE[0]}
                  isCollapsed={isCodeEditorCollapsed}
                  toggleCollapse={toggleCodeEditorCollapse}
                  toggleTestCaseCollapse={toggleTestCaseCollapse}
                  isFullscreen={isFullscreen}
                  toggleFullscreen={toggleFullscreen}
                  getFeedback={getFeedback}
                />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel
                ref={testPanelRef}
                defaultSize={initialTestDefaultSize}
                minSize={MIN_TEST_COLLAPSED_SIZE}
                className="px-3 pt-3 pb-4 sm:pb-6"
                onResize={setTestPanelSize}
                id="test-panel"
              >
                <ExerciseTestCase
                  exerciseData={SAMPLE_EXERCISE[0]}
                  isCollapsed={isTestCaseCollapsed}
                  toggleCollapse={toggleTestCaseCollapse}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            ref={chatbotPanelRef}
            defaultSize={initialChatbotDefaultSize}
            minSize={MIN_CHATBOT_COLLAPSED_SIZE}
            maxSize={50}
            className="py-4 sm:py-6 pr-4 sm:pr-6 pl-3"
            onResize={setChatbotPanelSize}
            id="chatbot-panel"
          >
            <ExerciseChatPanel
              isCollapsed={isChatbotCollapsed}
              toggleCollapse={toggleChatbotCollapse}
              isGettingFeedback={isGettingFeedback}
              messages={messages}
              error={error}
              clearMessages={clearMessages}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
