import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Progress } from '~/components/ui/progress'
import { Badge } from '~/components/ui/badge'
import { Target, TrendingUp } from 'lucide-react'

export default function ReadingGoals() {
  const yearlyGoal = 50
  const currentProgress = 47
  const percentage = (currentProgress / yearlyGoal) * 100

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          2025 Reading Goal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">
              {currentProgress} <span className="text-muted-foreground text-lg">/ {yearlyGoal}</span>
            </div>
            <p className="text-sm text-muted-foreground">Books completed</p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            {percentage.toFixed(0)}%
          </Badge>
        </div>
        
        <Progress value={percentage} className="h-3" />
        
        <p className="text-sm text-muted-foreground">
          You're {yearlyGoal - currentProgress} books away from your goal! Keep it up! 🎉
        </p>
      </CardContent>
    </Card>
  )
}

