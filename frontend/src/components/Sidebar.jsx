const LEVELS = [
  { key: "high",   stars: 3, label: "High Priority" },
  { key: "medium", stars: 2, label: "Medium Priority" },
  { key: "low",    stars: 1, label: "Low Priority" },
];

const Card = ({ title, tone, children }) => (
  <div className={`mb-4 rounded-xl border p-3 ${tone}`}>
    {title && <h4 className="mb-2 text-sm font-semibold">{title}</h4>}
    {children}
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
    {items.map((it, i) => <li key={i}>{it}</li>)}
  </ul>
);

function Sidebar({ result }) {
  const data = result?.data ?? result;   // works with {data, noteId, creditsLeft} or the inner object
  if (!data) return null;

  const { subTopics = [], questions } = data;
  const diagramQs = Array.isArray(questions?.diagram)
    ? questions.diagram
    : [questions?.diagram].filter(Boolean);

  return (
    <aside className="h-fit w-full shrink-0 rounded-2xl bg-white p-4 shadow-lg lg:sticky lg:top-4 lg:w-72">
      <h3 className="mb-4 text-lg font-bold text-indigo-700">📌 Quick Exam View</h3>

      {subTopics.length > 0 && (
        <>
          <p className="mb-3 text-sm font-semibold text-gray-800">⭐ Sub Topics (Priority Wise)</p>
          {LEVELS.map(({ key, stars, label }) => {
            const items = subTopics.filter((s) => s.importance?.toLowerCase() === key);
            if (!items.length) return null;
            return (
              <Card key={key} tone="border-gray-200 bg-gray-50">
                <p className="mb-2 text-sm font-semibold text-amber-600">
                  {"⭐".repeat(stars)} {label}
                </p>
                <List items={items.map((s) => s.title)} />
              </Card>
            );
          })}
        </>
      )}

      {questions && (
        <Card tone="border-amber-200 bg-amber-50">
          <p className="mb-2 font-semibold text-gray-800">❓ Important Questions</p>
          {questions.short?.length > 0 && (
            <Card title="Short Questions" tone="border-blue-200 bg-blue-50 text-blue-900">
              <List items={questions.short} />
            </Card>
          )}
          {questions.long?.length > 0 && (
            <Card title="Long Questions" tone="border-purple-200 bg-purple-50 text-purple-900">
              <List items={questions.long} />
            </Card>
          )}
          {diagramQs.length > 0 && (
            <Card title="Diagram Question" tone="border-sky-200 bg-sky-50 text-sky-900">
              <List items={diagramQs} />
            </Card>
          )}
        </Card>
      )}
    </aside>
  );
}

export default Sidebar;