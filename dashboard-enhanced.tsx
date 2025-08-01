"use client"
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

// Navigation items for Nigerian church context
const navItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Members",
    url: "#",
    icon: Users,
  },
  {
    title: "Tithes & Offerings",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Cell Groups",
    url: "#",
    icon: UserCheck,
  },
  {
    title: "Services & Events",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Departments",
    url: "#",
    icon: Megaphone,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

// Enhanced mock data
const financialStats = {
  tithesThisMonth: 2450000,
  offeringsThisMonth: 890000,
  specialOfferingsThisMonth: 1200000,
  growth: 18,
  target: 3000000,
}

const recentMembers = [
  {
    name: "Adebayo Ogundimu",
    phone: "+234 803 456 7890",
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

function AppSidebar() {
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
                    asChild
                    isActive={item.isActive}
                    className="h-11 px-4 rounded-xl transition-all duration-200 hover:bg-slate-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-500 data-[active=true]:text-white data-[active=true]:shadow-lg"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
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
  const totalContributions =
    financialStats.tithesThisMonth + financialStats.offeringsThisMonth + financialStats.specialOfferingsThisMonth
  const progressPercentage = (totalContributions / financialStats.target) * 100

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Enhanced Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/95 backdrop-blur-sm px-6 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 rounded-lg" />
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
              <p className="text-xs text-slate-500">RCCG Victory Parish</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 rounded-xl">
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
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Church Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Enhanced Main Content */}
        <main className="flex-1 space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
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
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
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

            <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
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

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
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

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
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
                <Button variant="ghost" size="icon" className="hover:bg-blue-100 rounded-xl">
                  <Plus className="h-4 w-4 text-blue-600" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
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
                      <Badge
                        variant={member.status === "new" ? "default" : "secondary"}
                        className={`text-xs ${member.status === "new" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {member.status}
                      </Badge>
                      <span className="text-xs text-slate-400">{member.joinDate}</span>
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
                <Button variant="ghost" size="icon" className="hover:bg-purple-100 rounded-xl">
                  <Plus className="h-4 w-4 text-purple-600" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
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
                <Button variant="ghost" size="icon" className="hover:bg-orange-100 rounded-xl">
                  <Plus className="h-4 w-4 text-orange-600" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {cellGroups.slice(0, 4).map((group, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
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
                    className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:scale-105"
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
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}


