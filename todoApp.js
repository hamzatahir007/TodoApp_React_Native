import { Text,StyleSheet,View,ImageBackground,Image, TextInput,TouchableOpacity} from "react-native"
import Images from "./Assets/todoImage.jpg"
import Logo from "./Assets/logoTodo.jpg"

function TodoApp () {
    return(
        
        <View style={styles.Container} >
        <Image style={styles.image} source={Logo} />
        <View style={styles.innerContainer} >
        <Text style={styles.textHeading} >
            TODO APP
        </Text>
        <TextInput style={styles.textInput} placeholderTextColor="black" placeholder="Enter Todo Here..." />
        <TouchableOpacity style={styles.touchableOpacity} >
            <Text style={styles.textHeading} >ADD TODO</Text>
        </TouchableOpacity>
        </View>
        </View>
        
        
    )
}


const styles = StyleSheet.create({
    Container : {
        width:"100%",
        height:"100%",
        color:"black",
        backgroundColor:"white",
        fontSize:18
    },
    image:{
        width:"100%",
        height:'30%',

    },
    textHeading:{
        fontSize:24,
        fontWeight:"700",
        color:"black"
    },
    innerContainer:{
        alignItems:"center",
        marginTop:10,
    },
    textInput:{
        color:"black",
        borderColor:"black",
        borderBottomColor:"black",
        borderWidth:1,
        width:"90%",
        marginTop:10,
        fontSize:22,
        padding:10,
        borderRadius:15
    },
    touchableOpacity:{
        width:"90%",
        alignItems:"center",
        marginTop:10,
        borderWidth:1,
        borderColor:"black",
        padding:6,
        backgroundColor:"rgba(90,120,220,0.7)",
        borderRadius:10


    }
    
})



export default TodoApp