import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Users, Leaf, Heart, MapPin, Train, ShoppingBag, GraduationCap, Mountain, Waves, Shield, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const About = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about Penta Housing Co-Op and the cooperative housing movement that makes 
            communities like ours possible.
          </p>
        </div>

        {/* About Penta Section */}
        <section className="mb-20">
          <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Penta</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Story</h3>
                <p className="text-gray-600 mb-4">
                  Penta Housing Co-Op began in 1974 when a group of dedicated individuals incorporated the 
                  Penta Co-operative Housing Association with a vision to create an inclusive, sustainable 
                  community. Through determination and community spirit, they overcame initial setbacks, 
                  including a rejected rezoning application, to eventually secure and develop our current site.
                </p>
                <p className="text-gray-600 mb-4">
                  After years of planning and community building, our cooperative welcomed its first 
                  residents in September 1978. Today, 20 families call Penta home, continuing that legacy 
                  of cooperation, environmental stewardship, and mutual support.
                </p>
                <p className="text-gray-600 mb-6">
                  Our residents come from diverse backgrounds but share common values of community, 
                  sustainability, and affordable housing that make our cooperative thrive.
                </p>
                
                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">1978</div>
                    <div className="text-sm text-gray-600">Established</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">20</div>
                    <div className="text-sm text-gray-600">Families</div>
                  </div>
                </div>
                
                <Link to="/apply">
                  <Button className="bg-green-600 hover:bg-green-700 hover-scale">
                    Join Our Community
                  </Button>
                </Link>
              </div>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 text-green-600 mr-2" />
                    Our Values
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Community First</h4>
                      <p className="text-sm text-gray-600">We prioritize collective well-being and shared decision-making</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Leaf className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Environmental Responsibility</h4>
                      <p className="text-sm text-gray-600">Sustainable practices and eco-friendly living are core to our mission</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Home className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Affordable Housing</h4>
                      <p className="text-sm text-gray-600">Quality housing should be accessible to everyone</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Inclusive Community</h4>
                      <p className="text-sm text-gray-600">We welcome diverse families and foster an environment where everyone belongs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <HandHeart className="h-5 w-5 text-green-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold">Mutual Support</h4>
                      <p className="text-sm text-gray-600">Members help each other through shared responsibilities and community care</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Location</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Near Jericho Beach</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Penta Housing Co-Op is nestled in Vancouver's peaceful Point Grey neighbourhood, 
                  just steps away from the beautiful Jericho Beach. This prime location offers 
                  residents the perfect blend of urban convenience and natural tranquility.
                </p>
                <p className="text-gray-600 mb-6">
                  Jericho Beach is one of Vancouver's most beloved destinations, featuring stunning 
                  views of the North Shore mountains and downtown skyline. The large Jericho Park 
                  provides a peaceful buffer from city noise while maintaining easy access to all 
                  urban amenities.
                </p>
                <div className="flex items-center text-gray-600 mb-4">
                  <Waves className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">Year-round access to beach activities including kayaking, sailing, and windsurfing</span>
                </div>
                <div className="flex items-center text-gray-600 mb-6">
                  <Mountain className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm">Stunning views of mountains and ocean from the neighbourhood</span>
                </div>
                <a 
                  href="https://govancity.com/neighbourhoods/point-grey/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover-scale shadow-md text-sm"
                >
                  Explore Point Grey Neighbourhood Guide
                </a>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Neighbourhood Highlights</h3>
                <div className="space-y-3">
                  <div className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <Waves className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Beach Access</span>
                      <p className="text-sm text-gray-600">Walking distance to Jericho Beach</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <Train className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Transit</span>
                      <p className="text-sm text-gray-600">Close to UBC campus and transit connections</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <Leaf className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Recreation</span>
                      <p className="text-sm text-gray-600">Access to parks, trails, and recreational facilities</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <ShoppingBag className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Shopping</span>
                      <p className="text-sm text-gray-600">Nearby shopping at West 4th Avenue and Broadway</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <GraduationCap className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                    <div>
                      <span className="font-medium">Schools</span>
                      <p className="text-sm text-gray-600">Family-friendly community with excellent schools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Co-op Housing Section */}
        <section>
          <div className="bg-white rounded-xl shadow-lg p-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Co-op Housing</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What is Co-op Housing?</h3>
                <p className="text-gray-600 mb-4">
                  Housing cooperatives are community-based organizations that provide affordable, secure housing 
                  through member ownership and democratic governance. Unlike rental housing, co-op members have 
                  a voice in how their housing is managed and maintained.
                </p>
                <p className="text-gray-600 mb-4">
                  Co-ops operate on the principle that housing should serve people, not profit. This approach 
                  keeps costs down while ensuring long-term affordability and community stability.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Benefits of Co-op Living</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">Below-market housing costs with stable, predictable fees</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">Democratic control over housing decisions and policies</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">Strong sense of community and mutual support</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">Security of tenure and protection from displacement</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-600">Opportunity to develop leadership and governance skills</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Learn More About Co-op Housing</h3>
              <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
                For more information about cooperative housing in British Columbia and across Canada, 
                visit these valuable resources:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://www.chf.bc.ca"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors hover-scale shadow-md"
                >
                  Co-op Housing Federation of BC
                </a>
                <a 
                  href="https://chfcanada.coop"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors hover-scale shadow-md"
                >
                  Co-op Housing Federation of Canada
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
