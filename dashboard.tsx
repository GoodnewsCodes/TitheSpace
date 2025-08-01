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

// Navigation items
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
    title: "Donations",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Events",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

// Mock data
const donationStats = {
  thisMonth: 12450,
  lastMonth: 10200,
  growth: 22,
}

const recentMembers = [
  { name: "Sarah Johnson", email: "sarah@email.com", joinDate: "2 days ago" },
  { name: "Michael Chen", email: "michael@email.com", joinDate: "1 week ago" },
  { name: "Emily Davis", email: "emily@email.com", joinDate: "2 weeks ago" },
]

const upcomingEvents = [
  { name: "Sunday Service", date: "Dec 17", time: "10:00 AM" },
  { name: "Youth Group", date: "Dec 19", time: "7:00 PM" },
  { name: "Bible Study", date: "Dec 21", time: "6:30 PM" },
]

const recentDonations = [
  { donor: "Anonymous", amount: 250, date: "Today" },
  { donor: "John Smith", amount: 100, date: "Yesterday" },
  { donor: "Mary Wilson", amount: 75, date: "2 days ago" },
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

export default function Dashboard() {
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
                    <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">pastor@church.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
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
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Pastor John!</h2>
            <p className="text-slate-600">{"Here's what's happening with your church today."}</p>
          </div>

          {/* Donation Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Donations This Month</CardTitle>
                <DollarSign className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">${donationStats.thisMonth.toLocaleString()}</div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />+{donationStats.growth}% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Active Members</CardTitle>
                <Users className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">342</div>
                <p className="text-xs text-slate-500">+12 new this month</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Upcoming Events</CardTitle>
                <Calendar className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">8</div>
                <p className="text-xs text-slate-500">This week</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Average Attendance</CardTitle>
                <Heart className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-slate-500">Sunday services</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Members */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Recent Members</CardTitle>
                  <CardDescription>New members who joined recently</CardDescription>
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
                      <p className="text-xs text-slate-500">{member.email}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {member.joinDate}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled for this week</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{event.name}</p>
                      <p className="text-xs text-slate-500">
                        {event.date} at {event.time}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-slate-900">Recent Donations</CardTitle>
                  <CardDescription>Latest contributions received</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <DollarSign className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-900">{donation.donor}</p>
                      <p className="text-xs text-slate-500">{donation.date}</p>
                    </div>
                    <div className="text-sm font-semibold text-green-600">${donation.amount}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
