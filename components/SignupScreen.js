import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
        try {
            setFontsLoaded(true);
        } catch (error) {
            console.error("Error loading fonts:", error);
        }
    };
    loadFonts();
}, []);

const isFormValid = () => {
    return email.includes("@") && password === confirmPassword && password.length >= 8;
};

const handleSignup = async () => {
    if (!isFormValid()) {
        Alert.alert(
            "Try again",
            "Please enter a valid email and matching passwords with at least 8 characters"
        );
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
            Alert.alert("Success", "Account created successfully");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigation.navigate("LoginScreen");
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            Alert.alert("Error", "Email address already in use");
        } else {
            Alert.alert("Error", `Error creating user: ${error.message}`);
        }
    }
};

if (!fontsLoaded) {
    return null; // or a loading spinner
}

const loginBtn = () => {
  navigation.navigate('LoginScreen')
  navigation.reset({
    index: 0,
    routes: [{name: 'LoginScreen'}],
  });
}

  return (
    <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Let's get</Text>
                <Text style={styles.title}>started</Text>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <Ionicons name="mail" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity 
                        style={styles.showPasswordButton} 
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Ionicons name={isPasswordVisible ? "eye" : "eye-off-outline"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed" size={20} color="#888" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity 
                        style={styles.showPasswordButton} 
                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    >
                        <Ionicons name={isConfirmPasswordVisible ? "eye" : "eye-off-outline"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                <Text style={styles.loginButtonText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={(loginBtn)}>
                <Text style={styles.signupText}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#08051D',
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 40,
        alignItems: 'flex-start',
        width: '100%',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: 'white',
    },
    inputContainer: {
        width: '100%',
        paddingBottom: 20,
        alignItems: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: '#262438',
        borderRadius: 36,
        borderWidth: 2,
        borderColor: '#434064',
        paddingHorizontal: 10,
        paddingLeft: 20,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: 'white',
        fontSize: 20,
    },
    showPasswordButton: {
        position: 'absolute',
        right: 20,
    },
    loginButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40,
    },
    loginButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20,
    },
    signupText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 17,
    },
});

export default SignupScreen;