import React, { useState, useEffect } from 'react';
import { Check, BarChart2 } from 'lucide-react';

export default function VotingView({ candidates, setCandidates, settings, onShowResults }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // 무작위로 질문 목록 섞기 (표시용으로만, 원본은 유지)
  const [shuffledCandidates, setShuffledCandidates] = useState([]);
  
  useEffect(() => {
    setShuffledCandidates([...candidates]);
  }, [candidates]);

  const toggleSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      if (selectedIds.length < settings.votesPerStudent) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) return;

    const updatedCandidates = candidates.map(c => {
      if (selectedIds.includes(c.id)) {
        return { ...c, votes: c.votes + 1 };
      }
      return c;
    });

    setCandidates(updatedCandidates);
    setShowSuccess(true);
    
    setTimeout(() => {
      setSelectedIds([]);
      setShowSuccess(false);
      setShuffledCandidates([...updatedCandidates]);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="animate-pop-in" style={{ 
        display: 'flex', flexDirection: 'column', alignItems: 'center', 
        justifyContent: 'center', height: '60vh', textAlign: 'center' 
      }}>
        <div style={{
          width: '64px', height: '64px', borderRadius: 'var(--rounded-full)',
          background: 'var(--primary)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', marginBottom: '24px'
        }}>
          <Check size={32} color="var(--on-primary)" />
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 500, color: 'var(--ink)', marginBottom: '8px' }}>투표 완료</h1>
        <p style={{ fontSize: '16px', color: 'var(--body)' }}>다음 친구를 위해 자리를 비켜주세요.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative', minHeight: '80vh' }}>
      <h1 className="title">원하는 질문에 투표하세요</h1>
      <p className="subtitle">
        최대 <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>{settings.votesPerStudent}</strong>개까지 선택할 수 있습니다.
        <span style={{ color: 'var(--mute)', marginLeft: '8px' }}>
          {selectedIds.length} / {settings.votesPerStudent}
        </span>
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
        gap: '12px',
        marginBottom: '48px'
      }}>
        {shuffledCandidates.map(candidate => {
          const isSelected = selectedIds.includes(candidate.id);
          const isDisabled = !isSelected && selectedIds.length >= settings.votesPerStudent;

          return (
            <div 
              key={candidate.id}
              onClick={() => !isDisabled && toggleSelection(candidate.id)}
              className={`vote-card ${isSelected ? 'vote-card--selected' : ''} ${isDisabled ? 'vote-card--disabled' : ''}`}
            >
              <span className="vote-card__text">
                {candidate.name}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <button 
          className="btn-primary" 
          onClick={handleSubmit}
          disabled={selectedIds.length === 0}
          style={{ 
            fontSize: '14px', 
            padding: '12px 32px', 
            height: '44px'
          }}
        >
          {selectedIds.length > 0 
            ? `${selectedIds.length}개 선택 완료 · 투표하기` 
            : '질문을 선택해주세요'}
        </button>
      </div>

      {/* 선생님용 관리자 메뉴 접근 */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        <button 
          className="btn-secondary" 
          onClick={() => {
            if(window.confirm('투표를 종료하고 결과를 확인하시겠습니까?')) {
              onShowResults();
            }
          }}
          style={{ fontSize: '12px', opacity: 0.6, height: '32px', padding: '6px 14px' }}
        >
          <BarChart2 size={14} /> 결과 보기
        </button>
      </div>
    </div>
  );
}
