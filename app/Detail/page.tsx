"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import Footer from "../Footer";
import { useGetReviewData } from "../zustand";
//@ts-ignore
interface Review {
  id: number;
  comment: string;
  reviewer: string;
  rating: number;
}

interface MovieProps {
  searchParams:{
    id:number,
    name:string
  },
}

const Detail : React.FC<MovieProps>  =({ searchParams}) => {

  const { id, name } = searchParams;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [calculatedRating, setCalculatedRating] = useState<number>(0);
  const getReviewData = useGetReviewData();


  function calculateRating(rating: number[]) {
    const totalRating = rating.reduce((acc, rate) => acc + rate, 0);
    const averageRating = totalRating / rating.length;
    const roundedRating = Math.round(averageRating);
    const scaledRating = Math.min(Math.max(roundedRating, 0), 10);
    return scaledRating;
  }

  useEffect(() => {
    getReviewData.get();
  }, []);

  useEffect(() => {
    const filtered = getReviewData?.data?.filter((item: { movie_id: number }) => item.movie_id == id);
    const calculated = filtered && calculateRating(filtered.map((ele: { rating: any }) => ele.rating));
    setCalculatedRating(calculated || 0);
    setReviews(filtered);
  }, [getReviewData.data])

  return (
    <div>
      <Navigation />

      <p className="text-3xl text-center mt-3 tracking-wide">Movie Detail</p>

      <div className="container mx-auto px-4 mt-5 h-screen">
        <div className="w-11">
          <Link href="/">
            <button className="flex items-center mt-5 space-x-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 3l-8 8 8 8M2 11h16"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Back</span>
            </button>
          </Link>
        </div>
        <h3 className="text-3xl font-bold mb-4 mt-5 pt-5">Movie Name : {name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600">Rating : {`${calculatedRating}/10`}</span>
        </div>
        <div className="grid mt-5 pt-5 grid-cols-1 gap-4 md:grid-cols-2">
          {reviews?.length > 0 ? (
            reviews.map(({ comment, rating, reviewer }) => (
              <div key={comment} className="bg-white rounded-lg shadow-md p-4 border-r border-b border-l border-t border-gray-400">
                <p className="text-gray-700 mb-2">{comment}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 italic">By {reviewer}</span>
                  <span className="text-blue-600">{`${rating}/10`}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">No Reviews</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Detail;
