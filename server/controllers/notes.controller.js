import NotesModel from "../models/notes.model.js"

export const getMyNotes = async (req, res) => {
  try {
    const notes = await NotesModel.find({ user: req.userId })
      .select("topic classLevel examType revisionMode includeDiagram includeChart createdAt")
      .sort({ createdAt: -1 });

    // An empty array is a valid result: the user just has no notes yet
    return res.status(200).json(notes);
  } catch (error) {
    console.error("getMyNotes error:", error);
    return res.status(500).json({ message: "getMyNotes error" });
  }
};

export const getSingleNote = async(req , res)=>{
    try {
        
        const note = await NotesModel.findOne({_id:req.params.id,
            user:req.userId
        })

        if(!note)
        {
            return res.status(400).json({message:"note not found error"})       
        }

        return res.status(200).json({
            content:note.content,
            topic:note.topic,
            createdAt:note.createdAt
        })
         
    } catch (error) {
        return res.status(500).json({message:"getSingleNote error"})       
    }
}