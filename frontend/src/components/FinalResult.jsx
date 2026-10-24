import { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import MarkdownRenderer from "./Markdownrenderer";
import MermaidChart from "./Mermaidchart";
import RechartSetUp from "./Rechartsetup";
import { downloadPdf } from "../services/api";

const BADGE = {
  high:   "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low:    "bg-green-100 text-green-700",
};

const SectionTitle = ({ icon, children, className = "" }) => (
  <div className={`mb-4 mt-8 rounded-lg px-4 py-3 text-lg font-semibold ${className}`}>
    {icon} {children}
  </div>
);

const Hint = ({ what }) => (
  <p className="mt-2 text-sm italic text-gray-500">
    ℹ️ If you need this {what} for future reference or revision, you can save it by taking a screenshot.
  </p>
);

const QuestionGroup = ({ title, items }) =>
  items?.length ? (
    <div className="mb-4">
      <h4 className="font-bold text-gray-900">{title}:</h4>
      <ul className="list-disc pl-6 text-gray-700">
        {items.map((q, i) => <li key={i} className="my-1">{q}</li>)}
      </ul>
    </div>
  ) : null;

// AI sometimes wraps mermaid in ```mermaid fences — strip them
const cleanMermaid = (code = "") =>
  code.replace(/```mermaid/gi, "").replace(/```/g, "").trim();

function FinalResult({ result }) {
  const [revision, setRevision] = useState(false);
  const pdfRef = useRef(null);

  const data = result?.data ?? result;   // works with {data, noteId, creditsLeft} or the inner object
  if (!data) return null;

  const { subTopics = [], revisionPoints = [], diagram, charts = [], questions } = data;
  const diagramCode = cleanMermaid(typeof diagram === "string" ? diagram : diagram?.data);

  

  return (
    <div className="min-w-0 flex-1 rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-bold text-indigo-700">📘 Generated Notes</h2>
        <div className="flex gap-3">
          {revisionPoints.length > 0 && (
            <button
              onClick={() => setRevision((r) => !r)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                revision
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
              }`}
            >
              {revision ? "Exit Revision Mode" : "Quick Revision (5 min)"}
            </button>
          )}
          <button
            onClick={()=>{downloadPdf(result)}}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            ⬇ Download PDF
          </button>
        </div>
      </div>

      <div ref={pdfRef}>
        {/* Revision mode */}
        {revision && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
            <h3 className="mb-3 text-lg font-semibold text-green-800">⚡ Exam Quick Revision Points</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-800">
              {revisionPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        )}

        {/* Detailed notes: one card per sub topic */}
        {!revision && subTopics.length > 0 && (
          <>
            <SectionTitle icon="📝" className="bg-purple-50 text-purple-800">Detailed Notes</SectionTitle>
            <div className="space-y-4">
              {subTopics.map((s, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
                    <h3 className="text-xl font-bold text-indigo-700">{i + 1}. {s.title}</h3>
                    {s.importance && (
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${BADGE[s.importance?.toLowerCase()] ?? "bg-gray-100 text-gray-700"}`}>
                        {s.importance}
                      </span>
                    )}
                  </div>
                  <MarkdownRenderer content={s.notes || ""} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Mermaid diagram */}
        {diagramCode && (
          <>
            <SectionTitle icon="📊" className="bg-cyan-50 text-cyan-800">
              {diagram?.title || "Diagram"}
            </SectionTitle>
            <div className="rounded-lg border border-gray-300 bg-white p-4">
              <MermaidChart chart={diagramCode} />
            </div>
            <Hint what="diagram" />
          </>
        )}

        {/* Recharts */}
        {charts.length > 0 && (
          <>
            <SectionTitle icon="📈" className="bg-indigo-50 text-indigo-800">Visual Charts</SectionTitle>
            <div className="space-y-6">
              {charts.map((c, i) => <RechartSetUp key={i} chart={c} />)}
            </div>
            <Hint what="Chart" />
          </>
        )}

        {/* Questions */}
        {questions && (
          <>
            <SectionTitle icon="❓" className="bg-rose-50 text-rose-700">Important Questions</SectionTitle>
            <QuestionGroup title="Short Questions" items={questions.short} />
            <QuestionGroup title="Long Questions" items={questions.long} />
            <QuestionGroup
              title="Diagram Question"
              items={Array.isArray(questions.diagram) ? questions.diagram : [questions.diagram].filter(Boolean)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FinalResult;
