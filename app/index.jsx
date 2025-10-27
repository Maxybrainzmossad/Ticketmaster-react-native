import { StyleSheet, Text, Pressable } from 'react-native'
import ThemedInput from '../components/ThemedInput'
import ThemedView from '../components/ThemedView'
import ThemedButton from '../components/ThemedButton'
import Spacer from '../components/Spacer'
import { useState } from 'react'

const SignIn = () => {

  const [email, setEmail] = useState('');

  return (
    <ThemedView style={styles.container}>
        <Text style={styles.text}>Hello, Chairman.</Text>
        <Spacer />
        <ThemedInput 
            style={styles.input}
            value={email}
            placeholder={'example@gmail.com'}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"

        />
        <Spacer height={60} />
        <ThemedButton style={styles.btn}>
          <Text style={styles.btntext}>Sign In</Text>
        </ThemedButton>
    </ThemedView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf5f5cc'
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
  },
  input: {
    width: '90%',
    height: 60,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 21,
    fontWeight: '700'
  },
  btn: {
    width: 200,
    height: 'auto',
    borderRadius: 15
  },
  btntext: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center'
  }
})