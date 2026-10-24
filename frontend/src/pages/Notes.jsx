// import React, { useState } from "react";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaGem } from "react-icons/fa";
// import { FiPlus } from "react-icons/fi";
// import TopicForm from "../components/TopicForm.jsx";

// function Notes() {
//   const navigate = useNavigate();
//   const { userData } = useSelector((state) => state.user);

//   return (
//     <div className="min-h-screen lg:h-screen flex flex-col overflow-x-hidden lg:overflow-hidden bg-white text-black px-8">
//       <motion.header
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl"
//       >
//         <div className="cursor-pointer" onClick={() => navigate("/")}>
//           <h1 className="text-2xl font-bold text-white">ExamNotes AI</h1>
//           <p className="text-sm text-white/80">AI-powered exam-oriented notes &amp; revision</p>
//         </div>

//         <div className="flex gap-2">
//           <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
//             <FaGem className="text-sky-400" size={14} />
//             <span className="text-sm font-medium">{userData?.credit}</span>
//             <button
//               onClick={() => navigate("/pricing")}
//               className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-indigo-600"
//               aria-label="Buy credits"
//             >
//               <FiPlus size={14} />
//             </button>
//           </div>

//           <button
//             onClick={() => navigate("/history")}
//             className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
//           >
//            📚 Your Notes
//           </button>
//         </div>
//       </motion.header>

//       <TopicForm/>
//     </div>
//   );
// }

// export default Notes;

import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGem } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import TopicFrom from "../components/TopicForm.jsx"
import FinalResult from "../components/FinalResult.jsx";
import Sidebar from "../components/Sidebar.jsx";


function Notes() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [result, setResult] = useState(null);
  const [loading, setloading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-black px-8 pb-10">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl"
      >
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold text-white">ExamNotes AI</h1>
          <p className="text-sm text-white/80">AI-powered exam-oriented notes &amp; revision</p>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
            <FaGem className="text-sky-400" size={14} />
            <span className="text-sm font-medium">{userData?.credit}</span>
            <button
              onClick={() => navigate("/pricing")}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-indigo-600"
              aria-label="Buy credits"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <button
            onClick={() => navigate("/history")}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      <TopicFrom setResult={setResult} setloading={setloading} loading={loading} />

{result && (
  <div className="mx-auto mt-8 flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
    <Sidebar result={result} />
    <FinalResult result={result} />
  </div>
)}
    </div>
  );
}

export default Notes;