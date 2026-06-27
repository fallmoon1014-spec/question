import { useState, useEffect } from 'react';
import AdminView from './components/AdminView';
import VotingView from './components/VotingView';
import ResultView from './components/ResultView';
import EthicsGate from './components/EthicsGate';

function App() {
  const [ethicsAccepted, setEthicsAccepted] = useState(() => {
    return sessionStorage.getItem('ethicsAccepted') === 'true';
  });

  const [appState, setAppState] = useState(() => {
    return localStorage.getItem('appState') || 'admin';
  });
  
  const [candidates, setCandidates] = useState(() => {
    const saved = localStorage.getItem('candidates');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : { votesPerStudent: 3 };
  });

  useEffect(() => {
    localStorage.setItem('appState', appState);
  }, [appState]);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const handleAcceptEthics = () => {
    sessionStorage.setItem('ethicsAccepted', 'true');
    setEthicsAccepted(true);
  };

  const handleStartVoting = () => setAppState('voting');
  const handleShowResults = () => setAppState('result');
  
  const handleReset = () => {
    if(window.confirm('모든 투표 결과와 질문 목록이 완전히 초기화됩니다. 계속하시겠습니까?')) {
      setCandidates([]);
      setAppState('admin');
    }
  };

  const handleResetVotes = () => {
    if(window.confirm('투표수만 0으로 초기화하시겠습니까?')) {
      setCandidates(candidates.map(c => ({ ...c, votes: 0 })));
      setAppState('admin');
    }
  };

  const handleBackToAdmin = () => setAppState('admin');

  // Show ethics gate before allowing any activity
  if (!ethicsAccepted) {
    return <EthicsGate onAccept={handleAcceptEthics} />;
  }

  return (
    <div style={{ padding: '48px 24px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
      {appState === 'admin' && (
        <AdminView 
          candidates={candidates} 
          setCandidates={setCandidates}
          settings={settings}
          setSettings={setSettings}
          onStartVoting={handleStartVoting}
          onResetVotes={handleResetVotes}
        />
      )}
      
      {appState === 'voting' && (
        <VotingView 
          candidates={candidates}
          setCandidates={setCandidates}
          settings={settings}
          onShowResults={handleShowResults}
        />
      )}

      {appState === 'result' && (
        <ResultView 
          candidates={candidates}
          onReset={handleReset}
          onBackToAdmin={handleBackToAdmin}
        />
      )}
    </div>
  );
}

export default App;

