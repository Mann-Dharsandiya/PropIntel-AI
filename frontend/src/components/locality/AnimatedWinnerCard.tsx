import { motion } from "framer-motion";

interface Props {
  winner: any;
}

export default function AnimatedWinnerCard({ winner }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.6,
      }}
      className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-10 shadow-2xl"
    >
      <div className="text-center">

        <div className="text-6xl mb-4">
          🏆
        </div>

        <h2 className="text-4xl font-bold">
          AI Winner
        </h2>

        <h1 className="text-5xl font-extrabold mt-5">
          {winner.locality}
        </h1>

        <div className="mt-8 grid md:grid-cols-4 gap-5">

          <div className="bg-white/10 rounded-xl p-5">
            <h4>Investment Score</h4>
            <p className="text-3xl font-bold">
              {winner.investmentScore}/10
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            <h4>AI Confidence</h4>
            <p className="text-3xl font-bold">
              96%
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            <h4>Risk</h4>
            <p className="text-3xl font-bold">
              Low
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-5">
            <h4>Expected ROI</h4>
            <p className="text-3xl font-bold">
              {(winner.priceGrowth * 1.25).toFixed(1)}%
            </p>
          </div>

        </div>

      </div>
    </motion.div>
  );
}