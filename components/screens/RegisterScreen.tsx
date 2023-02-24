import React, { useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import styleTexts from '../../styles/styleTexts';
import styleButtons from '../../styles/styleButtons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import styleScreens from '../../styles/styleScreens';
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const signUpUser = async (email, password, username) => {
    console.log('klicked');
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log('user created');

    await addDoc(collection(db, 'users'), {
      username: username,
      email: email,
    });

    console.log('user added to firebase');

    await resetForm();
    await navigation.navigate('LogIn');
  };

  return (
    <View style={styleScreens.defaultScreen}>
      {/*       <InputField placeholder={'Användarnamn'} value={username} />
       */}
      <TextInput
        style={styleTexts.textInput}
        placeholder="Användarnam"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholderTextColor={'#FFD3D3'}
      />
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
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholderTextColor={'#FFD3D3'}
      />

      <LinearGradient
        colors={['#F46D6D', '#CE7C7C']}
        style={styleButtons.buttonDefault}
      >
        <Pressable onPress={() => signUpUser(email, password, username)}>
          <Text style={styleButtons.buttonDefaultText}>REGGA MIG</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default RegisterScreen;
