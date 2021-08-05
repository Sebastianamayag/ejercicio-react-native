import axios from 'axios';


const movieDB=axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key:'dc1a1c1ed39a95c87c47eb92cde3b4bd',
        language:'es-ES'
    }
})


export default movieDB;