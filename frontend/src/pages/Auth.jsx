import React from 'react'
import { motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import { serverUrl } from '../App.jsx'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
  try {
    const response = await signInWithPopup(auth , provider) 
    const User = response.user
    const name = User.displayName
    const email = User.email

    const result = await axios.post(serverUrl + '/api/auth/google' , {
      name , email
    },{withCredentials:true})

    dispatch(setUserData(result.data))
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className='min-h-screen lg:h-screen flex flex-col overflow-x-hidden lg:overflow-hidden bg-white text-black px-8'>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-7xl mx-auto mt-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 shadow-gray-900'
      >
        <h1 className='text-2xl font-bold text-white'>ExamNotesAi</h1>
        <p className='text-sm text-white/80'>Ai powered exam notes generation</p>
      </motion.header>

      <main className='flex-1 min-h-0 w-full max-w-7xl mx-auto px-2 py-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
        {/* LEFT: Hero */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-black/80'>
            Unlock Smart <br />
            <span className='bg-linear-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent'>
              AI Notes
            </span>
          </h1>

          <motion.button onClick={handleGoogleAuth}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='mt-6 px-6 py-2.5 rounded-xl bg-linear-to-br from-black/90 via-black/80 to-black/70 text-white font-semibold text-base shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center gap-3'
          >
            <img
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              alt='google'
              className='w-5 h-5'
            />
            Continue with Google
          </motion.button>

          <p className='mt-5 text-base text-gray-500 max-w-md'>
            You get <span className='font-semibold text-gray-700'>50 FREE credits</span> to create
            exam notes, project notes, charts, graphs and download clean PDFs — instantly using AI.
          </p>

          <p className='mt-3 text-xs text-gray-400'>
            Start with 50 free credits • Upgrade anytime for more credits • Instant access
          </p>
        </motion.div>

        {/* RIGHT: Features */} 
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className='grid grid-cols-1 sm:grid-cols-2 gap-4'
        >
          <Feature
            icon='🎁'
            title='50 Free Credits'
            desc='Start with 50 credits to generate notes without paying.'
          />
          <Feature
            icon='📘'
            title='Exam Notes'
            desc='High-yield, revision-ready exam-oriented notes.'
          />
          <Feature
            icon='📁'
            title='Project Notes'
            desc='Well-structured documentation for assignments & projects.'
          />
          <Feature
            icon='📊'
            title='Charts & Graphs'
            desc='Auto-generated diagrams, charts and flow graphs.'
          />
          <Feature
            icon='⬇️'
            title='Free PDF Download'
            desc='Download clean, printable PDFs instantly.'
          />
        </motion.div>
      </main>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className='rounded-2xl p-4 bg-linear-to-br from-black/90 via-black/80 to-black/70 backdrop-blur-xl border border-white/10 text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
    >
      <div className='text-3xl mb-2'>{icon}</div>
      <h3 className='text-base font-semibold mb-1'>{title}</h3>
      <p className='text-xs text-gray-300 leading-relaxed'>{desc}</p>
    </motion.div>
  )
}

export default Auth