import React from 'react'
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image } from 'react-native'
import config from '../../config'
import actions from '../../redux/actions'
import {connect} from 'react-redux'

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            credentials: {
                email: '',
                password: ''
            }
        }
        this.updateText = this.updateText.bind(this)
        this.login = this.login.bind(this)
    }

    updateText(text, field) {
        let newCredentials = Object.assign(this.state.credentials)
        newCredentials[field] = text
        this.setState({
            credentials: newCredentials
        })
    }

    login() {
        let credentials = this.state.credentials
        credentials.email = this.state.credentials.email.toLowerCase();

        fetch(config.baseUrl + 'login', {
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
                //"Cannot read property 'user' of undefined" for some reason at this line, so commenting it out and navigating to main where I'm hard coding userID for now.
                //this.props.userReceived(jsonResponse.data)
                this.props.navigation.navigate('main')
            } else {
                throw new Error(jsonResponse.message)
            }
        })
        .catch(err => {
            alert(JSON.stringify(err.message))
        })
    }

    render() {
        return(
                <View
                    style={{height: 100 + '%',
                        width: 100 + '%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <View
                        style={{height: 100 + '%',
                            width: 100 + '%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute'
                        }}>
                        <View style={{position: 'relative', backgroundColor: 'rgb(127, 192, 244)', height: 50 + '%', width: 100 + '%'}}></View>
                        <View style={{position: 'relative', backgroundColor: 'rgb(62, 152, 224)', height: 50 + '%', width: 100 + '%'}}></View>
                    </View>

                    <Image source={{uri: `https://lh3.googleusercontent.com/YTR2ICnK951ebvhQa1mymTKIWbz2Sq0Ab7qnGTcU7T47zJPvTqXm65sjKnZ8GxIoubqwWOCsQZUdle7J_Ck6kicWFQ=s${config.styleConstants.screenWidth}-c`}} style={{height: config.styleConstants.screenWidth, width: config.styleConstants.screenWidth, position: 'absolute'}}></Image>




                    <TextInput autoCapitalize="none" value={this.state.credentials.email} onChangeText={(text, field) => this.updateText(text, 'email')} autoCorrect={false} placeholder="Email" style={styles.input}/>
                    <TextInput secureTextEntry autoCapitalize="none" value={this.state.credentials.password} onChangeText={(text, field) => this.updateText(text, 'password')} autoCorrect={false} placeholder="Password" style={styles.input}/>
                    <TouchableOpacity onPress={this.login} style={[styles.button, {marginTop: 10}]}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('register')} style={[styles.button, {marginTop: 10}]}><Text style={styles.buttonText}>Sign Up</Text></TouchableOpacity>

                </View>

        )}
    }

    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 80 + '%',
            backgroundColor: 'white',
            borderWidth: config.styleConstants.fineBorder,
            borderColor: 'gray',
            margin: 6,
            paddingLeft: 10,
            opacity: .85
        },
        button: {
            backgroundColor: 'white',
            opacity: .85,
            borderColor: 'gray',
            borderWidth: config.styleConstants.fineBorder,
            borderRadius: 10
        },
        buttonText: {
            fontSize: 24,
            paddingLeft: 10,
            paddingRight: 10,
            color: 'rgb(62, 152, 224)'
        }
    })

    const mapStateToProps = state => {
        return {

        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            userReceived: (user) => dispatch(actions.userReceived(user))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Login)
