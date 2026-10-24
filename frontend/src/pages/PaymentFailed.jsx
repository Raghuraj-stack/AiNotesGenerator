import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FaTimesCircle } from "react-icons/fa";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-md rounded-3xl bg-black/90 text-white border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 15 }}
          className="flex justify-center"
        >
          <FaTimesCircle className="text-red-400" size={72} />
        </motion.div>

        <h1 className="mt-6 text-3xl font-bold">Payment Not Completed</h1>
        <p className="mt-2 text-white/70">
          Your payment was cancelled or could not be processed, and no credits
          were added.
        </p>
        <p className="mt-2 text-xs text-white/50">
          If money was deducted from your account, please contact support with
          your payment details.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/pricing")}
            className="w-full rounded-full bg-indigo-500 py-3 font-semibold hover:bg-indigo-400 transition cursor-pointer"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full rounded-full bg-white/10 py-3 font-semibold hover:bg-white/20 transition cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentFailed;