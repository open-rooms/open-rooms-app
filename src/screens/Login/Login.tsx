import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user-slice'; 
import { loginStyles as styles } from './loginStyles';
import { getUser } from '../../nostr-tools/getUser';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../utils/types';


function validatePrivateKey(key: string) {
  return key.startsWith('nsec1') && key.length > 10;
}

export function Login() {
  const [accountPrivateKey, setAccountPrivateKey] = useState('');
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  if (!navigation) {
    console.log("Navigation object is undefined");
    return;
  }

  const onLoginPress = useCallback(async () => {
    console.log("onLoginPress is triggered");
  
    if (!validatePrivateKey(accountPrivateKey)) {
      console.log("onLoginPress - Invalid private key");
      Alert.alert('Invalid private key');
      return;
    }
  
    console.log("onLoginPress - Private key is valid");
    const privateKey = accountPrivateKey.slice(5);
    console.log("onLoginPress - About to call getUser");
  
    try {
      const userData = await getUser(privateKey);
      console.log("onLoginPress - User data fetched:", userData);
  
      if (!userData) {
        Alert.alert('Failed to fetch user data');
        return;
      }
      console.log('About to dispatch login action');
      dispatch(login({ privateKey, userData }));
      console.log("Login action dispatched");


      // Debug line to check the navigation object
      console.log("Navigation object:", navigation);
  
      console.log("Navigation object right before navigation:", navigation);
      navigation.navigate('Rooms');
      console.log("Navigation should have occurred");
      
    } catch (error) {
      console.log("Error in onLoginPress:", error);
      Alert.alert('Login failed');
    }
  }, [accountPrivateKey, dispatch]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Enter your private key to login.</Text>
        <TextInput
          style={styles.input}
          value={accountPrivateKey}
          onChangeText={setAccountPrivateKey}
          placeholder="nsec1..."
        />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={onLoginPress}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
      <View>
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Rooms')}>
        <Text style={styles.primaryButton}>Test Button</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
