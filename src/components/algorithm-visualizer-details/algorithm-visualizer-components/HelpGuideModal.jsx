import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
    },
    {
      title: "Step 3: Check Code Preview",
      description:
        "The code preview panel shows the actual sorting algorithm code in your selected programming language. You can switch between different languages using the dropdown. The current line being executed is highlighted, allowing you to see exactly which part of the code is running at each step.",
      videoPlaceholder: "video_3_code_preview.mp4",
    },
    {
      title: "Step 4: Check Step History",
      description:
        "The step history panel displays all the operations performed during the sorting process. Each step shows the array state, comparisons, and swaps. You can click on any previous step to jump to that point in the visualization, making it easy to review and understand the algorithm's behavior.",
      videoPlaceholder: "video_4_step_history.mp4",
    },
  ];

  const step = steps[currentStep];
  const isMultipleVideos = Array.isArray(step.videoPlaceholder);

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
      <DialogContent className="max-w-7xl min-w-[50vw] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Sorting Visualization Guide
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex gap-6 p-6">
            {/* Left side - Instructions */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {step.description}
              </p>

              {step.details && (
                <ul className="space-y-2 mb-4">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-1">•</span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right side - Video Placeholder */}
            <div className="w-[50%] flex flex-col gap-4">
              {isMultipleVideos ? (
                step.videoPlaceholder.map((video, idx) => (
                  <div className="text-center" key={idx}>
                    <div className="text-gray-400 text-xs font-mono mb-2">
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
                  </div>
                ))
              ) : (
               
                  <div className="text-center">
                    <div className="text-gray-400 text-xs font-mono mb-2">
                      Video
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
                  </div>
             
              )}
            </div>
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex gap-1">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  title={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpGuideModal;
