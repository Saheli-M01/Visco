// components/Hero.tsx

import { ArrowRight, Code2, Play } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const Hero = () => {
  const stageRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.4 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-14, 14]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
    springConfig,
  );

  const glowX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
    springConfig,
  );
  const glowY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-20, 20]),
    springConfig,
  );

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <>
      <section
        id="home"
        aria-label="Visco hero"
        className="relative min-h-screen w-full bg-[#070707] flex flex-col items-center pt-40 pb-20 px-6 overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:-inset-x-[20vw] before:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] before:bg-[length:62px_62px] before:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_82%)] before:pointer-events-none"
      >
        {/* ambient orbs */}
        <div className="absolute rounded-full blur-[80px] opacity-20 pointer-events-none w-[320px] h-[320px] left-[10%] top-[16%] bg-[#60a5fa] animate-float" />
        <div className="absolute rounded-full blur-[80px] opacity-20 pointer-events-none w-[420px] h-[420px] right-[8%] top-[10%] bg-[#94a3b8] animate-float-slow" />

        {/* ---- Row 1: text content ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-[2] w-full max-w-[720px] text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121214] text-[#afb0b8] text-xs font-mono uppercase tracking-[0.06em] px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9] shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
            Interactive algorithm platform
          </div>

          <h1 className="mt-6 mb-5 text-hero leading-[0.94] tracking-[-0.06em] font-bold font-sans">
            Understand algorithms.
            <br />
            <span className="bg-[linear-gradient(120deg,#ffffff_22%,#9ca3af_92%)] bg-clip-text text-transparent">
              Instantly.
            </span>
          </h1>

          <p className="max-w-[510px] mx-auto text-lg leading-[1.6] text-[#a0a0a5]">
            A premium visual workspace where developers and CS students learn by
            watching algorithms execute, step by step.
          </p>

          <div className="flex justify-center gap-3 mt-8">
            <a
              href="#algorithms"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-[#111217] bg-[linear-gradient(140deg,#f8fafc_0%,#d1d5db_100%)] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5"
            >
              Explore algorithms <ArrowRight size={16} />
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-[#dfdfe3] border border-white/10 bg-[#111214] hover:border-white/20 hover:bg-[#17181c] transition-colors"
            >
              <Code2 size={16} /> Open docs
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2.5 text-[#94949b] text-sm">
            <div className="flex">
              {["D", "E", "V"].map((l, i) => (
                <i
                  key={l}
                  style={{ marginLeft: i === 0 ? 0 : -6 }}
                  className="w-5.5 h-5.5 rounded-full grid place-items-center not-italic text-[0.56rem] font-bold border-2 border-[#0b0b0d] text-[#0a0b0c] bg-[linear-gradient(145deg,#dbeafe,#a5b4fc)]"
                >
                  {l}
                </i>
              ))}
            </div>
            <span>
              Built for developers who care about precision and taste.
            </span>
          </div>
        </motion.div>

        {/* ---- Row 2: interactive product stage, own row, mouse-follow ---- */}
        <motion.div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ perspective: 1900 }}
          className="relative z-[2] w-full max-w-[720px] mt-16"
        >
          {/* glow that drifts with cursor */}
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="absolute inset-[10%_10%_-10%_10%] bg-[radial-gradient(circle,rgba(129,140,248,0.55)_0%,transparent_70%)] blur-[80px] opacity-40 pointer-events-none"
          />

          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <div className="border border-white/10 rounded-[20px] overflow-hidden bg-[linear-gradient(145deg,#101113,#0b0b0d)] shadow-lg2">
              <div className="h-[46px] border-b border-white/10 bg-[#141519] flex items-center gap-3 px-3.5 font-mono text-[0.66rem] text-[#8d8e94]">
                <div className="flex gap-1.5">
                  <i className="w-1.5 h-1.5 rounded-full bg-[#474851]" />
                  <i className="w-1.5 h-1.5 rounded-full bg-[#474851]" />
                  <i className="w-1.5 h-1.5 rounded-full bg-[#474851]" />
                </div>
                <div className="ml-5 inline-flex items-center gap-1.5 border border-white/10 bg-[#1d1e23] text-[#cacad0] h-[30px] rounded-t-lg px-2.5">
                  <Code2 size={13} /> quick-sort.js{" "}
                  <span className="text-[#74747a] ml-2">x</span>
                </div>
                <div className="ml-auto uppercase border border-white/10 rounded-md px-1.5 py-0.5">
                  live
                </div>
              </div>

              <div className="h-[240px] flex bg-[linear-gradient(120deg,#101113,#0c0d10)] py-4.5">
                <aside className="w-11 text-right pr-3.5 font-mono text-[0.66rem] leading-[1.84] text-[#565862] select-none">
                  1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9
                </aside>
                <pre className="m-0 whitespace-pre font-mono text-[0.7rem] leading-[1.84] text-[#bcc0ca]">
                  <code>
                    <em className="text-[#c4b5fd] not-italic">function</em>{" "}
                    <strong className="text-[#93c5fd] font-semibold">
                      quickSort
                    </strong>
                    (array) {"{"}
                    <br /> <em className="text-[#c4b5fd] not-italic">
                      if
                    </em>{" "}
                    (array.length &lt;={" "}
                    <b className="text-[#f9a8d4] font-semibold">1</b>){" "}
                    <em className="text-[#c4b5fd] not-italic">return</em> array;
                    <br />
                    <br /> <em className="text-[#c4b5fd] not-italic">
                      const
                    </em>{" "}
                    pivot = array[
                    <b className="text-[#f9a8d4] font-semibold">0</b>];
                    <br /> <em className="text-[#c4b5fd] not-italic">
                      const
                    </em>{" "}
                    left = array.
                    <strong className="text-[#93c5fd] font-semibold">
                      filter
                    </strong>
                    (x =&gt; x &lt; pivot);
                    <br /> <em className="text-[#c4b5fd] not-italic">
                      const
                    </em>{" "}
                    right = array.
                    <strong className="text-[#93c5fd] font-semibold">
                      filter
                    </strong>
                    (x =&gt; x &gt; pivot);
                    <br />
                    <br /> <em className="text-[#c4b5fd] not-italic">
                      return
                    </em>{" "}
                    [...quickSort(left), pivot,
                    <br /> ...quickSort(right)];
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>

              <div className="h-[30px] border-t border-white/10 px-3.5 flex items-center justify-between text-[#808189] font-mono text-[0.6rem]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9] shadow-[0_0_14px_rgba(103,232,249,0.8)] animate-pulse-dot" />
                  Live visualization
                </span>
                <span>JavaScript</span>
              </div>
            </div>

            <div
              style={{ transform: "translateZ(40px)" }}
              className="w-[78%] -mt-6 ml-auto rounded-2xl border border-white/10 bg-[rgba(21,22,26,0.9)] backdrop-blur-md p-4.5 shadow-[0_24px_50px_rgba(0,0,0,0.44)]"
            >
              <div className="flex justify-between gap-2">
                <div>
                  <span className="text-[#7a7b86] text-[0.6rem] font-mono uppercase tracking-[0.06em]">
                    STEP 04 / 12
                  </span>
                  <h3 className="mt-1.5 text-base font-semibold tracking-[-0.02em] text-white">
                    Partition around <b className="text-[#c4b5fd]">42</b>
                  </h3>
                </div>
                <button
                  aria-label="Play visualization"
                  className="w-[30px] h-[30px] border border-white/10 rounded-[10px] bg-[#181920] text-[#c8cbd7] grid place-items-center"
                >
                  <Play size={13} fill="currentColor" />
                </button>
              </div>

              <div className="h-[90px] my-4.5 grid grid-cols-8 items-end gap-1.5">
                {[42, 62, 30, 78, 53, 94, 68, 38].map((h, i) => (
                  <motion.i
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{
                      delay: 0.4 + i * 0.06,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className={`rounded-lg border ${
                      i === 3
                        ? "border-[#818cf8] bg-[linear-gradient(180deg,#818cf8_0%,#4f46e5_100%)] shadow-[0_0_18px_rgba(129,140,248,0.4)]"
                        : "border-[#3a3b44] bg-[linear-gradient(180deg,#3f444e_0%,#242730_100%)]"
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-between gap-2 font-mono text-[0.64rem] text-[#7e818c]">
                <span>
                  Comparisons <b className="text-[#d8dbe5]">06</b>
                </span>
                <span>
                  Swaps <b className="text-[#d8dbe5]">02</b>
                </span>
                <span>O(n log n)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 text-[#7f8188] text-xs inline-flex items-center gap-2.5 tracking-[0.03em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af] animate-pulse-dot" />
          Scroll to explore
        </div>
      </section>
    </>
  );
};

export default Hero;
