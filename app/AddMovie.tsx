import React, { useState } from 'react';
import { useGetMovieData, usePostMovieData } from './zustand';

interface AddMovieCardProps {
  onAddMovie: (name: string, releaseDate: string) => void;
  onClose: () => void;
}

const AddMovieCard: React.FC<AddMovieCardProps> = ({ onAddMovie, onClose }) => {
  const [name, setName] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');
  const postMovieData = usePostMovieData();
  const getMovieData = useGetMovieData();

  const handleAddMovie = async () => {
    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    if (!releaseDate) {
      setDateError('Release date is required');
      isValid = false;
    } else {
      setDateError('');
    }

    if (isValid) {

      const data = {
        name,
        release_date: releaseDate,
      };
      await postMovieData.post(data);
      getMovieData.get();
      setName('');
      setReleaseDate('');
      onClose();
    }
  };

  return (

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full"> {/* Add w-full class to make it full width */}
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Movie</h2>
        <input
          type="text"
          className={`w-full border rounded-md mb-4 p-2 ${nameError ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <p className="text-red-500 text-sm mb-4">{nameError}</p>}
        <input
          type="date"
          className={`w-full border rounded-md mb-4 p-2 ${dateError ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Release Date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        {dateError && <p className="text-red-500 text-sm mb-4">{dateError}</p>}
        <div className="flex justify-between mt-5">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleAddMovie}
          >
            Create Movie
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>


  );
};

export default AddMovieCard;
