"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Heart } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

// Form validation schema
const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    churchName: z.string().min(2, "Church name is required"),
    position: z.string().min(1, "Position is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      churchName: "",
      position: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)

    try {
      const displayName = `${data.firstName} ${data.lastName}`
      const user = await signup(data.email, data.password, displayName)

      // Store additional user data
      // This will be handled in the AuthContext signup function

      toast.success("Account created successfully!")
      navigate("/setup")
    } catch (error: any) {
      console.error("Signup error:", error)

      // Handle specific Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use")
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address")
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak")
      } else {
        toast.error("Failed to create account. Please try again")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
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
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Set up your church management system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className={errors.firstName ? "border-red-500" : ""}
                  {...register("firstName")}
                />
                {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className={errors.lastName ? "border-red-500" : ""}
                  {...register("lastName")}
                />
                {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="churchName">Church Name</Label>
              <Input
                id="churchName"
                placeholder="e.g. Redeemed Christian Church of God"
                className={errors.churchName ? "border-red-500" : ""}
                {...register("churchName")}
              />
              {errors.churchName && <p className="text-sm text-red-500">{errors.churchName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Your Position</Label>
              <Select onValueChange={(value) => setValue("position", value)} defaultValue={watch("position")}>
                <SelectTrigger className={errors.position ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senior-pastor">Senior Pastor</SelectItem>
                  <SelectItem value="assistant-pastor">Assistant Pastor</SelectItem>
                  <SelectItem value="pastor">Pastor</SelectItem>
                  <SelectItem value="deacon">Deacon</SelectItem>
                  <SelectItem value="elder">Elder</SelectItem>
                  <SelectItem value="secretary">Church Secretary</SelectItem>
                  <SelectItem value="treasurer">Treasurer</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
              {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="pastor@church.com"
                className={errors.email ? "border-red-500" : ""}
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+234 801 234 5678"
                className={errors.phone ? "border-red-500" : ""}
                {...register("phone")}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-slate-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className={errors.terms ? "border-red-500" : ""}
                onCheckedChange={(checked) => setValue("terms", checked === true)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
