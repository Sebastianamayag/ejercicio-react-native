import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { View,Image } from 'react-native'
import { Movie } from '../interfaces/movieInterface'

interface Props{
    movie:Movie,
    height?:number,
    width?:number
}


export const MoviePoster = ({movie,height=420,width=300}:Props) => {

    const uri=`https://image.tmdb.org/t/p/w500${movie.poster_path}`

    const navigation=useNavigation();


    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            style={{
                width,
                height,
                marginHorizontal:2,
                paddingBottom:20,
                paddingHorizontal:7
            }}
            onPress={()=>navigation.navigate('DetailScreen',movie)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}


const styles=StyleSheet.create({
    imageContainer:{
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,
        flex:1,
        borderRadius:18,
        shadowColor: "#000"
    },
    image:{
        flex:1,
        borderRadius:18,
    }
})