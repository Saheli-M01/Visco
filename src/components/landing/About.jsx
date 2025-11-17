import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const About = () => {
  const features = [
    {
      lottie:
        "https://lottie.host/e3c1f17c-71f4-4714-9ded-27dfdfa2d897/rc2rjpOnqx.lottie",
      title: "Visual Learning",
      description: "Interactive animations that make algorithms clear.",
    },
    {
      lottie:
        "https://lottie.host/09bbc403-9bea-4a92-bd8a-4cd115d9fae4/ghIIgHxVi0.lottie",
      title: "Multi-Language Support",
      description: "Working examples in C#, Java, C++, JavaScript and Python.",
    },
    {
      lottie:
        "https://lottie.host/109462f3-39e8-4918-8bdf-60f2f7c43c60/GdKnzeal3X.lottie",
      title: "Detailed Learning",
      description: "Clear, step-by-step breakdowns for each algorithm.",
    },
    {
      lottie:
        "https://lottie.host/e5123c35-dd88-46e6-9aa3-542bc406628b/VzID18QIVS.lottie",
      title: "Interactive Controls",
      description: "Play, pause, and step through visualizations.",
    },
  ];

  return (
    <section className="relative px-4 py-6 md:py-16 md:px-6 bg-gradient-to-br from-emerald-50/50 via-amber-50 to-orange-50/50 overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.32) 1px, transparent 1px)`,
            backgroundSize: "3vw 3vw",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className=" rounded-3xl px-2 md:px-12 mb-4 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Making Algorithms{" "}
              <span className="text-gray-700">Accessible</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Visco makes learning algorithms easier with interactive
              visualizations and concise code examples.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-white backdrop-blur-xl rounded-3xl px-6 py-4  shadow-[0_14px_40px_rgba(2,6,23,0.12)] hover:shadow-[0_24px_60px_rgba(2,6,23,0.16)] ring-1 ring-gray-200/40 transition-transform transform-gpu hover:-translate-y-1 duration-300 h-full text-center">
                <div className="mx-auto mb-6 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100 p-2 shadow-inner">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <DotLottieReact src={feature.lottie} loop autoplay style={{ width: '100%', height: '100%' }} />
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed font-medium mb-4 md:mb-6">
                  {feature.description}
                </p>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
