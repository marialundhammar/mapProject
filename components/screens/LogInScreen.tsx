import React, { useContext, useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import styleTexts from '../../styles/styleTexts';
import styleButtons from '../../styles/styleButtons';
import styleScreens from '../../styles/styleScreens';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { ContextStore } from '../../context/ContextStore';
import { registerIndieID } from 'native-notify';

export default function LogInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser, setPageHandler } = useContext(ContextStore);

  const logInUser = async (auth, email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      registerIndieID(
        `${userCredential.user.uid}`,
        7462,
        'dIdIJN6PHVKebyumEisJ0u'
      );

      await navigation.navigate('Home');
      setPageHandler('Home');
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
      }
    }
  };

  return (
    <View style={styleScreens.defaultScreen}>
      <View style={styleScreens.space}>
        <TextInput
          style={styleTexts.textInput}
          placeholder="Email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
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
      </View>
      {errorMessage && (
        <Text style={[styleTexts.h4, { margin: 8 }]}> {errorMessage}</Text>
      )}

      <LinearGradient
        colors={['#F46D6D', '#CE7C7C']}
        style={styleButtons.buttonDefault}
      >
        <Pressable onPress={() => logInUser(auth, email, password)}>
          <Text style={styleButtons.buttonDefaultText}>LOGGA IN</Text>
        </Pressable>
      </LinearGradient>

      <View style={styleScreens.bottom}>
        <Text style={styleTexts.bodyText}>Inte medlem än? </Text>
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text style={styleTexts.linkText}>Regga dig här</Text>
        </Pressable>
      </View>
    </View>
  );
}
