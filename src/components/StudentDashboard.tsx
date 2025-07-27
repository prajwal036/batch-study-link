import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Download,
  Search,
  Clock,
  Users,
  Play,
  Link
} from "lucide-react";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface StudentDashboardProps {
  user: any;
  onJoinBatch: (inviteCode: string) => void;
  onJoinLiveSession: (sessionId: string) => void;
}

export function StudentDashboard({ user, onJoinBatch, onJoinLiveSession }: StudentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  
  const [enrolledBatches] = useState([
    {
      id: '1',
      name: 'Mathematics Grade 10',
      teacher: 'Mrs. Sarah Johnson',
      nextSession: '2024-01-20 10:00 AM',
      materials: 12,
      isLive: false
    },
    {
      id: '2',
      name: 'Physics Grade 11', 
      teacher: 'Dr. Michael Chen',
      nextSession: '2024-01-20 2:00 PM',
      materials: 8,
      isLive: true
    }
  ]);

  const [ncertFiles] = useState([
    { id: '1', title: 'Mathematics Class 10 - Chapter 1', subject: 'Mathematics', class: '10', size: '2.4 MB' },
    { id: '2', title: 'Science Class 10 - Light & Reflection', subject: 'Science', class: '10', size: '3.1 MB' },
    { id: '3', title: 'English Class 10 - First Flight', subject: 'English', class: '10', size: '1.8 MB' },
    { id: '4', title: 'Social Science Class 10 - History', subject: 'Social Science', class: '10', size: '2.9 MB' },
    { id: '5', title: 'Mathematics Class 11 - Sets', subject: 'Mathematics', class: '11', size: '2.2 MB' },
    { id: '6', title: 'Physics Class 11 - Mechanics', subject: 'Physics', class: '11', size: '4.1 MB' }
  ]);

  const filteredFiles = ncertFiles.filter(file => 
    file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinBatch = () => {
    if (inviteCode.trim()) {
      onJoinBatch(inviteCode);
      setInviteCode("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}


      <IonHeader className="bg-card border-b border-border">
        <IonTitle className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                <AvatarFallback>{user.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <IonTitle className="text-xl font-semibold pl-0">Welcome, {user.name}</IonTitle>
                <p className="text-sm text-muted-foreground">Student Portal</p>
              </div>
            </div>
          </div>
        </IonTitle>
      </IonHeader>

      <IonContent className="ion-padding container mx-auto px-4 py-6">
        <Tabs defaultValue="batches" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="batches">My Batches</TabsTrigger>
            <TabsTrigger value="ncert">NCERT Files</TabsTrigger>
            <TabsTrigger value="join">Join Batch</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batches" className="space-y-6">
            {/* Live Sessions Alert */}
            {enrolledBatches.some(batch => batch.isLive) && (
              <Card className="border-primary bg-primary/5 card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="animate-pulse">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">Live Session Active!</h3>
                      <p className="text-sm text-muted-foreground">
                        Physics Grade 11 session is now live
                      </p>
                    </div>
                    <Button 
                      className="btn-primary"
                      onClick={() => onJoinLiveSession('2')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Join Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enrolled Batches */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {enrolledBatches.map((batch) => (
                <Card key={batch.id} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{batch.name}</CardTitle>
                        <CardDescription>{batch.teacher}</CardDescription>
                      </div>
                      {batch.isLive && (
                        <Badge variant="destructive" className="animate-pulse">
                          Live
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{batch.materials} materials</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Next: {batch.nextSession}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 btn-primary"
                        onClick={() => batch.isLive && onJoinLiveSession(batch.id)}
                        disabled={!batch.isLive}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        {batch.isLive ? 'Join Live' : 'Scheduled'}
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Materials
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="ncert" className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search NCERT files by subject or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* NCERT Files */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="card-elevated">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-md">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight mb-1">
                          {file.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <span>{file.subject}</span>
                          <span>•</span>
                          <span>Class {file.class}</span>
                          <span>•</span>
                          <span>{file.size}</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          <Download className="h-3 w-3 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="join" className="space-y-6">
            <Card className="max-w-md mx-auto card-elevated">
              <CardHeader className="text-center">
                <CardTitle>Join a Batch</CardTitle>
                <CardDescription>
                  Enter the invite code shared by your teacher
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="invite-code" className="text-sm font-medium">
                    Invite Code
                  </label>
                  <Input
                    id="invite-code"
                    placeholder="Enter invite code (e.g., ABC123)"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleJoinBatch}
                  className="w-full btn-primary"
                  disabled={!inviteCode.trim()}
                >
                  <Link className="h-4 w-4 mr-2" />
                  Join Batch
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Don't have an invite code?</p>
                  <p>Ask your teacher to share the WhatsApp link</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </IonContent>
    </div>
  );
}