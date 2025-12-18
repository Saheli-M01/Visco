import React from "react";
import { STLIntro } from "./00STL";
import { STLContainers } from "./01Containers";
import { STLIterators } from "./02Iterators";
import { STLAlgorithms } from "./03Algorithms";

export const STL = () => {
  return (
    <section id="stl" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">C++ STL Power Pack</h2>
        <p className="text-base md:text-lg text-gray-700">
          A fun, example-led tour of the Standard Template Library: containers to hold data, iterators to navigate it,
          and algorithms to transform it.
        </p>
      </div>
      <STLIntro />
      <STLContainers />
      <STLIterators />
      <STLAlgorithms />
    </section>
  );
};

export default STL;
