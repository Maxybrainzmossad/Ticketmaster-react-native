import { View } from 'react-native'

const ThemedView = ({style, width = '100%', height = '100%', ...props}) => {
  return (
    <View style={[style, width, height]} {...props}/>
  )
}

export default ThemedView