// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { motion } from "framer-motion";

const SLLDeletionExample = ({ examplePasses }) => {
	return examplePasses.map((pass, passIdx) => (
		<div
			key={passIdx}
			className="border border-blue-200 rounded-lg px-3 py-2 min-w-max"
		>
			<div className="flex items-center gap-3 mb-1.5">
				<h5 className="text-xs sm:text-sm font-bold text-blue-700">
					{pass.passNumber}:
				</h5>
				{pass.steps && pass.steps[0] && (
					<span className="text-xs font-medium text-gray-600">
						{pass.steps[0].swapText}
					</span>
				)}
				{pass.steps && pass.steps[0] && pass.steps[0].swapText && pass.steps[0].swapText.toLowerCase().includes('before') && (
					<span className="text-xs italic text-gray-500"> &nbsp;— deletes the node before the target value</span>
				)}
			</div>

			{pass.steps.map((step, stepIdx) => (
				<motion.div
					key={stepIdx}
					initial={{ opacity: 0, x: -10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.3,
						delay: passIdx * 0.1 + stepIdx * 0.05,
					}}
					className="flex items-center gap-1.5 mb-1.5 ml-1"
				>
					<div className="flex flex-col gap-1">
						<div className="flex items-start">
							{step.array.length === 1 ? (
								<div className="flex gap-1 items-center">
									<div className="flex flex-col items-center">
										<span className="text-[12px] font-bold text-emerald-600 mb-0.5">head</span>
										<span className="text-emerald-600 text-lg leading-none">↓</span>
									</div>
									<div className="flex flex-col items-center">
										<span className="text-[12px] font-bold text-fuchsia-600 mb-0.5">tail</span>
										<span className="text-fuchsia-600 text-lg leading-none">↓</span>
									</div>
								</div>
							) : (
								<>
									<div className="flex flex-col items-center">
										<span className="text-[12px] font-bold text-emerald-600 mb-0.5">head</span>
										<span className="text-emerald-600 text-lg leading-none">↓</span>
									</div>
									<div className="flex-1" />
									<div className="flex flex-col items-center mr-20">
										<span className="text-[12px] font-bold text-fuchsia-600 mb-0.5">tail</span>
										<span className="text-fuchsia-600 text-lg leading-none">↓</span>
									</div>
								</>
							)}
						</div>

						<div className="flex items-center gap-1">
							{step.array.map((txt, idx) => {
								const match =
									typeof txt === "string" &&
									txt.match(/^(\d+)\s*\(next:\s*([^\)]+)\)/);
								const val = match ? match[1] : txt;
								const nextDisp = match ? match[2] : "null";
								const isSwapped = step.swapped.includes(idx);
								const isNewNode = step.newNode === idx || (step.deleteNode && step.deleteNode.value === val);
								const addr = (() => {
									const base = 0xa0b000 + idx * 0x101;
									return "0x" + base.toString(16).toUpperCase();
								})();

								return (
									<React.Fragment key={idx}>
										<motion.div
											animate={isSwapped ? { scale: [1, 1.08, 1] } : {}}
											transition={{ duration: 0.18 }}
											className={`flex items-stretch overflow-hidden rounded-md border shadow-sm ${
												isNewNode ? "border-yellow-500 ring-2 ring-yellow-300" : "border-gray-600"
											}`}
										>
											<div
												className={`p-1 text-xs sm:text-sm font-bold text-white flex flex-col justify-center ${
													isNewNode ? "bg-yellow-500" : "bg-teal-500"
												}`}
											>
												<div>{isNewNode ? "deleted" : "node"}</div>
												<div className="mt-0.5 text-[12px] sm:text-[11px] font-medium opacity-90 text-gray-700">
													{addr}
												</div>
											</div>
											<div
												className={`p-1 text-[12px] sm:text-xs text-gray-800 border-l flex flex-col items-center justify-center ${
													isNewNode ? "bg-yellow-200 border-yellow-600" : "bg-amber-300 border-teal-700"
												}`}
											>
											 <span> next</span>
											 <span>{nextDisp}</span>
											</div>
										</motion.div>
										{idx < step.array.length - 1 && (
											<span className="flex items-center mx-1 text-gray-700">
												<span className="h-[2px] w-6 bg-gray-700 inline-block" />
												<span className="w-2 h-2 border-t-2 border-r-2 border-gray-700 rotate-45 -ml-1 inline-block" />
											</span>
										)}
									</React.Fragment>
								);
							})}
						</div>
					</div>
				</motion.div>
			))}
		</div>
	));
};

export default SLLDeletionExample;

