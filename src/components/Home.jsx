import React, { useState, useEffect } from 'react';
import './styles.css';
import './Home.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setsearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const allpaste = useSelector((state) => state.paste.pastes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId) {
      const paste = allpaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allpaste]); // Ensure this effect re-runs when pasteId or allpaste changes

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // create
      dispatch(addToPastes(paste));
    }
    // after creation and updation
    setTitle('');
    setValue('');
    setsearchParams({});
  };

  return (
    <div>
      <div className="Home-1">
        <input
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createPaste}>
          {pasteId ? 'Update paste' : 'Create paste'}
        </button>
      </div>

      <div>
        <textarea
          className="textarea"
          value={value}
          placeholder="Enter content"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
