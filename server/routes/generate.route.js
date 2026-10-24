import express from "express"
import isAuth from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"
import { getMyNotes, getSingleNote } from "../controllers/notes.controller.js"

const notesRouter = express.Router()

notesRouter.post("/generate-notes" , isAuth , generateNotes )
notesRouter.get("/get-my-notes" , isAuth , getMyNotes )
notesRouter.get("/:id" , isAuth , getSingleNote )


export default notesRouter