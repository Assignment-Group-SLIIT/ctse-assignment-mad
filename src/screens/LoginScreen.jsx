import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import auth from '@react-native-firebase/auth';

import { OnboardFlow } from 'react-native-onboard';
import { theme } from '../core/theme'
import { Snackbar } from 'react-native-paper';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState("Oops... Something went wrong");

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
        auth().signInWithEmailAndPassword(email.value, password.value).then(() => {
            setMsg("Signing in...");
            onToggleSnackBar();
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Root' }],
            // })
        }).catch((error) => {
            setMsg("Please check your credentials!");
            onToggleSnackBar();
            console.log("error while signing in >>> ", error)
        })
    }

    return (
        <View style={styles.container}>
            <OnboardFlow pages={[
                {
                    title: 'Welcome to GetFit',
                    subtitle: 'Your Personal Fitness Planner',
                    imageUri: 'https://i.ibb.co/7zcdSLs/logo02.png'
                },
                {
                    title: 'You Don\'t Have to Memorize Things',
                    subtitle: 'Now you can plan personal workouts, meal plans, supplements and reminders for your clients',
                    imageUri: 'https://i.ibb.co/KmgdW1m/101-gym-guy-removebg-preview.png'
                }
            ]}
                type='fullscreen' // Change to either 'fullscreen', 'bottom-sheet', or 'inline'
                paginationSelectedColor={theme.colors.primary}
            // PrimaryButtonComponent={() => PrimaryButton({ style: { backgroundColor: theme.colors.primary } })}
            />


            <Background>
                <Logo />
                <Text>Welcome back.</Text>
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
                <View style={{ marginVertical: 10 }}></View>
                <Button mode="contained" onPress={onLoginPressed}>
                    Login
                </Button>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('Signup')}>
                        <Text style={styles.link}>Sign up</Text>
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
    );
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

export default LoginScreen