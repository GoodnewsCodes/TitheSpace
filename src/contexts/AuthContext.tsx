"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  currentUser: User | null
  loading: boolean
  signup: (email: string, password: string, displayName: string) => Promise<User>
  login: (email: string, password: string) => Promise<User>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function signup(email: string, password: string, displayName: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Update profile with display name
    await updateProfile(user, { displayName })

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      displayName,
      createdAt: serverTimestamp(),
      role: "admin", // Default role for new users
    })

    return user
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => userCredential.user)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  async function updateUserProfile(displayName: string) {
    if (!currentUser) throw new Error("No user logged in")

    await updateProfile(currentUser, { displayName })

    // Update user document in Firestore
    await setDoc(
      doc(db, "users", currentUser.uid),
      {
        displayName,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (userDoc.exists()) {
          // You could extend the user object with custom data here if needed
          // const userData = userDoc.data();
          // user.customData = userData;
        }
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
