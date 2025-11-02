import { Link } from '@inertiajs/react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ArrowRight, BookOpen, Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float animation-delay-2000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-slow">
            <BookOpen className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="block mt-2">Reading Journey?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Join thousands of readers discovering their next favorite book. Sign up today and get access to our entire collection.
          </p>

          {/* Newsletter Form */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-white border-white/20"
                />
              </div>
              <Button
                size="lg"
                variant="default"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-3">
              Free for 30 days. No credit card required.
            </p>
          </div>

          {/* Alternative CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/books">
              <Button
                size="lg"
                variant="outline"
              >
                Browse Books
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
              >
                Create Free Account
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-12 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white/90">
              <div>
                <div className="text-2xl font-bold mb-1">Free</div>
                <div className="text-sm">To get started</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">Secure</div>
                <div className="text-sm">Your data is safe</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-sm">Support available</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">Unlimited</div>
                <div className="text-sm">Reading access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

