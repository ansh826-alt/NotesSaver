import "./ViewPaste.css" 
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {

  const {id} = useParams();
  const allPaste = useSelector((state) => state.paste.pastes)
  const paste = allPaste.filter((p) => p._id === id)[0];
  console.log("final paste:" , paste);
  
  return (
    <div>
      <div className="Home-1">
        <input
          type="text"
          placeholder="enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button onClick={createPaste}>
          {pasteId ? 'Update paste' : 'Create paste'}
        </button> */}
      </div>

      <div>
        <textarea
          className="textarea"
          value={paste.content}
          placeholder="Enter content"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
