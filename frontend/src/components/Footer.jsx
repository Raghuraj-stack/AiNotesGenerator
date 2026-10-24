import { FaGem } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="px-4 pb-6 md:px-6">
      <div className="grid gap-8 rounded-2xl bg-linear-to-b from-neutral-800 to-neutral-950 px-8 py-8 text-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] md:grid-cols-3 md:px-10">
        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
              <FaGem size={14} />
            </div>
            <span className="text-lg font-medium">ExamNotes AI</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-gray-300">
            ExamNotes AI helps students generate exam-focused notes, revision
            material, diagrams, and printable PDFs using AI.
          </p>
        </div>

        {/* Quick links */}
        <div className="text-center">
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/notes" className="hover:text-white">Notes</a></li>
            <li><a href="/history" className="hover:text-white">History</a></li>
          </ul>
        </div>

        {/* Spacer column (keeps links centered like the design) */}
        <div className="hidden md:block" />
      </div>
    </footer>
  );
};

export default Footer;