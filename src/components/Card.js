import React, {useState} from 'react'


export default function Card({addNote}) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Bob Marley");
  const [year, setYear] = useState("1998");
  const [title, setTitle] = useState("No Woman no cry");

  const handleSubmit = (e) =>{
    e.preventDefault();
    addNote(title, content)
    setTitle('');
    setAuthor('');
    setYear('');
    setContent('');
    
  
   }
  return (
    <div>
    <form className='w-[400px] md:w-[300px] p-4' onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title of the Book"
            className="p-3 border-2 rounded-md"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            className="p-3 border-2 rounded-md"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Year Published"
            className="p-3 border-2 rounded-md"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className='mt-3'>
          <textarea
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border-2 rounded-md"
            rows="13"
            placeholder="Summary of the book"
          />
        </div> 

        <div className='flex justify-center'> 
        <button type='submit' className="bg-blue-800 text-white px-4 py-2 rounded-lg">Add</button>
      </div>
      </form>
    
    </div>
  )
}
