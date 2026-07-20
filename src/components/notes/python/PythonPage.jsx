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
import Arrays from "./sections/Arrays";
import Tuples from "./sections/Tuples";
import Sets from "./sections/Sets";
import Dictionaries from "./sections/Dictionaries";
import ErrorHandling from "./sections/ErrorHandling";

// NOTE: each section is wrapped with a stable id. These ids are what you'll
// type into the "Start section ID" / "End section ID" fields in the PDF
// export modal (e.g. start = "tokens", end = "loops").
const PythonPage = () => {
  return (
    <div id="notes-content">
      <div className="space-y-12">
        <div id="introduction">
          <Introduction />
        </div>

        <div id="interpreter">
          <Interpreter />
        </div>

        <div id="tokens">
          <Tokens />
        </div>

        <div id="variables">
          <Variables />
        </div>

        <div id="data-types">
          <DataTypes />
        </div>

        <div id="increment-decrement">
          <IncrementDecrement />
        </div>

        <div id="string-concatenation">
          <StringConcatenation />
        </div>

        <div id="practice-questions-1">
          <PracticeQuestions1 />
        </div>

        <div id="conditionals">
          <Conditionals />
        </div>

        <div id="match-case">
          <MatchCase />
        </div>

        <div id="practice-questions-2">
          <PracticeQuestions2 />
        </div>

        <div id="taking-inputs">
          <TakingInputs />
        </div>

        <div id="loops">
          <Loops />
        </div>

        <div id="functions">
          <Functions />
        </div>

        <div id="lists">
          <Lists />
        </div>

        <div id="arrays">
          <Arrays />
        </div>

        <div id="tuples">
          <Tuples />
        </div>

        <div id="sets">
          <Sets />
        </div>

        <div id="dictionaries">
          <Dictionaries />
        </div>

        <div id="error-handling">
          <ErrorHandling />
        </div>
      </div>
    </div>
  );
};

export default PythonPage;
