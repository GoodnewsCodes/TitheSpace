"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Heart, ArrowRight, ArrowLeft, Check, Building2, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Link } from "react-router-dom"
import { useAuth } from "../../src/contexts/AuthContext"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

// Step 1 Schema - Personal Information
const step1Schema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Step 2 Schema - Church Information
const step2Schema = z.object({
  churchName: z.string().min(2, "Church name is required"),
  position: z.string().min(1, "Position is required"),
  currency: z.string().min(1, "Currency is required"),
  churchAddress: z.string().min(5, "Church address is required"),
  churchPhone: z.string().min(10, "Church phone number is required"),
  churchEmail: z.string().email("Please enter a valid church email"),
})

// Step 3 Schema - Terms and Preferences
const step3Schema = z.object({
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  newsletter: z.boolean().optional(),
  notifications: z.boolean().optional(),
})

type Step1Values = z.infer<typeof step1Schema>
type Step2Values = z.infer<typeof step2Schema>
type Step3Values = z.infer<typeof step3Schema>

type SignupFormValues = Step1Values & Step2Values & Step3Values

const currencies = [
  { value: "NGN", label: "Nigerian Naira (₦)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GHS", label: "Ghanaian Cedi (₵)" },
  { value: "KES", label: "Kenyan Shilling (KSh)" },
  { value: "ZAR", label: "South African Rand (R)" },
]

const positions = [
  { value: "senior-pastor", label: "Senior Pastor" },
  { value: "assistant-pastor", label: "Assistant Pastor" },
  { value: "pastor", label: "Pastor" },
  { value: "elder", label: "Elder" },
  { value: "deacon", label: "Deacon" },
  { value: "secretary", label: "Church Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "administrator", label: "Administrator" },
  { value: "worship-leader", label: "Worship Leader" },
  { value: "youth-pastor", label: "Youth Pastor" },
  { value: "children-pastor", label: "Children's Pastor" },
  { value: "member", label: "Church Member" },
]

export default function SignupForm() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<SignupFormValues>>({})

  // Step 1 Form
  const step1Form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData as Step1Values,
  })

  // Step 2 Form
  const step2Form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: formData as Step2Values,
  })

  // Step 3 Form
  const step3Form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      terms: false,
      newsletter: true,
      notifications: true,
      ...formData,
    } as Step3Values,
  })

  const progress = (currentStep / 3) * 100

  const handleStep1Submit = (data: Step1Values) => {
    setFormData({ ...formData, ...data })
    setCurrentStep(2)
  }

  const handleStep2Submit = (data: Step2Values) => {
    setFormData({ ...formData, ...data })
    setCurrentStep(3)
  }

  const handleFinalSubmit = async (data: Step3Values) => {
    const finalData = { ...formData, ...data }
    setIsLoading(true)
    
    try {
      const displayName = `${finalData.firstName || ''} ${finalData.lastName || ''}`.trim()
      await signup(finalData.email!, finalData.password!, displayName)
      
      toast.success("Account created successfully!")
      navigate("/dashboard")
    } catch (error: any) {
      toast.error("Failed to create account. Please try again")
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="h-4 w-4" />
    if (step === 1) return <User className="h-4 w-4" />
    if (step === 2) return <Building2 className="h-4 w-4" />
    if (step === 3) return <CreditCard className="h-4 w-4" />
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Personal Information"
      case 2: return "Church Details"
      case 3: return "Complete Setup"
      default: return "Create Account"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Let's start with your basic information"
      case 2: return "Tell us about your church"
      case 3: return "Review and complete your registration"
      default: return "Set up your church management system"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <Card className="w-full max-w-2xl border-0 shadow-2xl bg-white/90 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-900">TitheSpace</span>
              <span className="text-sm text-slate-500 font-medium">Church Management System</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
                >
                  {getStepIcon(step)}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {getStepTitle()}
            </CardTitle>
            <CardDescription className="text-slate-600">
              {getStepDescription()}
            </CardDescription>
          </div>

          <Progress value={progress} className="w-full h-2" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-700 font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className={`h-11 rounded-xl bg-white/50 ${step1Form.formState.errors.firstName ? "border-red-500" : ""}`}
                    {...step1Form.register("firstName")}
                  />
                  {step1Form.formState.errors.firstName && (
                    <p className="text-xs text-red-500">{step1Form.formState.errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-700 font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className={`h-11 rounded-xl bg-white/50 ${step1Form.formState.errors.lastName ? "border-red-500" : ""}`}
                    {...step1Form.register("lastName")}
                  />
                  {step1Form.formState.errors.lastName && (
                    <p className="text-xs text-red-500">{step1Form.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pastor@church.com"
                  className={`h-11 rounded-xl bg-white/50 ${step1Form.formState.errors.email ? "border-red-500" : ""}`}
                  {...step1Form.register("email")}
                />
                {step1Form.formState.errors.email && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  className={`h-11 rounded-xl bg-white/50 ${step1Form.formState.errors.phone ? "border-red-500" : ""}`}
                  {...step1Form.register("phone")}
                />
                {step1Form.formState.errors.phone && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`h-11 rounded-xl bg-white/50 pr-12 ${step1Form.formState.errors.password ? "border-red-500" : ""}`}
                    {...step1Form.register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent rounded-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </Button>
                </div>
                {step1Form.formState.errors.password && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`h-11 rounded-xl bg-white/50 pr-12 ${step1Form.formState.errors.confirmPassword ? "border-red-500" : ""}`}
                    {...step1Form.register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent rounded-xl"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                  </Button>
                </div>
                {step1Form.formState.errors.confirmPassword && (
                  <p className="text-xs text-red-500">{step1Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-center gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Button>
            </form>
          )}

          {/* Step 2: Church Information */}
          {currentStep === 2 && (
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="churchName" className="text-slate-700 font-medium">Church Name</Label>
                <Input
                  id="churchName"
                  placeholder="e.g. Redeemed Christian Church of God"
                  className={`h-11 rounded-xl bg-white/50 ${step2Form.formState.errors.churchName ? "border-red-500" : ""}`}
                  {...step2Form.register("churchName")}
                />
                {step2Form.formState.errors.churchName && (
                  <p className="text-xs text-red-500">{step2Form.formState.errors.churchName.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-slate-700 font-medium">Your Position</Label>
                  <Select onValueChange={(value) => step2Form.setValue("position", value)}>
                    <SelectTrigger className="h-11 rounded-xl bg-white/50">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position.value} value={position.value}>
                          {position.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {step2Form.formState.errors.position && (
                    <p className="text-xs text-red-500">{step2Form.formState.errors.position.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency" className="text-slate-700 font-medium">Currency</Label>
                  <Select onValueChange={(value) => step2Form.setValue("currency", value)}>
                    <SelectTrigger className="h-11 rounded-xl bg-white/50">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {step2Form.formState.errors.currency && (
                    <p className="text-xs text-red-500">{step2Form.formState.errors.currency.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="churchAddress" className="text-slate-700 font-medium">Church Address</Label>
                <Input
                  id="churchAddress"
                  placeholder="e.g. 123 Church Street, Lagos, Nigeria"
                  className={`h-11 rounded-xl bg-white/50 ${step2Form.formState.errors.churchAddress ? "border-red-500" : ""}`}
                  {...step2Form.register("churchAddress")}
                />
                {step2Form.formState.errors.churchAddress && (
                  <p className="text-xs text-red-500">{step2Form.formState.errors.churchAddress.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchPhone" className="text-slate-700 font-medium">Church Phone</Label>
                  <Input
                    id="churchPhone"
                    type="tel"
                    placeholder="+234 801 234 5678"
                    className={`h-11 rounded-xl bg-white/50 ${step2Form.formState.errors.churchPhone ? "border-red-500" : ""}`}
                    {...step2Form.register("churchPhone")}
                  />
                  {step2Form.formState.errors.churchPhone && (
                    <p className="text-xs text-red-500">{step2Form.formState.errors.churchPhone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="churchEmail" className="text-slate-700 font-medium">Church Email</Label>
                  <Input
                    id="churchEmail"
                    type="email"
                    placeholder="info@church.com"
                    className={`h-11 rounded-xl bg-white/50 ${step2Form.formState.errors.churchEmail ? "border-red-500" : ""}`}
                    {...step2Form.register("churchEmail")}
                  />
                  {step2Form.formState.errors.churchEmail && (
                    <p className="text-xs text-red-500">{step2Form.formState.errors.churchEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-12 rounded-xl border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </div>
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    Continue
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Terms and Completion */}
          {currentStep === 3 && (
            <form onSubmit={step3Form.handleSubmit(handleFinalSubmit)} className="space-y-6">
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Review Your Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Name:</span>
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Church:</span>
                    <p className="font-medium">{formData.churchName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Position:</span>
                    <p className="font-medium">{positions.find(p => p.value === formData.position)?.label}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    {...step3Form.register("terms")}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Button variant="link" className="px-0 text-blue-600 h-auto font-semibold">
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button variant="link" className="px-0 text-blue-600 h-auto font-semibold">
                      Privacy Policy
                    </Button>
                  </Label>
                </div>
                {step3Form.formState.errors.terms && (
                  <p className="text-xs text-red-500 ml-6">{step3Form.formState.errors.terms.message}</p>
                )}

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="newsletter"
                    {...step3Form.register("newsletter")}
                  />
                  <Label htmlFor="newsletter" className="text-sm">
                    Send me updates about new features and church management tips
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="notifications"
                    {...step3Form.register("notifications")}
                  />
                  <Label htmlFor="notifications" className="text-sm">
                    Enable email notifications for important church activities
                  </Label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 h-12 rounded-xl border-slate-300 hover:bg-slate-50"
                  disabled={isLoading}
                >
                  <div className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </div>
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Create Account
                    </div>
                  )}
                </Button>
              </div>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}








