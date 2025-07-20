import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Users, 
  Video, 
  FileText, 
  Settings, 
  Share2,
  BookOpen,
  Calendar,
  BarChart3
} from "lucide-react";

interface TeacherDashboardProps {
  user: any;
  onCreateBatch: () => void;
  onStartLiveSession: (batchId: string) => void;
}

export function TeacherDashboard({ user, onCreateBatch, onStartLiveSession }: TeacherDashboardProps) {
  const [batches] = useState([
    {
      id: '1',
      name: 'Mathematics Grade 10',
      students: 24,
      materials: 12,
      nextSession: '2024-01-20 10:00 AM',
      isLive: false
    },
    {
      id: '2', 
      name: 'Physics Grade 11',
      students: 18,
      materials: 8,
      nextSession: '2024-01-20 2:00 PM',
      isLive: true
    },
    {
      id: '3',
      name: 'Chemistry Grade 12', 
      students: 15,
      materials: 15,
      nextSession: '2024-01-21 9:00 AM',
      isLive: false
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                <AvatarFallback>{user.name?.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-semibold">Welcome back, {user.name}</h1>
                <p className="text-sm text-muted-foreground">Teacher Dashboard</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">57</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{batches.length}</p>
                  <p className="text-sm text-muted-foreground">Active Batches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-2xl font-bold">35</p>
                  <p className="text-sm text-muted-foreground">Study Materials</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-muted-foreground">Live Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onCreateBatch} className="btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              Create New Batch
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Upload Materials
            </Button>
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Batches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <Card key={batch.id} className="card-elevated">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{batch.name}</CardTitle>
                    <CardDescription>
                      {batch.students} students enrolled
                    </CardDescription>
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
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{batch.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{batch.materials} materials</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Next: {batch.nextSession}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 btn-primary"
                    onClick={() => onStartLiveSession(batch.id)}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    {batch.isLive ? 'Join Live' : 'Start Session'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}