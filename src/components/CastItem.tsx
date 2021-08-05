import React from 'react'
import { View,Text,Image, StyleSheet } from 'react-native'
import { Cast } from '../interfaces/creditsInterface'

interface Props{
    actor:Cast
}

export const CastItem = ({actor}:Props) => {

    const uri=`https://image.tmdb.org/t/p/w500${actor.profile_path}`

    return (
        <View style={styles.container}>
            {
                actor.profile_path &&(
                    <Image
                        source={{ uri }}
                        style={{ width: 58, height: 58, borderRadius: 10 }}
                    />
                )
            }
            <View style={styles.actorInfo}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{actor.name}</Text>
                <Text style={{fontSize:18,fontWeight:'bold',opacity:0.7,marginBottom:10}}>{actor.character}</Text>
            </View>
        </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 10,
        shadowColor: "#000",
        backgroundColor:'white',
        borderRadius:10,
        marginRight:20,
        paddingRight:10,
        height:58
    },actorInfo:{
        flex:1,
        marginLeft:10,
        marginTop:5,
    }
})