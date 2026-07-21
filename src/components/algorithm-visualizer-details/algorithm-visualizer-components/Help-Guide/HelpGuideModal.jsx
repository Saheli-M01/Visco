// Copyright (c) 2026 Saheli Mondal.

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play, Code, History, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";

const HelpGuideModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Step 1: Enter Array and Go",
      description:
        "Enter array values (maximum 10 values) separated by commas, then click Go to start the visualization. The array will appear in the display panel below.",
      imagePlaceholder: "/assets/user-guide/input.gif",
      icon: Play,
      color: "from-sky-400 to-cyan-500",
      bgGradient: "bg-gradient-to-br from-emerald-50 to-cyan-50",
    },
    {
      title: "Step 2: Control the Visualization",
      sections: [
        {
          title: "Manual Control",
          description: "Step through the algorithm one step at a time using the First, Previous, Next and Last buttons to control the pace.",
          imagePlaceholder: "/assets/user-guide/manual.gif",
        },
        {
          title: "Automatic Control",
          description: "To start with automatic control first click on the play button and let the algorithm run automatically with adjustable speed settings to visualize the entire  process.",
          imagePlaceholder: "/assets/user-guide/automatic.gif",
        },
      ],
      icon: Sparkles,
      color: "from-purple-400 to-pink-500",
      bgGradient: "bg-gradient-to-br from-purple-50 to-pink-50",
    },
    {
      title: "Step 3: Unified Visualization Interface",
      description:
        "All three panels work together as one integrated system to help you understand the algorithm:",
      details: [
        "Display Panel (Cyan Border): Visual representation of your array with real-time operation",
        "Code Preview (Rose Border): Shows the actual algorithm code (5 language support) with the currently executing line highlighted",
        "Step History (Yellow Border): Complete log of all operations performed, allowing you to jump to any step"
      ],
      imagePlaceholder: "/assets/user-guide/display.gif",
      icon: Code,
      color: "from-blue-400 to-indigo-500",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
  ];

  const step = steps[currentStep];
  const hasSections = Boolean(step.sections);
  const hasImage = Boolean(step.imagePlaceholder);
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
      <DialogContent className="max-w-7xl min-w-[70vw] max-h-[85vh] flex flex-col overflow-y-auto scrollbar-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">
        <DialogHeader className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 rounded-t-lg -mx-6 -mt-2 px-6 py-2 shadow-md border-b border-slate-600/20 flex items-center">

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
                <StepIcon className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
                Visualization Guide
              </DialogTitle>
            </div>

            <div className="flex items-center gap-3 mr-28">
              <div className="flex items-center gap-2">
              
                <span className="text-sm text-white font-medium">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="h-6 w-6 flex items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                >
                  <ChevronLeft className="h-4 w-4" />
                  
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
                  className={`h-6 w-6 flex items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-white hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md`}
                >
                  <ChevronRight className="h-4 w-4" />
                 
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto scrollbar-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4 px-3"
            >
              {/* Title */}
              <div className="w-full">
                <h2 className="text-2xl font-bold text-slate-800">
                  {step.title}
                </h2>
              </div>

              {hasSections ? (
                // Multi-section layout for steps 2 and 3
                <div className="w-full space-y-6">
                  {step.sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`${step.bgGradient} rounded-2xl p-6 shadow-md border border-slate-200/50`}
                    >
                      <h3 className="text-lg font-bold text-slate-800 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-slate-700 leading-relaxed mb-4">
                        {section.description}
                      </p>
                      {section.imagePlaceholder && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-xl overflow-hidden shadow-lg border-2 border-slate-200/60 bg-white"
                        >
                          <img
                            src={section.imagePlaceholder}
                            alt={section.title}
                            className="w-full h-auto object-cover"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Single content layout for step 1 and step 3
                <div className="w-full space-y-2">
                  <div className={`${step.bgGradient} rounded-2xl px-4 py-2 shadow-md border border-slate-200/50`}>
                    <p className="text-slate-700 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {step.details && (
                      <ul className="mt-4 space-y-2">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-slate-700"
                          >
                            <span className="text-slate-500 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {hasImage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl overflow-hidden shadow-lg border-2 border-slate-200/60 bg-white"
                    >
                      <div className={`bg-gradient-to-r ${step.color} text-white text-xs font-semibold px-3 py-2 flex items-center gap-2`}>
                        <Play className="h-3 w-3" />
                        Demo
                      </div>
                      <img
                        src={step.imagePlaceholder}
                        alt="Demo"
                        className="w-full h-auto object-cover"
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuideModal;
