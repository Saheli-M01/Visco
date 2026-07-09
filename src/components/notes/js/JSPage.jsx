import React from "react";
import Introduction from "./sections/Introduction";
import Variables from "./sections/Variables";
import DataTypes from "./sections/DataTypes";
import StringOps from "./sections/StringOps";
import Operators from "./sections/Operators";
import ErrorHandling from "./sections/ErrorHandling";
import Loops from "./sections/Loops";

const JSPage = () => {
  return (
    <div className="space-y-12">
      <Introduction />
      <Variables />
      <DataTypes />
      <StringOps />
      <Operators />
      <ErrorHandling />
      <Loops />
    </div>
  );
};

export default JSPage;
