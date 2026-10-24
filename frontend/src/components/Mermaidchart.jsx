import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
  flowchart: { useMaxWidth: true, htmlLabels: true },
});

let counter = 0;

// Fix AI output: literal "\\n" -> real newline, strip ``` fences
const normalizeMermaid = (code = "") =>
  code
    .replace(/```mermaid/gi, "")
    .replace(/```/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "  ")
    .trim();

function MermaidChart({ chart }) {
  const ref = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chart || !ref.current) return;
    let cancelled = false;
    const id = `mermaid-${Date.now()}-${counter++}`;

    mermaid
      .render(id, normalizeMermaid(chart))
      .then(({ svg }) => {
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setError(false);
        }
      })
      .catch((err) => {
        console.error("Mermaid error:", err);
        // mermaid leaves a stray error node in the DOM, remove it
        document.getElementById("d" + id)?.remove();
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Diagram could not be rendered. Raw diagram code:
        {"\n\n"}
        {chart}
      </pre>
    );
  }

  return <div ref={ref} className="flex justify-center overflow-x-auto" />;
}

export default MermaidChart;