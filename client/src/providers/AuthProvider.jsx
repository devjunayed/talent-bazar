import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebase.config';
import axios from 'axios';


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const userEmailLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email;
            const loggedEmail = { email: userEmail };

            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axios.post('https://talent-bazar.vercel.app/jwt', loggedEmail, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            } else {
                axios.post('https://talent-bazar.vercel.app/logout', loggedEmail, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }

        })

        return () => {
            unSubscribe();
        };
    }, [user?.email])

    const values = {
        userRegister,
        userLogin,
        userLogOut,
        userEmailLogin,
        user,
        loading
    }

    return (
        <AuthContext.Provider value={values}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}
export default AuthProvider;