import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";
import { getDatabase,onValue,ref,set } from "firebase/database";



const auth = getAuth(app)
const database = getDatabase(app)


function Signup (obj) {
    console.log(obj,"Obj")
    const {email,password} = obj
    return  new Promise ((resolve,reject)=>{
        createUserWithEmailAndPassword(auth,email,password).then((success)=>{
            const {user} = success
            const reference = ref(database,`users/${user.uid}`)
            // delete obj.password
            set(reference,obj).then((success)=>{
                resolve(success)
            }).catch((error)=>{
                reject(error)
            })
        }).catch((error)=>{
            console.log(error.message)
        })
    })
}

const LoginUser = (obj) => {
    const {email,password} = obj
        return new Promise ((resolve,reject)=>{
            signInWithEmailAndPassword(auth,email,password).then((success)=>{
                const {user} = success
                const reference = ref(database,`users/${user.uid}`)
                onValue(reference,(e)=>{
                    if(e.exists()){
                        let val = e.val()
                        resolve(val)
                    }
                    else{
                        reject("data not Found")
                    }
                })
            }).catch((error)=>{
                console.log(error.code)
            })
        })
}


export {Signup,LoginUser}