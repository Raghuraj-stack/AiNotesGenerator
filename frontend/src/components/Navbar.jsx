import { useState } from "react";
import { FaGem } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import {useNavigate} from "react-router-dom"
import {serverUrl} from "../App.jsx"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import axios from "axios";
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showCredits, setShowCredits] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const {userData} = useSelector((state)=>state.user)

  const handleSignOut =async ()=>{
try {
  await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
  dispatch(setUserData(null))
  navigate("/auth")
} catch (error) {
console.log(error)
}
  }


  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
      <nav className="mx-auto flex items-center justify-between rounded-2xl bg-linear-to-b from-neutral-800 to-neutral-950 px-6 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)] md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-white">
            <FaGem size={16} />
          </div>
          <h1 className="text-lg font-semibold text-white">
            ExamNotes <span className="font-normal text-gray-400">AI</span>
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Credits */}
          <div
            className="relative"
            onMouseEnter={() => setShowCredits(true)}
            onMouseLeave={() => setShowCredits(false)}
          >
            <button className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white transition hover:bg-white/15">
              <FaGem className="text-sky-400" size={14} />
              <span className="text-sm font-medium">{userData.credit}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-indigo-600">
                <FiPlus size={14} />
              </span>
            </button>

            {showCredits && (
              <div className="absolute right-0 top-full w-64 pt-3">
                <div className="rounded-xl bg-neutral-950 p-4 shadow-2xl ring-1 ring-white/10">
                  <h4 className="mb-1 text-sm font-semibold text-white">Buy Credits</h4>
                  <p className="mb-3 text-xs text-gray-400">
                    Use credits to generate AI notes, diagrams &amp; PDFs.
                  </p>
                  <button onClick={()=>{navigate("/pricing")}} className="w-full rounded-lg bg-white py-2 text-sm font-semibold text-black transition hover:bg-gray-200">
                    Buy More Credits
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Avatar + dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((s) => !s)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 font-medium text-white transition hover:bg-white/15"
            >
              A
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-4 w-56 rounded-2xl bg-neutral-950 p-3 shadow-2xl ring-1 ring-white/10">
                <button onClick={()=>{navigate("/history")}} className="w-full rounded-lg bg-white/10 px-4 py-3 text-left text-sm text-white transition hover:bg-white/15">
                  History
                </button>
                <button onClick={handleSignOut}  className="mt-1 w-full rounded-lg px-4 py-3 text-left text-sm text-red-400 transition hover:bg-white/5">
                  sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;