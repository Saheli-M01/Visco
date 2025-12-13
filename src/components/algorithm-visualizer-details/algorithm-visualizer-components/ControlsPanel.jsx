import React from "react";
import { Slider } from "@mui/material";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ControlsPanel = ({
  isAutomatic,
  setIsAutomatic,
  isPlaying,
  handlePlay,
  handlePause,
  handleReset,
  speed,
  setSpeed,
  isVisualizationActive,
  currentStepIndex,
  sortingSteps,
  handleFirstStep,
  handleLastStep,
  handleStepBackward,
  handleStepForward,
  isExecuting,
}) => {
  return (
    <div className="bg-white flex flex-col rounded-xl h-full px-2 ">
      {/* Single-row: title, mode toggle, and controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-md font-semibold text-gray-900 whitespace-nowrap">Controls: </h3>
        <div className="flex bg-white/20 rounded-lg gap-2 shadow-inner">
          <button
            onClick={() => { handlePause(); setIsAutomatic(false); }}
            className={`py-1 px-3 rounded-md text-sm font-medium transition-all ${!isAutomatic ? "bg-gray-800 text-white shadow-md" : "text-gray-700 hover:bg-white/20"}`}
          >
            Manual
          </button>
          <button
            onClick={() => { handlePause(); setIsAutomatic(true); }}
            className={`py-1 px-3 rounded-md text-sm font-medium transition-all ${isAutomatic ? "bg-gray-800 text-white shadow-md" : "text-gray-700 hover:bg-white/20"}`}
          >
            Automatic
          </button>
        </div>

        {/* Inline controls area */}
        {isAutomatic ? (
          <div className="flex items-center gap-3 flex-1 ml-7 min-w-[260px] h-10">
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              disabled={!isVisualizationActive}
              className={`p-2 rounded-full transition-all shadow-lg ${!isVisualizationActive ? "bg-gray-300 text-gray-400 border border-gray-400 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"}`}
            >
              {isPlaying ? (<Pause className="h-4 w-4" />) : (<Play className="h-4 w-4" />)}
            </button>
            <div className="flex items-center gap-2 flex-1 h-10">
              <span className="text-sm font-medium text-gray-700 mr-3">Speed </span>
              <Slider
                value={(speed * 10) / 8}
                onChange={(_, newValue) => setSpeed((8 * newValue) / 10)}
                min={1}
                max={10}
                step={0.1}
                marks={[{ value: 1, label: "1x" },{ value: 3, label: "3x" },{ value: 5, label: "5x" },{ value: 7, label: "7x" },{ value: 9, label: "9x" },{ value: 10, label: "10x" }]}
                size="small"
                sx={{
                  color: "#374151",
                  "& .MuiSlider-thumb": { backgroundColor: "#374151", width: 16, height: 16, "&:hover": { boxShadow: "0 0 0 8px rgba(55,65,81,0.16)" } },
                  "& .MuiSlider-track": { backgroundColor: "#374151", height: 4 },
                  "& .MuiSlider-rail": { backgroundColor: "rgba(156,163,175,0.5)", height: 4 },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 ml-auto h-10">
            <button
              onClick={handleFirstStep}
              disabled={!isVisualizationActive || currentStepIndex === 0}
              className="min-w-[100px] flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <SkipBack className="h-3 w-3" />
              First
            </button>
            <button
              onClick={handleStepBackward}
              disabled={!isVisualizationActive || currentStepIndex === 0}
              className="min-w-[100px] flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <ChevronLeft className="h-3 w-3" />
              Prev
            </button>
            <button
              onClick={handleStepForward}
              disabled={!isVisualizationActive || currentStepIndex >= sortingSteps.length - 1}
              className="min-w-[100px] flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <ChevronRight className="h-3 w-3" />
              Next
            </button>
            <button
              onClick={handleLastStep}
              disabled={!isVisualizationActive || currentStepIndex >= sortingSteps.length - 1}
              className="min-w-[100px] flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
            >
              <SkipForward className="h-3 w-3" />
              Last
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;
