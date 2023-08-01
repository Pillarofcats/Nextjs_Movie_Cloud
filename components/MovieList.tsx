//Interface
import iMovieList from "@/interface/movielist"
//Components
import MovieCard from "@/components/MovieCard"
import Loading from "@/components/Loading"

export default function MovieList({ movies, title, isLoading }:iMovieList) {
  //Check
  if(isLoading) return (<Loading />)

  return (
    <div className="px-8 pb-8 flex flex-col bg-gray-800 bg-opacity-80 w-full">
      <p className="text-white text-2xl md:text-3xl lg:text-5xl font-semibold text-center py-5">
        { title }
      </p>
      {
        movies.length > 0 ? 
          (<div className="grid grid-dynamic gap-8 justify-evenly justify-items-center content-evenly items-center">
            { movies?.map((movie) => <MovieCard key={ movie.id } movie={ movie } />) }
          </div>)
          :
          (<h1 className="text-white text-center text-3xl font-semibold">Empty</h1>)

        }

    </div>
  )
}