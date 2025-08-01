import type { Timestamp } from "firebase/firestore"

export interface User {
  id: string
  email: string
  displayName: string
  role: string
  churchId: string
  createdAt: Timestamp
}

export interface Church {
  id: string
  name: string
  address: string
  phone: string
  email: string
  website?: string
  logo?: string
  currency: string
  timezone: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Member {
  id: string
  churchId: string
  firstName: string
  lastName: string
  email?: string
  phone: string
  address?: string
  gender?: string
  birthDate?: Timestamp
  joinDate: Timestamp
  baptized?: boolean
  cellGroupId?: string
  cellGroup?: string
  status: "active" | "inactive" | "new"
  notes?: string
  photo?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Service {
  id: string
  churchId: string
  name: string
  date: Timestamp
  time: string
  type: string
  description?: string
  expectedAttendance: number
  actualAttendance?: number
  status: "upcoming" | "completed" | "cancelled" | "this-week"
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CellGroup {
  id: string
  churchId: string
  name: string
  leader: string
  leaderPhone?: string
  location: string
  meetingDay?: string
  meetingTime?: string
  members: number
  growth: string
  status: "growing" | "stable" | "declining"
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface Department {
  id: string
  churchId: string
  name: string
  head: string
  headPhone?: string
  members: number
  description?: string
  icon: string
  color: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface FinancialRecord {
  id: string
  churchId: string
  type: "tithe" | "offering" | "special_offering" | "expense" | "other"
  category?: string
  amount: number
  date: Timestamp
  description?: string
  recordedBy: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface FinancialSummary {
  tithesThisMonth: number
  offeringsThisMonth: number
  specialOfferingsThisMonth: number
  totalIncome: number
  totalExpenses: number
  netIncome: number
  growth: number
  target: number
}
