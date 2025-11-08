import { router, Link } from '@inertiajs/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff, LogIn, BookOpen, ArrowRight, Check, Shield, Zap, Library } from 'lucide-react'
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

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters')
    .toLowerCase()
    .refine((email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }, 'Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters'),
  rememberMe: z.boolean().optional().default(false),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useReactHookForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur', // Validate on blur for better UX on login
  })

  const handleSubmit = (values: LoginFormData) => {
    setIsSubmitting(true)
    
    const { rememberMe, ...credentials } = values
    
    router.post(
      '/login',
      { ...credentials, remember: rememberMe },
      {
        onError: (errors) => {
          // Set server errors to react-hook-form
          Object.keys(errors).forEach((key) => {
            if (key in form.getValues()) {
              form.setError(key as keyof LoginFormData, {
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
      }
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent">
        {/* Background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="animate-slide-in-left max-w-lg">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <span className="text-3xl font-bold">BookTrack</span>
            </Link>

            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold leading-tight mb-4">
                  Welcome back to your reading journey
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Continue exploring thousands of books and dive back into your personalized reading experience.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Library className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">10,000+ Books</span>
                    <span className="text-white/70 text-sm">Access our vast library</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">Smart Recommendations</span>
                    <span className="text-white/70 text-sm">Personalized for you</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/15 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="block text-white font-semibold text-lg">Secure & Private</span>
                    <span className="text-white/70 text-sm">Your data protected</span>
                  </div>
                  <Check className="w-5 h-5 text-white/80 ml-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-muted/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="w-full max-w-md animate-slide-in-right relative z-10">
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
                  <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
                  <Badge variant="outline" className="animate-pulse">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg">Sign in to continue your reading</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                  {Object.keys(form.formState.errors).length > 0 && (
                    <Alert variant="destructive" className="animate-fade-in-up">
                      <AlertDescription>
                        Please fix the errors below to continue
                      </AlertDescription>
                    </Alert>
                  )}

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
                              placeholder="Enter your password"
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <div className="flex items-center justify-between animate-fade-in-up">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              id="remember"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            Remember me
                          </label>
                        </FormItem>
                      )}
                    />
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div> */}

                  <Button
                    type="submit"
                    className="w-full h-12 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 animate-fade-in-up"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign in
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    )}
                  </Button>

                  <div className="relative animate-fade-in-up">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    {/* <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div> */}
                  </div>

                  {/* <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
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
                  </div> */}

                  <div className="text-center animate-fade-in-up">
                    <span className="text-muted-foreground">
                      Don't have an account?{' '}
                      <Link
                        href="/auth/register"
                        className="font-medium text-primary hover:underline transition-colors"
                      >
                        Create one now
                      </Link>
                    </span>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
