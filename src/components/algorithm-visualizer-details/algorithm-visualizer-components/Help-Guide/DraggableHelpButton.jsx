import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import HelpGuideModal from "./HelpGuideModal";

const DraggableHelpButton = ({ activeTab, color = "from-blue-500 to-blue-600" }) => {
  const draggedRef = useRef(false);
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  if (activeTab !== 0) return null;

  return (
    <>
    <motion.button
      drag
      dragConstraints={{
        left: -window.innerWidth + 100,
        right: 0,
        top: -window.innerHeight + 100,
        bottom: 0,
      }}
      dragElastic={0}
      dragMomentum={false}
      dragTransition={{
        bounceStiffness: 0,
        bounceDamping: 0,
        power: 0,
      }}
      onDragStart={() => {
        draggedRef.current = false;
      }}
      onDrag={() => {
        draggedRef.current = true;
      }}
      onClick={() => {
        if (!draggedRef.current) {
          setShowHelpGuide(true);
        }
        draggedRef.current = false;
      }}
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-2 p-3 bg-gradient-to-r ${color} text-white rounded-full shadow-2xl hover:shadow-blue-500/50 group cursor-move`}
      title="Open Help Guide (Draggable)"
      whileDrag={{ scale: 1 }}
    >
      <HelpCircle className="h-6 w-6" />
    </motion.button>
    <HelpGuideModal isOpen={showHelpGuide} onClose={() => setShowHelpGuide(false)} />
    </>
  );
};

export default DraggableHelpButton;
