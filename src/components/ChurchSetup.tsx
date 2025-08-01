"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { Heart, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

// Form validation schema
const churchSetupSchema = z.object({
  name: z.string().min(2, "Church name is required"),
  address: z.string().min(5, "Church address is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  website: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  timezone: z.string().min(1, "Timezone is required"),
})

type ChurchSetupFormValues = z.infer<typeof churchSetupSchema>

export default function ChurchSetup() {
  const [isLoading, setIsLoading] = useState(false)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChurchSetupFormValues>({
    resolver: zodResolver(churchSetupSchema),
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: currentUser?.email || "",
      website: "",
      currency: "NGN",
      timezone: "Africa/Lagos",
    },
  })

  const onSubmit = async (data: ChurchSetupFormValues) => {
    if (!currentUser) {
      toast.error("You must be logged in to set up your church")
      return
    }

    setIsLoading(true)

    try {
      // Create church document
      const churchId = currentUser.uid // Using user ID as church ID for simplicity
      await setDoc(doc(db, "churches", churchId), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: currentUser.uid,
      })

      // Update user with churchId
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          churchId,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      )

      toast.success("Church setup completed successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Church setup error:", error)
      toast.error("Failed to set up church. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900">TitheSpace</span>
              <span className="text-xs text-slate-500 font-medium">Church Management System</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Church Setup</CardTitle>
          <CardDescription>Complete your church profile to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Church Name</Label>
              <Input
                id="name"
                placeholder="e.g. Redeemed Christian Church of God"
                className={errors.name ? "border-red-500" : ""}
                {...register("name")}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Church Address</Label>
              <Input
                id="address"
                placeholder="e.g. 123 Main Street, Lagos"
                className={errors.address ? "border-red-500" : ""}
                {...register("address")}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="e.g. +234 801 234 5678"
                  className={errors.phone ? "border-red-500" : ""}
                  {...register("phone")}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="e.g. info@church.com"
                  className={errors.email ? "border-red-500" : ""}
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input id="website" placeholder="e.g. https://church.com" {...register("website")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select onValueChange={(value) => setValue("currency", value)} defaultValue={watch("currency")}>
                  <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GHS">Ghanaian Cedi (₵)</SelectItem>
                    <SelectItem value="KES">Kenyan Shilling (KSh)</SelectItem>
                    <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.currency && <p className="text-sm text-red-500">{errors.currency.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select onValueChange={(value) => setValue("timezone", value)} defaultValue={watch("timezone")}>
                  <SelectTrigger className={errors.timezone ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Africa/Lagos">West Africa Time (WAT)</SelectItem>
                    <SelectItem value="Africa/Nairobi">East Africa Time (EAT)</SelectItem>
                    <SelectItem value="Africa/Johannesburg">South Africa Standard Time (SAST)</SelectItem>
                    <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.timezone && <p className="text-sm text-red-500">{errors.timezone.message}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Setting up...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Complete Setup
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
