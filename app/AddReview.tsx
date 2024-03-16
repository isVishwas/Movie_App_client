import React, { useEffect, useState } from 'react';
import {usePostReviewData, useGetMovieData,useGetReviewData} from "./zustand";

interface Movie {
  id: number;
  name: string;
}

interface AddReviewCardProps {
  movies: Movie[];
  onClose: () => void;
}

const AddReviewCard: React.FC<AddReviewCardProps> = ({ movies, onClose }) => {
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const postReviewData = usePostReviewData();
  const getMovieData = useGetMovieData();
  const getReviewData = useGetReviewData();

  useEffect(() => {
    getMovieData.get();
  }, []);


  const handleAddReview = async () => {
    let errorsFound = false;
    const newErrors: { [key: string]: string } = {};

    if (!selectedMovie) {
      newErrors.selectedMovie = 'Please select a movie';
      errorsFound = true;
    }
    if (!name) {
      newErrors.name = 'Name is required';
      errorsFound = true;
    }

    if (rating < 0 || rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
      errorsFound = true;
    }

    if (!comment) {
      newErrors.comment = 'Comment is required';
      errorsFound = true;
    }

    if (errorsFound) {
      setErrors(newErrors);
    } else {
      const data = {
        reviewer_name: name,
        rating,
        comment,
        movie_id: parseInt(selectedMovie),
      };
      await postReviewData.post(data);
      getReviewData.get();
      setSelectedMovie('');
      setName('');
      setRating(0);
      setComment('');
      setErrors({});
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Review</h2>
        <select
          className={`w-full border ${errors.selectedMovie ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4 p-2`}
          value={selectedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          <option value="">Select Movie</option>
          {getMovieData?.data?.length > 0 && getMovieData?.data?.map((movie: { id: number; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
            <option key={movie.id} value={String(movie.id)}>
              {movie.name}
            </option>
          ))}
        </select>
        {errors.selectedMovie && <p className="text-red-500 mb-2">{errors.selectedMovie}</p>}
        <input
          type="text"
          className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4 p-2`}
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="text-red-500 mb-2">{errors.name}</p>}
        <input
          type="number"
          className={`w-full border ${errors.rating ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4 p-2`}
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
        {errors.rating && <p className="text-red-500 mb-2">{errors.rating}</p>}
        <textarea
          className={`w-full border border-gray-300 rounded-md mb-4 p-2 ${errors.comment ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {errors.comment && <p className="text-red-500 mb-2">{errors.comment}</p>}
        <div className="flex justify-between mt-5">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleAddReview}
          >
            Add Review
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

export default AddReviewCard;
