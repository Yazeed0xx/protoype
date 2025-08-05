import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to E-Commerce</h1>
          <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Featured Products</CardTitle>
              <CardDescription>Check out our latest arrivals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Browse Products</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Special Offers</CardTitle>
              <CardDescription>Limited time deals</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Deals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Support</CardTitle>
              <CardDescription>We're here to help</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Join thousands of satisfied customers</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Button>Sign Up Today</Button>
              <Button variant="outline">Learn More</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
