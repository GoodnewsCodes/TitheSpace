"use client"
import { useState } from "react"
import type React from "react"

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
  Edit,
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

// Types
interface Member {
  id: string
  name: string
  phone: string
  cellGroup: string
  joinDate: string
  status: string
  avatar: string
}

interface Service {
  id: string
  name: string
  date: string
  time: string
  attendance: number
  expected: number
  status: string
}

interface CellGroup {
  id: string
  name: string
  leader: string
  members: number
  location: string
  growth: string
  status: string
}

interface Department {
  id: string
  name: string
  head: string
  members: number
  icon: string
  color: string
}

// Navigation items
const navItems = [
  { title: "Dashboard", url: "dashboard", icon: Home },
  { title: "Members", url: "members", icon: Users },
  { title: "Tithes & Offerings", url: "finances", icon: DollarSign },
  { title: "Cell Groups", url: "cellgroups", icon: UserCheck },
  { title: "Services & Events", url: "services", icon: Calendar },
  { title: "Departments", url: "departments", icon: Megaphone },
  { title: "Settings", url: "settings", icon: Settings },
]

// Initial data
const initialMembers: Member[] = [
  {
    id: "1",
    name: "Adebayo Ogundimu",
    phone: "+234 803 456 7890",
    cellGroup: "Victory Cell",
    joinDate: "3 days ago",
    status: "active",
    avatar: "AO",
  },
  {
    id: "2",
    name: "Chioma Okwu",
    phone: "+234 701 234 5678",
    cellGroup: "Faith Cell",
    joinDate: "1 week ago",
    status: "active",
    avatar: "CO",
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    phone: "+234 805 987 6543",
    cellGroup: "Hope Cell",
    joinDate: "2 weeks ago",
    status: "new",
    avatar: "IM",
  },
]

const initialServices: Service[] = [
  {
    id: "1",
    name: "First Service",
    date: "Sunday",
    time: "7:00 AM",
    attendance: 800,
    expected: 850,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Second Service",
    date: "Sunday",
    time: "9:30 AM",
    attendance: 1200,
    expected: 1300,
    status: "upcoming",
  },
  {
    id: "3",
    name: "Midweek Service",
    date: "Wednesday",
    time: "6:00 PM",
    attendance: 400,
    expected: 450,
    status: "this-week",
  },
  {
    id: "4",
    name: "Friday Night Vigil",
    date: "Friday",
    time: "10:00 PM",
    attendance: 300,
    expected: 350,
    status: "this-week",
  },
]

const initialCellGroups: CellGroup[] = [
  {
    id: "1",
    name: "Victory Cell",
    leader: "Bro. Tunde",
    members: 25,
    location: "Ikeja",
    growth: "+3",
    status: "growing",
  },
  {
    id: "2",
    name: "Faith Cell",
    leader: "Sis. Grace",
    members: 18,
    location: "Victoria Island",
    growth: "+1",
    status: "stable",
  },
  {
    id: "3",
    name: "Hope Cell",
    leader: "Bro. Samuel",
    members: 22,
    location: "Surulere",
    growth: "+5",
    status: "growing",
  },
  { id: "4", name: "Love Cell", leader: "Sis. Funmi", members: 30, location: "Lekki", growth: "+2", status: "stable" },
]

const initialDepartments: Department[] = [
  { id: "1", name: "Choir", head: "Sis. Blessing", members: 45, icon: "🎵", color: "bg-purple-100 text-purple-700" },
  { id: "2", name: "Ushering", head: "Bro. David", members: 60, icon: "👋", color: "bg-blue-100 text-blue-700" },
  { id: "3", name: "Protocol", head: "Bro. Emmanuel", members: 25, icon: "🤝", color: "bg-green-100 text-green-700" },
  {
    id: "4",
    name: "Children Church",
    head: "Sis. Mary",
    members: 35,
    icon: "👶",
    color: "bg-yellow-100 text-yellow-700",
  },
  { id: "5", name: "Youth", head: "Bro. Joseph", members: 120, icon: "⚡", color: "bg-orange-100 text-orange-700" },
  { id: "6", name: "Media", head: "Bro. Michael", members: 15, icon: "📹", color: "bg-red-100 text-red-700" },
]

function AppSidebar({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) {
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
                    isActive={currentPage === item.url}
                    className="h-11 px-4 rounded-xl transition-all duration-200 hover:bg-slate-100 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-indigo-500 data-[active=true]:text-white data-[active=true]:shadow-lg cursor-pointer"
                  >
                    <div onClick={() => setCurrentPage(item.url)} className="flex items-center gap-3">
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

// Modal Components
function AddMemberModal({
  isOpen,
  onClose,
  onAdd,
}: { isOpen: boolean; onClose: () => void; onAdd: (member: Omit<Member, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cellGroup: "",
    joinDate: "Today",
    status: "new",
    avatar: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const avatar = formData.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    onAdd({ ...formData, avatar })
    setFormData({ name: "", phone: "", cellGroup: "", joinDate: "Today", status: "new", avatar: "" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
          <DialogDescription>Add a new member to the church database.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 xxx xxx xxxx"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cellGroup">Cell Group</Label>
            <Select
              value={formData.cellGroup}
              onValueChange={(value) => setFormData({ ...formData, cellGroup: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select cell group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Victory Cell">Victory Cell</SelectItem>
                <SelectItem value="Faith Cell">Faith Cell</SelectItem>
                <SelectItem value="Hope Cell">Hope Cell</SelectItem>
                <SelectItem value="Love Cell">Love Cell</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddServiceModal({
  isOpen,
  onClose,
  onAdd,
}: { isOpen: boolean; onClose: () => void; onAdd: (service: Omit<Service, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    attendance: 0,
    expected: 0,
    status: "upcoming",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ name: "", date: "", time: "", attendance: 0, expected: 0, status: "upcoming" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Schedule a new church service or event.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name</Label>
            <Input
              id="serviceName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sunday Service"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g. Sunday"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. 9:00 AM"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="expected">Expected Attendance</Label>
            <Input
              id="expected"
              type="number"
              value={formData.expected}
              onChange={(e) => setFormData({ ...formData, expected: Number.parseInt(e.target.value) || 0 })}
              placeholder="Expected number of attendees"
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Service</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function AddCellGroupModal({
  isOpen,
  onClose,
  onAdd,
}: { isOpen: boolean; onClose: () => void; onAdd: (group: Omit<CellGroup, "id">) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    members: 0,
    location: "",
    growth: "+0",
    status: "stable",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ name: "", leader: "", members: 0, location: "", growth: "+0", status: "stable" })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Cell Group</DialogTitle>
          <DialogDescription>Create a new house fellowship group.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Cell Group Name</Label>
            <Input
              id="groupName"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Victory Cell"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leader">Group Leader</Label>
            <Input
              id="leader"
              value={formData.leader}
              onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
              placeholder="e.g. Bro. John"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="members">Number of Members</Label>
              <Input
                id="members"
                type="number"
                value={formData.members}
                onChange={(e) => setFormData({ ...formData, members: Number.parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Ikeja"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Cell Group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function FunctionalNigerianChurchDashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [cellGroups, setCellGroups] = useState<CellGroup[]>(initialCellGroups)
  const [departments] = useState<Department[]>(initialDepartments)
  const [notifications, setNotifications] = useState(3)

  // Modal states
  const [showAddMember, setShowAddMember] = useState(false)
  const [showAddService, setShowAddService] = useState(false)
  const [showAddCellGroup, setShowAddCellGroup] = useState(false)

  // Financial stats
  const financialStats = {
    tithesThisMonth: 2450000,
    offeringsThisMonth: 890000,
    specialOfferingsThisMonth: 1200000,
    growth: 18,
    target: 3000000,
  }

  const totalContributions =
    financialStats.tithesThisMonth + financialStats.offeringsThisMonth + financialStats.specialOfferingsThisMonth
  const progressPercentage = (totalContributions / financialStats.target) * 100

  // Handlers
  const handleAddMember = (newMember: Omit<Member, "id">) => {
    const member: Member = {
      ...newMember,
      id: Date.now().toString(),
    }
    setMembers([member, ...members])
    toast({
      title: "Member Added",
      description: `${newMember.name} has been added to the church database.`,
    })
  }

  const handleAddService = (newService: Omit<Service, "id">) => {
    const service: Service = {
      ...newService,
      id: Date.now().toString(),
    }
    setServices([service, ...services])
    toast({
      title: "Service Added",
      description: `${newService.name} has been scheduled.`,
    })
  }

  const handleAddCellGroup = (newGroup: Omit<CellGroup, "id">) => {
    const group: CellGroup = {
      ...newGroup,
      id: Date.now().toString(),
    }
    setCellGroups([group, ...cellGroups])
    toast({
      title: "Cell Group Added",
      description: `${newGroup.name} has been created.`,
    })
  }

  const handleNotificationClick = () => {
    setNotifications(0)
    toast({
      title: "Notifications",
      description: "You have 3 new prayer requests and 2 upcoming events.",
    })
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    // In a real app, this would redirect to login
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case "members":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Members</h2>
                <p className="text-slate-600">Manage church members and their information</p>
              </div>
              <Button onClick={() => setShowAddMember(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </div>
            <div className="grid gap-4">
              {members.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 ring-2 ring-blue-100">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-900">{member.name}</h3>
                          <p className="text-sm text-slate-600">{member.phone}</p>
                          <p className="text-sm text-slate-500">{member.cellGroup}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.status === "new" ? "default" : "secondary"}>{member.status}</Badge>
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

      case "services":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Services & Events</h2>
                <p className="text-slate-600">Manage church services and special events</p>
              </div>
              <Button onClick={() => setShowAddService(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {services.map((service) => (
                <Card key={service.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">{service.name}</h3>
                      <Badge variant={service.status === "upcoming" ? "default" : "secondary"}>{service.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {service.date} at {service.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Expected: {service.expected} attendees
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "cellgroups":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Cell Groups</h2>
                <p className="text-slate-600">Manage house fellowship groups</p>
              </div>
              <Button onClick={() => setShowAddCellGroup(true)} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Cell Group
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cellGroups.map((group) => (
                <Card key={group.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900">{group.name}</h3>
                      <Badge variant={group.status === "growing" ? "default" : "secondary"}>{group.growth}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {group.members} members
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Leader: {group.leader}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {group.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "departments":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Departments</h2>
                <p className="text-slate-600">Manage church ministry departments</p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => (
                <Card key={dept.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg ${dept.color} flex items-center justify-center text-lg`}>
                        {dept.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{dept.name}</h3>
                        <p className="text-sm text-slate-600">Head: {dept.head}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users className="h-4 w-4" />
                      {dept.members} members
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "finances":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Tithes & Offerings</h2>
              <p className="text-slate-600">Financial management and tracking</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Total Tithes</h3>
                  <p className="text-2xl font-bold">₦{financialStats.tithesThisMonth.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Total Offerings</h3>
                  <p className="text-2xl font-bold">₦{financialStats.offeringsThisMonth.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Special Offerings</h3>
                  <p className="text-2xl font-bold">₦{financialStats.specialOfferingsThisMonth.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "settings":
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
                  <CardDescription>Update church details and contact information</CardDescription>
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
                    <Label>Contact Email</Label>
                    <Input defaultValue="pastor@rccg.com" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                  <CardDescription>Configure system settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select defaultValue="NGN">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="WAT">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WAT">West Africa Time (WAT)</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <>
            {/* Welcome Section */}
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

            {/* Financial Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card
                className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentPage("finances")}
              >
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

              <Card
                className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentPage("finances")}
              >
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

              <Card
                className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentPage("members")}
              >
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

              <Card
                className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setCurrentPage("cellgroups")}
              >
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

            {/* Content Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Recent Members */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      New Members
                    </CardTitle>
                    <CardDescription>Recently joined members</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-blue-100 rounded-xl"
                    onClick={() => setShowAddMember(true)}
                  >
                    <Plus className="h-4 w-4 text-blue-600" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {members.slice(0, 3).map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setCurrentPage("members")}
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
                  <Button variant="ghost" className="w-full" onClick={() => setCurrentPage("members")}>
                    View All Members
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Services */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      This Week's Services
                    </CardTitle>
                    <CardDescription>Scheduled church services</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-purple-100 rounded-xl"
                    onClick={() => setShowAddService(true)}
                  >
                    <Plus className="h-4 w-4 text-purple-600" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {services.slice(0, 3).map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setCurrentPage("services")}
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
                  <Button variant="ghost" className="w-full" onClick={() => setCurrentPage("services")}>
                    View All Services
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Cell Groups */}
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      Active Cell Groups
                    </CardTitle>
                    <CardDescription>House fellowship groups</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-orange-100 rounded-xl"
                    onClick={() => setShowAddCellGroup(true)}
                  >
                    <Plus className="h-4 w-4 text-orange-600" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cellGroups.slice(0, 3).map((group, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setCurrentPage("cellgroups")}
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
                  <Button variant="ghost" className="w-full" onClick={() => setCurrentPage("cellgroups")}>
                    View All Cell Groups
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Departments Overview */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-slate-900 flex items-center gap-2">
                      <Megaphone className="h-5 w-5 text-indigo-600" />
                      Church Departments
                    </CardTitle>
                    <CardDescription>Ministry departments and their leadership</CardDescription>
                  </div>
                  <Button variant="ghost" onClick={() => setCurrentPage("departments")}>
                    View All
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {departments.slice(0, 6).map((dept, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md hover:scale-105 cursor-pointer"
                      onClick={() => setCurrentPage("departments")}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg ${dept.color} flex items-center justify-center text-sm`}
                            >
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
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 bg-white/95 backdrop-blur-sm px-6 sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 rounded-lg" />
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <h1 className="text-lg font-bold text-slate-900 capitalize">{currentPage}</h1>
              <p className="text-xs text-slate-500">RCCG Victory Parish</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-slate-100 rounded-xl"
              onClick={handleNotificationClick}
            >
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              )}
            </Button>

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
                <DropdownMenuItem onClick={() => setCurrentPage("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrentPage("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Church Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 space-y-8 p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
          {renderPageContent()}
        </main>
      </SidebarInset>

      {/* Modals */}
      <AddMemberModal isOpen={showAddMember} onClose={() => setShowAddMember(false)} onAdd={handleAddMember} />
      <AddServiceModal isOpen={showAddService} onClose={() => setShowAddService(false)} onAdd={handleAddService} />
      <AddCellGroupModal
        isOpen={showAddCellGroup}
        onClose={() => setShowAddCellGroup(false)}
        onAdd={handleAddCellGroup}
      />
    </SidebarProvider>
  )
}
