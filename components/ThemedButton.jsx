import { StyleSheet, Pressable } from 'react-native'
import React from 'react'

const ThemedButton = ({style, ...props}) => {
  return (
    <Pressable style={({pressed}) => [styles.btn, pressed && styles.pressed, style]} {...props}/>
  )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#000000ec',
        padding: 15,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.8,
    },
})