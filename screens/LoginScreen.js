import { StyleSheet, Text, SafeAreaView, KeyboardAvoidingView, View, TextInput, Pressable, ActivityIndicator} from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading]=useState(false);
    const navigation=useNavigation();
    useEffect(()=>{
        setLoading(true);
        const unSubscribe=auth.onAuthStateChanged((authUser)=>{
            if(!authUser){
                setLoading(false);
            }
            if(authUser){
                navigation.navigate("Home");
            }
        });
        return unSubscribe;
    },[])
    const login =()=>{
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            console.log("user credential",userCredential);
            const user=userCredential.user;
            console.log("user details",user);
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10, marginTop: 30 }}>
            {loading?(
            <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row",flex:1    }}>
                <Text>
                    Loading
                </Text>
                <ActivityIndicator size="large" color={"red"}/>
            </View>
            ):(
<KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 150 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Sign In</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: 500 }}>Sign In To Your Account </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="black" style={{ fontSize: email ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 20, marginLeft: 10 }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor="black" style={{ fontSize: password ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 30, marginLeft: 10 }} />
                    </View>
                    <Pressable onPress={login} style={{width:200,backgroundColor:"#318CE7",padding:15,borderRadius:7,marginTop:40,marginLeft:"auto",marginRight:"auto"}}>
                        <Text style={{fontSize:18,textAlign:"center",color:"white"}} >Login</Text>
                    </Pressable>
                    <Pressable onPress={()=>navigation.navigate("Register")} style={{marginTop:20}}>
                        <Text style={{textAlign:"center",fontSize:17,color:"gray",fontWeight:"500"}} >
                            Dont't have an account ? sign up 
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
            )}
            
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})