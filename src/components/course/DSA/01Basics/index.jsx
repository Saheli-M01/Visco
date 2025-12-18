import React from "react";
import { Intro } from "./00intro";
import { Types } from "./01types";
import { Variables } from "./02variables";
import { Operators } from "./03operators";

export const Basics = () => {
  return (
    <section id="basics" className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Basics</h2>
      <div id="basics-intro">
        <Intro />
      </div>
      <div id="basics-types">
        <Types />
      </div>
      <div id="basics-variables">
        <Variables />
      </div>
      <div id="basics-operators">
        <Operators />
      </div>
    </section>
  );
};

export default Basics;
