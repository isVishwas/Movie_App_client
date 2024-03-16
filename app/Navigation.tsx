import Link from 'next/link';
import { useState } from 'react';
import AddMovie from './AddMovie';
import AddReview from './AddReview';

const Navigation = () => {

  const [isMovie, setIsMovie] = useState<boolean>(false);
  const [isReview, setIsReview] = useState<boolean>(false);

  return (
    <>

      <nav className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <Link href={"/"}><h1 className="text-white text-2xl tracking-wide">MOVIECRITIC</h1></Link>
        </div>
        <div className="flex flex-col md:flex-row">
          <Link href="#" onClick={() => { setIsMovie(!isMovie) }}>
            <button className="outline outline-2 outline-offset-2  outline-cyan-500 text-blue px-4 py-2 rounded-md bg-slate-100 hover:text-blue-600 mb-2 md:mb-0 md:mr-4 focus:outline-none focus:ring focus:ring-blue-300">
              Add Movie
            </button>
          </Link>
          <Link href="#" onClick={() => { setIsReview(!isReview) }}>
            <button className="text-white outline outline-2 outline-offset-2 px-4 py-2 rounded-md bg-blue-500 focus:outline-none focus:ring">
              Add Review
            </button>
          </Link>
        </div>

      </nav>
      {
        isMovie &&
        <AddMovie
          onAddMovie={() => { }}
          onClose={() => setIsMovie(!isMovie)}
        />
      }
      {
        isReview &&
        <AddReview
          movies={[]}
          onClose={() => setIsReview(!isReview)}
        />
      }
    </>
  );
};

export default Navigation;
