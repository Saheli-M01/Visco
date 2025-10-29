import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AlgorithmDetails from "./GraphDetails";
import AlgorithmVisualization from "./GraphVisualization";
import { categories } from "../../../../data/categories";
import { getAlgorithm } from "../../../algorithms/algorithmFactory";
import VisualizerHeader from "../VisualizerHeader";
import ConfirmModal from "../../Modal";

const theme = createTheme({});

const FullScreenModalGraph = ({ isOpen, onClose, algorithm, topic }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithm);

  const [selectedLanguage, setSelectedLanguage] = useState("csharp");
  const [showLanguageChangeConfirm, setShowLanguageChangeConfirm] =
    useState(false);
  const [pendingLanguage, setPendingLanguage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const [arrayInputKey, setArrayInputKey] = useState(0);
  const [stepHistory, setStepHistory] = useState([]);

  const [currentArray, setCurrentArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [isVisualizationActive, setIsVisualizationActive] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [graphSteps, setGraphSteps] = useState([]);
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

  const graphAlgorithms = categories.graph?.algorithms || [];

  const getCodeLines = (language, algorithmName) => {
    const algorithm = getAlgorithm(algorithmName);
    if (algorithm.getCodeLines) {
      return algorithm.getCodeLines(language);
    }
    return algorithm.getCode(language).split("\n");
  };

  const handlePlay = () => {
    if (!isVisualizationActive || graphSteps.length === 0) return;
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
    if (graphSteps.length > 0) {
      const firstStep = graphSteps[0];
      setCurrentArray([...((firstStep && firstStep.nodes) || [])]);
      setComparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(
        firstStep.codeLine !== undefined ? firstStep.codeLine : -1
      );
    }
  };

  const handleStepForward = () => {
    if (!isVisualizationActive || currentStepIndex >= graphSteps.length - 1)
      return;

    const nextIndex = currentStepIndex + 1;
    const step = graphSteps[nextIndex];
    if (step) {
      setCurrentStepIndex(nextIndex);
      setCurrentStep(nextIndex);
      setCurrentArray([...((step && step.nodes) || [])]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleStepBackward = () => {
    if (!isVisualizationActive || currentStepIndex <= 0) return;

    const prevIndex = currentStepIndex - 1;
    const step = graphSteps[prevIndex];
    if (step) {
      setCurrentStepIndex(prevIndex);
      setCurrentStep(prevIndex);
      setCurrentArray([...((step && step.nodes) || [])]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleLastStep = () => {
    if (!isVisualizationActive || graphSteps.length === 0) return;

    const lastIndex = graphSteps.length - 1;
    const step = graphSteps[lastIndex];
    if (step) {
      setCurrentStepIndex(lastIndex);
      setCurrentStep(lastIndex);
      setCurrentArray([...((step && step.nodes) || [])]);
      setComparingIndices(step.comparing || []);
      setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
    }
  };

  const handleFirstStep = () => {
    if (!isVisualizationActive || graphSteps.length === 0) return;

    const firstStep = graphSteps[0];
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setCurrentArray([...((firstStep && firstStep.nodes) || [])]);
    setComparingIndices(firstStep.comparing || []);
    setCurrentCodeLine(
      firstStep.codeLine !== undefined ? firstStep.codeLine : -1
    );
  };

  const progress =
    graphSteps.length > 0
      ? ((currentStepIndex + 1) / graphSteps.length) * 100
      : 0;

  const handleRefresh = () => {
    handlePause();
    setCurrentStep(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setSpeed(1.0);
    setArrayInputKey((k) => k + 1);
    setIsVisualizationActive(false);
    setCurrentArray([]);
    setOriginalArray([]);
    setComparingIndices([]);
    setGraphSteps([]);
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
    if (isVisualizationActive && originalArray && originalArray.length > 0) {
      const wasPlaying = isPlaying;
      handlePause();

      const algorithm = getAlgorithm(selectedAlgorithm?.name);
      const steps = algorithm.generateSteps([...originalArray], selectedLanguage);

      setGraphSteps(steps);
      setTotalSteps(steps.length);
      setStepHistory(
        steps.map((step, index) => ({
          step: index,
          description: step.description,
          nodes: step.nodes || step.visited || [],
          phase: step.phase,
        }))
      );

      setCurrentStepIndex(0);
      setCurrentStep(0);
      if (steps.length > 0) {
        const firstStep = steps[0];
        setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
        setComparingIndices(firstStep.comparing || []);
        setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
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
    if (isExecuting && isPlaying && graphSteps.length > 0) {
      if (executionInterval) {
        clearInterval(executionInterval);
      }

      const interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          if (prevIndex >= graphSteps.length - 1) {
            setIsPlaying(false);
            setIsExecuting(false);
            clearInterval(interval);
            return prevIndex;
          }

          const nextIndex = prevIndex + 1;
          const step = graphSteps[nextIndex];
          if (step) {
            setCurrentArray([...((step && step.nodes) || step.visited || [])]);
            setComparingIndices(step.comparing || []);
            setCurrentCodeLine(step.codeLine !== undefined ? step.codeLine : -1);
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
  }, [speed, isExecuting, isPlaying, graphSteps.length]);

  const handleAlgorithmChange = (event) => {
    const algorithmName = event.target.value;
    const newAlgorithm = graphAlgorithms.find((algo) => algo.name === algorithmName);
    setSelectedAlgorithm(newAlgorithm);
  };

  const [showAlgorithmChangeConfirm, setShowAlgorithmChangeConfirm] = useState(false);
  const [pendingAlgorithm, setPendingAlgorithm] = useState(null);

  const requestAlgorithmChange = (event) => {
    const algorithmName = event?.target ? event.target.value : event;
    if (!isVisualizationActive) {
      const newAlgorithm = graphAlgorithms.find((algo) => algo.name === algorithmName);
      setSelectedAlgorithm(newAlgorithm);
      return;
    }

    if (activeTab === 1) {
      const newAlgorithm = graphAlgorithms.find((algo) => algo.name === algorithmName);
      setSelectedAlgorithm(newAlgorithm);

      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(newAlgorithm?.name);
        const steps = algorithm.generateSteps([...originalArray], selectedLanguage);
        setGraphSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
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
      const newAlgorithm = graphAlgorithms.find((algo) => algo.name === pendingAlgorithm);
      setSelectedAlgorithm(newAlgorithm);

      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(newAlgorithm?.name);
        const steps = algorithm.generateSteps([...originalArray], selectedLanguage);
        setGraphSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
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

  const handleGo = (parsedGraph) => {
    if (!parsedGraph) return;
    handlePause();
    setOriginalArray(parsedGraph);
    const algorithm = getAlgorithm(selectedAlgorithm?.name);
    const steps = algorithm.generateSteps(parsedGraph, selectedLanguage);
    setGraphSteps(steps);
    setCurrentStepIndex(0);
    setCurrentStep(0);
    setTotalSteps(steps.length);
    setIsVisualizationActive(true);

    if (steps.length > 0) {
      const firstStep = steps[0];
      setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
      setComparingIndices(firstStep.comparing || []);
      setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
    }

    setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
  };

  const requestLanguageChange = (newLang) => {
    if (!isVisualizationActive || graphSteps.length === 0) {
      setSelectedLanguage(newLang);
      return;
    }

    if (currentStepIndex === 0) {
      setSelectedLanguage(newLang);
      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps([...originalArray], newLang);
        setGraphSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
        }
      }
      return;
    }

    if (activeTab === 1) {
      setSelectedLanguage(newLang);
      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps([...originalArray], newLang);
        setGraphSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
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
      if (originalArray && originalArray.length > 0) {
        const algorithm = getAlgorithm(selectedAlgorithm?.name);
        const steps = algorithm.generateSteps([...originalArray], pendingLanguage);
        setGraphSteps(steps);
        setTotalSteps(steps.length);
        setStepHistory(steps.map((step, index) => ({ step: index, description: step.description, nodes: step.nodes || step.visited || [], phase: step.phase })));
        setCurrentStepIndex(0);
        setCurrentStep(0);
        if (steps.length > 0) {
          const firstStep = steps[0];
          setCurrentArray([...((firstStep && firstStep.nodes) || firstStep.visited || [])]);
          setComparingIndices(firstStep.comparing || []);
          setCurrentCodeLine(firstStep.codeLine !== undefined ? firstStep.codeLine : -1);
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
    graphSteps,
    setCurrentStepIndex,
    setCurrentStep,
    setCurrentArray,
    setComparingIndices,
    setCurrentCodeLine,
    currentStepRef,
    stepHistoryRef,
    currentArray,
    comparingIndices,
    arrayInputKey,
    handleGo,
    isAutomatic,
    setIsAutomatic,
    isPlaying,
    handlePlay,
    handlePause,
    handleReset,
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
            <VisualizerHeader
              sortingAlgorithms={graphAlgorithms}
              selectedAlgorithm={selectedAlgorithm}
              handleAlgorithmChange={requestAlgorithmChange}
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              handleRefresh={handleRefresh}
              onClose={() => {
                handleRefresh();
                if (onClose) onClose();
              }}
            />

            <div className="flex-1 overflow-hidden">
              {activeTab === 0 && <AlgorithmVisualization {...visualizationProps} />}
              {activeTab === 1 && (
                <div className="h-full py-2 overflow-y-auto custom-scrollbar">
                  <AlgorithmDetails algorithm={selectedAlgorithm} topic={topic} hideVisualizationButton={true} />
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
    </ThemeProvider>
  );
};

export default FullScreenModalGraph;
