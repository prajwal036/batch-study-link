import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButton, 
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonAvatar,
  IonLabel,
  IonItem,
  IonList,
  IonBadge,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { 
  addOutline, 
  peopleOutline, 
  videocamOutline, 
  documentTextOutline, 
  settingsOutline, 
  shareOutline,
  bookOutline,
  calendarOutline,
  statsChartOutline,
  playOutline
} from "ionicons/icons";
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Teacher Dashboard</IonTitle>
          <IonButton slot="end" fill="clear">
            <IonIcon icon={settingsOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        {/* User Info Header */}
        <div className="bg-gradient-primary p-4 text-white">
          <IonItem color="primary" lines="none">
            <IonAvatar slot="start">
              <img src="/placeholder-avatar.jpg" alt={user.name} />
            </IonAvatar>
            <IonLabel>
              <h2 className="text-lg font-semibold">Welcome back, {user.name}</h2>
              <p className="text-white/80">Teacher Dashboard</p>
            </IonLabel>
          </IonItem>
        </div>

        {/* Stats Cards */}
        <IonGrid className="py-4">
          <IonRow>
            <IonCol size="6" sizeMd="3">
              <IonCard className="card-elevated text-center">
                <IonCardContent>
                  <IonIcon icon={peopleOutline} className="text-4xl text-primary mb-2" />
                  <h2 className="text-2xl font-bold">57</h2>
                  <p className="text-sm text-gray-600">Total Students</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="6" sizeMd="3">
              <IonCard className="card-elevated text-center">
                <IonCardContent>
                  <IonIcon icon={bookOutline} className="text-4xl text-secondary mb-2" />
                  <h2 className="text-2xl font-bold">{batches.length}</h2>
                  <p className="text-sm text-gray-600">Active Batches</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="6" sizeMd="3">
              <IonCard className="card-elevated text-center">
                <IonCardContent>
                  <IonIcon icon={documentTextOutline} className="text-4xl text-accent mb-2" />
                  <h2 className="text-2xl font-bold">35</h2>
                  <p className="text-sm text-gray-600">Study Materials</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            
            <IonCol size="6" sizeMd="3">
              <IonCard className="card-elevated text-center">
                <IonCardContent>
                  <IonIcon icon={videocamOutline} className="text-4xl text-primary mb-2" />
                  <h2 className="text-2xl font-bold">1</h2>
                  <p className="text-sm text-gray-600">Live Sessions</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Quick Actions */}
        <div className="px-4 mb-4">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton expand="block" className="btn-primary" onClick={onCreateBatch}>
                  <IonIcon icon={addOutline} slot="start" />
                  Create New Batch
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton expand="block" fill="outline">
                  <IonIcon icon={documentTextOutline} slot="start" />
                  Upload Materials
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>

        {/* Batches List */}
        <IonList>
          {batches.map((batch) => (
            <IonCard key={batch.id} className="mx-4 mb-4 card-elevated">
              <IonCardHeader>
                <div className="flex items-start justify-between">
                  <IonCardTitle className="text-lg">{batch.name}</IonCardTitle>
                  {batch.isLive && (
                    <IonChip color="danger" className="animate-pulse">
                      <IonLabel>Live</IonLabel>
                    </IonChip>
                  )}
                </div>
                <p className="text-gray-600">{batch.students} students enrolled</p>
              </IonCardHeader>
              
              <IonCardContent>
                <IonGrid>
                  <IonRow className="text-sm mb-3">
                    <IonCol size="6">
                      <div className="flex items-center gap-2">
                        <IonIcon icon={peopleOutline} className="text-gray-500" />
                        <span>{batch.students} students</span>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="flex items-center gap-2">
                        <IonIcon icon={documentTextOutline} className="text-gray-500" />
                        <span>{batch.materials} materials</span>
                      </div>
                    </IonCol>
                  </IonRow>
                  
                  <IonRow className="mb-3">
                    <IonCol>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IonIcon icon={calendarOutline} />
                        <span>Next: {batch.nextSession}</span>
                      </div>
                    </IonCol>
                  </IonRow>
                  
                  <IonRow>
                    <IonCol size="9">
                      <IonButton 
                        expand="block"
                        className="btn-primary"
                        onClick={() => onStartLiveSession(batch.id)}
                      >
                        <IonIcon icon={batch.isLive ? playOutline : videocamOutline} slot="start" />
                        {batch.isLive ? 'Join Live' : 'Start Session'}
                      </IonButton>
                    </IonCol>
                    <IonCol size="3">
                      <IonButton fill="outline" expand="block">
                        <IonIcon icon={shareOutline} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* Floating Action Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={onCreateBatch} className="btn-primary">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}