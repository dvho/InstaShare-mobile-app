import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native'
import config from '../../config'

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        }
        this.updateText = this.updateText.bind(this)
        this.register = this.register.bind(this)
    }

    updateText(text, field) {
        let newCredentials = Object.assign(this.state.credentials)
        newCredentials[field] = text
        this.setState({
            credentials: newCredentials
        })
    }

    register() {

        fetch(config.baseUrl + 'signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.credentials)
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if(jsonResponse.confirmation === 'success') {
                this.props.navigation.navigate('main')
            } else {
                throw new Error('something went wrong')
            }
            alert(JSON.stringify(jsonResponse))
        })
        .catch(err => {
            alert(err.message)
        })
    }

    render() {
        return(
            <View
                style={{height: 100 + '%',
                    width: 100 + '%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'ivory'
                }}>
                <Text>Register Page</Text>
                <TextInput value={this.state.credentials} onChangeText={(text, field) => this.updateText(text, 'email')} autoCorrect={false} placeholder="Username" style={styles.input}/>
                <TextInput secureTextEntry value={this.state.credentials} onChangeText={(text, field) => this.updateText(text, 'password')} autoCorrect={false} placeholder="Password" style={styles.input}/>
                <Button title="Sign Up" onPress={this.register}/>
            </View>
        )}
    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 80 + '%',
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'gray',
            margin: 6
        }
    })

export default Register
