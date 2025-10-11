import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, Lock, HelpCircle, Eye, Edit3 } from 'lucide-react';

const CompetencyWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showRawAnswers, setShowRawAnswers] = useState(false);
  const [finalText, setFinalText] = useState('');

  const [basicInfo, setBasicInfo] = useState({
    industry: '',
    position: '',
    company: ''
  });

  const [answers, setAnswers] = useState({});

  const handleLogin = () => {
    if (password === 'Cejh2025$') {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 산업, 직무, 회사를 입력하세요' },
    {
      id: 1,
      title: 'STEP 1: 직무 파악',
      subtitle: '지원 직무의 핵심 업무와 필요 역량 이해',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 이 직무의 핵심 업무 3가지는 무엇인가요?',
          hint: '구체적인 업무 내용과 책임 범위',
          guide: {
            description: '답변 가이드: 채용공고와 직무소개서를 기반으로 핵심 업무 파악',
            diagnosis: '즉석자가진단: "그 업무를 왜 하나요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '채용공고에서 강조한 업무는?',
              '이 직무의 최종 목표는?',
              '하루 일과의 대부분을 차지하는 업무는?'
            ],
            ifDifficult: '채용공고의 "주요업무" 섹션을 다시 읽어보세요.',
            ifStillDifficult: '현직자 인터뷰나 직무 소개 영상을 찾아보세요.'
          },
          placeholder: '예: 첫 번째 핵심 업무는 SNS 콘텐츠 기획 및 제작입니다. 인스타그램과 페이스북을 중심으로 브랜드 메시지를 전달하는 콘텐츠를 주 3회 이상 제작합니다.',
          rows: 4
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 각 업무에 필요한 구체적 역량은?',
          hint: '도구, 기술, 지식 등 실무에 필요한 것',
          guide: {
            description: '답변 가이드: 업무별로 필요한 하드스킬과 소프트스킬 구분',
            diagnosis: '즉석자가진단: "그 역량이 왜 필요한가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '각 업무를 수행하는 데 필요한 도구는?',
              '필요한 전문 지식이나 기술은?',
              '협업을 위해 필요한 능력은?'
            ],
            ifDifficult: '각 업무를 단계별로 쪼개서 생각해보세요.',
            ifStillDifficult: '최소한 채용공고의 "자격요건"을 참고하세요.'
          },
          placeholder: '예: 첫 번째 SNS 운영 업무에는 포토샵 등 디자인 툴 활용 능력과 트렌드 감각이 필요합니다. 두 번째 성과 분석 업무에는 구글 애널리틱스 활용 능력과 데이터 해석 능력이 필요합니다.',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 우리 회사가 특별히 원하는 역량은?',
          hint: '회사의 특성, 산업, 문화를 고려한 차별화된 역량',
          guide: {
            description: '답변 가이드: 회사의 특성, 산업, 문화를 고려한 차별화된 역량',
            diagnosis: '즉석자가진단: "왜 이 회사는 다른 역량이 필요하죠?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '이 회사만의 독특한 비즈니스 모델은?',
              '회사가 강조하는 핵심 가치는?',
              '업계 특성상 필요한 특별한 역량은?'
            ],
            ifDifficult: '회사 홈페이지의 "인재상"이나 "핵심가치"를 확인하세요.',
            ifStillDifficult: '최소한 해당 산업의 특성이라도 반영하세요.'
          },
          placeholder: '예: 글로벌 진출을 준비 중인 이 회사는 특별히 영어 커뮤니케이션 능력과 해외 시장 이해도를 중요시합니다. 또한 스타트업 특성상 빠른 실행력과 애자일한 업무 방식에 적응할 수 있는 유연성을 원합니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 역량 진단',
      subtitle: '현재 보유 역량과 부족한 부분 파악',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. 현재 보유하고 있는 관련 역량은 무엇인가요?',
          hint: '즉시 활용 가능한 역량 중심',
          guide: {
            description: '답변 가이드: 즉시 활용 가능한 역량 중심으로 구체적 수준 명시',
            diagnosis: '즉석자가진단: 각 역량을 증명할 수 있는 경험이 있나요?',
            helpQuestions: [
              '지금 당장 할 수 있는 것은 무엇인가요?',
              '어떤 도구나 프로그램을 사용할 수 있나요?',
              '관련 프로젝트나 활동 경험이 있나요?'
            ],
            ifDifficult: '학교 수업, 동아리, 개인 프로젝트에서 배운 것을 떠올려보세요.',
            ifStillDifficult: '작은 경험도 역량입니다. 구체적으로 표현하세요.'
          },
          placeholder: '예: 현재 데이터 분석 도구인 Excel은 중급 수준으로 피벗테이블과 각종 함수를 활용할 수 있으며, Python은 기초 문법을 익혀 간단한 데이터 전처리가 가능합니다.',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 각 역량의 수준은 어느 정도인가요?',
          hint: '과장하지 않고 객관적으로 평가',
          guide: {
            description: '답변 가이드: 과장하지 않고 객관적으로 평가하되, 구체적 근거 제시',
            diagnosis: '즉석자가진단: "왜 그 수준이라고 생각해요?"라는 질문에 근거를 들 수 있는가?',
            helpQuestions: [
              '독립적으로 수행 가능한 수준인가?',
              '얼마나 자주, 오래 사용했는가?',
              '어느 정도 복잡한 작업까지 가능한가?'
            ],
            ifDifficult: '초급/중급/고급으로 구분해보세요. 신입이라면 대부분 초급-중급이 정상입니다.',
            ifStillDifficult: '학습 기간과 실습 경험을 명시하세요.'
          },
          placeholder: '예: 포토샵/일러스트레이터는 중급 수준으로, 독립적으로 마케팅 콘텐츠를 제작할 수 있습니다. 구글 애널리틱스는 초급 수준이지만, 기본적인 트래픽 분석과 리포트 작성이 가능합니다.',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 부족한 역량과 보완 계획은?',
          hint: '솔직하게 인정하되, 구체적인 개선 의지와 계획',
          guide: {
            description: '답변 가이드: 솔직하게 부족함을 인정하되, 구체적인 개선 의지와 계획',
            diagnosis: '즉석자가진단: "그걸 어떻게 보완할 건가요?"라는 질문에 실행 가능한 계획을 답변할 수 있는가?',
            helpQuestions: [
              '당장 시작할 수 있는 학습 방법은?',
              '목표 달성 기한은 언제까지?',
              '어떤 자료나 도움을 활용할 것인가?'
            ],
            ifDifficult: '온라인 강의, 자격증, 실습 프로젝트 등 구체적인 액션 플랜을 작성하세요.',
            ifStillDifficult: '입사 후 OJT를 통해 습득하겠다는 의지와 방법을 제시하세요.'
          },
          placeholder: '예: 페이스북 광고 매니저는 아직 실제 집행 경험이 없어 현재 구글의 무료 온라인 과정을 수강 중입니다. A/B 테스트 설계는 이론만 알고 있어, 개인 블로그에서 실제 테스트를 진행하며 실습하고 있습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 역량 활용 경험 정리',
      subtitle: 'STAR 기법으로 경험 구체화',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 보유 역량을 가장 잘 활용한 경험은?',
          hint: 'STAR(상황-과제-행동-결과) 구조로 구체적으로',
          guide: {
            description: '답변 가이드: STAR(상황-과제-행동-결과) 구조로 구체적인 경험 서술',
            diagnosis: '즉석자가진단: "그때 정확히 뭘 했어요?"라는 질문에 단계별로 설명 가능한가?',
            helpQuestions: [
              '언제, 어디서, 무엇을 위한 경험이었나?',
              '구체적으로 어떤 역할을 맡았나?',
              '어떤 과정을 거쳐 수행했나?'
            ],
            ifDifficult: '가장 자신 있게 설명할 수 있는 프로젝트나 활동 하나를 선택하세요.',
            ifStillDifficult: '수업 과제, 동아리 활동, 개인 프로젝트 모두 좋은 소재입니다.'
          },
          placeholder: '예: 대학 축제 홍보 TF팀에서 SNS 마케팅을 담당했습니다. 2주간 인스타그램과 페이스북에 매일 2개씩 콘텐츠를 제작하고 업로드했으며, 포토샵으로 직접 디자인한 카드뉴스가 특히 좋은 반응을 얻었습니다.',
          rows: 4
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 그 경험에서 역량이 어떻게 도움이 되었나요?',
          hint: '역량과 성과 간의 인과관계',
          guide: {
            description: '답변 가이드: 역량과 성과 간의 인과관계를 명확히',
            diagnosis: '즉석자가진단: "그 역량이 없었다면 어떻게 됐을까요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '해당 역량이 문제 해결에 어떻게 기여했나?',
              '역량 덕분에 가능했던 것은?',
              '다른 방법과 비교해 어떤 장점이 있었나?'
            ],
            ifDifficult: '"만약 이 역량이 없었다면…"이라고 가정해보세요.',
            ifStillDifficult: '역량이 가져온 가장 단순한 이점이라도 작성하세요.'
          },
          placeholder: '예: 포토샵 활용 능력 덕분에 외주 없이 직접 콘텐츠를 제작하여 예산을 50% 절감했습니다. 또한 즉각적인 수정이 가능해 트렌드에 빠르게 대응할 수 있었고, 팀원들의 아이디어를 바로 시각화하여 커뮤니케이션 효율성도 크게 향상되었습니다.',
          rows: 3
        },
        {
          id: 'q1_3_3',
          label: 'Q1.3.3. 다른 사람들의 평가나 피드백은?',
          hint: '객관적 검증과 타인 평가',
          guide: {
            description: '답변 가이드: 객관적 검증과 타인의 구체적 평가',
            diagnosis: '즉석자가진단: "정확히 뭐라고 하셨나요?"에 답변 가능한가?',
            helpQuestions: [
              '교수님이나 선배의 구체적 피드백은?',
              '팀원들의 반응이나 평가는?',
              '이 역량으로 받은 칭찬은?'
            ],
            ifDifficult: '직접적인 말이 기억나지 않으면, 행동으로 보여준 신뢰를 떠올려보세요.',
            ifStillDifficult: '구체적인 평가를 인용하거나, 제안/부탁을 받은 것도 좋은 증거입니다.'
          },
          placeholder: '예: 팀장님께서는 "신입치고 놀라운 완성도"라고 평가하셨고, 팀원들은 "덕분에 시간이 많이 절약됐다"고 했습니다. 이후 다른 학과 행사에서도 디자인 작업을 부탁받았습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 4,
      title: 'STEP 4: 성과 제시',
      subtitle: '측정 가능한 구체적 성과',
      questions: [
        {
          id: 'q1_4_1',
          label: 'Q1.4.1. 측정 가능한 구체적 성과는?',
          hint: '숫자와 데이터로 표현',
          guide: {
            description: '답변 가이드: 숫자와 데이터로 측정 가능한 구체적 성과',
            diagnosis: '즉석자가진단: "어떻게 측정했나요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '정량적으로 측정 가능한 결과는?',
              '이전 대비 얼마나 개선되었나?',
              '목표 대비 달성률은?'
            ],
            ifDifficult: '숫자로 표현할 수 있는 것을 찾으세요.',
            ifStillDifficult: '전후 비교나 타인의 평가라도 구체화하세요.'
          },
          placeholder: '예: SNS 팔로워 300명 증가 (전년 대비 20% 상승), 축제 참여율 전년 대비 20% 증가, 카드뉴스 평균 좋아요 150개로 팀 내 최고 기록을 달성했습니다.',
          rows: 3
        },
        {
          id: 'q1_4_2',
          label: 'Q1.4.2. 객관적으로 평가받은 성과는?',
          hint: '수상, 인정, 선발 등',
          guide: {
            description: '답변 가이드: 제3자가 인정한 객관적 성과',
            diagnosis: '즉석자가진단: "그게 왜 대단한가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '받은 상이나 인정은?',
              '선발되거나 추천받은 경험은?',
              '공식적인 평가나 인증은?'
            ],
            ifDifficult: '주변의 반응을 구체적으로 떠올려보세요.',
            ifStillDifficult: '제안이나 부탁을 받은 것도 좋은 평가의 증거입니다.'
          },
          placeholder: '예: 지도교수님께서는 "학부생 중 가장 완성도 높은 프로젝트"라고 평가하셨고, 실제로 후배들 대상 SNS 마케팅 특강을 부탁받아 진행하기도 했습니다.',
          rows: 3
        },
        {
          id: 'q1_4_3',
          label: 'Q1.4.3. 이 성과가 의미하는 바는?',
          hint: '성과의 가치와 영향',
          guide: {
            description: '답변 가이드: 성과의 본질적 가치와 의미',
            diagnosis: '즉석자가진단: "왜 그게 중요한가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '이 성과가 증명하는 것은?',
              '조직이나 팀에 미친 영향은?',
              '입사 후 어떻게 활용될 수 있나?'
            ],
            ifDifficult: '성과를 통해 입증한 역량을 생각해보세요.',
            ifStillDifficult: '단순 숫자를 넘어선 본질적 의미를 찾으세요.'
          },
          placeholder: '예: 이는 단순한 숫자 증가를 넘어, MZ세대와 소통할 수 있는 능력과 트렌드 감각을 증명한 것입니다. 또한 제한된 예산 내에서 최대의 효과를 내는 효율성도 보여주었습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 증명',
      subtitle: '포트폴리오와 증명 자료',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 즉시 제시 가능한 증명 자료는?',
          hint: '포트폴리오, 자격증, GitHub 등',
          guide: {
            description: '답변 가이드: 즉시 제시 가능한 구체적 증명 자료',
            diagnosis: '즉석자가진단: "지금 바로 보여줄 수 있나요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '온라인으로 접근 가능한 자료는?',
              '정리된 포트폴리오가 있나요?',
              '자격증이나 수료증은?'
            ],
            ifDifficult: '지금 당장 준비할 수 있는 것부터 시작하세요.',
            ifStillDifficult: 'GitHub, 노션, 구글 드라이브 등을 활용하세요.'
          },
          placeholder: '예: 포트폴리오 사이트 (www.example.com)에 20개 프로젝트가 정리되어 있습니다. 각 프로젝트는 개요, 담당 역할, 사용 기술, 성과로 구성되어 있으며, GitHub (github.com/username)에서 코드도 확인 가능합니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 포트폴리오의 차별점은?',
          hint: '남들과 다른 특별함',
          guide: {
            description: '답변 가이드: 남들과 차별화되는 포트폴리오의 특별함',
            diagnosis: '즉석자가진단: "왜 당신 걸 봐야 하나요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '남들과 다른 점은?',
              '특별히 신경 쓴 부분은?',
              '독창적인 구성이나 내용은?'
            ],
            ifDifficult: '가장 자신 있는 부분을 생각해보세요.',
            ifStillDifficult: '기본에 충실한 것도 차별점이 될 수 있습니다.'
          },
          placeholder: '예: 각 프로젝트마다 "문제-해결-결과"를 명확히 정리하고, 실제 사용자 피드백도 포함했습니다. 특히 실패한 프로젝트도 솔직하게 담아 그 과정에서 배운 점을 공유했습니다.',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 추가로 준비 중인 것은?',
          hint: '지속적인 준비와 발전',
          guide: {
            description: '답변 가이드: 지속적인 준비와 발전 의지',
            diagnosis: '즉석자가진단: "언제까지 뭘 할 건가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '현재 준비 중인 것은?',
              '입사 전까지 추가할 내용은?',
              '언제까지 완성할 것인가?'
            ],
            ifDifficult: '이미 시작한 것이 있다면 진행 상황을 명시하세요.',
            ifStillDifficult: '입사 전까지 실행 가능한 한 가지만이라도 구체적으로 계획하세요.'
          },
          placeholder: '예: 현재 페이스북 블루프린트 자격증을 준비 중이며, 이달 내 취득 예정입니다. 개인 쇼핑몰을 운영하며 실제 광고 집행 경험을 쌓고 있고, 3개월간의 데이터를 정리 중입니다.',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 실무 활용 방안',
      subtitle: '입사 후 즉시 기여 및 성장 계획',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 입사 후 즉시 기여할 수 있는 부분은?',
          hint: '신입사원이 현실적으로 할 수 있는 구체적 업무',
          guide: {
            description: '답변 가이드: 신입사원이 현실적으로 할 수 있는 구체적인 업무 기여',
            diagnosis: '즉석자가진단: "입사 첫 달에 뭘 할 수 있나요?"라는 질문에 구체적 업무를 답할 수 있는가?',
            helpQuestions: [
              '바로 수행 가능한 단순 업무는?',
              '기존 역량으로 지원 가능한 업무는?',
              '팀에 보탬이 될 수 있는 부분은?'
            ],
            ifDifficult: '자료 조사, 데이터 정리, 간단한 문서 작성 등 기초 업무부터 시작하세요.',
            ifStillDifficult: '배우면서 돕겠다는 자세를 표현하되, 구체적 업무를 언급하세요.'
          },
          placeholder: '예: 엑셀 매크로를 활용한 반복 업무 자동화로 팀의 업무 효율을 높이고, MZ세대 트렌드 분석과 SNS 콘텐츠 기획 역량으로 2030 고객 확보에 기여하겠습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 입사 후 3개월/6개월 목표는?',
          hint: '시간별 구체적 성장 계획',
          guide: {
            description: '답변 가이드: 시간별 단계적이고 측정 가능한 성장 목표',
            diagnosis: '즉석자가진단: "그게 현실적인가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '1년 후 어떤 업무를 독립적으로 수행하고 싶나요?',
              '어떤 수준까지 성장하고 싶나요?',
              '팀 내에서 어떤 역할을 맡고 싶나요?'
            ],
            ifDifficult: '신입사원의 일반적 성장 단계를 참고하세요.',
            ifStillDifficult: '단계별로 나눠 생각하세요: 적응 → 실무 참여 → 독립적 수행'
          },
          placeholder: '예: 첫 3개월: 기본 업무 프로세스 숙지 및 팀 업무 지원, 소규모 프로젝트 참여. 3-6개월: 독립적으로 중규모 캠페인 기획 및 실행, 월간 성과 리포트 작성 담당',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1(이 직무의 핵심 업무 3가지는 무엇인가요?)에서 언급한 업무를 더 구체적으로 설명해주세요',
        hint: '실제 업무 프로세스와 협업 방식',
        guide: {
          description: '답변 가이드: 실제 업무 프로세스와 협업 방식을 구체적으로',
          diagnosis: '즉석자가진단: "하루 일과를 설명해보세요"라고 물으면 답변 가능한가?',
          helpQuestions: [
            '업무 시작부터 완료까지의 프로세스는?',
            '어떤 팀/부서와 협업하나요?',
            '주요 산출물은 무엇인가요?'
          ],
          ifDifficult: '채용공고의 상세 업무 내용을 다시 확인하세요.',
          ifStillDifficult: '현직자 인터뷰나 직무 소개 자료를 참고하세요.'
        },
        placeholder: '예: SNS 콘텐츠 기획은 매주 월요일 트렌드 분석으로 시작하여, 화-수요일 콘텐츠 제작, 목-금요일 업로드 및 성과 분석의 사이클로 진행됩니다.',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 직무에서 가장 어려운 업무는 무엇이고, 어떻게 준비하고 있나요?',
        hint: '도전적인 업무에 대한 인식과 준비',
        guide: {
          description: '답변 가이드: 도전적인 업무에 대한 인식과 준비 상태',
          diagnosis: '즉석자가진단: "왜 그게 어렵다고 생각하나요?"에 답변 가능한가?',
          helpQuestions: [
            '가장 고난도 업무는?',
            '어떤 역량이 특히 필요한가요?',
            '어떻게 준비 중인가요?'
          ],
          ifDifficult: '선배 직원들의 인터뷰나 후기를 찾아보세요.',
          ifStillDifficult: '직무의 트렌드와 미래 변화를 고려하세요.'
        },
        placeholder: '예: 가장 어려운 부분은 실시간 트렌드를 빠르게 캐치하고 콘텐츠로 만드는 것입니다. 이를 위해 매일 30분씩 트렌드 리포트를 작성하며 감각을 키우고 있습니다.',
        rows: 4
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 이 직무의 미래 트렌드와 필요 역량은?',
        hint: '5년 후를 내다보는 통찰력',
        guide: {
          description: '답변 가이드: 산업 트렌드를 반영한 미래 역량',
          diagnosis: '즉석자가진단: "왜 그 역량이 중요해질까요?"에 답변 가능한가?',
          helpQuestions: [
            '산업의 주요 변화는?',
            '새롭게 요구되는 역량은?',
            '어떻게 준비할 건가요?'
          ],
          ifDifficult: '산업 리포트나 전문가 전망을 찾아보세요.',
          ifStillDifficult: 'AI, 자동화 등 기술 변화를 고려하세요.'
        },
        placeholder: '예: AI 도구 활용 능력이 필수가 될 것으로 예상합니다. 이미 ChatGPT를 활용한 콘텐츠 제작을 연습 중입니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. Q1.2.1(현재 보유하고 있는 관련 역량)을 증명할 구체적 경험은?',
        hint: 'STAR 기법으로 경험 구체화',
        guide: {
          description: '답변 가이드: STAR 기법으로 경험 구체화',
          diagnosis: '즉석자가진단: "그때 정확히 뭘 했어요?"라고 물으면 상세 설명 가능한가?',
          helpQuestions: [
            '언제, 어디서, 무엇을 했나요?',
            '어떤 결과를 만들었나요?',
            '피드백은 어땠나요?'
          ],
          ifDifficult: '가장 자신 있는 프로젝트 하나를 선택하세요.',
          ifStillDifficult: '작은 경험도 구체화하면 의미가 있습니다.'
        },
        placeholder: '예: 2023년 2학기 "디지털 마케팅" 수업에서 실제 스타트업과 협업한 프로젝트에서 데이터 분석을 담당했습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 부족한 역량을 보완할 구체적 계획은?',
        hint: '시기별 구체적 학습 로드맵',
        guide: {
          description: '답변 가이드: 시기별 구체적 학습 로드맵',
          diagnosis: '즉석자가진단: "다음 달에는 뭘 할 건가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '어떤 방법으로 학습할 건가요?',
            '예상 소요 시간과 비용은?',
            '진행 상황을 어떻게 측정할 건가요?'
          ],
          ifDifficult: '온라인 강의 플랫폼을 검색해보세요.',
          ifStillDifficult: '매일/주간 단위의 구체적 계획을 세우세요.'
        },
        placeholder: '예: 코세라에서 "Google Data Analytics" 과정을 3개월간 수강하고, 매주 토요일 SQL 스터디에 참여할 계획입니다.',
        rows: 4
      },
      {
        id: 'q2_2_3',
        label: 'Q2.2.3. 현재 진행 중인 학습이나 준비는?',
        hint: '이미 시작한 노력의 구체적 증거',
        guide: {
          description: '답변 가이드: 이미 시작한 노력의 구체적 증거',
          diagnosis: '즉석자가진단: "진도는 얼마나 나갔어요?"에 답변 가능한가?',
          helpQuestions: [
            '온라인 강의나 자격증 준비 중인 것은?',
            '관련 프로젝트나 스터디 참여 경험은?',
            '실제 진행률은?'
          ],
          ifDifficult: '작은 노력이라도 찾아보세요.',
          ifStillDifficult: '오늘부터라도 시작할 수 있는 것을 실행하세요.'
        },
        placeholder: '예: 현재 코세라에서 "Google Data Analytics" 과정을 수강 중이며 60% 진도를 완료했습니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. Q1.3.1(보유 역량을 가장 잘 활용한 경험)의 상황(S)을 더 자세히 설명해주세요',
        hint: '프로젝트 배경과 맥락',
        guide: {
          description: '답변 가이드: 프로젝트 배경과 맥락을 생생하게',
          diagnosis: '즉석자가진단: "왜 그 프로젝트가 필요했나요?"에 답변 가능한가?',
          helpQuestions: [
            '프로젝트가 시작된 배경은?',
            '팀 구성과 역할은?',
            '주요 도전과제는?'
          ],
          ifDifficult: '프로젝트가 시작된 이유를 생각해보세요.',
          ifStillDifficult: '5W1H로 상황을 정리하세요.'
        },
        placeholder: '예: 2023년 가을, 대학 축제 참여율이 전년 대비 30% 감소한 상황에서 홍보 TF팀이 급히 구성되었습니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 그 경험에서의 행동(A)을 단계별로 설명해주세요',
        hint: '구체적인 행동과 의사결정 과정',
        guide: {
          description: '답변 가이드: 구체적인 행동과 의사결정 과정',
          diagnosis: '즉석자가진단: "왜 그렇게 했나요?"에 답변 가능한가?',
          helpQuestions: [
            '첫 번째로 한 일은?',
            '중요한 의사결정은?',
            '어려움을 어떻게 극복했나요?'
          ],
          ifDifficult: '시간 순서대로 정리해보세요.',
          ifStillDifficult: '가장 중요했던 행동 3가지만 선택하세요.'
        },
        placeholder: '예: 첫째, 타겟 분석을 위해 설문조사를 진행했습니다. 둘째, 인스타그램 중심 전략을 수립했습니다. 셋째...',
        rows: 4
      },
      {
        id: 'q2_3_3',
        label: 'Q2.3.3. 결과(R)를 더 구체적인 수치와 함께 설명해주세요',
        hint: '측정 가능한 성과와 영향',
        guide: {
          description: '답변 가이드: 측정 가능한 성과와 영향',
          diagnosis: '즉석자가진단: "어떻게 측정했나요?"에 답변 가능한가?',
          helpQuestions: [
            '정량적 성과는?',
            '정성적 피드백은?',
            '예상과 비교하면?'
          ],
          ifDifficult: '숫자로 표현할 수 있는 것을 찾으세요.',
          ifStillDifficult: '전후 비교나 타인의 평가라도 구체화하세요.'
        },
        placeholder: '예: SNS 팔로워가 300명 증가했고 (전년 대비 20% 상승), 축제 참여율도 전년 대비 20% 증가했습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. Q1.4.1(측정 가능한 구체적 성과)을 달성하기까지의 과정은?',
        hint: '성과 달성의 핵심 요인',
        guide: {
          description: '답변 가이드: 성과 달성의 핵심 요인과 과정',
          diagnosis: '즉석자가진단: "왜 성공했나요?"에 답변 가능한가?',
          helpQuestions: [
            '성공의 핵심 요인은?',
            '예상보다 좋았던/나빴던 부분은?',
            '다시 한다면 무엇을 바꿀 것인가?'
          ],
          ifDifficult: '성과를 만든 결정적 순간을 떠올리세요.',
          ifStillDifficult: '실패를 극복한 과정도 의미가 있습니다.'
        },
        placeholder: '예: 성공의 핵심은 타겟 세대의 언어로 소통한 것이었습니다. 단순히 정보를 전달하는 게 아니라...',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 다른 사람들의 구체적인 평가와 피드백은?',
        hint: '객관적 검증과 제3자 평가',
        guide: {
          description: '답변 가이드: 객관적 검증과 제3자 평가',
          diagnosis: '즉석자가진단: "누가 뭐라고 했나요?"에 답변 가능한가?',
          helpQuestions: [
            '교수님/팀장님의 평가는?',
            '동료들의 반응은?',
            '수상이나 인정은?'
          ],
          ifDifficult: '직접적인 칭찬이나 피드백을 떠올리세요.',
          ifStillDifficult: '행동으로 보여준 신뢰도 평가입니다.'
        },
        placeholder: '예: 지도교수님께서는 "학부생 수준을 넘어선 완성도"라고 평가하셨고, 팀원들은 "덕분에 우리도 배웠다"고...',
        rows: 4
      },
      {
        id: 'q2_4_3',
        label: 'Q2.4.3. 이 성과가 나에게 준 배움과 성장은?',
        hint: '경험을 통한 내적 성장',
        guide: {
          description: '답변 가이드: 경험을 통한 내적 성장과 변화',
          diagnosis: '즉석자가진단: "무엇을 배웠나요?"에 답변 가능한가?',
          helpQuestions: [
            '가장 큰 깨달음은?',
            '이전과 달라진 점은?',
            '다음에는 어떻게 적용할 것인가?'
          ],
          ifDifficult: '실패에서 배운 것도 의미가 있습니다.',
          ifStillDifficult: '한 가지 핵심 교훈만 선택하세요.'
        },
        placeholder: '예: 가장 큰 배움은 "데이터보다 사람을 먼저 이해해야 한다"는 것이었습니다. 아무리 좋은 분석이라도...',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. Q1.5.1(즉시 제시 가능한 증명 자료)의 내용을 간단히 소개해주세요',
        hint: '포트폴리오의 핵심 내용',
        guide: {
          description: '답변 가이드: 포트폴리오의 핵심 내용과 구성',
          diagnosis: '즉석자가진단: "뭐가 들어있나요?"에 답변 가능한가?',
          helpQuestions: [
            '주요 프로젝트는?',
            '각 프로젝트의 특징은?',
            '어떻게 정리되어 있나요?'
          ],
          ifDifficult: '대표 프로젝트 3개만 선택하세요.',
          ifStillDifficult: '포트폴리오 구조라도 설명하세요.'
        },
        placeholder: '예: 포트폴리오는 3개 카테고리로 구성되어 있습니다: 1) SNS 마케팅 프로젝트 10개, 2) 데이터 분석 케이스 5개...',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 포트폴리오를 만들면서 특별히 신경 쓴 부분은?',
        hint: '차별화 전략과 독창성',
        guide: {
          description: '답변 가이드: 차별화 전략과 독창성',
          diagnosis: '즉석자가진단: "왜 그렇게 만들었나요?"에 답변 가능한가?',
          helpQuestions: [
            '남들과 다른 점은?',
            '특별히 강조한 것은?',
            '어떤 반응을 기대하나요?'
          ],
          ifDifficult: '가장 자신 있는 부분을 생각해보세요.',
          ifStillDifficult: '기본에 충실한 것도 차별점이 될 수 있습니다.'
        },
        placeholder: '예: 각 프로젝트마다 "문제-해결-결과"를 명확히 정리하고, 실제 사용자 피드백도 포함했습니다.',
        rows: 4
      },
      {
        id: 'q2_5_3',
        label: 'Q2.5.3. 입사 전까지 포트폴리오를 어떻게 보완할 계획인가요?',
        hint: '지속적인 개선 계획',
        guide: {
          description: '답변 가이드: 지속적인 개선과 발전 계획',
          diagnosis: '즉석자가진단: "언제까지 뭘 할 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '추가할 프로젝트는?',
            '보완할 부분은?',
            '언제까지 완성할 건가요?'
          ],
          ifDifficult: '한 달 안에 할 수 있는 것을 계획하세요.',
          ifStillDifficult: '기존 내용을 다듬는 것도 보완입니다.'
        },
        placeholder: '예: 입사 전까지 실제 클라이언트 프로젝트 2개를 추가하고, 각 프로젝트의 성과 지표를 더 구체화할 계획입니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. Q1.6.1(입사 후 즉시 기여할 수 있는 부분)을 더 구체적으로 설명해주세요',
        hint: '첫 달, 첫 주에 할 수 있는 것',
        guide: {
          description: '답변 가이드: 입사 직후 현실적으로 가능한 기여',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '즉시 도움이 되는 부분은?',
            '선배들의 시간을 절약할 수 있는 것은?',
            '신입이라도 할 수 있는 것은?'
          ],
          ifDifficult: '단순 업무부터 생각해보세요.',
          ifStillDifficult: '배우면서 돕겠다는 자세를 표현하세요.'
        },
        placeholder: '예: 입사 첫 주부터 팀의 주간 트렌드 리포트 작성을 맡아 MZ세대 관점의 인사이트를 제공하겠습니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 3개월/6개월 목표를 더 구체적으로 설명해주세요',
        hint: '단계별 성장 로드맵',
        guide: {
          description: '답변 가이드: 단계별 구체적이고 현실적인 성장 계획',
          diagnosis: '즉석자가진단: "그게 가능한가요?"에 답변 가능한가?',
          helpQuestions: [
            '각 단계의 핵심 목표는?',
            '어떤 역량을 키울 건가요?',
            '어떻게 측정할 건가요?'
          ],
          ifDifficult: '신입사원의 일반적 성장 단계를 참고하세요.',
          ifStillDifficult: '월별로 하나씩만 목표를 세워도 충분합니다.'
        },
        placeholder: '예: 첫 3개월: 기본 업무 프로세스 완전 숙지 및 소규모 프로젝트 지원, 3-6개월: 중규모 프로젝트 리드 및 주니어 멘토링',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 직무 파악에서 역량 진단으로',
      hint: 'STEP 1의 필요 역량이 STEP 2의 보유 역량과 어떻게 연결되나요?',
      placeholder: '예: 앞서 파악한 핵심 역량들을 기준으로 현재 저의 역량 수준을 진단한 결과...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_2', 'q1_1_3', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 역량 진단에서 경험 정리로',
      hint: 'STEP 2의 보유 역량이 STEP 3의 경험에서 어떻게 활용되었나요?',
      placeholder: '예: 보유하고 있다고 밝힌 역량들은 다음의 경험을 통해 실제로 증명되었습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 경험에서 성과로',
      hint: 'STEP 3의 경험이 STEP 4의 구체적 성과로 어떻게 이어졌나요?',
      placeholder: '예: 이러한 역량 활용 경험은 다음과 같은 측정 가능한 성과로 이어졌습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 성과에서 증명으로',
      hint: 'STEP 4의 성과가 STEP 5의 포트폴리오에 어떻게 담겼나요?',
      placeholder: '예: 달성한 성과들을 체계적으로 정리하여 포트폴리오로 구성했습니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 증명에서 실무 활용으로',
      hint: 'STEP 5의 증명된 역량을 STEP 6에서 어떻게 활용할 건가요?',
      placeholder: '예: 이렇게 준비하고 증명한 역량들을 입사 후 실무에서 다음과 같이 활용하겠습니다...',
      rows: 3,
      referenceSteps: [5, 6],
      referenceQuestions: ['q1_5_1', 'q1_5_2', 'q1_6_1']
    }
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleBasicInfoChange = (field, value) => {
    setBasicInfo(prev => ({ ...prev, [field]: value }));
  };

  const toggleGuide = (questionId) => {
    setShowGuide(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const toggleStepSelection = (stepId) => {
    setSelectedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const goToNextStep = () => {
    if (currentPhase === 'round1') {
      if (currentStep < round1Steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('evaluation');
      }
    } else if (currentPhase === 'evaluation') {
      const sortedSteps = [...selectedSteps].sort((a, b) => a - b);
      setSelectedSteps(sortedSteps);
      setCurrentPhase('round2');
      setCurrentStep(0);
    } else if (currentPhase === 'round2') {
      if (currentStep < selectedSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentPhase('round3');
        setCurrentStep(0);
      }
    } else if (currentPhase === 'round3') {
      if (currentStep < round3Questions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setFinalText(generateCompetencyLetter());
        setCurrentPhase('completed');
      }
    }
  };

  const goToPrevStep = () => {
    if (currentPhase === 'completed') {
      setCurrentPhase('round3');
      setCurrentStep(round3Questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentPhase === 'round3') {
      setCurrentPhase('round2');
      setCurrentStep(selectedSteps.length - 1);
    } else if (currentPhase === 'round2') {
      setCurrentPhase('evaluation');
    } else if (currentPhase === 'evaluation') {
      setCurrentPhase('round1');
      setCurrentStep(round1Steps.length - 1);
    } else if (currentPhase === 'round1' && currentStep === 0) {
      setShowIntro(true);
    }
  };

  const generateCompetencyLetter = () => {
    const parts = [];
    
    if (answers.q1_2_1) parts.push(answers.q1_2_1);
    if (answers.q1_1_1) parts.push('\n' + answers.q1_1_1);
    if (answers.q1_1_2) parts.push(answers.q1_1_2);
    if (answers.connect_1_2) parts.push('\n' + answers.connect_1_2);
    if (answers.q1_3_1) parts.push('\n' + answers.q1_3_1);
    if (answers.q1_3_2) parts.push(answers.q1_3_2);
    if (answers.connect_2_3) parts.push('\n' + answers.connect_2_3);
    if (answers.q1_4_1) parts.push('\n' + answers.q1_4_1);
    if (answers.q1_4_2) parts.push(answers.q1_4_2);
    if (answers.connect_3_4) parts.push('\n' + answers.connect_3_4);
    if (answers.q1_5_1) parts.push('\n' + answers.q1_5_1);
    if (answers.q1_5_2) parts.push(answers.q1_5_2);
    if (answers.connect_4_5) parts.push('\n' + answers.connect_4_5);
    if (answers.q1_6_1) parts.push('\n' + answers.q1_6_1);
    if (answers.q1_6_2) parts.push(answers.q1_6_2);
    if (answers.q1_2_3) parts.push('\n' + answers.q1_2_3);
    if (answers.connect_5_6) parts.push('\n' + answers.connect_5_6);
    
    return parts.join('\n\n');
  };

  const downloadFinalText = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>직무확보역량</title>
<style>
body { font-family: '맑은 고딕', 'Malgun Gothic', sans-serif; line-height: 1.8; padding: 40px; }
p { margin-bottom: 1em; }
</style>
</head>
<body>
${finalText.split('\n\n').map(para => `<p>${para.replace(/\n/g, '<br>')}</p>`).join('\n')}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${basicInfo.company || '회사'}_직무확보역량.doc`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  const getRawAnswersText = () => {
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[STEP 1: 직무 파악]\nQ1.1.1: ${answers.q1_1_1 || '-'}\nQ1.1.2: ${answers.q1_1_2 || '-'}\nQ1.1.3: ${answers.q1_1_3 || '-'}\n\n[STEP 2: 역량 진단]\nQ1.2.1: ${answers.q1_2_1 || '-'}\nQ1.2.2: ${answers.q1_2_2 || '-'}\nQ1.2.3: ${answers.q1_2_3 || '-'}\n\n[STEP 3: 역량 활용 경험]\nQ1.3.1: ${answers.q1_3_1 || '-'}\nQ1.3.2: ${answers.q1_3_2 || '-'}\nQ1.3.3: ${answers.q1_3_3 || '-'}\n\n[STEP 4: 성과 제시]\nQ1.4.1: ${answers.q1_4_1 || '-'}\nQ1.4.2: ${answers.q1_4_2 || '-'}\nQ1.4.3: ${answers.q1_4_3 || '-'}\n\n[STEP 5: 증명]\nQ1.5.1: ${answers.q1_5_1 || '-'}\nQ1.5.2: ${answers.q1_5_2 || '-'}\nQ1.5.3: ${answers.q1_5_3 || '-'}\n\n[STEP 6: 실무 활용]\nQ1.6.1: ${answers.q1_6_1 || '-'}\nQ1.6.2: ${answers.q1_6_2 || '-'}\n\n[3라운드 연결]\n1→2: ${answers.connect_1_2 || '-'}\n2→3: ${answers.connect_2_3 || '-'}\n3→4: ${answers.connect_3_4 || '-'}\n4→5: ${answers.connect_4_5 || '-'}\n5→6: ${answers.connect_5_6 || '-'}`;
  };

  const canGoNext = () => {
    if (currentPhase === 'evaluation') {
      return selectedSteps.length >= 1;
    }
    if (currentStep === 0 && currentPhase === 'round1') {
      return basicInfo.industry && basicInfo.position && basicInfo.company;
    }
    return true;
  };

  const progress = currentPhase === 'round1'
    ? ((currentStep + 1) / round1Steps.length) * 33
    : currentPhase === 'round2'
    ? 33 + ((currentStep + 1) / selectedSteps.length) * 33
    : 66 + ((currentStep + 1) / round3Questions.length) * 34;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">비공개 페이지</h1>
            <p className="text-gray-600">CareerEngineer의 직무확보역량 작성 워크북</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">비밀번호를 입력하세요</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="비밀번호 입력"
                autoFocus
              />
            </div>
            {showError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                비밀번호가 올바르지 않습니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              접속하기
            </button>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              질문에 답하며 완성하는<br />직무확보역량 워크북
            </h1>
            <p className="text-center text-gray-600 mb-8">CareerEngineer의 3라운드 체계적 작성 시스템</p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3라운드 작성 시스템</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 기본 직무확보역량 수립</h3>
                  <p className="text-sm text-gray-700">6개 STEP 핵심 질문에 답변 (전체 구조 파악)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 보강</h3>
                  <p className="text-sm text-gray-700">부족한 STEP 선택 → 심화 질문으로 구체화 (1개 이상)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 연결 및 완성</h3>
                  <p className="text-sm text-gray-700">STEP 간 연결 질문으로 자연스러운 흐름 만들기</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>진정성:</strong> 3초 자가진단 통과한 내용만</li>
                <li><strong>구체성:</strong> 숫자와 사실로 표현</li>
                <li><strong>검증 가능성:</strong> 가족도 인정할 사실만</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 3초 자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  누군가 "정말이에요?"라고 물었을 때 <strong>3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지</strong> 확인하는 것입니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2025 CareerEngineer All Rights Reserved.
                </p>
                <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                  이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-bold text-lg"
            >
              1라운드 시작하기 →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-8">
              부족하다고 느끼는 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>

            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);
                
                return (
                  <div 
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${
                      isSelected 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 bg-white hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{step.subtitle}</p>
                        <div className="bg-gray-50 rounded p-3 text-sm text-gray-700">
                          <strong>내 답변:</strong> {answers[step.questions[0].id]?.substring(0, 100) || '(답변 없음)'}
                          {answers[step.questions[0].id]?.length > 100 && '...'}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleStepSelection(stepId)}
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${
                          isSelected 
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {isSelected ? '✓ 선택됨' : '심화 선택'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>💡 선택 기준:</strong> 답변이 부족하거나 더 구체화가 필요한 STEP을 자유롭게 선택하세요. (1개 이상)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="flex-1 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                2라운드 시작하기 ({selectedSteps.length}개 선택됨)
              </button>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              © 2025 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                직무확보역량 완성! 🎉
              </h2>
              <p className="text-gray-600">
                아래 내용을 확인하고 자유롭게 수정하세요
              </p>
            </div>

            <div className="bg-red-100 border-2 border-red-500 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-base font-bold text-red-900 mb-2">
                    반드시 다운로드하세요!
                  </p>
                  <p className="text-sm text-red-800 leading-relaxed">
                    지금까지 작성한 모든 내용은 브라우저에만 임시 저장되어 있습니다. 
                    페이지를 새로고침하거나 닫으면 <strong>모든 내용이 즉시 삭제</strong>됩니다.
                    <br />
                    <strong>내용 수정 후 "워드 파일로 다운로드"</strong> 버튼을 눌러 .doc 파일로 저장하세요!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  완성된 직무확보역량 (수정 가능)
                </h3>
                <button
                  onClick={() => setShowRawAnswers(!showRawAnswers)}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  {showRawAnswers ? '원본 답변 숨기기' : '원본 답변 보기'}
                </button>
              </div>
              
              <textarea
                value={finalText}
                onChange={(e) => setFinalText(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none font-serif leading-relaxed"
              />
            </div>

            {showRawAnswers && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">📋 원본 답변 참고</h4>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {getRawAnswersText()}
                </pre>
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold text-lg shadow-lg mb-4"
            >
              <Download className="w-6 h-6" />
              워드 파일로 다운로드 (.doc)
            </button>

            {downloadSuccess && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center mb-4">
                <p className="text-green-800 font-semibold">
                  ✅ 다운로드 완료!
                </p>
                <p className="text-sm text-green-700 mt-1">
                  다운로드 폴더에서 "{basicInfo.company || '회사'}_직무확보역량.doc" 파일을 Microsoft Word로 열어주세요.
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-800">
                💾 <strong>워드에서 편집 가능:</strong> 다운로드한 .doc 파일을 Microsoft Word에서 열어 자유롭게 편집하고 서식을 적용할 수 있습니다.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button
                onClick={goToPrevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                이전으로
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-800 text-center">
                © 2025 CareerEngineer All Rights Reserved.
              </p>
              <p className="text-xs text-red-800 text-center mt-1 font-semibold">
                이 워크북은 저작권법에 의해 보호받는 저작물입니다. 워크북의 전체 또는 일부를 저작권자의 사전 서면 동의 없이 무단으로 복제, 배포, 전송, 전시, 방송하거나 수정 및 편집하는 행위는 금지되어 있으며, 위반 시 관련 법령에 따라 법적인 책임을 질 수 있습니다. 오직 개인적인 용도로만 사용해야 하며, 상업적 목적의 사용 및 무단 배포를 엄격히 금지합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = currentPhase === 'round1' 
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? { 
        title: `${round1Steps[selectedSteps[currentStep]].title} - 심화`,
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 연결 및 완성',
        questions: [round3Questions[currentStep]]
      };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            CareerEngineer 직무확보역량 작성 워크북
          </h1>
          <p className="text-gray-600">
            체계적인 3라운드 시스템으로 완성하는 직무확보역량
          </p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentStepData.title}
              </span>
              <span>전체 진행률: {Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: progress + '%' }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.subtitle && (
            <p className="text-gray-600 mb-6">{currentStepData.subtitle}</p>
          )}

          {currentStep === 0 && currentPhase === 'round1' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 산업
                </label>
                <input
                  type="text"
                  value={basicInfo.industry}
                  onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: IT, 금융, 제조, 유통 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 직무
                </label>
                <input
                  type="text"
                  value={basicInfo.position}
                  onChange={(e) => handleBasicInfoChange('position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 마케팅, 개발, 기획, 영업 등"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  지원하고자 하는 회사명
                </label>
                <input
                  type="text"
                  value={basicInfo.company}
                  onChange={(e) => handleBasicInfoChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 삼성전자, 네이버, 카카오 등"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentStepData.questions.map((q) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <HelpCircle className="w-4 h-4" />
                        {showGuide[q.id] ? '가이드 숨기기' : '가이드 보기'}
                      </button>
                    )}
                  </div>
                  
                  {q.hint && (
                    <p className="text-sm text-gray-600 mb-2">💡 {q.hint}</p>
                  )}
                  
                  {q.referenceQuestions && (
                    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-3">
                      <p className="text-sm font-semibold text-indigo-900 mb-2">📚 참고: 이전 답변</p>
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const refQuestion = [...round1Steps.flatMap(s => s.questions || [])].find(q => q?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          return (
                            <div key={refId} className="bg-white p-3 rounded text-sm">
                              <p className="font-semibold text-gray-700 mb-1">{refQuestion.label}</p>
                              <p className="text-gray-600 italic">{answers[refId]?.substring(0, 150)}{answers[refId]?.length > 150 ? '...' : ''}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {q.guide && showGuide[q.id] && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-3 space-y-3">
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">📝 {q.guide.description}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-semibold text-blue-900 mb-1">🎯 {q.guide.diagnosis}</p>
                      </div>
                      
                      {q.guide.helpQuestions && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">❓ 구체화 도움 질문:</p>
                          <ul className="text-sm text-blue-800 space-y-1 ml-4">
                            {q.guide.helpQuestions.map((hq, i) => (
                              <li key={i}>• {hq}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {q.guide.ifDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💭 답변하기 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifDifficult}</p>
                        </div>
                      )}
                      
                      {q.guide.ifStillDifficult && (
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">💡 구체화 도움 질문으로도 어렵다면:</p>
                          <p className="text-sm text-blue-800">{q.guide.ifStillDifficult}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={q.rows || 3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={q.placeholder}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={goToPrevStep}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              이전
            </button>
            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              다음
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetencyWorkbook;