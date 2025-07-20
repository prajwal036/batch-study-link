import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  MessageSquare, 
  Users, 
  Share2, 
  PhoneOff,
  Send,
  ArrowLeft,
  FileText,
  Camera
} from "lucide-react";

interface LiveSessionProps {
  batchId: string;
  userType: 'teacher' | 'student';
  user: any;
  onLeaveSession: () => void;
}

export function LiveSession({ batchId, userType, user, onLeaveSession }: LiveSessionProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [message, setMessage] = useState("");
  const [participants] = useState([
    { id: '1', name: 'Sarah Johnson', role: 'teacher', isPresenting: true },
    { id: '2', name: 'Alex Smith', role: 'student', isPresenting: false },
    { id: '3', name: 'Maya Patel', role: 'student', isPresenting: false },
    { id: '4', name: 'John Doe', role: 'student', isPresenting: false },
    { id: '5', name: 'Emma Wilson', role: 'student', isPresenting: false }
  ]);
  
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'Sarah Johnson', message: 'Welcome everyone! Today we will cover quadratic equations.', timestamp: '2:00 PM', isTeacher: true },
    { id: '2', sender: 'Alex Smith', message: 'Thank you for the session!', timestamp: '2:01 PM', isTeacher: false },
    { id: '3', sender: 'Maya Patel', message: 'Can you please explain the discriminant again?', timestamp: '2:02 PM', isTeacher: false },
    { id: '4', sender: 'Sarah Johnson', message: 'Sure Maya! The discriminant helps us determine the nature of roots.', timestamp: '2:03 PM', isTeacher: true }
  ]);

  const [sessionDuration, setSessionDuration] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: user.name,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTeacher: userType === 'teacher'
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onLeaveSession}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Leave
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Mathematics Grade 10</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
                <span>{formatDuration(sessionDuration)}</span>
                <span>{participants.length} participants</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {userType === 'teacher' && (
              <>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Share Screen
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
              {/* Teacher/Presenter View */}
              <Card className="card-elevated overflow-hidden">
                <div className="relative aspect-video bg-gradient-primary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Teacher's Video</p>
                    </div>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-accent">
                    Presenting
                  </Badge>
                  <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-sm">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <span>Sarah Johnson</span>
                  </div>
                </div>
              </Card>

              {/* Participants Grid */}
              <div className="grid grid-cols-2 gap-2">
                {participants.slice(1, 5).map((participant) => (
                  <Card key={participant.id} className="card-elevated overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder-avatar.jpg" />
                          <AvatarFallback>
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                        {participant.name.split(' ')[0]}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isAudioOn ? "outline" : "destructive"}
                size="sm"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant={isVideoOn ? "outline" : "destructive"}
                size="sm"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={onLeaveSession}
              >
                <PhoneOff className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 border-l border-border flex flex-col">
            {/* Participants */}
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants ({participants.length})
              </h3>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-2 text-sm">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="text-xs">
                          {participant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-1">{participant.name}</span>
                      {participant.role === 'teacher' && (
                        <Badge variant="secondary" className="text-xs">Teacher</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </h3>
              </div>
              
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={msg.isTeacher ? "text-primary font-medium" : ""}>
                          {msg.sender}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-sm bg-muted rounded-md p-2">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}