import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Member, Service, CellGroup, Department, FinancialRecord } from "./types"

// Helper function to convert Firestore timestamps to Date objects
const convertTimestamps = (data: any) => {
  const converted = { ...data }
  Object.keys(converted).forEach((key) => {
    if (converted[key] instanceof Timestamp) {
      converted[key] = converted[key].toDate()
    }
  })
  return converted
}

// Members
export const addMember = async (
  churchId: string,
  memberData: Omit<Member, "id" | "churchId" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "members"), {
    ...memberData,
    churchId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getMembers = async (churchId: string): Promise<Member[]> => {
  const q = query(collection(db, "members"), where("churchId", "==", churchId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Member[]
}

export const updateMember = async (memberId: string, updates: Partial<Member>): Promise<void> => {
  await updateDoc(doc(db, "members", memberId), {
    ...updates,
    updatedAt: new Date(),
  })
}

export const deleteMember = async (memberId: string): Promise<void> => {
  await deleteDoc(doc(db, "members", memberId))
}

// Services
export const addService = async (
  churchId: string,
  serviceData: Omit<Service, "id" | "churchId" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "services"), {
    ...serviceData,
    churchId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getServices = async (churchId: string): Promise<Service[]> => {
  const q = query(collection(db, "services"), where("churchId", "==", churchId), orderBy("date", "desc"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Service[]
}

export const updateService = async (serviceId: string, updates: Partial<Service>): Promise<void> => {
  await updateDoc(doc(db, "services", serviceId), {
    ...updates,
    updatedAt: new Date(),
  })
}

// Cell Groups
export const addCellGroup = async (
  churchId: string,
  cellGroupData: Omit<CellGroup, "id" | "churchId" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "cellGroups"), {
    ...cellGroupData,
    churchId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getCellGroups = async (churchId: string): Promise<CellGroup[]> => {
  const q = query(collection(db, "cellGroups"), where("churchId", "==", churchId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as CellGroup[]
}

// Departments
export const addDepartment = async (
  churchId: string,
  departmentData: Omit<Department, "id" | "churchId" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "departments"), {
    ...departmentData,
    churchId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getDepartments = async (churchId: string): Promise<Department[]> => {
  const q = query(collection(db, "departments"), where("churchId", "==", churchId), orderBy("createdAt", "desc"))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as Department[]
}

// Financial Records
export const addFinancialRecord = async (
  churchId: string,
  recordData: Omit<FinancialRecord, "id" | "churchId" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const docRef = await addDoc(collection(db, "financialRecords"), {
    ...recordData,
    churchId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return docRef.id
}

export const getFinancialRecords = async (
  churchId: string,
  startDate?: Date,
  endDate?: Date,
): Promise<FinancialRecord[]> => {
  let q = query(collection(db, "financialRecords"), where("churchId", "==", churchId), orderBy("date", "desc"))

  if (startDate && endDate) {
    q = query(
      collection(db, "financialRecords"),
      where("churchId", "==", churchId),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      orderBy("date", "desc"),
    )
  }

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...convertTimestamps(doc.data()),
  })) as FinancialRecord[]
}

// Analytics
export const getFinancialSummary = async (churchId: string, startDate: Date, endDate: Date) => {
  const records = await getFinancialRecords(churchId, startDate, endDate)

  const summary = {
    totalTithes: 0,
    totalOfferings: 0,
    totalSpecialOfferings: 0,
    totalDonations: 0,
    totalAmount: 0,
    recordCount: records.length,
  }

  records.forEach((record) => {
    switch (record.type) {
      case "tithe":
        summary.totalTithes += record.amount
        break
      case "offering":
        summary.totalOfferings += record.amount
        break
      case "special_offering":
        summary.totalSpecialOfferings += record.amount
        break
      case "donation":
        summary.totalDonations += record.amount
        break
    }
    summary.totalAmount += record.amount
  })

  return summary
}
