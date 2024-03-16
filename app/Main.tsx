import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import SearchInput from './SearchInput';
import MovieCard from './MovieCard';
import Footer from './Footer';
import moment from 'moment';
import {useGetMovieData} from "./zustand";

interface Movie {
  id: number;
  name: string;
  release_date: string;
  rating: number;
}

const MainComponent: React.FC = () => {
  
  const [searchValue, setSearchValue] = useState<string>('');
  const getMovieData = useGetMovieData();

  useEffect(() => {
    getMovieData.get();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const filteredMovies = getMovieData?.data?.length > 0 && getMovieData?.data?.filter((movie: { name: string; }) =>
    movie.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <Navigation />
      <div className="container mx-auto px-4 h-screen">
        <SearchInput onChange={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.length > 0 ? filteredMovies.map((movie: { id: number; name: string; release_date: moment.MomentInput; rating: number; }) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              name={movie.name}
              releaseDate={moment(movie.release_date).format('DD MMMM YYYY')}
              rating={movie.rating}
            />
          )) :
            <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
              <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-100"></div>
            </div>
          }
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainComponent;
