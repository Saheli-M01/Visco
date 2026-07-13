import React from "react";
import Introduction from "./sections/Introduction";
import Interpreter from "./sections/Interpreter";
import Tokens from "./sections/Tokens";
import Variables from "./sections/Variables";
import DataTypes from "./sections/DataTypes";

import IncrementDecrement from "./sections/IncrementDecrement";
import StringConcatenation from "./sections/StringConcatenation";
import PracticeQuestions1 from "./sections/PracticeQuestions1";
import Conditionals from "./sections/Conditionals";
import MatchCase from "./sections/MatchCase";
import PracticeQuestions2 from "./sections/PracticeQuestions2";
import TakingInputs from "./sections/TakingInputs";
import Loops from "./sections/Loops";
import Functions from "./sections/Functions";
import Lists from "./sections/Lists";
import Tuples from "./sections/Tuples";
import Sets from "./sections/Sets";
import Dictionaries from "./sections/Dictionaries";
import ErrorHandling from "./sections/ErrorHandling";

const PythonPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />

      <Interpreter />

      <Tokens />

      <Variables />

      <DataTypes />

      <IncrementDecrement />

      <StringConcatenation />

      <PracticeQuestions1 />

      <Conditionals />

      <MatchCase />

      <PracticeQuestions2 />

      <TakingInputs />

      <Loops />

      <Functions />

      <Lists />

      <Tuples />

      <Sets />

      <Dictionaries />

      <ErrorHandling />
    </div>
  );
};

export default PythonPage;
