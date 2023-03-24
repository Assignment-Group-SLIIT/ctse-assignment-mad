import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';

import { theme } from '../core/theme'
import { Snackbar } from 'react-native-paper';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const SignupScreen = ({ navigation }) => {

    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [repassword, setRePassword] = useState({ value: '', error: '' })
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("Oops... Something went wrong");

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const onSignupPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }

        if (password.value != repassword.value) {
            setPassword({ ...password, error: "Passwords are not matching" })
            setRePassword({ ...repassword, error: "Passwords are not matching" })
            return
        }

        auth().createUserWithEmailAndPassword(email.value, password.value).then(() => {
            setMsg("Signing up...");
            onToggleSnackBar();
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Root' }],
            // })
        }).catch((error) => {
            if (error.code == 'email-already-in-use') {
                setMsg("Email Provided already Exists");
            } else if (error.code == 'weak-password') {
                setMsg("Password Provided is too weak");
            } else {
                setMsg("Oops, Something went wrong!");
            }
            onToggleSnackBar();
        })
    }

    return (
        <View style={styles.container}>
            <Background>
                <Logo />
                <Text>Welcome to GetFit</Text>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <TextInput
                    label="Re-enter the Password"
                    returnKeyType="done"
                    value={repassword.value}
                    onChangeText={(text) => setRePassword({ value: text, error: '' })}
                    error={!!repassword.error}
                    errorText={repassword.error}
                    secureTextEntry
                />
                <View style={{ marginVertical: 10 }}></View>
                <Button mode="contained" onPress={onSignupPressed}>
                    SignUp
                </Button>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.link}>Signin</Text>
                    </TouchableOpacity>
                </View>
            </Background>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        onDismissSnackBar();
                    },
                }}>
                {msg}
            </Snackbar>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.inactive,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});


export default SignupScreen