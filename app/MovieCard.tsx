import Link from "next/link";
import { FC } from "react";

interface MovieCardProps {
  id: number
  name: string;
  releaseDate: string;
  rating: number;
}

const MovieCard: FC<MovieCardProps> = ({ id, name, releaseDate, rating }) => {

  return (
    <Link
      className="bg-white p-4 border-blue-800 shadow rounded-md mb-4 mt-5 border-r border-b border-l border-t border-gray-400"
      href={{
        pathname: "/Detail",
        query: {
          id,
          name,
          releaseDate,
          rating
        }
      }}
    >
      <p className="text-2xl">{name}</p>
      <p className="text-gray-600 mt-5 italic">Release Date: {releaseDate}</p>
      <p className="text-gray-600 mt-2 font-bold">Rating: {`${rating}/10`}</p>
    </Link>
  );
};

export default MovieCard;
