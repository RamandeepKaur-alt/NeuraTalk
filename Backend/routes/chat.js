import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";


const router = express.Router();

//test
router.post("/test", async(req , res) =>{
    try{
        const thread = new Thread({
            threadId: "mnp",
            title: "Testing New Thread0"
        });
        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to save in DB"});
    }
});

//Get all threads
router.get("/thread", async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updateAt: -1})
        //descending order of updateAt..most recent data on top
        res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads"});
    }
});

//GET particular threadId from Threads
router.get("/thread/:threadId", async(req, res) =>{
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread){
            res.status(404).json({error: "Thread not found"});
        }
        res.json(thread.messages);

    }catch(err){
        console.log(err);
     res.status(500).json({error: "Failed to fetch threads"});
    }
});

//DELETE
router.delete("/thread/:threadId", async( req, res) =>{
    const {threadId} = req.params;

    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});

        if(!deletedThread){
            res.status(404).json({error: "Thread not found"});
        }
        res.status(200).json({error: "Thread deleted successfully"});
    }catch(err){
        console.log(err);
     res.status(500).json({error: "Failed to fetch threads"});
    }
});

//chat Route 
router.post("/chat", async(req, res) =>{
    const {threadId, message} = req.body;

    if(!threadId || !message){
        res.status(404).json({error: "missing required fields"});
    }

    try{
        let thread = await Thread.findOne({threadId});

        if(!thread){
            //create new chat/ new thread in db
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role: "user", content:message}]
            });
        }else{
            // Push user message in existing thread
            thread.messages.push({role: "user", content:message});
        }

        // Get AI reply
        const assistantReply = await getOpenAIAPIResponse(message);

        // Save AI reply in thread
        thread.messages.push({role: "assistant", content: assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply: assistantReply});

    }catch(err){
        console.log(err);
     res.status(500).json({error: "something went wrong"});
    }
});

export default router;