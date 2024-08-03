// Form.js
import React, { useState } from 'react';

export default function Form ({ addNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateInput(title, 5, 100) && validateInput(content, 50, 300)){
      addNote({ title, content });
    setTitle('');
    setContent('');   
    }
  };

  const validateInput = (input, min, max) => {
    if (input.length < min || input.length > max) {
      setError(`Input must be between ${min} and ${max} characters.`);
      return false;
    }
    return true;
  };




  return (
    <form className='w-[400px] md:w-[300px] p-4' onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title of the Book"
          className="p-3 border-2 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mt-3'>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border-2 rounded-md"
          rows="13"
          placeholder="Summary of the book"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <div className='flex justify-center'>
        <button type='submit' className="bg-blue-800 text-white px-4 py-2 rounded-lg">Add</button>
      </div>
    </form>
  );
};


