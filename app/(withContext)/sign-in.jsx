import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAuth } from '@/contexts/authContext';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TextInput, View } from 'react-native';
import { useLoading } from "../../contexts/loadingContext";

export default function SignInScreen() {
  const { login, logout, register } = useAuth();
  const { isLoading } = useLoading();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(false);

  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    let response;
    if (isRegistering) {
      response = await register(email, password);
    } else {
      response = await login(email, password);
    }

    if (response?.error) {
      Alert.alert('Error', response.error);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <AppText size='heading'>{ isRegistering ? 'Sign Up' : 'Login' }</AppText>
      
      { error ? <AppText color='error'>{ error }</AppText> : null }
      
      <TextInput
        style={styles.input}
        placeholder='Email'
        placeholderTextColor='#aaa'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#aaa'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType='none'
      />

      { isRegistering && (
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          placeholderTextColor='#aaa'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          textContentType='none'
        />
      )}

      <Button
        onPress={handleAuth}
        title={isRegistering ? 'Sign Up' : 'Login'}
      />

      <Button
        onPress={() => setIsRegistering(!isRegistering)}
        title={isRegistering ? 'Already have an account? Login' : "Don't have an account? Sign up"}
      />

      <Button onPress={logout} title="Log out" />

      {isLoading && 
        <ActivityIndicator size="large" color="#0000ff" />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});