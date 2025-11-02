import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Avid Reader',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    content: 'This platform has completely transformed my reading habits. The personalized recommendations are spot-on, and I\'ve discovered so many amazing books I would have never found otherwise!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Book Blogger',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    content: 'As a book blogger, I need a reliable platform to discover new releases and classics. This library has everything I need, plus the community features are fantastic!',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    content: 'Perfect for my academic research and leisure reading. The search functionality is powerful, and I love being able to organize my reading lists by subject.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Teacher',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    content: 'I recommend this platform to all my students. The vast collection and easy navigation make it an excellent resource for both education and entertainment.',
    rating: 5,
  },
  {
    name: 'Sophia Martinez',
    role: 'Author',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
    content: 'As an author myself, I appreciate how this platform showcases books and connects readers with writers. The review system is thoughtful and constructive.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Librarian',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    content: 'The categorization and organization rival traditional libraries. It\'s become my go-to recommendation for patrons looking to explore digital reading.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-primary/10">
        <Quote className="w-32 h-32" />
      </div>
      <div className="absolute bottom-10 right-10 text-primary/10 rotate-180">
        <Quote className="w-32 h-32" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Loved by Readers
            <span className="text-primary"> Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it - hear what our community of passionate readers has to say.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50"
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-lg">
            Join <span className="text-primary font-semibold">50,000+</span> satisfied readers
          </p>
        </div>
      </div>
    </section>
  )
}

