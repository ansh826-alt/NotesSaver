import React, { useState } from 'react'
import "./Paste.css"
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
// import "./Paste.css"
const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm , setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleDelete(pasteId){
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div>
      <input className='search-input'
      type="search"
      placeholder='search here'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
       />

      <div className='cards'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) =>
              {
                return(
                  <div className='title' key = {paste?._id}>
                    <div>
                      {paste.title}
                    </div>
                    <div>
                      {paste.content}
                    </div>
                    <div className='btn'>
                      <button >
                        <a href={`/?pasteId=${paste?._id}`}>
                          Edit
                        </a>
                      </button>
                      <button >
                        <a href={`/pastes/${paste?._id}`}>
                          view
                        </a>
                      </button>
                      <button onClick={() => handleDelete(paste._id)}>
                        Delete
                      </button>
                      <button onClick={() => {
                        navigator.clipboard.writeText(paste.content)
                        toast.success("copies to clipboard")
                      }} >
                        Copy
                      </button>

                    </div>
                    <div>
                      {paste.createdAt}
                    </div>
                  </div>
                )
              }
              
          )
        }
      </div>
    </div>
  )
}

export default Paste
