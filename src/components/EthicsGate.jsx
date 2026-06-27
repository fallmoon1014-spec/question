import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, BookOpen, Brain, Search, Lightbulb, Lock, Eye } from 'lucide-react';

const guides = [
  {
    id: 1,
    coreValue: '주도성',
    subValue: '합목적성',
    label: '가이드 1',
    labelSub: '활용 목적',
    color: '#F5A623',
    title: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.",
    description:
      "생성형 AI를 사용하기 전에 '지금 내가 왜 쓰려고 하지?'라고 스스로 물어보세요. 생성형 AI는 내 생각을 대신해주는 게 아니라, 내 생각을 도와주는 도구임을 기억하세요. 모든 공부에 생성형 AI가 필요한 것은 아니므로, 지금 하는 활동에 생성형 AI를 사용하는 것이 나의 학습에 정말 도움이 될지 먼저 고민해 보세요.",
    icon: BookOpen,
  },
  {
    id: 2,
    coreValue: '주도성',
    subValue: null,
    label: '가이드 2',
    labelSub: '주도적 학습',
    color: '#F5A623',
    title: '생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.',
    description:
      "막막할 때 바로 생성형 AI에게 묻고 싶은 마음이 들 수 있지만, 먼저 스스로 시도해 보아야 나의 성장에 도움이 돼요. 주제에 대해 내가 아는 것과 내 아이디어를 먼저 공책에 적극적으로 적어본 뒤에 생성형 AI를 활용하세요.",
    icon: Brain,
  },
  {
    id: 3,
    coreValue: '주도성',
    subValue: null,
    label: '가이드 3',
    labelSub: '비판적 검증',
    color: '#F5A623',
    title: '생성형 AI가 틀릴 수 있다는 점을 알아요.',
    description:
      "생성형 AI는 틀린 정보를 마치 사실인 것처럼 제시하기도 하므로, 알려준 내용은 항상 '정말 맞을까?' 하고 한 번 더 확인하는 습관을 가져요. 중요한 내용일수록 책을 찾아보거나 선생님께 여쭤보는 등 다른 방법으로도 꼭 다시 확인하세요.",
    icon: Search,
  },
  {
    id: 4,
    coreValue: '주도성',
    subValue: '합목적성',
    label: '가이드 4',
    labelSub: '사고의 확장',
    color: '#F5A623',
    title: '생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.',
    description:
      '생성형 AI를 내 생각의 범위를 넓혀주는 도구로 사용해보세요. 생성형 AI의 결과물을 그대로 사용하지 말고, 나의 경험과 생각을 더하여 나만의 색깔을 담은 최종 결과물을 만들어요.',
    icon: Lightbulb,
  },
  {
    id: 5,
    coreValue: '안전성',
    subValue: null,
    label: '가이드 5',
    labelSub: '안전과 관계',
    color: '#4CAF50',
    title: '나의 정보와 비밀을 말하지 않아요.',
    description:
      '내가 입력한 정보는 어디에서 어떻게 사용될지 모르기 때문에 이름, 주소, 학교, 전화번호 같은 개인정보는 생성형 AI에게 알려주면 안돼요. 생성형 AI는 계산된 답변을 내놓는 프로그램이라 감정이 없어요. 나의 고민을 털어놓으며 지나치게 의지하기보다, 친구나 부모님, 선생님과의 실제 대화를 통해 마음을 나누어요.',
    icon: Lock,
  },
  {
    id: 6,
    coreValue: '투명성',
    subValue: null,
    label: '가이드 6',
    labelSub: '투명성 · 윤리',
    color: '#FF9800',
    title: '생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.',
    description:
      '어느 부분이 생성형 AI의 것이고 어느 부분이 나의 것인지 명확히 밝히는 것은 나 자신을 속이지 않는 정직한 태도예요. 생성형 AI를 쓴 사실을 정직하게 밝힐 때 나의 노력이 더 빛나고 가치 있게 인정받을 수 있어요.',
    icon: Eye,
  },
];

function getCoreValueColor(value) {
  switch (value) {
    case '주도성': return '#F5A623';
    case '안전성': return '#4CAF50';
    case '투명성': return '#FF9800';
    default: return '#F5A623';
  }
}

export default function EthicsGate({ onAccept }) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 40;
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
      if (atBottom) {
        setHasScrolledToBottom(true);
      }
    };

    // Check initially in case content fits without scrolling
    handleScroll();

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="ethics-gate-overlay">
      <div className="ethics-gate-container animate-fade-in">
        {/* Header */}
        <div className="ethics-gate-header">
          <div className="ethics-gate-icon-wrapper">
            <ShieldCheck size={32} strokeWidth={1.8} />
          </div>
          <h1 className="ethics-gate-title">생성형 AI 윤리 핵심가이드</h1>
          <p className="ethics-gate-subtitle">
            본 활동을 시작하기 전, 아래 윤리 핵심가이드를 끝까지 읽어주세요.
          </p>
        </div>

        {/* Guide list - scrollable */}
        <div className="ethics-gate-scroll" ref={scrollRef}>
          {/* Table header */}
          <div className="ethics-guide-table-header">
            <span className="ethics-guide-th-value">핵심 가치</span>
            <span className="ethics-guide-th-content">핵심 가이드</span>
          </div>

          {guides.map((guide, index) => {
            const IconComp = guide.icon;
            const coreColor = getCoreValueColor(guide.coreValue);
            return (
              <div
                key={guide.id}
                className="ethics-guide-card"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {/* Left: core value badges */}
                <div className="ethics-guide-left">
                  <span
                    className="ethics-badge ethics-badge--core"
                    style={{ backgroundColor: coreColor }}
                  >
                    {guide.coreValue}
                  </span>
                  {guide.subValue && (
                    <span
                      className="ethics-badge ethics-badge--sub"
                      style={{ backgroundColor: coreColor }}
                    >
                      {guide.subValue}
                    </span>
                  )}
                  <div className="ethics-guide-label">
                    <span className="ethics-guide-label-num">{guide.label}</span>
                    <span className="ethics-guide-label-sub">{guide.labelSub}</span>
                  </div>
                </div>

                {/* Right: content */}
                <div className="ethics-guide-right">
                  <h3 className="ethics-guide-heading">
                    {guide.title}
                  </h3>
                  <p className="ethics-guide-desc">{guide.description}</p>
                </div>
              </div>
            );
          })}

          {/* Scroll-end sentinel message */}
          <div className="ethics-guide-end-message">
            <ShieldCheck size={20} />
            <span>모든 가이드를 확인하셨습니다.</span>
          </div>
        </div>

        {/* Footer with pledge button */}
        <div className="ethics-gate-footer">
          {!hasScrolledToBottom && (
            <p className="ethics-gate-scroll-hint animate-fade-in">
              ↓ 아래로 스크롤하여 모든 가이드를 읽어주세요
            </p>
          )}
          <button
            className={`ethics-gate-accept-btn ${hasScrolledToBottom ? 'ethics-gate-accept-btn--active' : ''}`}
            disabled={!hasScrolledToBottom}
            onClick={onAccept}
          >
            <ShieldCheck size={20} />
            나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
          </button>
        </div>
      </div>
    </div>
  );
}
