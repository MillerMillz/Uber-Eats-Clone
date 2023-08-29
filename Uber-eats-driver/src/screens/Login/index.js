import { StyleSheet, Text,TextInput,TouchableOpacity, View,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {post} from "../../../apiCalls"
import apiRoutes from '../../../apiRoutes'
import { useAuthContext } from '../../contexts/AuthContext'


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation()
    // useEffect(  ()=>{
    //     const unsubcribe =auth.onAuthStateChanged(user => {
    //         if(user){
    //             navigation.replace("HomeTabs")
    //         }
    //     })
    //     return unsubcribe
    // },[])

    const {setAuthUser} = useAuthContext();

    const handleSignUp = async () => {
        var data = await post(apiRoutes.register,{
            Email:email,
            Password:password
        })
        console.log(data)
        if(data.success)
        {
            console.log("Signed Up")
            navigation.goBack();
            
        }
        else
        {
            var errors='';
            data.errors.map(error=>{errors = errors+error+ '/n'});
            alert(errors);
        }
        
    }
    const handleLogin =  async () => {
        var data = await post(apiRoutes.login,{
            Email:email,
            Password:password
        })
        console.log(data)
        if(data.success)
        {
            setAuthUser(data.response.data)
            console.log(data.response.data)
            navigation.goBack();
            
        }
        else
        {
            var errors='';
            data.errors.map(error=>{errors = errors+error+ '/n'});
            alert(errors);
        }
    }

  return (
    <KeyboardAvoidingView
    style={styles.loginContainer}
    behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput 
            placeholder='Email'
            value={ email}
            onChangeText={text => setEmail(text)}
            style={styles.input}/>
            <TextInput 
            placeholder='Password'
            value={ password }
            onChangeText={text => setPassword(text) }
            style={styles.input}
            secureTextEntry/>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
    loginContainer:{
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    inputContainer:{
        width:'80%'
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight: '700',
        fontSize: 16
    }

    ,
    buttonOutline:{
        backgroundColor:'white',
        borderColor:'#0782F9',
        marginTop:5,
        borderWidth:2
    },
    buttonOutlineText:{
        color:'#0782F9',
        fontWeight: '700',
        fontSize: 16
    }
})
