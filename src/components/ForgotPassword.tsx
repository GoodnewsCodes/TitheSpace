"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import { Heart, ArrowLeft } from "lucide-react"
import toast from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)

    try {
      await resetPassword(data.email)
      setEmailSent(true)
      toast.success("Password reset email sent!")
    } catch (error: any) {
      console.error("Password reset error:", error)

      // Handle specific Firebase auth errors
      if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email address")
      } else {
        toast.error("Failed to send password reset email. Please try again")
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
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>
            {emailSent
              ? "Check your email for a password reset link"
              : "Enter your email address to reset your password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {emailSent ? (
            <div className="space-y-4">
              <p className="text-center text-slate-600">
                We've sent a password reset link to your email address. Please check your inbox and follow the
                instructions to reset your password.
              </p>
              <p className="text-center text-slate-600">
                Didn't receive an email? Check your spam folder or try again.
              </p>
              <div className="flex justify-center">
                <Button onClick={() => setEmailSent(false)} variant="outline" className="mt-2">
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          )}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
