import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase';
import { updateProfile } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
 
const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [displayName, setName] = useState('');
    const [uid , setUid] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
    //   await createUserWithEmailAndPassword(auth, email, password  )

      
    //     .then((userCredential) => {

    //         // Signed in
            
    //         console.log(user);
    //         
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         console.log(errorCode, errorMessage);
    //         // ..
    //     });

       const user = await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
 
      await updateProfile(auth.currentUser, { displayName: displayName}).catch(
        (err) => console.log(err)
      );

 

  writeUserData( displayName , email) 

      navigate("/home")
 
   
    }


    function writeUserData( displayName , email) {
        const db = getDatabase();
        set(ref(db, 'users/' + auth.currentUser.uid), {
          username: displayName,
          email: email,
          
          // profile_picture : imageUrl
        });
      }


     


 
 
  return (
    <main className="grid min-h-screen place-content-center bg-gradient-to-b from-blue-700 to-blue-800">
    <section className="flex flex-col items-center justify-center gap-7 text-center text-blue-100">
            <div>
                <div>                  
                    <h1> FocusApp </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>
                        <div>
                        <label htmlFor="display-name">
                              Display Name
                            </label>
                            <input
                                type="name"
                                value={displayName}
                                onChange={(e) => setName(e.target.value)}  
                                required                                    
                                placeholder="Display name"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                                                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup