import React from 'react';

interface MovieDetailsProps {
  movie: {
    id: number;
    name: string;
    releaseDate: string;
    rating: number;
    reviews: {
      id: number;
      comment: string;
      commenterName: string;
      rating: number;
    }[];
  };
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-xl">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold mb-4">{movie.name}</h2>
        <p className="mb-2">Release Date: {movie.releaseDate}</p>
        <p className="mb-4">Total Rating: {movie.rating}</p>
        <h3 className="text-lg font-bold mb-2">Reviews:</h3>
        {movie.reviews.map((review) => (
          <div key={review.id} className="mb-2">
            <p className="text-gray-600">Comment: {review.comment}</p>
            <p className="text-gray-600">Commenter: {review.commenterName}</p>
            <p className="text-gray-600">Rating: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
