export interface User {
  uid: string
  email: string
  firstName: string
  lastName: string
  churchName: string
  position: string
  phone: string
  createdAt: Date
  updatedAt: Date
}

export interface Member {
  id: string
  churchId: string
  name: string
  email?: string
  phone: string
  cellGroup: string
  department?: string
  joinDate: Date
  status: "active" | "inactive" | "new"
  address?: string
  dateOfBirth?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  churchId: string
  name: string
  date: Date
  time: string
  expectedAttendance: number
  actualAttendance?: number
  status: "upcoming" | "completed" | "cancelled"
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface CellGroup {
  id: string
  churchId: string
  name: string
  leader: string
  leaderPhone?: string
  members: string[] // Array of member IDs
  location: string
  meetingDay: string
  meetingTime: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface Department {
  id: string
  churchId: string
  name: string
  head: string
  headPhone?: string
  members: string[] // Array of member IDs
  description?: string
  status: "active" | "inactive"
  createdAt: Date
  updatedAt: Date
}

export interface FinancialRecord {
  id: string
  churchId: string
  type: "tithe" | "offering" | "special_offering" | "donation"
  amount: number
  currency: string
  donorName?: string
  donorPhone?: string
  isAnonymous: boolean
  date: Date
  description?: string
  serviceId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Church {
  id: string
  name: string
  address?: string
  phone?: string
  email?: string
  website?: string
  denomination?: string
  foundedDate?: Date
  currency: string
  timezone: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}
