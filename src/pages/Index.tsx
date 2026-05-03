import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  usePageTitle("Home - Penta Housing Co-Op");
  const BASE_URL = import.meta.env.BASE_URL;
  const { trackCTA, trackExternalLink } = useAnalytics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section
        className="relative py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${BASE_URL}penta-images/hero-exterior.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Welcome to Penta Housing Co-Op
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A vibrant community where neighbours become family. Experience cooperative living 
            that combines affordability, sustainability, and genuine connection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/about" onClick={() => trackCTA('Learn More', 'hero')}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Learn More
              </Button>
            </Link>
            <Link to="/apply" onClick={() => trackCTA('Apply Now', 'hero')}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Images Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Beautiful Community
          </h3>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={`${BASE_URL}penta-images/courtyard-garden.jpg`} 
                alt="Peaceful garden courtyard with mature trees and natural wood buildings" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src={`${BASE_URL}penta-images/community-playground.jpg`} 
                alt="Community playground and shared outdoor spaces with basketball hoop" 
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Penta Housing Co-Op?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Community Living</CardTitle>
                <CardDescription>
                  Build lasting friendships and share experiences with like-minded neighbours in our family-friendly environment
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <Home className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Affordable Housing</CardTitle>
                <CardDescription>
                  Enjoy quality housing at below-market rates through cooperative ownership near beautiful Jericho Beach
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <FileText className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Shared Resources</CardTitle>
                <CardDescription>
                  Access shared spaces, tools, playground, and green areas that enhance your living experience
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Join Our Community */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">How to Join Our Community</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">1</div>
              <h4 className="font-semibold">Subscribe</h4>
              <p className="text-sm text-gray-600">Join our mailing list to get notified when units become available</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">2</div>
              <h4 className="font-semibold">Apply</h4>
              <p className="text-sm text-gray-600">Submit your application when a suitable unit opens up</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">3</div>
              <h4 className="font-semibold">Interview</h4>
              <p className="text-sm text-gray-600">If selected, participate in our community interview process</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">4</div>
              <h4 className="font-semibold">Move In</h4>
              <p className="text-sm text-gray-600">Welcome home! Join our thriving cooperative community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-green-600">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Join Our Community?</h3>
          <p className="text-lg text-green-100 mb-6">
            Take the first step toward cooperative living and become part of our vibrant community.
          </p>
          <Link to="/apply" onClick={() => trackCTA('Start Your Application', 'bottom_cta')}>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Application
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Credit */}
      <footer className="py-4 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            Website designed by{" "}
            <a 
              href="https://www.jeffo.net"
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
              onClick={() => trackExternalLink('Designer Website', 'https://www.jeffo.net')}
            >
              Jeff Oriecuia
            </a>
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
