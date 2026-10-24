// import { useState } from "react";
// import { motion } from "motion/react";
// import { generateNotes } from "../services/api";

// function Toggle({ label, checked, onChange }) {
//   return (
//     <label className="flex cursor-pointer items-center gap-3 select-none">
//       <input
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//         className="peer sr-only"
//       />
//       {/* track + knob */}
//       <span className="relative h-6 w-11 rounded-full bg-black/60 ring-1 ring-white/10 transition peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
//       <span className="text-xs text-white/70">{label}</span>
//     </label>
//   );
// }

// const inputClass =
//   "w-full rounded-xl bg-black/50 px-4 py-3 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/5 transition focus:ring-white/30";

// function TopicForm() {
//   const [result, setResult] = useState(null)
//   const [loading, setloading] = useState(false)
//   const [error, setError] = useState("");
//   const [topic, setTopic] = useState("");
//   const [classLevel, setClassLevel] = useState("");
//   const [examType, setExamType] = useState("");
//   const [revisionMode, setRevisionMode] = useState(false);
//   const [includeDiagram, setIncludeDiagram] = useState(false);
//   const [includeCharts, setIncludeCharts] = useState(false);

//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     if(!topic.trim())
//     {
//       setError("Please enter the topic")
//       return;
//     }
//     setError("")
//     setloading(true)
//     setResult(null)
//     try {
//   const data = await generateNotes({
//     topic: topic.trim(),
//     classLevel,
//     examType,
//     revisionMode,
//     includeDiagram,
//     includeCharts,
//   });
//   setResult(data);
// } catch (err) {
//   console.error("generateNotes failed:", err);
//   setError(err.response?.data?.message || "Failed to generate notes");
// } finally {
//   setloading(false);
// }
//   }

//   return (
//     <motion.form
//       onSubmit={handleSubmit}
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.1 }}
//       className="mx-auto mt-8 w-full max-w-7xl space-y-4 rounded-2xl border border-white/10 bg-linear-to-b from-neutral-800 to-neutral-950 p-6 shadow-2xl"
//     >
//       <input
//         type="text"
//         value={topic}
//         onChange={(e) => setTopic(e.target.value)}
//         placeholder="Enter topic (e.g. Web Development)"
//         className={inputClass}
//       />
//       <input
//         type="text"
//         value={classLevel}
//         onChange={(e) => setClassLevel(e.target.value)}
//         placeholder="Class / Level (e.g. Class 10)"
//         className={inputClass}
//       />
//       <input
//         type="text"
//         value={examType}
//         onChange={(e) => setExamType(e.target.value)}
//         placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
//         className={inputClass}
//       />

//       <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-1">
//         <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={setRevisionMode} />
//         <Toggle label="Include Diagram" checked={includeDiagram} onChange={setIncludeDiagram} />
//         <Toggle label="Include Charts" checked={includeCharts} onChange={setIncludeCharts} />
//       </div>

// {error && <p className="text-sm text-red-400">{error}</p>}
//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading ? "Generating..." : "Generate Notes"}
//       </button>
//     </motion.form>
//   );
// }

// export default TopicForm;


import { useState } from "react";
import { motion } from "motion/react";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../redux/userSlice";

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      {/* track + knob */}
      <span className="relative h-6 w-11 rounded-full bg-black/60 ring-1 ring-white/10 transition peer-checked:bg-emerald-500 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
      <span className="text-xs text-white/70">{label}</span>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl bg-black/50 px-4 py-3 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/5 transition focus:ring-white/30";

// result + loading state live in Notes.jsx and arrive as props
function TopicForm({ setResult, setloading, loading = false }) {
  const [error, setError] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeCharts, setIncludeCharts] = useState(false);

const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      setError("Please enter the topic");
      return;
    }

    setError("");
    setloading(true);
    setResult(null);

    try {
      const data = await generateNotes({
        topic: topic.trim(),
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeCharts,
      });
      setResult(data);
      console.log(data)
      setTopic("")
      setClassLevel("")
      setExamType("")
      setIncludeCharts(false)
      setIncludeDiagram(false)
      setRevisionMode(false)

      if(typeof data.creditsLeft === "number"){
        dispatch(updateCredits(data.creditsLeft))
      }
    } catch (err) {
      console.log("generateNotes failed:", err);
      setError(err.response?.data?.message || "Failed to generate notes");
    } finally {
      setloading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto mt-8 w-full max-w-7xl space-y-4 rounded-2xl border border-white/10 bg-linear-to-b from-neutral-800 to-neutral-950 p-6 shadow-2xl"
    >
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter topic (e.g. Web Development)"
        className={inputClass}
      />
      <input
        type="text"
        value={classLevel}
        onChange={(e) => setClassLevel(e.target.value)}
        placeholder="Class / Level (e.g. Class 10)"
        className={inputClass}
      />
      <input
        type="text"
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
        className={inputClass}
      />

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-1">
        <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={setRevisionMode} />
        <Toggle label="Include Diagram" checked={includeDiagram} onChange={setIncludeDiagram} />
        <Toggle label="Include Charts" checked={includeCharts} onChange={setIncludeCharts} />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Generating..." : "Generate Notes"}
      </button>
    </motion.form>
  );
}

export default TopicForm;