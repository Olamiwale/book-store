const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');




const app = express();
const PORT = 3000;

const URL = 'mongodb+srv://olamiwalepaul:uX2juKv8k6l9LGKz@cluster0.8er9qmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'





//mongodb connection

mongoose.connect(URL)
.then(() => { console.log('connected')})
.catch((err) => {console.log('Not connected', err.message)})



//Schema and model

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema);



//Middleware

app.use(cors());
app.use(bodyParser.json());



//Routes

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Server Error'})
    } 
})

app.post('/api/notes', async (req, res) => {
    const { title, content } = req.body;
  
    try {
      const newNote = new Note({
        title,
        content,
      });
  
      await newNote.save();
      res.status(201).json(newNote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.send({ message: 'Note deleted' });
  });







  app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;
    const updatedNote = req.body;
  
    try {
      
      const updatedNoteInDB = await Note.findByIdAndUpdate(
        id,
        updatedNote,
        { new: true }
      );
  
      if (!updatedNoteInDB) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
      res.json(updatedNoteInDB);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


  


//start the server

app.listen(PORT, () => {
    console.log('sever running on port 3000')
})





