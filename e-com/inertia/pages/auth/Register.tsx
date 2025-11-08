import { router, Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff, UserPlus, BookOpen, ArrowRight, Users, Star, TrendingUp, Sparkles, Check } from 'lucide-react'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import { Badge } from '~/components/ui/badge'
import { Separator } from '~/components/ui/separator'

const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .refine((name) => name.trim().split(/\s+/).length >= 2, {
      message: 'Please enter both first and last name',
    }),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase()
    .refine((email) => {
      // Additional email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }, 'Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the Terms of Service and Privacy Policy',
    }),
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useReactHookForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      acceptTerms: false,
    },
    mode: 'onChange', // Enable real-time validation
  })

  const handleSubmit = (values: RegisterFormData) => {
    setIsSubmitting(true)
    
    // Remove acceptTerms from the data sent to the server
    const { acceptTerms, ...registrationData } = values
    
    router.post('/register', registrationData, {
      onError: (errors) => {
        // Set server errors to react-hook-form
        Object.keys(errors).forEach((key) => {
          if (key in form.getValues()) {
            form.setError(key as keyof RegisterFormData, {
              type: 'server',
              message: errors[key] as string,
            })
          }
        })
        setIsSubmitting(false)
      },
      onFinish: () => {
        setIsSubmitting(false)
      },
    })
  }

  const passwordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' }
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
    const colors = ['', 'bg-destructive', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']
    return { strength, label: labels[strength] || '', color: colors[strength] || '' }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="w-full max-w-md animate-slide-in-left relative z-10">
          <Card className="border-2 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <Link href="/" className="lg:hidden inline-flex items-center justify-center space-x-2 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">BookTrack</span>
                </Link>

                <div className="flex items-center justify-center gap-2 mb-4">
                  <h2 className="text-3xl font-bold text-foreground">Join our community</h2>
                  <Badge variant="secondary" className="animate-bounce-slow">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Free
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">Create your account and start reading</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
             
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up">
                        <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your full name"
                            {...field}
                            disabled={isSubmitting}
                            className="h-12 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up">
                        <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                            disabled={isSubmitting}
                            className="h-12 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up">
                        <FormLabel className="text-foreground font-medium">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              {...field}
                              disabled={isSubmitting}
                              className="h-12 pr-12 transition-all duration-200"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isSubmitting}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        {field.value && (
                          <div className="space-y-2 mt-2">
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1.5 flex-1 rounded-full transition-all ${
                                    i < passwordStrength(field.value).strength
                                      ? passwordStrength(field.value).color
                                      : 'bg-muted'
                                  }`}
                                />
                              ))}
                            </div>
                            {passwordStrength(field.value).label && (
                              <p className="text-xs text-muted-foreground">
                                Password strength: {passwordStrength(field.value).label}
                              </p>
                            )}
                          </div>
                        )}
                        {!field.value && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Must include uppercase, lowercase, number, and special character
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="animate-fade-in-up">
                        <div className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              id="terms"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-1"
                            />
                          </FormControl>
                          <label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                          >
                            I agree to the{' '}
                            <Link
                              href="/terms"
                              className="text-primary hover:underline font-medium"
                            >
                              Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                              href="/privacy"
                              className="text-primary hover:underline font-medium"
                            >
                              Privacy Policy
                            </Link>
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 animate-fade-in-up"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    )}
                  </Button>

                  <div className="relative animate-fade-in-up">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                   
                  </div>

             
                  <div className="text-center animate-fade-in-up">
                    <span className="text-muted-foreground">
                      Already have an account?{' '}
                      <Link
                        href="/auth/login"
                        className="font-medium text-primary hover:underline transition-colors"
                      >
                        Sign in here
                      </Link>
                    </span>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
        {/* Background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="animate-slide-in-right max-w-lg">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold">BookTrack</span>
            </Link>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold leading-tight mb-4">
                  Start your amazing reading adventure
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Join thousands of readers who have already discovered their next favorite book with us.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">50,000+ Active Readers</span>
                    <span className="text-white/70 text-sm">Join our growing community</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">4.9/5 Rating</span>
                    <span className="text-white/70 text-sm">Loved by our users</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">1M+ Books Read</span>
                    <span className="text-white/70 text-sm">This month alone</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>
              </div>

              <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>
                <p className="text-white/95 text-base italic leading-relaxed mb-3">
                  "BookTrack transformed my reading habits. I've discovered so many amazing books I never would have found otherwise!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-semibold">S</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Sarah Johnson</p>
                    <p className="text-white/70 text-sm">Verified reader</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
