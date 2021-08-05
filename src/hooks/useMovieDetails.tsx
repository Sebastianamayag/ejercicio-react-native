import { useEffect } from "react";
import { useState } from "react"
import movieDB from "../api/movieDb";
import { Cast, CreditsREsponse } from "../interfaces/creditsInterface";
import { MovieFull } from "../interfaces/movieInterface";

interface MovieDetails{
    isLoadding:boolean
    movieFull?:MovieFull
    cast:Cast[]
}


export const useMovieDetails = (movieId:number) => {
    
    const [state, setstate] = useState<MovieDetails>({
        isLoadding:true,
        movieFull:undefined,
        cast:[]
    });

    const getMovieDetails=async()=>{
        const MovieD= movieDB.get<MovieFull>(`/${movieId}`);
        const castD= movieDB.get<CreditsREsponse>(`/${movieId}/credits`);
        const [MovieDresp,castPresp]=await Promise.all([MovieD,castD])
        setstate({
            isLoadding:false,
            movieFull:MovieDresp.data,
            cast:castPresp.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, [])

    return { 
        ...state
    }

}
