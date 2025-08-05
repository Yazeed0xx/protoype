import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Users, Award, Shield, Truck } from 'lucide-react'

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About E-Commerce</h1>
          <p className="text-xl text-gray-600 mb-6">
            Your trusted partner for quality products and exceptional service
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Established 2020
          </Badge>
        </div>

        {/* Story Section */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Founded in 2020, E-Commerce started as a small online marketplace with a simple
                mission: to provide high-quality products at affordable prices while delivering
                exceptional customer service.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                What began as a passion project has grown into a trusted platform serving thousands
                of customers worldwide. We pride ourselves on our carefully curated selection of
                products, competitive pricing, and commitment to customer satisfaction.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue to evolve and expand our offerings while staying true to our core
                values of quality, reliability, and customer-first service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Customer First</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                We prioritize our customers' needs and satisfaction above all else
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Quality Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Every product is carefully selected and tested to meet our high standards
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Secure Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Your personal and payment information is protected with industry-leading security
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Quick and reliable shipping to get your orders to you as fast as possible
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-gray-600">Products Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-8">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Shopping?</CardTitle>
              <CardDescription>
                Join thousands of satisfied customers and discover amazing products today
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Button size="lg">Browse Products</Button>
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
