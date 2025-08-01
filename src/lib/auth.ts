import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "./firebase"
import type { User } from "./types"

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  churchName: string
  position: string
  phone: string
}

export const signUp = async (data: SignUpData): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const firebaseUser = userCredential.user

    const userData: User = {
      uid: firebaseUser.uid,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      churchName: data.churchName,
      position: data.position,
      phone: data.phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Save user data to Firestore
    await setDoc(doc(db, "users", firebaseUser.uid), userData)

    // Create church document
    const churchData = {
      id: firebaseUser.uid, // Use user ID as church ID for simplicity
      name: data.churchName,
      currency: "NGN",
      timezone: "Africa/Lagos",
      ownerId: firebaseUser.uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await setDoc(doc(db, "churches", firebaseUser.uid), churchData)

    return userData
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
    if (!userDoc.exists()) {
      throw new Error("User data not found")
    }

    return userDoc.data() as User
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      unsubscribe()
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            resolve(userDoc.data() as User)
          } else {
            resolve(null)
          }
        } catch (error) {
          resolve(null)
        }
      } else {
        resolve(null)
      }
    })
  })
}
