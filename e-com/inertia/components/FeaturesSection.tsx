import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { BookOpen, Heart, Search, Sparkles, Star, Users } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Find your next favorite book with our advanced search and filtering system.',
    badge: 'Popular',
  },
  {
    icon: BookOpen,
    title: 'Vast Collection',
    description: 'Access thousands of books across multiple genres and categories.',
    badge: 'Featured',
  },
  {
    icon: Heart,
    title: 'Reading Lists',
    description: 'Create and manage personalized reading lists to track your literary journey.',
    badge: 'New',
  },
  {
    icon: Star,
    title: 'Reviews & Ratings',
    description: 'Read community reviews and ratings to discover quality reads.',
    badge: null,
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with fellow book lovers and share recommendations.',
    badge: null,
  },
  {
    icon: Sparkles,
    title: 'Personalized',
    description: 'Get book recommendations tailored to your reading preferences.',
    badge: 'AI-Powered',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything You Need for
            <span className="text-primary"> Reading Excellence</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to enhance your reading experience and help you discover your next favorite book.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {feature.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

