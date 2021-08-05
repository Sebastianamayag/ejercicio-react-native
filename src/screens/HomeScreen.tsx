import React ,{useEffect}from 'react'
import { View,ActivityIndicator, FlatList,Text, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies'
import { Dimensions } from 'react-native';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import {getImagesColors} from '../helpers/getColores';
import { useContext } from 'react';
import { GradientContext } from '../context/GradientContext';


const {width}=Dimensions.get('window');

export const HomeScreen = () => {
    

    const {setMainColors} =useContext(GradientContext);

    const {nowPlaying,isLoading,popular,topRated,upcoming}=useMovies();
    const {top} =useSafeAreaInsets();


    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator color="red" size={100} />
            </View>
        )
    }


    const getPosterColors=async(index:number)=>{
        const movie=nowPlaying[index];
        const uri=`https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const [primary='white',secondary='white'] =await getImagesColors(uri);
        setMainColors({primary,secondary})
    }



    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>

                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => <MoviePoster movie={item} />}
                            sliderWidth={width}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={index=>getPosterColors(index)}
                        />
                    </View>

                    <HorizontalSlider title="Populares" movies={popular} />
                    <HorizontalSlider title="Top Rated" movies={topRated} />
                    <HorizontalSlider title="Upcoming" movies={upcoming} />
                </View>
            </ScrollView>
        </GradientBackground>
    )
}
