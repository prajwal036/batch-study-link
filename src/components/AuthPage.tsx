import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  IonContent, 
  IonPage, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonText
} from "@ionic/react";
import { bookOutline, peopleOutline, videocamOutline, documentTextOutline, mailOutline, callOutline, logoGoogle, logoFacebook } from "ionicons/icons";
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
    <IonPage>
      <IonContent className="bg-gradient-to-bl from-[#fad0c4] to-[#ffd1ff]">
        <IonGrid>
          <IonRow className="min-h-screen">
            {/* Left side - Hero content */}
            <IonCol size="12" sizeLg="6" className="flex flex-col justify-center ">
              <div className="px-6 py-12">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Welcome to <span className="text-gradient">EduClass</span>
                  </h1>
                  <IonText color="light">
                    <p className="text-lg mb-6">
                      Connect teachers and students in an interactive learning environment
                    </p>
                  </IonText>
                </div>

                {/* Features highlights */}
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <div className="flex items-center gap-2 text-white/90 mb-4">
                        <IonIcon icon={peopleOutline} className="text-xl" />
                        <span className="text-sm">Batch Management</span>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="flex items-center gap-2 text-white/90 mb-4">
                        <IonIcon icon={videocamOutline} className="text-xl" />
                        <span className="text-sm">Live Sessions</span>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="flex items-center gap-2 text-white/90 mb-4">
                        <IonIcon icon={documentTextOutline} className="text-xl" />
                        <span className="text-sm">Study Materials</span>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="flex items-center gap-2 text-white/90 mb-4">
                        <IonIcon icon={bookOutline} className="text-xl" />
                        <span className="text-sm">NCERT Access</span>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonCol>

            {/* Right side - Authentication */}
            <IonCol size="12" sizeLg="6" className="flex items-center justify-center">
              <div className="w-full max-w-md px-6 py-12">
                <IonCard className="card-elevated">
                  <IonCardHeader className="text-center">
                    <IonCardTitle className="text-2xl font-bold text-gradient">
                      Get Started
                    </IonCardTitle>
                    <IonText color="medium">
                      <p>Choose your role to access the platform</p>
                    </IonText>
                  </IonCardHeader>
                  
                  <IonCardContent>
                    <IonSegment value="student" className="mb-6">
                      <IonSegmentButton value="student">
                        <IonLabel>Student</IonLabel>
                      </IonSegmentButton>
                      <IonSegmentButton value="teacher">
                        <IonLabel>Teacher</IonLabel>
                      </IonSegmentButton>
                    </IonSegment>
                    
                    <div className="space-y-4">
                      <IonButton 
                        expand="block"
                        fill="solid"
                        onClick={() => handleAuth('student')}
                        disabled={isLoading}
                        className="btn-primary"
                      >
                        <IonIcon icon={logoGoogle} slot="start" />
                        Continue with Google
                      </IonButton>
                      
                      <IonButton 
                        expand="block"
                        fill="outline"
                        onClick={() => handleAuth('student')}
                        disabled={isLoading}
                      >
                        <IonIcon icon={logoFacebook} slot="start" />
                        Continue with Facebook
                      </IonButton>
                      
                      <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-white px-2 text-gray-500">Or</span>
                        </div>
                      </div>
                      
                      <IonList>
                        <IonItem>
                          <IonInput 
                            placeholder="+1 (555) 000-0000"
                            type="tel"
                          />
                          <IonButton fill="clear" slot="end">
                            <IonIcon icon={callOutline} />
                          </IonButton>
                        </IonItem>
                      </IonList>
                      
                      <IonButton 
                        expand="block"
                        fill="solid"
                        onClick={() => handleAuth('student')}
                        disabled={isLoading}
                        className="btn-accent mt-4"
                      >
                        <IonIcon icon={mailOutline} slot="start" />
                        Sign In with Phone
                      </IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Hero Image Section for larger screens */}
        <div className="hidden lg:block h-64 overflow-hidden">
          <img 
            src={classroomHero} 
            alt="Modern classroom with students and technology"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </IonContent>
    </IonPage>
  );
}