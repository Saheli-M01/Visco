// Copyright (c) 2026 Saheli Mondal.

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinkedListDetails from "./LinkedListDetails";
import LinkedListVisualization from "./LinkedListVisualization";
import { categories } from "../../../data/categories";
import { getAlgorithm } from "../../../utils/algorithmFactory";
import ConfirmModal from "../Modal";
import DraggableHelpButton from "../algorithm-visualizer-components/Help-Guide/DraggableHelpButton";

const theme = createTheme({});

const FullScreenModalLinkedList = ({
  isOpen,
  onClose,
  onAlgorithmChange,
  onViewChange,
  initialTab = 0,
  algorithm,
  topic,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [showLanguageChangeConfirm, setShowLanguageChangeConfirm] =
    useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const [linkedListInputKey, setLinkedListInputKey] = useState(0);
  const [stepHistory, setStepHistory] = useState([]);

  const [currentList, setCurrentList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  const [isVisualizationActive, setIsVisualizationActive] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [operationValue, setOperationValue] = useState(null);
  const [comparingIndices, setcomparingIndices] = useState([]);
  const [linkedListSteps, setLinkedListSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionInterval, setExecutionInterval] = useState(null);

  const stepHistoryRef = useRef(null);
  const currentStepRef = useRef(null);

  useEffect(() => {
    if (showLanguageChangeConfirm) {
      handlePause();
    }
  }, [showLanguageChangeConfirm]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const linkedListAlgorithms = categories.linkedList?.algorithms || [];

  const getCodeLines = (language, algorithmName) => {
    const algorithm = getAlgorithm(algorithmName);
    if (algorithm.getCodeLines) {
      return algorithm.getCodeLines(language);
    }
    return algorithm.getCode(language).split("\n");
  };

  const handlePlay = () => {
    if (!isVisualizationActive || linkedListSteps.length === 0) return;
    setIsExecuting(true);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setIsExecuting(false);
    if (executionInterval) {
      clearInterval(executionInterval);
      setExecutionInterval(null);
    }
  };

  const handleReset = () => {
    handlePause();
    setCurrentStepIndex(0);
    setCurrentStep(0);
    if (linkedListSteps.length > 0) {
      const firstStep = linkedListSteps[0];
      setCurrentList([...firstStep.array]);
      setcomparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(
        firstStep.codeLine !== undefined ? firstStep.codeLine : -1
      );
    }
  };

  const handleStepForward = () => {
    if (
      !isVisualizationActive ||
      currentStepIndex >= linkedListSteps.length - 1
    )
      return;

    const nextIndex = currentStepIndex + 1;
    const step = linkedListSteps[nextIndex];
    if (step) {
      setCurrentStepIndex(nextIndex);
      setCurrentStep(nextIndex);
      setCurrentList([...step.array]);
      setcomparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleStepBackward = () => {
    if (!isVisualizationActive || currentStepIndex <= 0) return;

    const prevIndex = currentStepIndex - 1;
    const step = linkedListSteps[prevIndex];
    if (step) {
      setCurrentStepIndex(prevIndex);
      setCurrentStep(prevIndex);
      setCurrentList([...step.array]);
      setcomparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleLastStep = () => {
    if (!isVisualizationActive || linkedListSteps.length === 0) return;

    const lastIndex = linkedListSteps.length - 1;
    const step = linkedListSteps[lastIndex];
    if (step) {
      setCurrentStepIndex(lastIndex);
      setCurrentStep(lastIndex);
      setCurrentList([...step.array]);
      setcomparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleFirstStep = () => {
    if (!isVisualizationActive || linkedListSteps.length === 0) return;

    const firstStep = linkedListSteps[0];
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setCurrentList([...firstStep.array]);
    setcomparingIndices(firstStep.comparing || []);
    setCurrentCodeLine(
      firstStep.codeLine !== undefined ? firstStep.codeLine : -1
    );
  };

  const progress =
    linkedListSteps.length > 0
      ? ((currentStepIndex + 1) / linkedListSteps.length) * 100
      : 0;

  const handleRefresh = () => {
    handlePause();
    setCurrentStep(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSpeed(1.0);
    setLinkedListInputKey((k) => k + 1);
    setIsVisualizationActive(false);
    setCurrentList([]);
    setOriginalList([]);
    setcomparingIndices([]);
    setLinkedListSteps([]);
    setCurrentCodeLine(-1);
    setIsExecuting(false);
    setStepHistory([]);
    setTotalSteps(0);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handlePause();
        handleRefresh();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      setActiveTab(0);
      setSelectedAlgorithm(algorithm);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      if (executionInterval) {
        clearInterval(executionInterval);
      }
    };
  }, [isOpen, onClose, algorithm, executionInterval]);

  useEffect(() => {
    return () => {
      handleRefresh();
    };
  }, []);

  useEffect(() => {
    if (isVisualizationActive && originalList && originalList.length > 0) {
      const wasPlaying = isPlaying;
      handlePause();

      const algorithm = getAlgorithm(selectedAlgorithm?.name);
      const steps = algorithm.generateSteps(
        [...originalList],
        selectedLanguage,
        operationValue
      );

      setLinkedListSteps(steps);
      setTotalSteps(steps.length);
      setStepHistory(
        steps.map((step, index) => ({
          step: index,
          description: step.description,
          array: step.array,
          phase: step.phase,
        }))
      );

      setCurrentStepIndex(0);
      setCurrentStep(0);
      if (steps.length > 0) {
        const firstStep = steps[0];
        setCurrentList([...firstStep.array]);
        setcomparingIndices(firstStep.comparing || []);
        setCurrentCodeLine(
          firstStep.codeLine !== undefined ? firstStep.codeLine : -1
        );
      }

      if (wasPlaying) {
        setTimeout(() => {
          setIsPlaying(true);
          setIsExecuting(true);
        }, 100);
      }
    }
  }, [selectedAlgorithm?.name]);

  useEffect(() => {
    if (isExecuting && isPlaying && linkedListSteps.length > 0) {
      if (executionInterval) {
        clearInterval(executionInterval);
      }

      const interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= linkedListSteps.length - 1) {
            setIsPlaying(false);
            setIsExecuting(false);
            clearInterval(interval);
            return prevIndex;
          }

          const nextIndex = prevIndex + 1;
          const step = linkedListSteps[nextIndex];
          if (step) {
            setCurrentList([...step.array]);
            setcomparingIndices(step.comparing || []);
            setCurrentCodeLine(
              step.codeLine !== undefined ? step.codeLine : -1
            );
            setCurrentStep(nextIndex);
          }
          return nextIndex;
        });
      }, 2000 / speed);

      setExecutionInterval(interval);

      return () => {
        clearInterval(interval);
      };
    }
  }, [speed, isExecuting, isPlaying, linkedListSteps.length]);

  const [showAlgorithmChangeConfirm, setShowAlgorithmChangeConfirm] =
    useState(false);
  const [pendingAlgorithm, setPendingAlgorithm] = useState(null);

  const requestAlgorithmChange = (event) => {
    const algorithmName = event?.target ? event.target.value : event;
    const newAlgorithm = linkedListAlgorithms.find(
      (algo) => algo.name === algorithmName
    );
    if (onAlgorithmChange && newAlgorithm) {
      onAlgorithmChange(newAlgorithm);
      return;
    }
    if (!isVisualizationActive) {
      setSelectedAlgorithm(newAlgorithm);
      return;
    }

    if (activeTab === 1) {
      const newAlgorithm = linkedListAlgorithms.find(
        (algo) => algo.name === algorithmName
      );
      setSelectedAlgorithm(newAlgorithm);

      if (originalList && originalList.length > 0) {
        const algorithm = getAlgorithm(newAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalList],
          selectedLanguage,
          operationValue
        );
        setLinkedListSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            array: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentList([...firstStep.array]);
          setcomparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }

      return;
    }

    setPendingAlgorithm(algorithmName);
    setShowAlgorithmChangeConfirm(true);
    handlePause();
  };

  const confirmAlgorithmChange = () => {
    if (pendingAlgorithm) {
      const newAlgorithm = linkedListAlgorithms.find(
        (algo) => algo.name === pendingAlgorithm
      );
      setSelectedAlgorithm(newAlgorithm);

      if (originalList && originalList.length > 0) {
        const algorithm = getAlgorithm(newAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalList],
          selectedLanguage,
          operationValue
        );
        setLinkedListSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            array: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentList([...firstStep.array]);
          setcomparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }
    }
    setPendingAlgorithm(null);
    setShowAlgorithmChangeConfirm(false);
  };

  const cancelAlgorithmChange = () => {
    setPendingAlgorithm(null);
    setShowAlgorithmChangeConfirm(false);
  };

  const handleGo = (parsedList, maybeOperationValue = null) => {
    if (!Array.isArray(parsedList) || parsedList.length === 0) return;
    handlePause();
    setOriginalList([...parsedList]);
    setOperationValue(maybeOperationValue);
    const algorithm = getAlgorithm(selectedAlgorithm?.name);
    const steps = algorithm.generateSteps(
      parsedList,
      selectedLanguage,
      maybeOperationValue
    );
    setLinkedListSteps(steps);
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setTotalSteps(steps.length);
    setIsVisualizationActive(true);

    if (steps.length > 0) {
      const firstStep = steps[0];
      setCurrentList([...firstStep.array]);
      setcomparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(
        firstStep.codeLine !== undefined ? firstStep.codeLine : -1
      );
    }

    setStepHistory(
      steps.map((step, index) => ({
        step: index,
        description: step.description,
        list: step.array,
        phase: step.phase,
      }))
    );
  };

  const requestLanguageChange = (newLang) => {
    if (!isVisualizationActive || linkedListSteps.length === 0) {
      setSelectedLanguage(newLang);
      return;
    }

    if (currentStepIndex === 0) {
      setSelectedLanguage(newLang);
      if (originalList && originalList.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalList],
          newLang,
          operationValue
        );
        setLinkedListSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            array: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentList([...firstStep.array]);
          setcomparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }
      return;
    }

    if (activeTab === 1) {
      setSelectedLanguage(newLang);
      if (originalList && originalList.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalList],
          newLang,
          operationValue
        );
        setLinkedListSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            list: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentList([...firstStep.array]);
          setcomparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }
      return;
    }

    setPendingLanguage(newLang);
    setShowLanguageChangeConfirm(true);
  };

  const confirmLanguageChange = () => {
    if (pendingLanguage) {
      setSelectedLanguage(pendingLanguage);
      if (originalList && originalList.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps(
          [...originalList],
          pendingLanguage,
          operationValue
        );
        setLinkedListSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(
          steps.map((step, index) => ({
            step: index,
            description: step.description,
            list: step.array,
            phase: step.phase,
          }))
        );
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentList([...firstStep.array]);
          setcomparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(
            firstStep.codeLine !== undefined ? firstStep.codeLine : -1
          );
        }
      }
    }
    setPendingLanguage(null);
    setShowLanguageChangeConfirm(false);
  };

  const cancelLanguageChange = () => {
    setPendingLanguage(null);
    setShowLanguageChangeConfirm(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!isOpen) return null;

  const visualizationProps = {
    selectedLanguage,
    requestLanguageChange,
    getCodeLines,
    selectedAlgorithm,
    currentCodeLine,
    stepHistory,
    currentStepIndex,
    isVisualizationActive,
    linkedListSteps,
    setCurrentStepIndex,
    setCurrentStep,
    setCurrentList,
    setcomparingIndices,
    // canonical camelCase setter expected by visualization
    setComparingIndices: setcomparingIndices,
    setCurrentCodeLine,
    currentStepRef,
    stepHistoryRef,
    currentList,
    comparingIndices,
    linkedListInputKey,
    handleGo,
    isAutomatic,
    setIsAutomatic,
    isPlaying,
    handlePlay,
    handlePause,
    handleReset,
    handleRefresh,
    speed,
    setSpeed,
    handleFirstStep,
    handleLastStep,
    handleStepBackward,
    handleStepForward,
    isExecuting,
    progress,
  };

  return (
    <ThemeProvider theme={theme}>
      <AnimatePresence>
        <div className="fixed inset-0 z-50">
          <div className="relative h-full w-full backdrop-blur-sm bg-gray-100 flex flex-col border">

            <div className="flex-1 overflow-hidden">
              {activeTab === 0 && (
                <LinkedListVisualization {...visualizationProps} />
              )}
              {activeTab === 1 && (
                <div className="h-full py-2 overflow-y-auto custom-scrollbar">
                  <LinkedListDetails
                    algorithm={selectedAlgorithm}
                    topic={topic}
                    hideVisualizationButton={true}
                  />
                </div>
              )}
            </div>
          </div>
         
        </div>
      </AnimatePresence>
      <ConfirmModal
        isOpen={showLanguageChangeConfirm}
        title="Change language and regenerate?"
        message="Changing the language now will regenerate the visualization steps and reset progress. Do you want to continue?"
        onCancel={cancelLanguageChange}
        onConfirm={confirmLanguageChange}
        confirmLabel="Continue"
        cancelLabel="Cancel"
      />
      {/* Floating Help Button - Only visible on Visualization tab */}
      <DraggableHelpButton
        activeTab={activeTab}
        color="from-lime-400 to-green-400"
      />
    </ThemeProvider>
  );
};

export default FullScreenModalLinkedList;
