import React from "react";
import Introduction from "./sections/Introduction";
import Interpreter from "./sections/Interpreter";
import Tokens from "./sections/Tokens";
import Variables from "./sections/Variables";
import DataTypes from "./sections/DataTypes";
import TypeInteractions from "./sections/TypeInteractionsAndTypeCasting";
import IncrementDecrement from "./sections/IncrementDecrement";
import StringConcatenation from "./sections/StringConcatenation";
import PracticeQuestions1 from "./sections/PracticeQuestions1";

const PythonPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />
      <div className="pdf-page-break"><Interpreter /></div>
      <div className="pdf-page-break"><Tokens /></div>
      <div className="pdf-page-break"><Variables /></div>
      <div className="pdf-page-break"><DataTypes /></div>
      <div className="pdf-page-break"><TypeInteractions /></div>
      <div className="pdf-page-break"><IncrementDecrement /></div>
      <div className="pdf-page-break"><StringConcatenation /></div>
      <div className="pdf-page-break"><PracticeQuestions1 /></div>
    </div>
  );
};

export default PythonPage;