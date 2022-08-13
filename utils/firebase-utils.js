import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc, addDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";
import { ref } from 'firebase/storage'
import { auth, db, storage} from "../lib/firebase";

export const createUser = (user) => {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
}

export const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const getUserByUid = async (uid) => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef)
    return {
        ...userSnap.data(),
        uid,
    }
}


export const createUserInFirestore = async (uid, fullname, username) => {
    const userRef = doc(db, 'users', uid)
    await setDoc(userRef, {
        fullname,
        username,
    })
}


export const createPostInFirestore = async (imageUrl, caption, userName, userId) => {
    return addDoc(collection(db, 'posts'), {
        imageUrl, caption, userName, userId
    })
}

export const addPostToUser = async (postId, userId) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
        posts: arrayUnion(postId)
    })
}

export const createStorageRef = async (path) => {
    return ref(storage, path)
}

