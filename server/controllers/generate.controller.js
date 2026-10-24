import NotesModel from "../models/notes.model.js"
import UserModel from "../models/user.model.js"
import { generateGroqResponse } from "../services/groq.services.js"

import { buildPrompt } from "../utils/promptBuilder.js"

export const generateNotes = async (req , res)=>{
    try {
        const {topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeCharts = false
        } = req.body

        if(!topic)
        {
            return res.status(400).json({message:"Topic is required"})
        }

        const user = await UserModel.findById(req.userId)
        
        if(!user)
        {
            return res.status(400).json({message:"User not found"})
        }

        if(user.credit < 10)
        {
            user.isCreditAvailable = false
            await user.save()
            return res.status(400).json({message:`Insufficient Credits`})
        }


        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram ,
            includeCharts
        
        })

        const aiResponse = await generateGroqResponse(prompt)

        const notes = await NotesModel.create({
            user:user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram ,
            includeCharts,
            content:aiResponse
        })
        user.credit =  user.credit - 10
        if(user.credit <= 0)
        {
            user.isCreditAvailable = false
        }

        if(!Array.isArray(user.notes))
        {
            user.notes =[];
        }

        user.notes.push(notes._id)

        await user.save()

        return res.status(200).json({
            data:aiResponse,
        noteId:notes._id ,
    creditsLeft:user.credit
})
    } catch (error) {
        return res.status(500).json({message:`generate controller error`})
    }
}