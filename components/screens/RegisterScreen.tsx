import React, { useEffect, useState } from 'react';
import { Pressable, TextInput, View, Text } from 'react-native';
import styleTexts from '../../styles/styleTexts';
import styleButtons from '../../styles/styleButtons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import styleScreens from '../../styles/styleScreens';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik, Form, Field } from 'formik';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('hej');
  const [emailOk, setEmailOk] = useState(false);
  const [usernameOk, setUsernameOk] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Required';
      setEmailOk(false);
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
      setEmailOk(false);
    }
    setErrorMessage(error);
    console.log(error);
    return error;
  };

  const validateUsername = (text) => {
    if (text.length > 1) {
      setUsernameOk(true);
    }
  };

  const signUpUser = async (email, password, username) => {
    await validateEmail(email);

    console.log(errorMessage);

    if (!errorMessage) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setEmailOk(true);

      console.log('user created');
      await addDoc(collection(db, 'users'), {
        username: username,
        email: email,
      });

      await resetForm();
      await navigation.navigate('LogIn');
    }
  };

  const onChangeEmail = async (text) => {
    await validateEmail(text);

    if (!errorMessage) {
      setEmailOk(true);
      console.log('userOk', setEmailOk);
    }
  };

  useEffect(() => {
    onChangeEmail(email);
    validateUsername(username);
  }, [email, username]);

  return (
    <View style={styleScreens.defaultScreen}>
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
        style={
          emailOk && usernameOk
            ? styleButtons.buttonDefault
            : styleButtons.buttonDisable
        }
      >
        <Pressable
          disabled={!emailOk}
          onPress={() => signUpUser(email, password, username)}
        >
          <Text style={styleButtons.buttonDefaultText}>REGGA MIG</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default RegisterScreen;
