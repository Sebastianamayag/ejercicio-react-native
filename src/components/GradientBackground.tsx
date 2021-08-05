import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { GradientContext } from '../context/GradientContext'
import { useFade } from '../hooks/useFade'

interface Props{
    children:JSX.Element | JSX.Element[]
}


export const GradientBackground = ({children}:Props) => {

    const {colors,prevcolors,setPrevMainColors} = useContext(GradientContext)
    const {opacity,fadeIn,fadeout}=useFade();
    useEffect(() => {
        fadeIn(()=>setPrevMainColors(colors));
        fadeout();
    }, [colors])


    return (
        <View style={{flex:1}}>
            <LinearGradient
                colors={[prevcolors.primary,prevcolors.secondary,'white']}
                style={{...StyleSheet.absoluteFillObject}}
                start={{x:0.1,y:0.1}}
                end={{x:0.5,y:0.7}}
            />
            <Animated.View
                style={{...StyleSheet.absoluteFillObject,opacity}}
            >
                <LinearGradient
                    colors={[colors.primary,colors.secondary,'white']}
                    style={{...StyleSheet.absoluteFillObject}}
                    start={{x:0.1,y:0.1}}
                    end={{x:0.5,y:0.7}}
                />
            </Animated.View>

            {children}
        </View>
    )
}
