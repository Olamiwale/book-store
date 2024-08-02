import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from 'axios';



export default function App() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([])



  useEffect(()=>{
   fetchNote();
  }, [])


 const fetchNote = async () =>{
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(response.data);
 } 

 const addNote = async (e) =>{
  
   const newNote = {title, content }
   try {
    const response = await axios.post("http://localhost:3000/api/notes", newNote);
    setNotes([response.data, ...notes]);
  } catch (error) {
    console.error("Error adding note:", error);
  }
  
 }
  

  const toggle = () => {
    setOpen(!open);
    console.log("working");
  };

  return (
    <div className="flex p-4 w-full gap-3 fixed ">
      <div className="flex">
        <div className="hidden md:flex"><Card /></div>

        <div className={!open ? "hidden" : "md:hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w- h-24 flex items-center justify-center" }> <Card />
        </div>

        <div className="">


          <div className="justify-center item-center gap-5 overflow-y-auto h-screen   lg:flex lg:grid-cols-3 md:grid grid-cols-2">


          {notes.map((note) => (
             <div key={note.id} 
                  className=" max-h-[400px] rounded-md bg-gray-400 m-4 ">
              <div className=" flex flex-col gap-3 p-3 ">
                <p><span className="font-semibold"> </span> {title}</p>
                <p><span className="font-semibold"> </span> {year}</p>
                <p><span className="font-semibold"></span> {author}</p>
              </div>

              <p className="flex flex-col p-3">
                <span className="py-3 font-semibold"> </span> {note}
              </p>
            </div>
          ))}
                
          </div>
        </div>

        <div className="fixed right-5 bottom-[50px] md:hidden">
          {!open ? ( <button onClick={toggle}  className="bg-blue-800 p-2 text-white rounded-full w-[40px] h-[40px] text-3xl justify-center items-center flex">+</button> ) : ( <button onClick={toggle} className="bg-blue-800 p-2 text-white rounded-full w-[40px] h-[40px] text-3xl justify-center items-center flex"> - </button> )}
        </div>
      </div>
    </div>
  );
}

/*import { useState,useEffect } from "react";
import "./App.css";
import axios from 'axios';
import moment from 'moment';
import Card from "./components/Card";

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

export default App; */
