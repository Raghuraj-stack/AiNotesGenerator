import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { FaGem } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import {serverUrl} from "../App.jsx";
import axios from "axios";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 100,
    credits: 100,
    tag: null,
    features: ["100 credits", "Generate exam notes", "Download as PDF"],
  },
  {
    id: "popular",
    name: "Popular",
    price: 200,
    credits: 250,
    tag: "Most Popular",
    features: ["250 credits", "25% extra credits", "Generate exam notes", "Download as PDF"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 500,
    credits: 1000,
    tag: "Best Value",
    features: ["1000 credits", "2x credits for your money", "Generate exam notes", "Download as PDF"],
  },
];

function Pricing() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handleBuy = async (plan) => {
  try {
    setLoadingPlan(plan.id);

    const result = await axios.post(
      serverUrl + "/api/credit/order",
      { amount: plan.price }, 
      { withCredentials: true }
    );

    if (result.data?.url) {
      window.location.href = result.data.url;
    }
  } catch (error) {
    console.log(error);
    alert("Could not start payment. Please try again.");
  } finally {
    setLoadingPlan(null);
  }
};

  return (
    <div className="min-h-screen bg-white text-black px-6 pb-16">
      
      <div className="max-w-6xl mx-auto mt-4 flex items-center justify-between rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white cursor-pointer"
        >
          <IoArrowBack size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
          <FaGem className="text-sky-400" size={14} />
          <span className="text-sm font-medium">{userData?.credit ?? 0}</span>
        </div>
      </div>

    
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-12"
      >
        <h1 className="text-4xl font-bold">Buy Credits</h1>
        <p className="text-gray-500 mt-2">
          Choose a plan that fits you. Credits never expire.
        </p>
      </motion.div>

      
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => {
          const highlighted = plan.id === "popular";
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-8 flex flex-col shadow-xl ${
                highlighted
                  ? "bg-black text-white border-2 border-indigo-500"
                  : "bg-black/90 text-white border border-white/10"
              }`}
            >
              {plan.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-4 py-1 text-xs font-semibold text-white">
                  {plan.tag}
                </span>
              )}

              <h2 className="text-xl font-semibold">{plan.name}</h2>

              <div className="mt-4 flex items-end gap-1">
                <span className="text-5xl font-bold">₹{plan.price}</span>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 w-fit">
                <FaGem className="text-sky-400" size={14} />
                <span className="text-sm font-medium">{plan.credits} credits</span>
              </div>

              <p className="mt-2 text-xs text-white/60">
                ₹{(plan.price / plan.credits).toFixed(2)} per credit
              </p>

              <ul className="mt-6 space-y-2 text-sm text-white/80 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(plan)}
                disabled={loadingPlan === plan.id}
                className={`mt-8 w-full rounded-full py-3 font-semibold cursor-pointer transition disabled:opacity-60 ${
                  highlighted
                    ? "bg-indigo-500 text-white hover:bg-indigo-400"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {loadingPlan === plan.id ? "Processing..." : `Buy for ₹${plan.price}`}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;