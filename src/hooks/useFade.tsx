import React from 'react'
import { useRef } from 'react'
import { Animated } from 'react-native'
export const useFade = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    const fadeIn=(callback?:Function)=>{
        Animated.timing(
            opacity,
            {
                toValue:1,
                duration:2000,
                useNativeDriver:true
            }
        ).start(()=>callback?callback():null);
    }

    const fadeout=()=>{
        Animated.timing(
            opacity,
            {
                toValue:0,
                duration:2000,
                useNativeDriver:true
            }
        ).start();
    }
    return{
        fadeIn,
        fadeout,
        opacity
    }
}
