"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Heart, ArrowRight, Shield } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    try {
      await login(data.email, data.password)
      toast.success("Successfully logged in!")
      navigate("/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)

      // Handle specific Firebase auth errors
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        toast.error("Invalid email or password")
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Too many failed login attempts. Please try again later")
      } else {
        toast.error("Failed to log in. Please try again")
      }
    } finally {
      setIsLoading(false)
    }
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="pastor@church.com"
                className={`h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 ${
                  errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                }`}
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
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
                  className={`h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white/50 pr-12 ${
                    errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  {...register("password")}
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
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="rememberMe" className="rounded-md" {...register("rememberMe")} />
                <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                  Remember me
                </Label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </Link>
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
                  <ArrowRight className="h-4 w-4" />
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
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
