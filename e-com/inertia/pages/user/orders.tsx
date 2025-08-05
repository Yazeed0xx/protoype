import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Package, Eye } from 'lucide-react'

export default function UserOrders() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Order History</h1>
          <p className="text-xl text-gray-600">Track your orders and purchase history</p>
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Order #{1000 + i}
                    </CardTitle>
                    <CardDescription>Placed on December {i + 10}, 2024</CardDescription>
                  </div>
                  <Badge variant={i % 2 === 0 ? 'default' : i % 3 === 0 ? 'secondary' : 'outline'}>
                    {i % 2 === 0 ? 'Delivered' : i % 3 === 0 ? 'Processing' : 'Shipped'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      {i + 1} item{i + 1 > 1 ? 's' : ''} • Total: ${(99.99 * (i + 1)).toFixed(2)}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {i % 2 === 0 && <Button size="sm">Reorder</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
