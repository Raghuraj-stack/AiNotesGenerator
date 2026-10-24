import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { FaCheckCircle, FaGem } from "react-icons/fa";
import { getCurrentUser } from "../services/api.js";

function PaymentSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [checking, setChecking] = useState(true);

  // Credit before the webhook ran, and the latest credit (refs avoid stale values)
  const initialCredit = useRef(userData?.credit ?? 0);
  const latestCredit = useRef(userData?.credit ?? 0);
  latestCredit.current = userData?.credit ?? 0;

  // The Stripe webhook can arrive a moment after the redirect,
  // so refresh the user a few times until the credits increase.
  useEffect(() => {
    let stopped = false;

    const refresh = async () => {
      for (let attempt = 0; attempt < 6 && !stopped; attempt++) {
        await getCurrentUser(dispatch);
        await new Promise((r) => setTimeout(r, 2000));
        if (latestCredit.current > initialCredit.current) break;
      }
      if (!stopped) setChecking(false);
    };

    refresh();
    return () => {
      stopped = true;
    };
  }, [dispatch]);

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
          <FaCheckCircle className="text-green-400" size={72} />
        </motion.div>

        <h1 className="mt-6 text-3xl font-bold">Payment Successful</h1>
        <p className="mt-2 text-white/70">
          Thank you! Your credits have been added to your account.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2">
          <FaGem className="text-sky-400" size={14} />
          <span className="font-semibold">{userData?.credit ?? 0} credits</span>
        </div>

        {checking && (
          <p className="mt-3 text-xs text-white/50">Updating your balance...</p>
        )}

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/notes")}
            className="w-full rounded-full bg-indigo-500 py-3 font-semibold hover:bg-indigo-400 transition cursor-pointer"
          >
            Generate Notes
          </button>
          <button
            onClick={() => navigate("/history")}
            className="w-full rounded-full bg-white/10 py-3 font-semibold hover:bg-white/20 transition cursor-pointer"
          >
            View My Notes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;