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
  MoreHorizontal,
  UserCheck,
  Clock,
  MapPin,
  Phone,
  Gift,
  Megaphone,
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

// Mock data for Nigerian church context
const financialStats = {
  tithesThisMonth: 2450000, // in Naira
  offeringsThisMonth: 890000,
  specialOfferingsThisMonth: 1200000,
  growth: 18,
}

const recentMembers = [
  { name: "Adebayo Ogundimu", phone: "+234 803 456 7890", cellGroup: "Victory Cell", joinDate: "3 days ago" },
  { name: "Chioma Okwu", phone: "+234 701 234 5678", cellGroup: "Faith Cell", joinDate: "1 week ago" },
  { name: "Ibrahim Musa", phone: "+234 805 987 6543", cellGroup: "Hope Cell", joinDate: "2 weeks ago" },
]

const upcomingServices = [
  { name: "First Service", date: "Sunday", time: "7:00 AM", attendance: "Expected: 800" },
  { name: "Second Service", date: "Sunday", time: "9:30 AM", attendance: "Expected: 1200" },
  { name: "Midweek Service", date: "Wednesday", time: "6:00 PM", attendance: "Expected: 400" },
  { name: "Friday Night Vigil", date: "Friday", time: "10:00 PM", attendance: "Expected: 300" },
]

const cellGroups = [
  { name: "Victory Cell", leader: "Bro. Tunde", members: 25, location: "Ikeja" },
  { name: "Faith Cell", leader: "Sis. Grace", members: 18, location: "Victoria Island" },
  { name: "Hope Cell", leader: "Bro. Samuel", members: 22, location: "Surulere" },
  { name: "Love Cell", leader: "Sis. Funmi", members: 30, location: "Lekki" },
]

const departments = [
  { name: "Choir", head: "Sis. Blessing", members: 45 },
  { name: "Ushering", head: "Bro. David", members: 60 },
  { name: "Protocol", head: "Bro. Emmanuel", members: 25 },
  { name: "Children Church", head: "Sis. Mary", members: 35 },
  { name: "Youth", head: "Bro. Joseph", members: 120 },
  { name: "Media", head: "Bro. Michael", members: 15 },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">TitheSpace</span>
            <span className="text-xs text-slate-500">Church Management</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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

export default function NigerianChurchDashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-6 w-px bg-slate-200" />
            <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">PA</AvatarFallback>
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

        {/* Main Content */}
        <main className="flex-1 space-y-6 p-6 bg-slate-50">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Pastor Adebayo!</h2>
            <p className="text-slate-600">{"Here's what's happening at RCCG Victory Parish today."}</p>
          </div>

          {/* Financial Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Tithes This Month</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  ₦{financialStats.tithesThisMonth.toLocaleString()}
                </div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />+{financialStats.growth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Offerings This Month</CardTitle>
                <Gift className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  ₦{financialStats.offeringsThisMonth.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500">Regular offerings</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Members</CardTitle>
                <Users className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,247</div>
                <p className="text-xs text-slate-500">+23 new this month</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Cell Groups</CardTitle>
                <UserCheck className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">24</div>
                <p className="text-xs text-slate-500">Active groups</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Members */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">New Members</CardTitle>
                  <CardDescription>Recently joined members</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-slate-900">{member.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <UserCheck className="h-3 w-3" />
                        {member.cellGroup}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {member.joinDate}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Services */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">This Week's Services</CardTitle>
                  <CardDescription>Scheduled church services</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingServices.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{service.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {service.date} at {service.time}
                      </div>
                      <p className="text-xs text-slate-500">{service.attendance}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cell Groups */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Active Cell Groups</CardTitle>
                  <CardDescription>House fellowship groups</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {cellGroups.slice(0, 4).map((group, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{group.name}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="h-3 w-3" />
                        {group.members} members • {group.leader}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="h-3 w-3" />
                        {group.location}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Departments Overview */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Church Departments</CardTitle>
              <CardDescription>Ministry departments and their leadership</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{dept.name}</p>
                      <p className="text-xs text-slate-500">Head: {dept.head}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Users className="h-3 w-3" />
                        {dept.members} members
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
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
