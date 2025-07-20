import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BatchCreationProps {
  onBack: () => void;
  onBatchCreated: (batch: any) => void;
}

export function BatchCreation({ onBack, onBatchCreated }: BatchCreationProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject: "",
    grade: "",
    capacity: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { toast } = useToast();

  const generateInviteCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const generateWhatsAppLink = (code: string, batchName: string) => {
    const message = `🎓 Join "${batchName}" batch on EduClass!\n\nInvite Code: ${code}\n\nDownload the app and use this code to join the batch.`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate batch creation
    setTimeout(() => {
      const code = generateInviteCode();
      const batch = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        inviteCode: code,
        students: 0,
        materials: 0,
        createdAt: new Date().toISOString()
      };

      setInviteCode(code);
      setWhatsappLink(generateWhatsAppLink(code, formData.name));
      setIsLoading(false);
      
      toast({
        title: "Batch Created Successfully!",
        description: `"${formData.name}" is ready for students to join.`,
      });

      // Call parent callback after a delay to show the success state
      setTimeout(() => {
        onBatchCreated(batch);
      }, 2000);
    }, 1000);
  };

  const copyToClipboard = async (text: string, type: 'code' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      
      toast({
        title: "Copied!",
        description: `${type === 'code' ? 'Invite code' : 'WhatsApp link'} copied to clipboard.`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the text manually.",
        variant: "destructive"
      });
    }
  };

  // If batch is created, show success state with sharing options
  if (inviteCode) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <Card className="card-elevated">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-gradient">Batch Created Successfully!</CardTitle>
              <CardDescription>
                Share the invite code or WhatsApp link with your students
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Batch Details */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2">{formData.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>Subject: {formData.subject}</div>
                  <div>Grade: {formData.grade}</div>
                  <div>Capacity: {formData.capacity} students</div>
                  <div>Status: Active</div>
                </div>
              </div>

              {/* Invite Code */}
              <div className="space-y-2">
                <Label>Invite Code</Label>
                <div className="flex gap-2">
                  <Input 
                    value={inviteCode} 
                    readOnly 
                    className="font-mono text-lg text-center"
                  />
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(inviteCode, 'code')}
                  >
                    {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Students can use this code to join your batch
                </p>
              </div>

              {/* WhatsApp Sharing */}
              <div className="space-y-3">
                <Label>Share via WhatsApp</Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(whatsappLink, '_blank')}
                    className="flex-1 btn-secondary"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(whatsappLink, 'link')}
                  >
                    {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send this link to your students via WhatsApp or other messaging apps
                </p>
              </div>

              <Button onClick={onBack} className="w-full btn-primary">
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gradient">Create New Batch</h1>
          <p className="text-muted-foreground">Set up a new class for your students</p>
        </div>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Batch Details
            </CardTitle>
            <CardDescription>
              Provide the basic information for your new batch
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Batch Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mathematics Grade 10"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the batch content and objectives..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="social-science">Social Science</SelectItem>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class *</Label>
                  <Select 
                    value={formData.grade} 
                    onValueChange={(value) => setFormData({ ...formData, grade: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          Class {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Maximum Students</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="e.g., 30"
                  min="1"
                  max="100"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty for unlimited enrollment
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={isLoading || !formData.name || !formData.subject || !formData.grade}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Batch...
                  </>
                ) : (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Create Batch
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}