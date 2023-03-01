import React, { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import styleTexts from '../../styles/styleTexts';
import styleButtons from '../../styles/styleButtons';
import styleScreens from '../../styles/styleScreens';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import TopHeader from '../ui/molecules/TopHeader';

const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const logInUser = async (auth, email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('user logged in', userCredential.user.email);

      await navigation.navigate('Home');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('Användare finns inte');
      } else if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        setErrorMessage('Fel användarnamn eller lösenord');
      } else {
        console.log(error);
        // Handle other errors
      }
    }
  };

  return (
    <View>
      <TopHeader navigation={navigation} showBackButton={false} />

      <View style={styleScreens.defaultScreen}>
        {errorMessage && <Text> {errorMessage}</Text>}
        <TextInput
          style={styleTexts.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholderTextColor={'#FFD3D3'}
        />
        <TextInput
          style={styleTexts.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholderTextColor={'#FFD3D3'}
        />
        <LinearGradient
          colors={['#F46D6D', '#CE7C7C']}
          style={styleButtons.buttonDefault}
        >
          <Pressable onPress={() => logInUser(auth, email, password)}>
            <Text style={styleButtons.buttonDefaultText}>LOG IN</Text>
          </Pressable>
        </LinearGradient>

        <View>
          <Text style={styleTexts.bodyText}>Inte medlem än? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styleTexts.bodyText}>Registrera dig här</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
export default LogInScreen;
