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

const PageBreak = () => <div className="html2pdf__page-break" />;

const PythonPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />
      <PageBreak />
      <Interpreter />
      <PageBreak />
      <Tokens />
      <PageBreak />
      <Variables />
      <PageBreak />
      <DataTypes />
      <PageBreak />
      <TypeInteractions />
      <PageBreak />
      <IncrementDecrement />
      <PageBreak />
      <StringConcatenation />
      <PageBreak />
      <PracticeQuestions1 />
      <PageBreak />
      <Conditionals />
      <PageBreak />
      <MatchCase />
      <PageBreak />
      <PracticeQuestions2 />
      <PageBreak />
      <TakingInputs />
      <PageBreak />
      <Loops />
      <PageBreak />
      <Functions />
      <PageBreak />
      <Lists />
      <PageBreak />
      <Tuples />
      <PageBreak />
      <Sets />
      <PageBreak />
      <Dictionaries />
    </div>
  );
};

export default PythonPage;