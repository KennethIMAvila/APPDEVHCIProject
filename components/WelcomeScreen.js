import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/logo.png';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <Text style={styles.title}>TechVanguard</Text>
      <Text style={styles.description}>
        A team dedicated to creating innovative and user-friendly tech solutions for everyday challenges.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#08051D',
    height: '100%',
  },
  logoContainer: {
    marginBottom: '25%',
    marginTop: '30%',
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '18%',
    marginTop: '8%',
  },
  description: {
    fontSize: 19,
    color: 'white',
    textAlign: 'center',
    marginBottom: '25%',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300,
  },
  loginButton: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    left: 38,
    zIndex: 5,
  },
  signUpButton: {
    position: 'absolute',
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 25,
    width: '45%',
    alignItems: 'center',
    right: 30,
    zIndex: 2,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
