import React, { useContext, useState, useEffect } from "react";
import {firebase} from "./firebase";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [displayName, setDisplayName] = useState();
  const [editProfile, setEditProfile] = useState(false);

  const signUpAsGuest = () => {
    firebase.auth().signInAnonymously();
  }

  const signUp = (email, password, firstName, lastName) => {
    setDisplayName(`${firstName} ${lastName[0]}.`);
    setEditProfile(true);
    firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  const signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  const signOut = () => {
    firebase.auth().signOut()
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (editProfile && user) {
        user.updateProfile({displayName: displayName})
        setEditProfile(false);
      }
      setCurrentUser(user);
    })
    return unsubscribe;
  }, [displayName, editProfile])


  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
    signUpAsGuest
  }

  return (
    <AuthContext.Provider value={value}>
     { children }
    </AuthContext.Provider>
  )
}
