import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, Video, FileText, Phone, Mail } from "lucide-react";
import classroomHero from "@/assets/classroom-hero.jpg";

interface AuthPageProps {
  onLogin: (userType: 'teacher' | 'student', userData: any) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (userType: 'teacher' | 'student') => {
    setIsLoading(true);
    
    // Simulate authentication - in real app, this would connect to Supabase
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: userType === 'teacher' ? 'Sarah Johnson' : 'Alex Smith',
        email: userType === 'teacher' ? 'sarah@school.edu' : 'alex@student.edu',
        userType
      };
      onLogin(userType, userData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left side - Hero content */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
          <div className="max-w-md mx-auto lg:mx-0">
            <div className="text-center lg:text-left mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Welcome to <span className="text-gradient">EduClass</span>
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Connect teachers and students in an interactive learning environment
              </p>
            </div>

            {/* Features highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Users className="h-5 w-5" />
                <span className="text-sm">Batch Management</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Video className="h-5 w-5" />
                <span className="text-sm">Live Sessions</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <FileText className="h-5 w-5" />
                <span className="text-sm">Study Materials</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm">NCERT Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Authentication */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <Card className="w-full max-w-md card-elevated">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gradient">
                Get Started
              </CardTitle>
              <CardDescription>
                Choose your role to access the platform
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="space-y-4">
                  <div className="space-y-4">
                    <Button 
                      onClick={() => handleAuth('student')}
                      disabled={isLoading}
                      className="w-full btn-primary"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Continue with Google
                    </Button>
                    
                    <Button 
                      onClick={() => handleAuth('student')}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      Continue with Facebook
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Input 
                          id="phone" 
                          placeholder="+1 (555) 000-0000" 
                          className="flex-1"
                        />
                        <Button className="ml-2" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="teacher" className="space-y-4">
                  <div className="space-y-4">
                    <Button 
                      onClick={() => handleAuth('teacher')}
                      disabled={isLoading}
                      className="w-full btn-secondary"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Continue with Google
                    </Button>
                    
                    <Button 
                      onClick={() => handleAuth('teacher')}
                      disabled={isLoading}
                      variant="outline"
                      className="w-full"
                    >
                      Continue with Facebook
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="teacher-email">Email</Label>
                      <Input 
                        id="teacher-email" 
                        type="email"
                        placeholder="teacher@school.edu" 
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleAuth('teacher')}
                      disabled={isLoading}
                      className="w-full btn-accent"
                    >
                      Sign In as Teacher
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="hidden lg:block h-64 overflow-hidden">
        <img 
          src={classroomHero} 
          alt="Modern classroom with students and technology"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
}