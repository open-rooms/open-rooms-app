import React, {useState} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity} from 'react-native';

import {loginStyles as styles} from './loginStyles';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/user-slice';

function FormGroup({label, value, onChangeText, placeholder}: any) {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}

export function Login() {
  const [accountPrivateKey, setAccountPrivateKey] = useState('');
  const dispatch = useDispatch();

  const onLoginPress = async () => {
    if (accountPrivateKey) {
      const privateKey = accountPrivateKey.slice(5);
      dispatch(login({privateKey}));
    } else {
      Alert.alert('Invalid private key');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <FormGroup
        label="Enter your private key to login."
        value={accountPrivateKey}
        onChangeText={setAccountPrivateKey}
        placeholder="nsec1..."
      />
      <TouchableOpacity style={styles.primaryButton} onPress={onLoginPress}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
