import { View } from 'react-native'

const Spacer = ({width = '100%', height = 40, ...props}) => {
  return (
    <View style={{width, height}} {...props}/>
  )
}

export default Spacer