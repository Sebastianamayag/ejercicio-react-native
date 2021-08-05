import { useState } from 'react';
import { useEffect } from 'react';
import movieDB from '../api/movieDb'
import { Movie, MovieDBResponse } from '../interfaces/movieInterface'


interface MoviesState{
    nowPlaying:Movie[];
    popular:Movie[];
    topRated:Movie[];
    upcoming:Movie[];
}



export const useMovies = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [moviesState, setMoviesState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: []
    })
    const getMovies=async()=>{
        const nowPlaying=movieDB.get<MovieDBResponse>('/now_playing');
        const popular=movieDB.get<MovieDBResponse>('/popular');
        const topRated=movieDB.get<MovieDBResponse>('/top_rated');
        const upcoming=movieDB.get<MovieDBResponse>('/upcoming');

        const resp=await Promise.all([nowPlaying,popular,topRated,upcoming]);

        
        setMoviesState({
            nowPlaying:resp[0].data.results ,
            popular:resp[1].data.results ,
            topRated: resp[2].data.results,
            upcoming: resp[3].data.results
        })
        setIsLoading(false);
    }


    useEffect(() => {
        //now playing
        getMovies();
    }, []);

    return{
        ...moviesState,
        isLoading
    }

}




