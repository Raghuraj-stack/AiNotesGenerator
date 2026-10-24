// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { FaGem } from "react-icons/fa";
// // import { FiPlus } from "react-icons/fi";
// // import { AnimatePresence, motion } from "motion/react";
// // import axios from "axios"
// // import {serverUrl} from "../App.jsx"
// // import { RxHamburgerMenu } from "react-icons/rx";
// // function History() {
// //   const [topics, setTopics] = useState([]);
// //   const [isSideBarOpen, setisSideBarOpen] = useState(false)
// //   const navigate = useNavigate()
// //   const {userData} = useSelector((state)=>state.user)

// // useEffect(() => {
// //   const myNotes = async () => {
// //     try {
// //       const res = await axios.get(serverUrl + "/api/notes/get-my-notes", {
// //         withCredentials: true,
// //       });
// //       console.log(res.data);
// //       setTopics(Array.isArray(res.data) ? res.data : []);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   myNotes();
// // }, []);
// //   return (
// //     <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-black px-8 pb-10">
// //       <motion.header
// //         initial={{ opacity: 0, y: -10 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //         className="w-full flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl"
// //       >
// //         <div className="cursor-pointer" onClick={() => navigate("/")}>
// //           <h1 className="text-2xl font-bold text-white">ExamNotes AI</h1>
// //           <p className="text-sm text-white/80">AI-powered exam-oriented notes &amp; revision</p>
// //         </div>

// //         <div className="flex gap-3 items-center justify-center">
// //           <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white">
// //             <FaGem className="text-sky-400" size={14} />
// //             <span className="text-sm font-medium">{userData?.credit}</span>
// //             <button
// //               onClick={() => navigate("/pricing")}
// //               className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-indigo-600"
// //               aria-label="Buy credits"
// //             >
// //               <FiPlus size={14} />
// //             </button>
// //           </div>
// //           <div>
// //             <button onClick={()=>{setisSideBarOpen(true)}} className='lg:hidden cursor-pointer text-2xl text-whit rounded-full text-white bg-white/10 px-3 py-2'>
// //           <RxHamburgerMenu size={16}/>
// //             </button>
// //           </div>
// //         </div>
// //       </motion.header>
      

// //       <div className='grid grid-col-1 lg:grid-cols-4 gap-6'>
// //       <AnimatePresence>
// //         {(isSideBarOpen || window.innerWidth >= 1024) && 
// //         <motion.div
// //         initial={{ x: -320 }}
// //   animate={{ x: 0 }}
// //   exit={{ x: -320 }}
// //   transition={{ type: "spring", stiffness: 260, damping: 30 }}
// //   className={`fixed lg:static
// //     top-0 left-0 z-50 lg:z-auto
// //     w-72 lg:w-auto
// //     h-full lg:h-[75vh]
// //     lg:col-span-1
// //     rounded-3xl
// //     bg-black/90 lg:bg-black/80
// //     backdrop-blur-xl
// //     border border-white/10
// //     shadow-[0_20px_45px_rgba(0,0,0,0.6)]
// //     p-5
// //     overflow-y-auto`}
// //         >
// //           <button onClick={()=>{setisSideBarOpen(false)}} className='lg:hidden cursor-pointer text-2xl text-whit rounded-full text-white bg-white/10 px-3 py-2'>
// //           <RxHamburgerMenu size={16}/>
// //           </button>

// //           <div className='flex flex-col gap-4 mt-4'>
// //             <button className='flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20'>
// //               <span className="cursor-pointer text-sm font-medium">➕ Add Notes</span>
// //             </button>
// //             <div className='flex flex-col gap-2'>
// //               <h3 className="text-lg font-bold text-white">📚 Your Notes</h3>
// //               <p className="text-sm text-white/80">Manage your notes and revisions</p>
// //             </div>
// //           </div>


// //           <div className='flex flex-col gap-2 mt-4 space-y-2'>
// //             {topics.map((topic) => (
// //               <div key={topic._id} className='flex flex-col gap-1 rounded-3xl bg-white/10 px-4 py-3 text-white cursor-pointer'>
// //                 <h4 className="text-md font-semibold text-white">{topic.topic}</h4>
// //                 <div className='flex items-center gap-2'>
// //                   <span className="text-sm text-white/80">{topic.createdAt.slice(0,10)}</span>
// //                   <span className="text-sm text-white/80 ml-2">{topic.createdAt.slice(11,16)}</span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>





// //         </motion.div>
// //       }
// //       </AnimatePresence>
// //       </div>
// //     </div>
// //   )
// // }

// // export default History

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { FaGem } from "react-icons/fa";
// import { FiPlus } from "react-icons/fi";
// import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
// import { AnimatePresence, motion } from "motion/react";
// import axios from "axios";
// import { serverUrl } from "../App.jsx";

// function History() {
//   const [topics, setTopics] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
//   const navigate = useNavigate();
//   const { userData } = useSelector((state) => state.user);

//   // Fetch the user's saved notes
//   useEffect(() => {
//     const myNotes = async () => {
//       try {
//         const res = await axios.get(serverUrl + "/api/notes/get-my-notes", {
//           withCredentials: true,
//         });
//         setTopics(Array.isArray(res.data) ? res.data : []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     myNotes();
//   }, []);

//   // Keep the sidebar in sync when the window is resized
//   useEffect(() => {
//     const onResize = () => setIsDesktop(window.innerWidth >= 1024);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   const selectedNote = topics.find((t) => t._id === selectedId);

//   return (
//     <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-black px-8 pb-10">
//       {/* Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl"
//       >
//         <div className="cursor-pointer" onClick={() => navigate("/")}>
//           <h1 className="text-2xl font-bold text-white">ExamNotes AI</h1>
//           <p className="text-sm text-white/80">
//             AI-powered exam-oriented notes &amp; revision
//           </p>
//         </div>

//         <div className="flex gap-3 items-center justify-center">
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
//             onClick={() => setIsSideBarOpen(true)}
//             className="lg:hidden cursor-pointer text-2xl rounded-full text-white bg-white/10 px-3 py-2"
//             aria-label="Open sidebar"
//           >
//             <RxHamburgerMenu size={16} />
//           </button>
//         </div>
//       </motion.header>

//       {/* Layout: sidebar + content */}
//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto w-full">
//         <AnimatePresence>
//           {(isSideBarOpen || isDesktop) && (
//             <motion.div
//               initial={{ x: -320 }}
//               animate={{ x: 0 }}
//               exit={{ x: -320 }}
//               transition={{ type: "spring", stiffness: 260, damping: 30 }}
//               className="fixed lg:static
//                 top-0 left-0 z-50 lg:z-auto
//                 w-72 lg:w-auto
//                 h-full lg:h-[75vh]
//                 lg:col-span-1
//                 rounded-3xl
//                 bg-black/90 lg:bg-black/80
//                 backdrop-blur-xl
//                 border border-white/10
//                 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
//                 p-5
//                 overflow-y-auto"
//             >
//               <button
//                 onClick={() => setIsSideBarOpen(false)}
//                 className="lg:hidden cursor-pointer text-2xl rounded-full text-white bg-white/10 px-3 py-2"
//                 aria-label="Close sidebar"
//               >
//                 <RxCross2 size={16} />
//               </button>

//               <div className="flex flex-col gap-4 mt-4">
//                 <button
//                   onClick={() => navigate("/notes")}
//                   className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 cursor-pointer"
//                 >
//                   <span className="text-sm font-medium">➕ Add Notes</span>
//                 </button>

//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-lg font-bold text-white">📚 Your Notes</h3>
//                   <p className="text-sm text-white/80">
//                     Manage your notes and revisions
//                   </p>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 mt-4">
//                 {topics.length === 0 && (
//                   <p className="text-sm text-white/60">No notes yet.</p>
//                 )}

//                 {topics.map((topic) => (
//                   <div
//                     key={topic._id}
//                     onClick={() => {
//                       setSelectedId(topic._id);
//                       setIsSideBarOpen(false);
//                     }}
//                     className={`flex flex-col gap-1 rounded-3xl px-4 py-3 text-white cursor-pointer transition ${
//                       selectedId === topic._id
//                         ? "bg-white/25"
//                         : "bg-white/10 hover:bg-white/20"
//                     }`}
//                   >
//                     <h4 className="text-md font-semibold text-white">
//                       {topic.topic}
//                     </h4>
//                     <span className="text-sm text-white/80">
//                       {new Date(topic.createdAt).toLocaleString("en-IN", {
//                         dateStyle: "medium",
//                         timeStyle: "short",
//                       })}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Content panel */}
//         <div className="lg:col-span-3 rounded-3xl bg-white shadow-xl border border-black/10 p-6 min-h-[75vh]">
//           {selectedNote ? (
//             <div>
//               <h2 className="text-2xl font-bold">{selectedNote.topic}</h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 {selectedNote.classLevel && `${selectedNote.classLevel} • `}
//                 {selectedNote.examType}
//               </p>
//               {/* Show the full generated notes here once your backend returns
//                   the note content (e.g. with <FinalResult result={...} />) */}
//             </div>
//           ) : (
//             <div className="h-full flex items-center justify-center text-gray-400">
//               Select a note from the sidebar to view it
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default History;


import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { serverUrl } from "../App.jsx";

const badgeStyle = {
  high: "bg-red-100 text-red-700",
  medium: "bg-yellow-100 text-yellow-700",
  low: "bg-green-100 text-green-700",
};

function History() {
  const [topics, setTopics] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [note, setNote] = useState(null);
  const [noteLoading, setNoteLoading] = useState(false);
  const [noteError, setNoteError] = useState("");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  // Fetch the list of saved notes
  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/get-my-notes", {
          withCredentials: true,
        });
        setTopics(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.log(error);
      }
    };
    myNotes();
  }, []);

  // Keep the sidebar in sync with window size
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fetch the full note whenever a note is selected
  useEffect(() => {
    if (!selectedId) return;

    let ignore = false; // ignores stale responses if the user clicks quickly
    const fetchNote = async () => {
      try {
        setNoteLoading(true);
        setNoteError("");
        setNote(null);

        const res = await axios.get(serverUrl + `/api/notes/${selectedId}`, {
          withCredentials: true,
        });

        if (ignore) return;

        // content may be saved as an object or as a JSON string
        let content = res.data.content;
        if (typeof content === "string") {
          try {
            content = JSON.parse(content);
          } catch {
            content = { notes: content };
          }
        }
        setNote({ ...res.data, content });
      } catch (error) {
        if (!ignore) {
          console.log(error);
          setNoteError("Could not load this note.");
        }
      } finally {
        if (!ignore) setNoteLoading(false);
      }
    };

    fetchNote();
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  const content = note?.content;

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-black px-8 pb-10">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-xl"
      >
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold text-white">ExamNotes AI</h1>
          <p className="text-sm text-white/80">
            AI-powered exam-oriented notes &amp; revision
          </p>
        </div>

        <div className="flex gap-3 items-center justify-center">
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
            onClick={() => setIsSideBarOpen(true)}
            className="lg:hidden cursor-pointer text-2xl rounded-full text-white bg-white/10 px-3 py-2"
            aria-label="Open sidebar"
          >
            <RxHamburgerMenu size={16} />
          </button>
        </div>
      </motion.header>

      {/* Layout: sidebar + content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6 max-w-7xl mx-auto w-full">
        <AnimatePresence>
          {(isSideBarOpen || isDesktop) && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed lg:static
                top-0 left-0 z-50 lg:z-auto
                w-72 lg:w-auto
                h-full lg:h-[75vh]
                lg:col-span-1
                rounded-3xl
                bg-black/90 lg:bg-black/80
                backdrop-blur-xl
                border border-white/10
                shadow-[0_20px_45px_rgba(0,0,0,0.6)]
                p-5
                overflow-y-auto"
            >
              <button
                onClick={() => setIsSideBarOpen(false)}
                className="lg:hidden cursor-pointer text-2xl rounded-full text-white bg-white/10 px-3 py-2"
                aria-label="Close sidebar"
              >
                <RxCross2 size={16} />
              </button>

              <div className="flex flex-col gap-4 mt-4">
                <button
                  onClick={() => navigate("/notes")}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 cursor-pointer"
                >
                  <span className="text-sm font-medium">➕ Add Notes</span>
                </button>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-white">📚 Your Notes</h3>
                  <p className="text-sm text-white/80">
                    Manage your notes and revisions
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {topics.length === 0 && (
                  <p className="text-sm text-white/60">No notes yet.</p>
                )}

                {topics.map((topic) => (
                  <div
                    key={topic._id}
                    onClick={() => {
                      setSelectedId(topic._id);
                      setIsSideBarOpen(false);
                    }}
                    className={`flex flex-col gap-1 rounded-3xl px-4 py-3 text-white cursor-pointer transition ${
                      selectedId === topic._id
                        ? "bg-white/25"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <h4 className="text-md font-semibold text-white">
                      {topic.topic}
                    </h4>
                    <span className="text-sm text-white/80">
                      {new Date(topic.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content panel */}
        <div className="lg:col-span-3 rounded-3xl bg-white shadow-xl border border-black/10 p-6 min-h-[75vh]">
          {!selectedId && (
            <div className="h-full min-h-[60vh] flex items-center justify-center text-gray-400">
              Select a note from the sidebar to view it
            </div>
          )}

          {selectedId && noteLoading && (
            <p className="text-gray-500">Loading notes...</p>
          )}

          {selectedId && noteError && (
            <p className="text-red-600">{noteError}</p>
          )}

          {note && content && (
            <div className="space-y-8">
              {/* Title */}
              <div>
                <h2 className="text-3xl font-bold">{note.topic}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(note.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              {/* Detailed notes */}
              {Array.isArray(content.subTopics) && content.subTopics.length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-purple-700 mb-3">
                    📝 Detailed Notes
                  </h3>
                  <div className="space-y-4">
                    {content.subTopics.map((t, i) => (
                      <div
                        key={i}
                        className="rounded-2xl border border-black/10 p-5"
                      >
                        <div className="flex items-center justify-between border-b pb-2 mb-3">
                          <h4 className="text-lg font-semibold text-indigo-700">
                            {i + 1}. {t.title}
                          </h4>
                          {t.importance && (
                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                badgeStyle[String(t.importance).toLowerCase()] ||
                                "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {t.importance}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {t.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Plain notes string, if your data has one */}
              {typeof content.notes === "string" && content.notes && (
                <section>
                  <h3 className="text-xl font-bold text-purple-700 mb-3">
                    📝 Notes
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {content.notes}
                  </p>
                </section>
              )}

              {/* Revision points */}
              {Array.isArray(content.revisionPoints) &&
                content.revisionPoints.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-green-700 mb-3">
                      ⚡ Revision Points
                    </h3>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      {content.revisionPoints.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </section>
                )}

              {/* Questions */}
              {content.questions && (
                <section>
                  <h3 className="text-xl font-bold text-orange-700 mb-3">
                    ❓ Important Questions
                  </h3>

                  {Array.isArray(content.questions.short) &&
                    content.questions.short.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-1">Short Questions</h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                          {content.questions.short.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {Array.isArray(content.questions.long) &&
                    content.questions.long.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-1">Long Questions</h4>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                          {content.questions.long.map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {content.questions.diagram && (
                    <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4">
                      <h4 className="font-semibold mb-1">Diagram Question</h4>
                      <p className="text-gray-700">{content.questions.diagram}</p>
                    </div>
                  )}
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;