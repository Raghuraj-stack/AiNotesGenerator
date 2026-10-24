
import { FaBook, FaFolderOpen, FaChartBar, FaDownload } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaBook className="text-sky-400" size={28} />,
    title: "Exam Notes",
    desc: "High-yield exam-oriented notes with revision points.",
  },
  {
    icon: <FaFolderOpen className="text-amber-400" size={28} />,
    title: "Project Notes",
    desc: "Well-structured content for assignments and projects.",
  },
  {
    icon: <FaChartBar className="text-pink-400" size={28} />,
    title: "Diagrams",
    desc: "Auto-generated visual diagrams for clarity.",
  },
  {
    icon: <FaDownload className="text-blue-400" size={28} />,
    title: "PDF Download",
    desc: "Download clean, printable PDFs instantly.",
  },
];

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-44 md:grid-cols-2">
        <div>
          <h1 className="bg-linear-to-b from-neutral-900 to-neutral-600 bg-clip-text text-5xl font-extrabold leading-tight text-transparent md:text-6xl">
            Create Smart AI Notes in Seconds
          </h1>
          <p className="mt-6 max-w-md text-lg text-gray-500">
            Generate exam-focused notes, project documentation, flow diagrams
            and revision-ready content using AI — faster, cleaner and smarter.
          </p>
          <button onClick={()=>{navigate("/notes")}} className="mt-8 rounded-xl bg-linear-to-b from-neutral-800 to-black px-8 py-4 font-semibold text-white shadow-[0_20px_30px_rgba(0,0,0,0.3)] transition hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Replace src with your own illustration */}
        <img
          src="/student.jpg"
          alt="Two students studying on laptops"
          className="mx-auto w-full max-w-lg"
        />
      </section>

      {/* Feature cards */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl bg-linear-to-b from-neutral-800 to-neutral-950 p-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition hover:-translate-y-2"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-gray-300">{f.desc}</p>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
};

export default Home;