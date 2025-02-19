import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState, createContext } from "react";

import toast from "react-hot-toast";
import { auth } from "../Firebase/Firebase.init";


export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password,name) => {
        setLoading(true);
        toast.success('Successfully Account Created!');
        return createUserWithEmailAndPassword(auth, email, password,name);
    };

    const signINUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {

            setUser(currentUser);
            setLoading(false); 
        });

        return () => {
            unSubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        signINUser,
        updateUserProfile,
        user,
        signOutUser,
        loading,
        signInWithGoogle,
        setLoading,
        setUser
    };



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;