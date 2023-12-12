import { StyleSheet, Text,View, SafeAreaView, KeyboardAvoidingView,TextInput,Pressable, Alert} from 'react-native'
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone,setPhone]=useState("");
    const navigation=useNavigation();
    const register=()=>{
      if(email===""||password===""||phone===""){
        Alert.alert('Invalid details', 'please fill all the details', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    
      }
      createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        console.log("user credintials",userCredential);
        const user=userCredential._tokenResponse.email;
        const myUserUid=auth.currentUser.uid;
        setDoc(doc(db,"users",`${myUserUid}`),{
          email:user,
          phone:phone
        })
      })
    }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", padding: 10, marginTop: 30 }}>
      <KeyboardAvoidingView>
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 150 }}>
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>Register</Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: 500 }}>Create a new Account </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                        <TextInput placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor="black" style={{ fontSize: email ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 20, marginLeft: 10 }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput placeholder='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholderTextColor="black" style={{ fontSize: password ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 20, marginLeft: 10 }} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="phone" size={24} color="black" />
                        <TextInput placeholder='phone no' value={phone} onChangeText={(text) => setPhone(text)} placeholderTextColor="black" style={{ fontSize: password ? 18 : 18, borderBottomWidth: 1, borderBottomColor: "gray", width: 300, marginVertical: 20, marginLeft: 10 }} />
                    </View>
                    <Pressable onPress={register} style={{width:200,backgroundColor:"#318CE7",padding:15,borderRadius:7,marginTop:40,marginLeft:"auto",marginRight:"auto"}}>
                        <Text style={{fontSize:18,textAlign:"center",color:"white"}} >Register</Text>
                    </Pressable>
                    <Pressable onPress={()=>navigation.goBack()} style={{marginTop:20}}>
                        <Text style={{textAlign:"center",fontSize:17,color:"gray",fontWeight:"500"}} >
                          Already have an acccount? sign in 
                        </Text>
                    </Pressable>
                </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})