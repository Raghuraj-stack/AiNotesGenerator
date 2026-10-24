import mongoose, { Mongoose } from "mongoose";

const notesSchema = new mongoose.Schema({

    user:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    topic:{
        type:String,
        required:true
    },
    classLevel:{
        type:String
    },
    examType:{
       type:String
    },
    revisionMode:{
        type:Boolean,
        default:false
    },
    includeDiagram:{
       type:Boolean
    },
    includeCharts:{
        type:Boolean
    },
    content:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},{timestamps:true})

const NotesModel = mongoose.model("NotesModel" , notesSchema)
export default NotesModel