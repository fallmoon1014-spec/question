import React, { useState } from 'react';
import { Plus, X, Play, RefreshCw } from 'lucide-react';

export default function AdminView({ candidates, setCandidates, settings, setSettings, onStartVoting, onResetVotes }) {
  const [newCandidateName, setNewCandidateName] = useState('');

  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!newCandidateName.trim()) return;
    
    const newCandidate = {
      id: Date.now().toString(),
      name: newCandidateName.trim(),
      votes: 0
    };
    
    setCandidates([...candidates, newCandidate]);
    setNewCandidateName('');
  };

  const handleRemoveCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const handleVotesChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) {
      setSettings({ ...settings, votesPerStudent: val });
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="title">질문 뽑기</h1>
      <p className="subtitle">질문을 등록하고 투표 설정을 완료한 뒤 시작하세요.</p>

      {/* Question registration card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 500 }}>
          질문 등록 <span style={{ color: 'var(--mute)', fontWeight: 400 }}>{candidates.length}개</span>
        </h2>
        
        <form onSubmit={handleAddCandidate} style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          <input 
            type="text" 
            className="input-field"
            placeholder="질문 내용 입력..." 
            value={newCandidateName}
            onChange={(e) => setNewCandidateName(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            <Plus size={16} /> 추가
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {candidates.map(candidate => (
            <div key={candidate.id} className="question-item">
              <span>{candidate.name}</span>
              <button 
                type="button" 
                className="btn-icon" 
                onClick={() => handleRemoveCandidate(candidate.id)}
                style={{ color: 'var(--mute)' }}
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {candidates.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--mute)', padding: '32px 0', fontSize: '14px' }}>
              등록된 질문이 없습니다.
            </div>
          )}
        </div>
      </div>

      {/* Settings card */}
      <div className="card">
        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: 500 }}>투표 설정</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontWeight: 500, fontSize: '14px', color: 'var(--charcoal)' }}>1인당 투표 가능 횟수</label>
          <input 
            type="number" 
            className="input-field" 
            style={{ width: '80px', textAlign: 'center' }} 
            min="1" 
            value={settings.votesPerStudent} 
            onChange={handleVotesChange} 
          />
          <span style={{ fontSize: '14px', color: 'var(--body)' }}>개</span>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          justifyContent: 'flex-end', 
          marginTop: '32px', 
          paddingTop: '24px', 
          borderTop: '1px solid var(--hairline)' 
        }}>
          <button className="btn-secondary" onClick={onResetVotes}>
            <RefreshCw size={14} /> 투표수 초기화
          </button>
          <button 
            className="btn-primary" 
            onClick={onStartVoting}
            disabled={candidates.length === 0}
          >
            <Play size={14} /> 투표 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
