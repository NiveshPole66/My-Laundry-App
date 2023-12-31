import { StyleSheet, Text, View,SafeAreaView,TextInput, Pressable, ScrollView,Alert} from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker'
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

const pickUpScreen = () => {
  const [selectedDate,setSelectedDate]=useState("");
  const cart=useSelector((state)=>state.cart.cart);
  const total=cart.map((item)=>item.quantity*item.price).reduce((curr,prev)=> curr+prev,0);
  const [selectedTime,setSelectedTime]=useState([]);
  const [delivery,setDelivery]=useState([]);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];
  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];
  const navigation=useNavigation();
  const proceedToCart=()=>{
    if(!selectedDate||!selectedTime||!delivery){
      Alert.alert('empty or invalid', 'please select all of the fields', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if(selectedDate&&selectedTime&&delivery){
      navigation.replace("Cart",{
        selectedTime:selectedTime,
        no_Of_days:delivery,
        pickUpDate:selectedDate,
      })

    }
  }
  return (
    <>
    <SafeAreaView>
      <Text style={{fontSize:16,fontWeight:"500",marginTop:40,marginHorizontal:10}}>enter address</Text>
      <TextInput style={{padding:40,borderColor:"gray",borderWidth:0.7,paddingVertical:80,borderRadius:9,margin:10}} />

      <Text style={{fontSize:16,fontWeight:"500",marginTop:20,marginHorizontal:10}}>Pickup Date </Text>   
      <HorizontalDatepicker
  mode="gregorian"
  startDate={new Date('2023-09-20')}
  endDate={new Date('2023-09-26')}
  initialSelectedDate={new Date('2020-08-22')}
  onSelectedDateChange={(date) => setSelectedDate(date)}
  selectedItemWidth={170}
  unselectedItemWidth={38}
  itemHeight={38}
  itemRadius={10}
  selectedItemTextStyle={styles.selectedItemTextStyle}
  unselectedItemTextStyle={styles.selectedItemTextStyle}
  selectedItemBackgroundColor="#222831"
  unselectedItemBackgroundColor="#ececec"
  flatListContainerStyle={styles.flatListContainerStyle}
/>   
<Text style={{fontSize:16,fontWeight:"500",marginTop:10,marginHorizontal:10}}>Select Time </Text>  
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
{times.map((item,index)=>(
  <Pressable key={index} onPress={()=> setSelectedTime(item.time)} style={
    selectedTime.includes(item.time)?{margin:10,borderRadius:7,padding:15,borderColor:"red",borderWidth:0.7}:{margin:10,borderRadius:7,padding:15,borderColor:"gray",borderWidth:0.7}
  } >
    <Text>{item.time}</Text>
  </Pressable>
))} 
</ScrollView>
<Text style={{fontSize:16,fontWeight:"500",marginTop:10,marginHorizontal:10}}>Delivery Date </Text>  
    <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      {deliveryTime.map((item,i)=>(
        <Pressable  style={
          delivery.includes(item.name)?{margin:10,borderRadius:7,padding:15,borderColor:"red",borderWidth:0.7}:{margin:10,borderRadius:7,padding:15,borderColor:"gray",borderWidth:0.7}
        }  onPress={()=> setDelivery(item.name)} key={i}>
          <Text>
            {item.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
    </SafeAreaView>
    {total===0?(null):(
      <Pressable style={{backgroundColor:"#088F8F",padding:10,marginBottom:30,margin:12,borderRadius:7,flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginTop:"auto"}}>
  <View>
<Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items |  ${total}</Text>
<Text style={{fontSize:15,fontWeight:"350",color:"white",marginVertical:3}}>extra charges might apply</Text>
  </View>
  <Pressable onPress={proceedToCart}>
    <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to Cart</Text>
  </Pressable>
</Pressable>
    )}
    </>
  )
}

export default pickUpScreen

const styles = StyleSheet.create({})