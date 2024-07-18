import { useState,useEffect } from "react";
import "./App.css";
import axios from 'axios';
import moment from 'moment';

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
   
    fetchNotes();
    }, []);

    const fetchNotes = async () => {
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(response.data);
    };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    const response = await axios.post('http://localhost:3000/api/notes', newNote);
    setNotes([response.data, ...notes]);
    setTitle("");
    setContent("");
  };




  const handleUpdateNote = async (event) => {
    event.preventDefault();
    if (!selectedNote) return;
    const updatedNote = { title, content };
    const response = await axios.put(`http://localhost:3000/api/notes/${selectedNote._id}`, updatedNote);
    const updatedNotesList = notes.map((note) =>
      note._id === selectedNote._id ? response.data : note
    );
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };


  const deleteNote = async (event, noteId) => {
    event.stopPropagation();
    if (!noteId) return
    await axios.delete(`http://localhost:3000/api/notes/${noteId}`);
    const updatedNotes = notes.filter((note) => note._id !== noteId);
    setNotes(updatedNotes);
    alert('Warning!! Do you want to delete this Note?')
  };

 

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };


  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
        <input  value={title}  onChange={(event) => setTitle(event.target.value)} placeholder="Title" required></input>
        <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Content" rows={10} required></textarea>

        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item"
            key={note.id}
            onClick={() => handleNoteClick(note)}
          >
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note._id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p className="timestamp">Created: {moment(note.createdAt).format('LLL')}</p>
            {note.updatedAt && <p className="timestamp">Updated: {moment(note.updatedAt).format('LLL')}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



/*

state management without backend code

const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const [selectedNote, setSelectedNote] = useState("");
  
 

  const handleAddNote = (e) => {
    e.preventDefault();

    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const [notes, setNotes] = useState([
    {
      id: 1, title: "test note 1", content: "bla bla note1",
    },
  ]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (event) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event, noteId) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };
*/
