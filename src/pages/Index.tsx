import { useState } from "react";
import { AuthPage } from "@/components/AuthPage";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { StudentDashboard } from "@/components/StudentDashboard";
import { BatchCreation } from "@/components/BatchCreation";
import { LiveSession } from "@/components/LiveSession";

type View = 'auth' | 'teacher-dashboard' | 'student-dashboard' | 'batch-creation' | 'live-session';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('auth');
  const [user, setUser] = useState<any>(null);
  const [currentBatchId, setCurrentBatchId] = useState<string>('');

  const handleLogin = (userType: 'teacher' | 'student', userData: any) => {
    setUser(userData);
    setCurrentView(userType === 'teacher' ? 'teacher-dashboard' : 'student-dashboard');
  };

  const handleCreateBatch = () => {
    setCurrentView('batch-creation');
  };

  const handleBatchCreated = () => {
    setCurrentView('teacher-dashboard');
  };

  const handleStartLiveSession = (batchId: string) => {
    setCurrentBatchId(batchId);
    setCurrentView('live-session');
  };

  const handleBackToDashboard = () => {
    setCurrentView(user?.userType === 'teacher' ? 'teacher-dashboard' : 'student-dashboard');
  };

  const handleJoinBatch = (inviteCode: string) => {
    // In real app, this would validate the code and add student to batch
    console.log('Joining batch with code:', inviteCode);
  };

  const handleJoinLiveSession = (sessionId: string) => {
    setCurrentBatchId(sessionId);
    setCurrentView('live-session');
  };

  switch (currentView) {
    case 'auth':
      return <AuthPage onLogin={handleLogin} />;
    
    case 'teacher-dashboard':
      return (
        <TeacherDashboard 
          user={user}
          onCreateBatch={handleCreateBatch}
          onStartLiveSession={handleStartLiveSession}
        />
      );
    
    case 'student-dashboard':
      return (
        <StudentDashboard 
          user={user}
          onJoinBatch={handleJoinBatch}
          onJoinLiveSession={handleJoinLiveSession}
        />
      );
    
    case 'batch-creation':
      return (
        <BatchCreation 
          onBack={handleBackToDashboard}
          onBatchCreated={handleBatchCreated}
        />
      );
    
    case 'live-session':
      return (
        <LiveSession 
          batchId={currentBatchId}
          userType={user?.userType}
          user={user}
          onLeaveSession={handleBackToDashboard}
        />
      );
    
    default:
      return <AuthPage onLogin={handleLogin} />;
  }
};

export default Index;
