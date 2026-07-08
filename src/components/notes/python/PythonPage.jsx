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
      <Interpreter />
      <Tokens />
      <Variables />
      <DataTypes />
      <TypeInteractions />

      <IncrementDecrement />
      <StringConcatenation />
      <PracticeQuestions1 />
    </div>
  );
};

export default PythonPage;