import { Text, View,TextInput, TouchableOpacity, ToastAndroid } from "react-native"
import { StyleSheet } from "react-native"
import todoImage from "../../assets/TodoImage.png"
import { Image } from "react-native"
import { useState } from "react"
import COLORS from "../../consts/Colors"


function signUp ( {navigation} ) {
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    

    const sendDatatoDb = () => {
        if (!data.firstName || !data?.lastName || !data.email || !data?.password) {
            if (!data.firstName) {
                ToastAndroid.show("Please enter first name!", ToastAndroid.SHORT);
                return
            }
            if (!data.lastName) {
                ToastAndroid.show("Please enter last name!", ToastAndroid.SHORT);
                return
            }
            if (!data.email) {
                ToastAndroid.show("Please enter email address!", ToastAndroid.SHORT);
                return
            }
            if (!data.password) {
                ToastAndroid.show("Please enter password!", ToastAndroid.SHORT);
                return
            }
        }
        navigation.navigate('Todo')
    }


        return (
            
            <View style={styles.background}  >
            <Image style={styles.Container}  source={todoImage} >
            </Image>

            <View style={styles.innerContainer} >
                <Text style={styles.text} >
                    Sign Up! 
                </Text>
                <Text style={[styles.text,{fontSize:18,marginTop:5}]} >
                    Fill this Form to Register yourself! 
                </Text>
                <View style={[styles.inputContainer,{marginTop:0}] }>
                    <TextInput onChangeText={(e)=>setData({...data,firstName:e})} placeholder="First Name" placeholderTextColor={"black"}  style={styles.textInput}   />
                    <TextInput onChangeText={(e)=>setData({...data,lastName:e})}  placeholder="Last Name" placeholderTextColor={"black"}  style={styles.textInput}   />
                    <TextInput onChangeText={(e)=>setData({...data,email:e})}  placeholder="Email" placeholderTextColor={"black"}  style={styles.textInput}   />
                    <TextInput onChangeText={(e)=>setData({...data,password:e})}  secureTextEntry={true} placeholder="Password" placeholderTextColor={"black"}  style={styles.textInput}   />
                </View>
                <Text style={{fontSize:12,color:"black",marginTop:10,paddingLeft:5}} >By signing up you are agree to our terms and conditions  </Text>
                <Text style={{fontSize:12,color:"black",paddingLeft:5}} >and privacy policies</Text>
                <TouchableOpacity onPress={sendDatatoDb} style={{alignItems:"center",marginTop:20}} >
                    <Text style={{fontSize:20,color:"white",borderWidth:1,borderColor:"purple",width:"100%",textAlign:"center",borderRadius:10,padding:5,backgroundColor:COLORS.primary}} >SIGN UP</Text>
                </TouchableOpacity>
            
            </View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                 style={{alignItems:"center",marginTop:5}} >
                <Text style={{color:"black"}} >
                    Joined us before? <Text style={{fontSize:16}} >Login</Text>
                </Text>
                </TouchableOpacity>
            </View>
              
        
        )
}

const  styles = StyleSheet.create({
    Container : {
        height:"40%",
        width:'100%',
    },
    innerContainer:{
        marginTop:10,
        padding:10,

    },
    inputContainer:{
        marginTop:10,
        padding:5
    },  
    textInput:{
        borderColor:"white",
        borderWidth:1,
        color:"black",
        padding:0,
        fontSize:18,
        marginTop:15,
        borderBottomColor:"black",
        width:"90%"



    },
    text:{
        fontSize:35,
        color:'black',
        fontWeight:"700"
    }  ,
    background : {
        backgroundColor:"white",
        height:"100%"
    }
})

export default signUp