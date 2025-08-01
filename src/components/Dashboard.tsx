"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import {
  Bell,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Users,
  Heart,
  TrendingUp,
  UserCheck,
  Activity,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import toast from "react-hot-toast"
import { format } from "date-fns"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { churchService } from "@/lib/db"
import type { Member, Service, CellGroup, Department, FinancialRecord, Church } from "@/types"

// Dashboard Overview Component
function DashboardOverview() {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [churchData, setChurchData] = useState<Church | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [cellGroups, setCellGroups] = useState<CellGroup[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return

      try {
        const churchId = currentUser.uid // Using user ID as church ID for simplicity

        // Fetch all data in parallel
        const [church, membersData, servicesData, cellGroupsData, departmentsData, financialData] = await Promise.all([
          churchService.getChurchSettings(churchId),
          churchService.getMembers(churchId),
          churchService.getServices(churchId),
          churchService.getCellGroups(churchId),
          churchService.getDepartments(churchId),
          churchService.getFinancialRecords(churchId),
        ])

        setChurchData(church as Church)
        setMembers(membersData as Member[])
        setServices(servicesData as Service[])
        setCellGroups(cellGroupsData as CellGroup[])
        setDepartments(departmentsData as Department[])
        setFinancialRecords(financialData as FinancialRecord[])
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast.error("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentUser])

  // Calculate financial summary
  const calculateFinancialSummary = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const thisMonthRecords = financialRecords.filter((record) => {
      const recordDate = record.date.toDate()
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear
    })

    const tithesThisMonth = thisMonthRecords
      .filter((record) => record.type === "tithe")
      .reduce((sum, record) => sum + record.amount, 0)

    const offeringsThisMonth = thisMonthRecords
      .filter((record) => record.type === "offering")
      .reduce((sum, record) => sum + record.amount, 0)

    const specialOfferingsThisMonth = thisMonthRecords
      .filter((record) => record.type === "special_offering")
      .reduce((sum, record) => sum + record.amount, 0)

    const totalIncome = tithesThisMonth + offeringsThisMonth + specialOfferingsThisMonth

    const totalExpenses = thisMonthRecords
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + record.amount, 0)

    const netIncome = totalIncome - totalExpenses

    // Calculate growth (simplified - comparing to last month)
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const lastMonthRecords = financialRecords.filter((record) => {
      const recordDate = record.date.toDate()
      return recordDate.getMonth() === lastMonth && recordDate.getFullYear() === lastMonthYear
    })

    const lastMonthIncome = lastMonthRecords
      .filter((record) => ["tithe", "offering", "special_offering"].includes(record.type))
      .reduce((sum, record) => sum + record.amount, 0)

    const growth = lastMonthIncome > 0 ? ((totalIncome - lastMonthIncome) / lastMonthIncome) * 100 : 0

    return {
      tithesThisMonth,
      offeringsThisMonth,
      specialOfferingsThisMonth,
      totalIncome,
      totalExpenses,
      netIncome,
      growth,
      target: 500000, // Example target
    }
  }

  const financialSummary = calculateFinancialSummary()

  // Get upcoming services
  const upcomingServices = services.filter((service) => service.date.toDate() > new Date()).slice(0, 3)

  // Get recent members
  const recentMembers = members
    .sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime())
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {currentUser?.displayName || "Pastor"}!</h1>
        <p className="text-blue-100">
          {churchData?.name || "Your Church"} • {format(new Date(), "EEEE, MMMM do, yyyy")}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Members</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{members.length}</div>
            <p className="text-xs text-green-600">+{members.filter((m) => m.status === "new").length} new this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">This Month's Income</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">₦{financialSummary.totalIncome.toLocaleString()}</div>
            <p className="text-xs text-blue-600">
              {financialSummary.growth >= 0 ? "+" : ""}
              {financialSummary.growth.toFixed(1)}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Cell Groups</CardTitle>
            <Home className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{cellGroups.length}</div>
            <p className="text-xs text-purple-600">
              {cellGroups.filter((cg) => cg.status === "growing").length} growing
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Upcoming Services</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{upcomingServices.length}</div>
            <p className="text-xs text-orange-600">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Financial Overview */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Financial Overview
            </CardTitle>
            <CardDescription>Monthly income breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tithes</span>
                <span className="font-medium">₦{financialSummary.tithesThisMonth.toLocaleString()}</span>
              </div>
              <Progress
                value={(financialSummary.tithesThisMonth / financialSummary.totalIncome) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Offerings</span>
                <span className="font-medium">₦{financialSummary.offeringsThisMonth.toLocaleString()}</span>
              </div>
              <Progress
                value={(financialSummary.offeringsThisMonth / financialSummary.totalIncome) * 100}
                className="h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Special Offerings</span>
                <span className="font-medium">₦{financialSummary.specialOfferingsThisMonth.toLocaleString()}</span>
              </div>
              <Progress
                value={(financialSummary.specialOfferingsThisMonth / financialSummary.totalIncome) * 100}
                className="h-2"
              />
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between font-medium">
                <span>Total Income</span>
                <span className="text-green-600">₦{financialSummary.totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Total Expenses</span>
                <span className="text-red-600">₦{financialSummary.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium text-lg">
                <span>Net Income</span>
                <span className={financialSummary.netIncome >= 0 ? "text-green-600" : "text-red-600"}>
                  ₦{financialSummary.netIncome.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Members */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Recent Members
            </CardTitle>
            <CardDescription>Newest additions to your congregation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMembers.length > 0 ? (
                recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.photo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {member.firstName[0]}
                        {member.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs text-slate-500">
                        Joined {format(member.joinDate.toDate(), "MMM dd, yyyy")}
                      </p>
                    </div>
                    <Badge variant={member.status === "new" ? "default" : "secondary"}>{member.status}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">No members yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Services */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            Upcoming Services
          </CardTitle>
          <CardDescription>Your scheduled church services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingServices.length > 0 ? (
              upcomingServices.map((service) => (
                <div key={service.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-slate-900">{service.name}</h4>
                    <p className="text-sm text-slate-600">
                      {format(service.date.toDate(), "EEEE, MMMM do")} at {service.time}
                    </p>
                    <p className="text-xs text-slate-500">{service.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">Expected: {service.expectedAttendance}</p>
                    <Badge variant="outline">{service.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-4">No upcoming services</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to log out")
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: location.pathname === "/dashboard" },
    {
      name: "Members",
      href: "/dashboard/members",
      icon: Users,
      current: location.pathname.startsWith("/dashboard/members"),
    },
    {
      name: "Services",
      href: "/dashboard/services",
      icon: Calendar,
      current: location.pathname.startsWith("/dashboard/services"),
    },
    {
      name: "Finances",
      href: "/dashboard/finances",
      icon: DollarSign,
      current: location.pathname.startsWith("/dashboard/finances"),
    },
    {
      name: "Cell Groups",
      href: "/dashboard/cell-groups",
      icon: Home,
      current: location.pathname.startsWith("/dashboard/cell-groups"),
    },
    {
      name: "Departments",
      href: "/dashboard/departments",
      icon: Activity,
      current: location.pathname.startsWith("/dashboard/departments"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      current: location.pathname.startsWith("/dashboard/settings"),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-slate-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">TitheSpace</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 bg-white border-r border-slate-200">
          <div className="flex h-16 items-center px-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">TitheSpace</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-slate-200" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.photoURL || ""} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {currentUser?.displayName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser?.displayName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/members" element={<div>Members page coming soon...</div>} />
            <Route path="/services" element={<div>Services page coming soon...</div>} />
            <Route path="/finances" element={<div>Finances page coming soon...</div>} />
            <Route path="/cell-groups" element={<div>Cell Groups page coming soon...</div>} />
            <Route path="/departments" element={<div>Departments page coming soon...</div>} />
            <Route path="/settings" element={<div>Settings page coming soon...</div>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
