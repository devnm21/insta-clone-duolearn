import React, {ReactChild, useEffect, useState} from "react";
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../lib/firebase";
import {getUserByUid} from "../utils/firebase-utils";

export const UserContext = React.createContext({
    profile: {
        fullname: "",
        username: "",
        email: "",
        avatar: "",
        bio: "",
    },
    updateProfile: () => {},
});

export const UserProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        fullname: "",
        username: "",
        email: "",
        avatar: "",
        bio: "",
    });

    const updateProfile = (newProfile) => {
        setProfile(newProfile);
    }

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            const firestoreUser = await getUserByUid(user.uid)
            updateProfile(firestoreUser)
        })
    }, [])

    return (
        <UserContext.Provider value={{ profile, updateProfile }}>
            {children}
        </UserContext.Provider>
    );
}
