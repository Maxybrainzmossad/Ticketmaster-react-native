import { StyleSheet, View } from 'react-native'

const ThemedItemBox = ({style, ...props}) => {
  return (
    <View style={[styles.container, style]} {...props} />
  )
}

export default ThemedItemBox

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 210,
        display: 'flex',
        position: 'absolute',
        top: 170,
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 1000,
    }
})