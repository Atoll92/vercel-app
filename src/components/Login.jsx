import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import {  signInAnonymously } from 'firebase/auth';

import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import '../global.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onAnonymousSignup = () => {
        signInAnonymously(auth)
          .then((userCredential) => {
            // Signed in anonymously
            const user = userCredential.user;
            navigate("/home");
            console.log("Anonymous user after sign-up:");
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Anonymous sign-up error:", errorCode, errorMessage);
          });
      };
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log("userafterlogin");
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main className='login_pannel' >        
                <section>
                    <div>                                            
                                           
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       
                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                            or     <button onClick={onAnonymousSignup}>
                Sign up anonymously
              </button>
                        </p>
                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login