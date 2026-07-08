import React from "react";

const KeyTakeaways = () => {
  return (
    <section id="key-takeaways" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        6. Key Takeaways
      </h1>

      <p className="text-slate-600 dark:text-slate-355 leading-relaxed">
        Here is a quick summary of the important concepts we have learned so far:
      </p>

      <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-350 leading-relaxed">
        <li>
          A <strong>programming language</strong> is how we instruct computers. Python is a friendly, <strong>high-level</strong> language.
        </li>
        <li>
          An <strong>interpreter</strong> translates code line-by-line, making debugging easy, whereas a <strong>compiler</strong> translates the whole program at once.
        </li>
        <li>
          <strong>Tokens</strong> are the smallest syntax elements (identifiers, keywords, literals, operators, delimiters, and whitespace).
        </li>
        <li>
          <strong>Variables</strong> are named labels pointing to objects in memory.
        </li>
        <li>
          <strong>Mutability</strong>: Immutable values (strings, numbers, tuples) cannot change in memory; mutable values (lists, dictionaries, sets) can be changed in-place.
        </li>
        <li>
          <strong>Type Casting</strong> is converting one type to another—either automatically (implicit) or manually (explicit).
        </li>
      </ul>
    </section>
  );
};

export default KeyTakeaways;
