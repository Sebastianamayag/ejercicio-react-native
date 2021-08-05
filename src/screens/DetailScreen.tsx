import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, Image,TouchableOpacity, ScrollView, StyleSheet,ActivityIndicator } from 'react-native'
import { View,Text} from 'react-native'
import { RootStackParams } from '../navigation/Navigation'
import { useMovieDetails } from '../hooks/useMovieDetails'
import {MovieDetails} from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
const {height} =Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{}


export const DetailScreen = ({route,navigation}:Props) => {

    const movie=route.params;
    const uri=`https://image.tmdb.org/t/p/w500${movie.poster_path}`;


    const {isLoadding,cast,movieFull} =useMovieDetails(movie.id);



    return (
        <ScrollView>
            <View style={styles.posterImageContainer}>
                <View style={styles.imageBorder}>
                    <Image
                        source={{ uri }}
                        style={styles.posterImage}
                    />
                </View>

            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>
            {
                isLoadding
                    ? <ActivityIndicator size={30} color="grey" style={{ marginTop: 20 }} />
                    : <MovieDetails movieFull={movieFull!} cast={cast} />
            }

            <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.backButton}>
                <Icon
                    color="white"
                    name="arrow-back-outline"
                    size={30}
                />
            </TouchableOpacity>


        </ScrollView>

    )
}


const styles=StyleSheet.create({
    posterImageContainer:{
        width:'100%',
        height:height*0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 7,
        borderBottomStartRadius:25,
        borderBottomEndRadius:25,
    },imageBorder:{
        flex:1,
        overflow:'hidden',
        borderBottomStartRadius:25,
        borderBottomEndRadius:25,
    },
    posterImage:{
        flex:1,
        position:'relative'
    },marginContainer:{
        marginHorizontal:20,
        marginTop:20
    },subtitle:{
        fontSize:16,
        opacity:0.8
    },title:{
        fontSize:20,
        fontWeight:'bold'
    },backButton:{
        position:'absolute',
        zIndex:999,
        elevation:9,
        top:30,
        left:20,
    }
})