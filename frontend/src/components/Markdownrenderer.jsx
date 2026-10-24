import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MermaidChart from "./MermaidChart";

function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (p) => (
          <h1 className="mb-4 border-b border-gray-300 pb-2 text-2xl font-bold text-indigo-700" {...p} />
        ),
        h2: (p) => <h2 className="mb-2 mt-6 text-xl font-semibold text-indigo-600" {...p} />,
        h3: (p) => <h3 className="mb-2 mt-4 text-lg font-semibold text-gray-800" {...p} />,
        p: (p) => <p className="my-3 leading-7 text-gray-700" {...p} />,
        ul: (p) => <ul className="my-3 list-disc space-y-1 pl-6 text-gray-700" {...p} />,
        ol: (p) => <ol className="my-3 list-decimal space-y-1 pl-6 text-gray-700" {...p} />,
        strong: (p) => <strong className="font-semibold text-gray-900" {...p} />,
        blockquote: (p) => (
          <blockquote className="my-4 border-l-4 border-indigo-400 bg-indigo-50 px-4 py-2 text-gray-700" {...p} />
        ),
        table: (p) => (
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full border border-gray-200 text-sm" {...p} />
          </div>
        ),
        th: (p) => <th className="border border-gray-200 bg-indigo-50 px-3 py-2 text-left font-semibold" {...p} />,
        td: (p) => <td className="border border-gray-200 px-3 py-2" {...p} />,
        // ```mermaid blocks inside the markdown become real diagrams
        code({ inline, className, children, ...props }) {
          const lang = /language-(\w+)/.exec(className || "")?.[1];
          const text = String(children).replace(/\n$/, "");

          if (!inline && lang === "mermaid") {
            return (
              <div className="my-4 rounded-lg border border-gray-300 bg-white p-4">
                <MermaidChart chart={text} />
              </div>
            );
          }
          if (!inline && lang) {
            return (
              <pre className="my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
                <code>{text}</code>
              </pre>
            );
          }
          return (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-pink-600" {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;