import { StyleSheet } from 'react-native'
import { Pressable } from 'react-native'

const ThemedTicketItem = ({style, event, ...props}) => {
  return (
    <Pressable style={({pressed}) => [styles.container, pressed && styles.pressedContainer, style]} {...props} onPress={event}/>
  )
}

export default ThemedTicketItem

const styles = StyleSheet.create({
  container: {
    width: '94%',
    height: 380,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: '#866e6eff',
    marginBottom: 30
  },
  pressedContainer: {
    opacity: 0.6
  }
})