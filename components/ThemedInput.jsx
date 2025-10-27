import { TextInput } from 'react-native'

const ThemedInput = ({style, placeholder, ...props}) => {
  return (
    <TextInput 
        style={style}
        placeholder={placeholder}
        {...props}
        autoCorrect={false}
        autoCapitalize='none'

    />
  )
}

export default ThemedInput
