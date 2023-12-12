import { StyleSheet, Text, View,SafeAreaView,Alert, Pressable,Image, TextInput,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../productReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';



const HomeScreen = () => {
  const cart=useSelector((state)=>state.cart.cart);
  const [items,setItems]=useState([]);
  const total=cart.map((item)=>item.quantity*item.price).reduce((curr,prev)=> curr+prev,0);
  const navigation=useNavigation();
  console.log(cart);
  const [displayCurrentAddress,setdisplayCurrentAddress]=useState("we are loading the location");
  const[locationServicesEnabled,setlocationServicesEnabled]=useState(false);
    useEffect(()=>{
      checkIfLocationEnabled();
      getCurrentLocation();

    },[]);
    const checkIfLocationEnabled=async ()=>{
      let enabled=await Location.hasServicesEnabledAsync();
      if(!enabled){
        Alert.alert("Location services not enabled", "please enable the location services", [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable:false});
    
      }else{
        setlocationServicesEnabled(enabled);
      }
    }
    const getCurrentLocation=async()=>{
      let {status}=await Location.requestForegroundPermissionsAsync();
      if(status!="granted"){
        Alert.alert("permission not granted", "allow the app to use the location servicesS", [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable:false});
    

      };
      const {coords}= await Location.getCurrentPositionAsync();
      
      if(coords){
        const {latitude,longitude}=coords;
        let response= await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
        for(let item of response){
          let address =`${item.name} ${item.city} ${item.postalCode}`;
          setdisplayCurrentAddress(address)
        }
      }
    };
    const product =useSelector((state)=> state.product.product);
    const dispatch=useDispatch();
    useEffect(()=>{
      if(product.length>0) return;
      
      const fetchProducts=async()=>{
        const colRef=collection(db,"types");
        const docsSnap=await getDocs(colRef);
        docsSnap.forEach((doc)=>{
          items.push(doc.data());
        });
        items?.map((service)=>{
          dispatch(getProducts(service));
        })
      }
      fetchProducts();
    },[]);
    
    const services = [
      {
        id: "0",
        image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
        name: "shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "11",
        image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
        name: "T-shirt",
        quantity: 0,
        price: 10,
      },
      {
        id: "12",
        image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
        name: "dresses",
        quantity: 0,
        price: 10,
      },
      {
        id: "13",
        image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
        name: "jeans",
        quantity: 0,
        price: 10,
      },
      {
        id: "14",
        image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
        name: "Sweater",
        quantity: 0,
        price: 10,
      },
      {
        id: "15",
        image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
        name: "shorts",
        quantity: 0,
        price: 10,
      },
      {
        id: "16",
        image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
        name: "Sleeveless",
        quantity: 0,
        price: 10,
      },
    ];
  
  return (
    <>
    <ScrollView style={{backgroundColor:"#F0F0F0",flex:1,marginTop:30}}>
      <View style={{flexDirection:"row",alignItems:"center",paddingTop:21,paddingRight:10,paddingLeft:10,paddingBottom:10}}>
      <MaterialIcons name="location-on" size={30} color="#fd5c63" />
       <View> 
        <Text style={{fontSize:15,fontWeight:"600"}}>Home</Text>
        <Text>{displayCurrentAddress}</Text>
      
       </View>
       <Pressable onPress={()=>navigation.navigate("Profile")} style={{marginLeft:"auto",marginRight:7}}>
          <Image style={{width:40,height:40,borderRadius:20}} source={{uri:"https://lh3.googleusercontent.com/ogw/AKPQZvwzAiXRgTI3oDMwSpqRszWZ9ilSMYBV1q1j3yFRrQ=s32-c-mo"}}/>
       </Pressable>
      </View>
      <View style={{padding:10,margin:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderWidth:0.8,borderColor:"#C0C0C0",borderRadius:12}}>
        <TextInput placeholder="Search for items"/>
        <Feather name="search" size={24} color="#fd5c63" />
      </View>
      <Carousel/>
      <Services/>
      {product.map((item,index)=>(
        <DressItem item={item} key={index}/>
      ))}
    </ScrollView>
    {total===0?(null):(
      <Pressable style={{backgroundColor:"#088F8F",padding:10,marginBottom:40,margin:12,borderRadius:7,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
  <View>
<Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  ${total}</Text>
<Text style={{fontSize:15,fontWeight:"350",color:"white",marginVertical:6}}>extra charges might apply</Text>
  </View>
  <Pressable onPress={()=> navigation.navigate("PickUp")}>
    <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
  </Pressable>
</Pressable>
    )}


    </>
    
  );
};

export default HomeScreen

const styles = StyleSheet.create({})