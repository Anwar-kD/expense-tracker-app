import {auth} from '../../firebase/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {useState } from "react";

export const ExpenseTracker = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    async function signin(){
        await createUserWithEmailAndPassword(auth,email,password);
    }
    return (
        <div>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signin}>sign in</button>
        </div>
    )
}