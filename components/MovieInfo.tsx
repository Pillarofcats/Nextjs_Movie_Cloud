//Interface
import iMovieCard from "@/interface/moviecard"
//Components
import Loading from "@/components/Loading"
import BillboardPlayBtn from "@/components/BillboardPlayBtn"

export default function MovieInfo({ movie, isLoading }:iMovieCard) {
  //Check
  if(isLoading) return (<Loading/>)

  return (
    <div className="flex flex-col px-8 space-y-8 py-10 bg-gray-800 bg-opacity-60 pt-10">
        <div className="flex md:flex-row flex-col gap-5">
          <div className=" sm:justify-center flex">
            <img className="md:w-[100%] sm:h-[60vh] object-cover self-center lg:h-[80vh]" src={ movie?.thumbnailUrl } alt="Movie thumbnail" />
          </div>
          <div className="flex flex-col gap-2 pl-2 flex-1 justify-center h-[80vh]">
            <p className="text-2xl text-blue-400 font-semibold">Title: <span className="text-white font-semibold">{ movie?.title }</span></p>
            <p className="text-2xl text-blue-400 font-semibold">Genre: <span className="text-white font-semibold">{ movie?.genre }</span></p>
            <p className="text-2xl text-blue-400 font-semibold">Description:</p>
            <p className="text-white text-1xl leading-7 ">{ movie?.longDesc }</p>
          <div className="w-fit">
            <BillboardPlayBtn movieId={ movie?.id } />
          </div>
        </div>
        </div>
    </div>
  )

}