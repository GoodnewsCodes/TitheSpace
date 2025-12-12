"use client"
import { useState } from "react"
import {
  Bell,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Users,
  Heart,
  TrendingUp,
  Plus,
  UserCheck,
  Clock,
  MapPin,
  Phone,
  Gift,
  Megaphone,
  ArrowUpRight,
  Star,
  Activity,
  Target,
  Zap,
  X,
  Edit,
  Trash2,
  Search,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react"

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/ui/theme-toggle"

// Add these constants at the top after imports
const financialStats = {
  tithesThisMonth: 2500000,
  offeringsThisMonth: 800000,
  specialOfferingsThisMonth: 450000,
  target: 5000000,
  growth: 12,
}

const recentMembers = [
  {
    name: "Adebayo Ogundimu",
    phone: "+234 803 123 4567",
    cellGroup: "Victory Cell",
    joinDate: "3 days ago",
    status: "active",
    avatar: "AO",
  },
  {
    name: "Chioma Okwu",
    phone: "+234 701 234 5678",
    cellGroup: "Faith Cell",
    joinDate: "1 week ago",
    status: "active",
    avatar: "CO",
  },
  {
    name: "Ibrahim Musa",
    phone: "+234 805 987 6543",
    cellGroup: "Hope Cell",
    joinDate: "2 weeks ago",
    status: "new",
    avatar: "IM",
  },
]

const upcomingServices = [
  {
    name: "First Service",
    date: "Sunday",
    time: "7:00 AM",
    attendance: 800,
    expected: 850,
    status: "upcoming",
  },
  {
    name: "Second Service",
    date: "Sunday",
    time: "9:30 AM",
    attendance: 1200,
    expected: 1300,
    status: "upcoming",
  },
  {
    name: "Midweek Service",
    date: "Wednesday",
    time: "6:00 PM",
    attendance: 400,
    expected: 450,
    status: "this-week",
  },
  {
    name: "Friday Night Vigil",
    date: "Friday",
    time: "10:00 PM",
    attendance: 300,
    expected: 350,
    status: "this-week",
  },
]

const cellGroups = [
  { name: "Victory Cell", leader: "Bro. Tunde", members: 25, location: "Ikeja", growth: "+3", status: "growing" },
  {
    name: "Faith Cell",
    leader: "Sis. Grace",
    members: 18,
    location: "Victoria Island",
    growth: "+1",
    status: "stable",
  },
  { name: "Hope Cell", leader: "Bro. Samuel", members: 22, location: "Surulere", growth: "+5", status: "growing" },
  { name: "Love Cell", leader: "Sis. Funmi", members: 30, location: "Lekki", growth: "+2", status: "stable" },
]

const departments = [
  { name: "Choir", head: "Sis. Blessing", members: 45, icon: "🎵", color: "bg-purple-100 text-purple-700" },
  { name: "Ushering", head: "Bro. David", members: 60, icon: "👋", color: "bg-blue-100 text-blue-700" },
  { name: "Protocol", head: "Bro. Emmanuel", members: 25, icon: "🤝", color: "bg-green-100 text-green-700" },
  { name: "Children Church", head: "Sis. Mary", members: 35, icon: "👶", color: "bg-yellow-100 text-yellow-700" },
  { name: "Youth", head: "Bro. Joseph", members: 120, icon: "⚡", color: "bg-orange-100 text-orange-700" },
  { name: "Media", head: "Bro. Michael", members: 15, icon: "📹", color: "bg-red-100 text-red-700" },
]

function AppSidebar({ currentView, onNavigate }: { currentView: string; onNavigate: (view: string) => void }) {
  const navItems = [
    { title: "Dashboard", url: "dashboard", icon: Home, isActive: currentView === "dashboard" },
    { title: "Members", url: "members", icon: Users, isActive: currentView === "members" },
    { title: "Tithes & Offerings", url: "finances", icon: DollarSign, isActive: currentView === "finances" },
    { title: "Cell Groups", url: "cell-groups", icon: UserCheck, isActive: currentView === "cell-groups" },
    { title: "Services & Events", url: "services", icon: Calendar, isActive: currentView === "services" },
    { title: "Departments", url: "departments", icon: Megaphone, isActive: currentView === "departments" },
    { title: "Settings", url: "settings", icon: Settings, isActive: currentView === "settings" },
  ]

  return (
    <Sidebar className="border-r border-slate-200/60 bg-white/95 backdrop-blur-sm">
      <SidebarHeader className="border-b border-slate-200/60 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
            <Heart className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-slate-900">TitheSpace</span>
            <span className="text-xs text-slate-500 font-medium">Church Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    className="h-11 px-4 rounded-xl transition-all duration-200 hover:bg-slate-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-500 data-[active=true]:text-white data-[active=true]:shadow-lg cursor-pointer"
                    onClick={() => onNavigate(item.url)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default function EnhancedNigerianChurchDashboard() {
  const [currentView, setCurrentView] = useState("dashboard")
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddService, setShowAddService] = useState(false)
  const [showAddCellGroup, setShowAddCellGroup] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [members, setMembers] = useState(recentMembers)
  const [services, setServices] = useState(upcomingServices)
  const [cellGroupsList, setCellGroupsList] = useState(cellGroups)

  // Show login screen first
  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />
  }

  const totalContributions =
    financialStats.tithesThisMonth + financialStats.offeringsThisMonth + financialStats.specialOfferingsThisMonth
  const progressPercentage = (totalContributions / financialStats.target) * 100

  // Navigation handler
  const handleNavigation = (view: string) => {
    setCurrentView(view)
  }

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView("dashboard")
  }

  // Profile handler
  const handleProfile = () => {
    setShowProfile(true)
  }

  // Add member handler
  const handleAddMember = (memberData: any) => {
    const newMember = {
      ...memberData,
      joinDate: "Today",
      status: "new",
      avatar: memberData.name.split(" ").map((n: string) => n[0]).join(""),
    }
    setMembers([newMember, ...members])
    setShowAddMember(false)
  }

  // Render different views
  const renderCurrentView = () => {
    switch (currentView) {
      case "members":
        return <MembersView members={members} onAddMember={() => setShowAddMember(true)} />
      case "services":
        return <ServicesView services={services} onAddService={() => setShowAddService(true)} />
      case "cell-groups":
        return <CellGroupsView cellGroups={cellGroupsList} onAddCellGroup={() => setShowAddCellGroup(true)} />
      case "departments":
        return <DepartmentsView departments={departments} />
      case "finances":
        return <FinancesView financialStats={financialStats} />
      case "settings":
        return <SettingsView />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <>
      {/* Enhanced Welcome Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, Pastor Adebayo!</h2>
          <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Activity className="h-3 w-3" />
            Online
          </div>
        </div>
        <p className="text-slate-600 text-lg">{"Here's what's happening at RCCG Victory Parish today."}</p>
      </div>

      {/* Enhanced Financial Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation("finances")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Tithes This Month</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{financialStats.tithesThisMonth.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-blue-100 text-sm mt-1">
              <TrendingUp className="h-3 w-3" />+{financialStats.growth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation("finances")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-100">Offerings This Month</CardTitle>
            <Gift className="h-5 w-5 text-emerald-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{financialStats.offeringsThisMonth.toLocaleString()}</div>
            <p className="text-emerald-100 text-sm mt-1">Regular offerings</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation("members")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Active Members</CardTitle>
            <Users className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-purple-100 text-sm mt-1">+23 new this month</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform" onClick={() => handleNavigation("cell-groups")}>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Cell Groups</CardTitle>
            <UserCheck className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-orange-100 text-sm mt-1">Active groups</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Target Progress */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Monthly Financial Target
              </CardTitle>
              <CardDescription>Progress towards ₦{financialStats.target.toLocaleString()} goal</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-semibold">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">₦{totalContributions.toLocaleString()} raised</span>
              <span className="text-slate-600">
                ₦{(financialStats.target - totalContributions).toLocaleString()} remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Enhanced Recent Members */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                New Members
              </CardTitle>
              <CardDescription>Recently joined members</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-blue-100 rounded-xl" onClick={() => setShowAddMember(true)}>
              <Plus className="h-4 w-4 text-blue-600" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {members.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleNavigation("members")}
              >
                <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold text-xs">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{member.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone className="h-3 w-3" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <UserCheck className="h-3 w-3" />
                    {member.cellGroup}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant={member.status === "new" ? "default" : "secondary"} className="text-xs">
                    {member.status}
                  </Badge>
                  <span className="text-xs text-slate-500">{member.joinDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Upcoming Services */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-500" />
                This Week's Services
              </CardTitle>
              <CardDescription>Scheduled church services</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-purple-100 rounded-xl" onClick={() => setShowAddService(true)}>
              <Plus className="h-4 w-4 text-purple-600" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleNavigation("services")}
              >
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{service.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    {service.date} at {service.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-slate-600">Expected: {service.expected}</div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        service.status === "upcoming"
                          ? "border-green-200 text-green-700 bg-green-50"
                          : "border-blue-200 text-blue-700 bg-blue-50"
                      }`}
                    >
                      {service.status}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-xl">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Enhanced Cell Groups */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 flex items-center gap-2">
                <Zap className="h-4 w-4 text-orange-500" />
                Active Cell Groups
              </CardTitle>
              <CardDescription>House fellowship groups</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="hover:bg-orange-100 rounded-xl" onClick={() => setShowAddCellGroup(true)}>
              <Plus className="h-4 w-4 text-orange-600" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {cellGroupsList.slice(0, 4).map((group, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleNavigation("cell-groups")}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{group.name}</p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        group.status === "growing"
                          ? "border-green-200 text-green-700 bg-green-50"
                          : "border-blue-200 text-blue-700 bg-blue-50"
                      }`}
                    >
                      {group.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="h-3 w-3" />
                    {group.members} members • {group.leader}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {group.location}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-xl">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Departments Overview */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-slate-900 flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-indigo-600" />
            Church Departments
          </CardTitle>
          <CardDescription>Ministry departments and their leadership</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:scale-105 cursor-pointer"
                onClick={() => handleNavigation("departments")}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${dept.color} flex items-center justify-center text-sm`}>
                        {dept.icon}
                      </div>
                      <p className="font-semibold text-slate-900">{dept.name}</p>
                    </div>
                    <p className="text-sm text-slate-600">Head: {dept.head}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Users className="h-3 w-3" />
                      {dept.members} members
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100 rounded-xl"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )

  return (
    <SidebarProvider>
      <AppSidebar currentView={currentView} onNavigate={handleNavigation} />
      <SidebarInset>
        {/* Enhanced Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/95 backdrop-blur-sm px-6 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 rounded-lg" />
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                {currentView === "dashboard" ? "Dashboard" : currentView.charAt(0).toUpperCase() + currentView.slice(1).replace("-", " ")}
              </h1>
              <p className="text-xs text-slate-500">RCCG Victory Parish</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-slate-100 rounded-xl"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-xl">
                  <Avatar className="h-9 w-9 ring-2 ring-blue-100">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      PA
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Pastor Adebayo</p>
                    <p className="text-xs leading-none text-muted-foreground">pastor@rccg.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("settings")} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Church Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <main className="flex-1 space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
          {renderCurrentView()}
        </main>
      </SidebarInset>

      {/* Dialogs */}
      <AddMemberDialog open={showAddMember} onOpenChange={setShowAddMember} onAdd={handleAddMember} />
      <AddServiceDialog open={showAddService} onOpenChange={setShowAddService} />
      <AddCellGroupDialog open={showAddCellGroup} onOpenChange={setShowAddCellGroup} />
      <NotificationsDialog open={showNotifications} onOpenChange={setShowNotifications} />
      <ProfileDialog open={showProfile} onOpenChange={setShowProfile} />
    </SidebarProvider>
  )
}

// Component Views
function MembersView({ members, onAddMember }: { members: any[]; onAddMember: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Members</h2>
          <p className="text-slate-600">Manage church members and their information</p>
        </div>
        <Button onClick={onAddMember} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>
      
      <div className="grid gap-4">
        {members.map((member, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="h-3 w-3" />
                        {member.cellGroup}
                      </span>
                      <span>Joined {member.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={member.status === "new" ? "default" : "secondary"}>
                    {member.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ServicesView({ services, onAddService }: { services: any[]; onAddService: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Services & Events</h2>
          <p className="text-slate-600">Manage church services and special events</p>
        </div>
        <Button onClick={onAddService} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                  <Badge variant={service.status === "upcoming" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="h-4 w-4" />
                    {service.date} at {service.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="h-4 w-4" />
                    Expected: {service.expected} attendees
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function CellGroupsView({ cellGroups, onAddCellGroup }: { cellGroups: any[]; onAddCellGroup: () => void }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Cell Groups</h2>
          <p className="text-slate-600">Manage house fellowship groups</p>
        </div>
        <Button onClick={onAddCellGroup} className="bg-orange-600 hover:bg-orange-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Cell Group
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cellGroups.map((group, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900">{group.name}</h3>
                  <Badge variant={group.status === "growing" ? "default" : "secondary"}>
                    {group.growth}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="h-4 w-4" />
                    {group.members} members
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <UserCheck className="h-4 w-4" />
                    Leader: {group.leader}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {group.location}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DepartmentsView({ departments }: { departments: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Departments</h2>
          <p className="text-slate-600">Ministry departments and their leadership</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept, index) => (
          <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${dept.color} flex items-center justify-center text-lg`}>
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{dept.name}</h3>
                    <p className="text-sm text-slate-600">Head: {dept.head}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  {dept.members} members
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function FinancesView({ financialStats }: { financialStats: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Finances</h2>
          <p className="text-slate-600">Tithes, offerings, and financial overview</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Record Offering
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Tithes This Month</h3>
              <div className="text-3xl font-bold">₦{financialStats.tithesThisMonth.toLocaleString()}</div>
              <p className="text-blue-100">+{financialStats.growth}% from last month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Offerings This Month</h3>
              <div className="text-3xl font-bold">₦{financialStats.offeringsThisMonth.toLocaleString()}</div>
              <p className="text-emerald-100">Regular offerings</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Special Offerings</h3>
              <div className="text-3xl font-bold">₦{financialStats.specialOfferingsThisMonth.toLocaleString()}</div>
              <p className="text-purple-100">Building fund & others</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Monthly Target Progress</CardTitle>
          <CardDescription>Progress towards ₦{financialStats.target.toLocaleString()} goal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={(financialStats.tithesThisMonth + financialStats.offeringsThisMonth + financialStats.specialOfferingsThisMonth) / financialStats.target * 100} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>₦{(financialStats.tithesThisMonth + financialStats.offeringsThisMonth + financialStats.specialOfferingsThisMonth).toLocaleString()} raised</span>
              <span>₦{financialStats.target.toLocaleString()} target</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-600">Manage church and system settings</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Church Information</CardTitle>
            <CardDescription>Basic church details and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Church Name</Label>
              <Input defaultValue="RCCG Victory Parish" />
            </div>
            <div className="space-y-2">
              <Label>Pastor Name</Label>
              <Input defaultValue="Pastor Adebayo" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="pastor@rccg.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>System Preferences</CardTitle>
            <CardDescription>Application settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-500">Receive email updates</p>
              </div>
              <Button variant="outline" size="sm">Toggle</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-slate-500">Receive SMS updates</p>
              </div>
              <Button variant="outline" size="sm">Toggle</Button>
            </div>
            <Button>Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Dialog Components
function AddMemberDialog({ open, onOpenChange, onAdd }: { open: boolean; onOpenChange: (open: boolean) => void; onAdd: (data: any) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", cellGroup: "", email: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ name: "", phone: "", cellGroup: "", email: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Add a new member to the church database</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input 
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+234 xxx xxx xxxx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Cell Group</Label>
            <Input 
              value={formData.cellGroup} 
              onChange={(e) => setFormData({...formData, cellGroup: e.target.value})}
              placeholder="Select cell group"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Email (Optional)</Label>
            <Input 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddServiceDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Schedule a new church service or event</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Service Name</Label>
            <Input placeholder="e.g., Sunday Service, Prayer Meeting" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Expected Attendance</Label>
            <Input type="number" placeholder="Expected number of attendees" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Service description or special notes" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button>Add Service</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function AddCellGroupDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Cell Group</DialogTitle>
          <DialogDescription>Create a new house fellowship group</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cell Group Name</Label>
            <Input placeholder="e.g., Victory Cell, Faith Cell" />
          </div>
          <div className="space-y-2">
            <Label>Leader Name</Label>
            <Input placeholder="Cell group leader" />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Meeting location" />
          </div>
          <div className="space-y-2">
            <Label>Meeting Day</Label>
            <Input placeholder="e.g., Every Wednesday" />
          </div>
          <div className="space-y-2">
            <Label>Meeting Time</Label>
            <Input type="time" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button>Create Cell Group</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function NotificationsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const notifications = [
    { title: "New Member Joined", message: "Chioma Okwu joined Faith Cell", time: "2 hours ago", type: "member" },
    { title: "Service Reminder", message: "Sunday First Service in 2 days", time: "1 day ago", type: "service" },
    { title: "Tithe Received", message: "₦50,000 tithe from Bro. Tunde", time: "3 hours ago", type: "finance" },
    { title: "Cell Group Meeting", message: "Victory Cell meeting tonight", time: "5 hours ago", type: "cell" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>Recent church activities and updates</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification.type === "member" ? "bg-blue-500" :
                notification.type === "service" ? "bg-purple-500" :
                notification.type === "finance" ? "bg-green-500" : "bg-orange-500"
              }`} />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                <p className="text-xs text-slate-600">{notification.message}</p>
                <p className="text-xs text-slate-400">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Login Screen Component
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/90 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">TitheSpace</span>
              <span className="text-sm text-slate-500 font-medium">Church Management System</span>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-600 text-base">
              Sign in to your church management account
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="pastor@church.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 pr-12"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent rounded-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  className="rounded-md"
                />
                <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                  Remember me
                </Label>
              </div>
              <Button variant="link" className="px-0 text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign In
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">Secure Login</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Shield className="h-4 w-4" />
            Your data is protected with enterprise-grade security
          </div>

          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600">
              {"Don't have an account? "}
              <Button variant="link" className="px-0 text-blue-600 hover:text-blue-700 font-semibold">
                Sign up here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Profile Dialog Component
function ProfileDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [profileData, setProfileData] = useState({
    name: "Pastor Adebayo",
    email: "pastor@rccg.com",
    phone: "+234 803 123 4567",
    position: "Senior Pastor",
    joinDate: "January 2018",
    bio: "Passionate about serving God and building His kingdom through effective church management."
  })

  const handleSave = () => {
    // Save profile logic here
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>Manage your personal information and preferences</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 ring-4 ring-blue-100">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold text-xl">
                PA
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-sm text-slate-500">JPG, PNG or GIF. Max size 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input 
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input 
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Position</Label>
              <Input 
                value={profileData.position}
                onChange={(e) => setProfileData({...profileData, position: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea 
              value={profileData.bio}
              onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Member Since</Label>
              <Input value={profileData.joinDate} disabled className="bg-slate-50" />
            </div>
            <div className="space-y-2">
              <Label>Church Role</Label>
              <Input value="Senior Pastor" disabled className="bg-slate-50" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



