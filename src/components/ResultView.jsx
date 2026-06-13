import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export default function ResultView({ candidates, onReset, onBackToAdmin }) {
  const [sortedCandidates, setSortedCandidates] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const sorted = [...candidates].sort((a, b) => {
      if (b.votes !== a.votes) return b.votes - a.votes;
      return a.name.localeCompare(b.name);
    });
    setSortedCandidates(sorted);
    
    setTimeout(() => {
      setShowResults(true);
    }, 500);
  }, [candidates]);

  const getMedalEmoji = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return null;
    }
  };

  if (!showResults) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <h1 className="title animate-pop-in">결과를 집계 중입니다...</h1>
      </div>
    );
  }

  // Find the max votes for bar width calculation
  const maxVotes = sortedCandidates.length > 0 ? Math.max(...sortedCandidates.map(c => c.votes), 1) : 1;

  return (
    <div className="animate-fade-in">
      <h1 className="title" style={{ marginBottom: '8px' }}>최종 결과 발표</h1>
      <p className="subtitle">투표가 완료되었습니다.</p>
      
      {/* Top 3 podium (dark card — the single inverted moment) */}
      {sortedCandidates.filter((c, i) => i < 3 && c.votes > 0).length > 0 && (
        <div className="card-dark" style={{ marginBottom: '24px', padding: '32px' }}>
          {sortedCandidates.slice(0, 3).filter(c => c.votes > 0).map((candidate, index) => (
            <div key={candidate.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: index === 0 ? '16px 0' : '12px 0',
              borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              animationDelay: `${index * 0.15}s`,
              animationFillMode: 'both'
            }} className="animate-fade-in">
              <span style={{ fontSize: index === 0 ? '32px' : '24px', marginRight: '16px', lineHeight: 1 }}>
                {getMedalEmoji(index)}
              </span>
              <span style={{ 
                flex: 1, 
                fontSize: index === 0 ? '24px' : '18px', 
                fontWeight: index === 0 ? 600 : 500,
                color: 'var(--on-dark)'
              }}>
                {candidate.name}
              </span>
              <span style={{ 
                fontSize: index === 0 ? '30px' : '20px', 
                fontWeight: 500,
                color: 'var(--on-dark)'
              }}>
                {candidate.votes}
              </span>
              <span style={{ 
                fontSize: '14px', 
                color: 'var(--on-dark-mute)', 
                marginLeft: '4px'
              }}>표</span>
            </div>
          ))}
        </div>
      )}

      {/* Remaining results */}
      {sortedCandidates.length > 3 && (
        <div className="card" style={{ marginBottom: '32px', padding: '0 32px' }}>
          {sortedCandidates.slice(3).map((candidate, rawIndex) => {
            const index = rawIndex + 3;
            return (
              <div key={candidate.id} className="result-row" style={{
                animationDelay: `${(index) * 0.08}s`,
                animationFillMode: 'both'
              }}>
                <span style={{ 
                  width: '32px', 
                  fontSize: '14px', 
                  color: 'var(--mute)', 
                  fontWeight: 500,
                  textAlign: 'center',
                  flexShrink: 0
                }}>
                  {index + 1}
                </span>
                <span style={{ 
                  flex: 1, 
                  marginLeft: '16px',
                  fontSize: '16px', 
                  fontWeight: 400,
                  color: 'var(--ink)'
                }}>
                  {candidate.name}
                </span>
                {/* Simple bar visualization */}
                <div style={{ 
                  width: '80px', 
                  height: '4px', 
                  background: 'var(--hairline)', 
                  borderRadius: '2px',
                  marginRight: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(candidate.votes / maxVotes) * 100}%`,
                    height: '100%',
                    background: 'var(--ink)',
                    borderRadius: '2px',
                    transition: 'width 0.6s ease'
                  }} />
                </div>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  color: 'var(--charcoal)',
                  minWidth: '30px',
                  textAlign: 'right'
                }}>
                  {candidate.votes}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--mute)', marginLeft: '2px' }}>표</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        paddingTop: '24px'
      }}>
        <button className="btn-secondary" onClick={onBackToAdmin}>
          <ArrowLeft size={14} /> 관리자 화면으로
        </button>
        <button className="btn-danger-text" onClick={onReset}>
          <RotateCcw size={14} /> 초기화
        </button>
      </div>
    </div>
  );
}
