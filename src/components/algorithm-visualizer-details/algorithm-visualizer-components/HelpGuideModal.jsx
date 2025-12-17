import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Code, History, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

const HelpGuideModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Step 1: Enter Array and Go",
      description:
        "Start by entering array values in the input field. You can enter multiple numbers separated by spaces or commas. Once you've entered the values, click the 'Go' button to begin the visualization. The array will then be displayed in the display panel below.",
      videoPlaceholder: "video_1_enter_array.mp4",
      icon: Play,
      color: "from-sky-400 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-cyan-50",
    },
    {
      title: "Step 2: Manual and Automatic Control",
      description: "You can control the sorting visualization in two ways:",
      details: [
        "Manual Control: Step through the algorithm one step at a time using the Previous/Next buttons",
        "Automatic Control: Let the algorithm run automatically with adjustable speed settings",
      ],
      videoPlaceholder: [
        "video_2a_manual_control.mp4",
        "video_2b_auto_control.mp4",
      ],
      icon: Sparkles,
      color: "from-purple-400 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      title: "Step 3: Check Code Preview",
      description:
        "The code preview panel shows the actual sorting algorithm code in your selected programming language. You can switch between different languages using the dropdown. The current line being executed is highlighted, allowing you to see exactly which part of the code is running at each step.",
      videoPlaceholder: "video_3_code_preview.mp4",
      icon: Code,
      color: "from-blue-400 to-indigo-500",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
    {
      title: "Step 4: Check Step History",
      description:
        "The step history panel displays all the operations performed during the sorting process. Each step shows the array state, comparisons, and swaps. You can click on any previous step to jump to that point in the visualization, making it easy to review and understand the algorithm's behavior.",
      videoPlaceholder: "video_4_step_history.mp4",
      icon: History,
      color: "from-orange-400 to-rose-500",
      bgGradient: "bg-gradient-to-br from-orange-50 to-rose-50",
    },
  ];

  const step = steps[currentStep];
  const isMultipleVideos = Array.isArray(step.videoPlaceholder);
  const StepIcon = step.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl min-w-[60vw] max-h-[85vh] flex flex-col overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <DialogHeader className="relative pb-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                <StepIcon className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Sorting Visualization Guide
              </DialogTitle>
            </div>

            <div className="flex flex-wrap items-center gap-3 mr-4">
              <div className="flex items-center gap-2">
                <div className={`bg-gradient-to-r ${step.color} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                  {currentStep + 1}/{steps.length}
                </div>
                <span className="text-sm text-slate-600 font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="h-10 w-10 flex items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous step</span>
                </button>

                <div className="flex gap-2 px-2">
                  {steps.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      className={`transition-all rounded-full ${
                        idx === currentStep 
                          ? `w-8 h-3 bg-gradient-to-r ${step.color} shadow-md` 
                          : "w-3 h-3 bg-slate-300 hover:bg-slate-400"
                      }`}
                      title={`Go to step ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                  className={`h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md`}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next step</span>
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8 p-3"
            >
              {/* Left side - Instructions */}
              <div className="w-full">
                <div className={`${step.bgGradient} rounded-2xl p-6 shadow-md border border-slate-200/50`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${step.color}`}>
                      <StepIcon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">
                      {step.title}
                    </h2>
                  </div>
                  
                  <p className="text-slate-700 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {step.details && (
                    <ul className="space-y-3 mb-4">
                      {step.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 bg-white/60 backdrop-blur p-3 rounded-lg border border-slate-200/50 shadow-sm"
                        >
                          <span className={`bg-gradient-to-br ${step.color} text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mt-0.5 flex-shrink-0`}>
                            {idx + 1}
                          </span>
                          <span className="text-slate-700 text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Right side - Video Placeholder */}
              <div className="w-full ">
                {isMultipleVideos ? (
                  step.videoPlaceholder.map((video, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.15 }}
                      className="rounded-xl overflow-hidden shadow-lg border-2 border-slate-200/60 bg-white"
                    >
                      <div className={`bg-gradient-to-r ${step.color} text-white text-xs font-semibold px-3 py-2 flex items-center gap-2`}>
                        <Play className="h-3 w-3" />
                        Video {idx + 1}
                      </div>
                      <video
                        className="w-full h-full object-cover"
                        controls
                        controlsList="nodownload"
                      >
                        <source src={`/videos/${video}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-xl overflow-hidden shadow-lg border-2 border-slate-200/60 bg-white"
                  >
                    <div className={`bg-gradient-to-r ${step.color} text-white text-xs font-semibold px-3 py-2 flex items-center gap-2`}>
                      <Play className="h-3 w-3" />
                      Video Demo
                    </div>
                    <video
                      className="w-full h-full object-cover"
                      controls
                      controlsList="nodownload"
                    >
                      <source
                        src={`/videos/${step.videoPlaceholder}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuideModal;
