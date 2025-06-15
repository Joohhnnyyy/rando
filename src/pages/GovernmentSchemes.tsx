import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  Mail, 
  MessageSquare, 
  Clock, 
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const GovernmentSchemes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    state: '',
    schemeType: '',
    cropType: ''
  });

  // Mock data for schemes
  const trendingSchemes = [
    {
      id: 1,
      title: 'PM-KISAN Yojana',
      description: 'Income support of ₹6000 per year to all farmer families',
      type: 'Subsidy',
      deadline: '2024-12-31',
      states: ['All India'],
      isNew: true
    },
    {
      id: 2,
      title: 'Soil Health Card Scheme',
      description: 'Free soil testing and recommendations for farmers',
      type: 'Support',
      deadline: '2024-06-30',
      states: ['All India'],
      isNew: false
    }
  ];

  const allSchemes = [
    {
      id: 1,
      title: 'PM-KISAN Yojana',
      description: 'Income support of ₹6000 per year to all farmer families',
      fullDescription: 'The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector Scheme with 100% funding from Government of India.',
      type: 'Subsidy',
      deadline: '2024-12-31',
      states: ['All India'],
      eligibility: [
        'Small and marginal farmer families',
        'Combined landholding up to 2 hectares',
        'Valid bank account'
      ],
      benefits: [
        '₹6000 per year in three equal installments',
        'Direct bank transfer',
        'No middlemen involved'
      ],
      applicationProcess: [
        'Visit nearest Common Service Centre',
        'Submit required documents',
        'Get registered in the PM-KISAN portal'
      ],
      contact: '1800-180-1551'
    },
    // Add more schemes here
  ];

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Page Header */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Government Schemes & Subsidies</h1>
              <p className="text-gray-600 mt-2">
                Stay updated on the latest benefits, programs, and support from the government
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Smart Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>State/Region</Label>
                  <Select onValueChange={(value) => handleFilterChange('state', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      {/* Add more states */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Scheme Type</Label>
                  <Select onValueChange={(value) => handleFilterChange('schemeType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="subsidy">Subsidy</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="loan">Loan</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Crop Type</Label>
                  <Select onValueChange={(value) => handleFilterChange('cropType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Crops</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      {/* Add more crops */}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search schemes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trending Schemes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Trending Schemes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingSchemes.map(scheme => (
                  <Card key={scheme.id} className="relative">
                    {scheme.isNew && (
                      <Badge className="absolute top-4 right-4 bg-green-500">New</Badge>
                    )}
                    <CardHeader>
                      <CardTitle>{scheme.title}</CardTitle>
                      <CardDescription>{scheme.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{scheme.type}</Badge>
                        <Button>Apply Now</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Schemes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">All Schemes</h2>
              <div className="space-y-4">
                {allSchemes.map(scheme => (
                  <Card key={scheme.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{scheme.title}</CardTitle>
                          <CardDescription>{scheme.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{scheme.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="details">
                          <AccordionTrigger>View Details</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Full Description</h4>
                                <p>{scheme.fullDescription}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Eligibility</h4>
                                <ul className="list-disc pl-4">
                                  {scheme.eligibility.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Benefits</h4>
                                <ul className="list-disc pl-4">
                                  {scheme.benefits.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Application Process</h4>
                                <ol className="list-decimal pl-4">
                                  {scheme.applicationProcess.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ol>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-semibold mb-2">Contact</h4>
                                  <p>{scheme.contact}</p>
                                </div>
                                <Button>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Visit Portal
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to stay updated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <Label>SMS Alerts</Label>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <Label>In-app Reminders</Label>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="urgent">Urgent Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>How do I apply for a scheme?</AccordionTrigger>
                    <AccordionContent>
                      Each scheme has its own application process. Click on "View Details" for any scheme to see the specific application steps.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>What documents do I need?</AccordionTrigger>
                    <AccordionContent>
                      Common documents include Aadhaar card, land records, bank account details, and crop details. Specific requirements vary by scheme.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>How do I track my application?</AccordionTrigger>
                    <AccordionContent>
                      You can track your application through the respective scheme's portal or contact the helpline number provided.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GovernmentSchemes; 