import React from "react";
import Introduction from "./sections/Introduction";
import Interpreter from "./sections/Interpreter";
import Tokens from "./sections/Tokens";
import Variables from "./sections/Variables";
import DataTypes from "./sections/DataTypes";
import TypeInteractions from "./sections/TypeInteractions";
import KeyTakeaways from "./sections/KeyTakeaways";
import IncrementDecrement from "./sections/IncrementDecrement";
import StringConcatenation from "./sections/StringConcatenation";
import PracticeQuestions from "./sections/PracticeQuestions";

const PythonPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />
      <Interpreter />
      <Tokens />
      <Variables />
      <DataTypes />
      <TypeInteractions />
      <KeyTakeaways />
      <IncrementDecrement />
      <StringConcatenation />
      <PracticeQuestions />
    </div>
  );
};

export default PythonPage;