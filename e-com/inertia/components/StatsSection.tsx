import { Card } from './ui/card'
import { BookOpen, Globe, Star, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: BookOpen,
    value: '10,000+',
    label: 'Books Available',
    description: 'Across all genres',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Globe,
    value: '50,000+',
    label: 'Active Readers',
    description: 'Reading daily',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: Star,
    value: '100,000+',
    label: 'Reviews Posted',
    description: 'By our community',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Satisfaction Rate',
    description: 'User approval',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export default function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Growing Every Day
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of readers who have made us their go-to platform for discovering and enjoying great books.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>

                  {/* Value */}
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Card>
            )
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-lg">
            Updated in real-time • Join our growing community today
          </p>
        </div>
      </div>
    </section>
  )
}

