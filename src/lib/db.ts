import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore"
import { db } from "./firebase"

// Generic function to get a document by ID
export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T
    } else {
      return null
    }
  } catch (error) {
    console.error(`Error getting ${collectionName} document:`, error)
    throw error
  }
}

// Generic function to get documents from a collection with optional query constraints
export async function getDocuments<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints)
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T)
  } catch (error) {
    console.error(`Error getting ${collectionName} documents:`, error)
    throw error
  }
}

// Generic function to add a document to a collection
export async function addDocument<T extends DocumentData>(collectionName: string, data: T): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return docRef.id
  } catch (error) {
    console.error(`Error adding ${collectionName} document:`, error)
    throw error
  }
}

// Generic function to update a document
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>,
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error(`Error updating ${collectionName} document:`, error)
    throw error
  }
}

// Generic function to set a document (create or overwrite)
export async function setDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: T,
  merge = true,
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id)
    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge },
    )
  } catch (error) {
    console.error(`Error setting ${collectionName} document:`, error)
    throw error
  }
}

// Generic function to delete a document
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error(`Error deleting ${collectionName} document:`, error)
    throw error
  }
}

// Helper functions for specific collections
export const churchService = {
  // Members
  getMembers: (churchId: string) =>
    getDocuments("members", [where("churchId", "==", churchId), orderBy("createdAt", "desc")]),

  addMember: (data: any) => addDocument("members", data),

  updateMember: (id: string, data: any) => updateDocument("members", id, data),

  deleteMember: (id: string) => deleteDocument("members", id),

  // Services/Events
  getServices: (churchId: string) =>
    getDocuments("services", [where("churchId", "==", churchId), orderBy("date", "asc")]),

  addService: (data: any) => addDocument("services", data),

  updateService: (id: string, data: any) => updateDocument("services", id, data),

  deleteService: (id: string) => deleteDocument("services", id),

  // Cell Groups
  getCellGroups: (churchId: string) =>
    getDocuments("cellGroups", [where("churchId", "==", churchId), orderBy("name", "asc")]),

  addCellGroup: (data: any) => addDocument("cellGroups", data),

  updateCellGroup: (id: string, data: any) => updateDocument("cellGroups", id, data),

  deleteCellGroup: (id: string) => deleteDocument("cellGroups", id),

  // Departments
  getDepartments: (churchId: string) =>
    getDocuments("departments", [where("churchId", "==", churchId), orderBy("name", "asc")]),

  addDepartment: (data: any) => addDocument("departments", data),

  updateDepartment: (id: string, data: any) => updateDocument("departments", id, data),

  deleteDepartment: (id: string) => deleteDocument("departments", id),

  // Financial Records
  getFinancialRecords: (churchId: string, type?: string, startDate?: Date, endDate?: Date) => {
    const constraints: QueryConstraint[] = [where("churchId", "==", churchId), orderBy("date", "desc")]

    if (type) {
      constraints.push(where("type", "==", type))
    }

    if (startDate) {
      constraints.push(where("date", ">=", startDate))
    }

    if (endDate) {
      constraints.push(where("date", "<=", endDate))
    }

    return getDocuments("financialRecords", constraints)
  },

  addFinancialRecord: (data: any) => addDocument("financialRecords", data),

  updateFinancialRecord: (id: string, data: any) => updateDocument("financialRecords", id, data),

  deleteFinancialRecord: (id: string) => deleteDocument("financialRecords", id),

  // Church Settings
  getChurchSettings: (churchId: string) => getDocument("churches", churchId),

  updateChurchSettings: (churchId: string, data: any) => updateDocument("churches", churchId, data),
}
