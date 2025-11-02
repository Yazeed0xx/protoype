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
import { Alert, AlertDescription } from '~/components/ui/alert'

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
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                      className="h-11"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isSubmitting}
                      className="h-11"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </Button>
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
