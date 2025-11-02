import { Card, CardContent } from '~/components/ui/card'
import { BookOpen, CheckCircle, Clock, TrendingUp } from 'lucide-react'

const stats = [
  {
    icon: BookOpen,
    label: 'Currently Reading',
    value: '5',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Clock,
    label: 'Want to Read',
    value: '23',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: CheckCircle,
    label: 'Completed',
    value: '47',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: TrendingUp,
    label: 'This Month',
    value: '8',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-3`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

