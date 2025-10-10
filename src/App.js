import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Download, Eye, EyeOff, HelpCircle, Lock, CheckCircle2 } from 'lucide-react';

const JobCompetencyWorkbook = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('round1');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [basicInfo, setBasicInfo] = useState({ industry: '', position: '', company: '' });
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [finalText, setFinalText] = useState('');
  const [showGuide, setShowGuide] = useState({});
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const CORRECT_PASSWORD = 'career2025';

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const round1Steps = [
    {
      id: 0,
      title: '기본 정보',
      subtitle: '지원 산업, 직무, 회사를 입력하세요'
    },
    {
      id: 1,
      title: 'STEP 1: 직무에서 필요한 역량 파악',
      subtitle: '채용공고 분석과 직무 이해',
      questions: [
        {
          id: 'q1_1_1',
          label: 'Q1.1.1. 지원 직무의 핵심 업무 3가지는 무엇인가요?',
          hint: '채용공고의 주요 업무 추출',
          guide: {
            description: '답변 가이드: 채용공고의 주요 업무나 자격요건에서 핵심 업무를 추출하세요.',
            diagnosis: '즉석자가진단: 면접관이 "이 직무가 뭐하는 일이죠?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '채용공고에서 가장 많이 언급된 업무는?',
              '현직자들이 실제로 하는 주요 업무는?',
              '신입사원이 처음 맡게 될 업무는?'
            ],
            ifDifficult: '채용공고의 "주요 업무" 섹션을 읽어보고, 반복되거나 강조된 업무 3개를 선택하세요.',
            ifStillDifficult: '해당 직무의 일반적인 업무라도 작성하세요. 예: 마케터라면 "콘텐츠 제작, 성과 분석, 캠페인 기획"',
          },
          placeholder: '저는 디지털 마케터 직무에 지원하며, 이 직무의 핵심 업무는 첫째, SNS 채널 운영과 콘텐츠 제작입니다. 둘째, 구글 애널리틱스를 활용한 마케팅 성과 분석과 개선입니다. 셋째, 온라인 광고 캠페인 기획과 집행입니다.',
          rows: 3
        },
        {
          id: 'q1_1_2',
          label: 'Q1.1.2. 각 업무에 필요한 핵심 역량은?',
          hint: '업무별 필수 스킬과 능력',
          guide: {
            description: '답변 가이드: 각 업무를 수행하기 위해 필수적으로 필요한 능력을 구체적으로 작성하세요.',
            diagnosis: '즉석자가진단: "그 업무를 하려면 뭘 할 줄 알아야 해요?"라는 질문에 즉답 가능한가?',
            helpQuestions: [
              '이 업무를 하기 위한 필수 기술(하드스킬)은?',
              '이 업무에 필요한 소프트스킬은?',
              '신입에게 기대하는 최소 역량은?'
            ],
            ifDifficult: '각 업무를 수행한다고 상상해보세요. 도구나 지식, 태도나 능력을 구분해서 생각해보세요.',
            ifStillDifficult: '채용공고의 "우대사항"이나 "자격요건"을 참고하여 기본적인 것 3개만이라도 선택하세요.',
          },
          placeholder: 'SNS 운영에는 포토샵/캔바 등 디자인 툴 활용 능력과 트렌드 감각이 필요합니다. 성과 분석에는 구글 애널리틱스 활용 능력과 데이터 해석 능력이 필수입니다. 캠페인 기획에는 기획력과 고객 이해 능력이 요구됩니다.',
          rows: 3
        },
        {
          id: 'q1_1_3',
          label: 'Q1.1.3. 이 직무가 회사에서 하는 역할과 중요성은?',
          hint: '직무의 가치와 기여',
          guide: {
            description: '답변 가이드: 이 직무가 회사 전체에서 어떤 역할을 하고 얼마나 중요한지 설명하세요.',
            diagnosis: '즉석자가진단: "왜 이 직무가 중요한가요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '이 직무가 회사 목표 달성에 어떻게 기여하나?',
              '다른 부서와 어떻게 협업하나?',
              '이 직무의 결과물은 무엇인가?'
            ],
            ifDifficult: '회사의 비즈니스 모델에서 이 직무의 위치를 생각해보세요.',
            ifStillDifficult: '고객이나 회사에 직접적으로 미치는 영향을 중심으로 작성하세요.',
          },
          placeholder: '디지털 마케터는 온라인 채널을 통해 고객과의 접점을 만들고, 데이터 기반으로 마케팅 효율을 높여 매출 증대에 직접 기여합니다. 또한 브랜드 인지도를 높이고 잠재고객을 확보하는 핵심 역할을 수행합니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'STEP 2: 내가 보유한 역량 진단',
      subtitle: '현재 나의 역량 수준 평가',
      questions: [
        {
          id: 'q1_2_1',
          label: 'Q1.2.1. STEP 1에서 파악한 역량 중 내가 보유한 것은?',
          hint: '실제 경험 기반 역량만',
          guide: {
            description: '답변 가이드: 실제로 사용해본 경험이 있는 역량만 솔직하게 작성하세요.',
            diagnosis: '즉석자가진단: "그 역량으로 뭘 해봤어요?"라는 질문에 구체적 사례로 답변 가능한가?',
            helpQuestions: [
              '실제로 사용해본 도구나 기술은?',
              '프로젝트나 과제에서 발휘한 역량은?',
              '남들이 인정하는 나의 강점은?'
            ],
            ifDifficult: '수업, 동아리, 아르바이트, 개인 프로젝트 등 모든 경험을 떠올려보세요.',
            ifStillDifficult: '가장 자신 있는 1-2개 역량만이라도 작성하세요.',
          },
          placeholder: '저는 포토샵과 일러스트레이터를 활용한 디자인 역량을 보유하고 있으며, 동아리에서 20개 이상의 포스터를 제작했습니다. 구글 애널리틱스는 자격증을 취득했고, 블로그 운영하며 6개월간 실제 데이터를 분석한 경험이 있습니다. 영어 커뮤니케이션은 토익 850점과 교환학생 경험으로 실무 소통이 가능한 수준입니다.',
          rows: 3
        },
        {
          id: 'q1_2_2',
          label: 'Q1.2.2. 각 역량의 현재 수준은? (초급/중급/고급)',
          hint: '정직한 자기 평가',
          guide: {
            description: '답변 가이드: 과장하지 말고 현재 수준을 솔직하게 평가하세요.',
            diagnosis: '즉석자가진단: "그 수준이면 뭘 할 수 있나요?"라는 질문에 구체적 예시로 답변 가능한가?',
            helpQuestions: [
              '혼자서 할 수 있는 수준인가?',
              '실무에서 바로 활용 가능한가?',
              '다른 사람에게 가르칠 수 있나?'
            ],
            ifDifficult: '초급: 기본 기능 사용 가능, 중급: 실무 프로젝트 수행 가능, 고급: 전문적 활용 및 문제 해결 가능',
            ifStillDifficult: '구체적인 작업이나 프로젝트로 수준을 설명하세요.',
          },
          placeholder: '포토샵은 중급 수준으로, 포스터와 카드뉴스 제작이 가능합니다. 구글 애널리틱스는 초급으로, 기본 리포트 작성과 간단한 인사이트 도출이 가능합니다. 영어는 중급으로, 이메일과 회의 소통이 가능합니다.',
          rows: 3
        },
        {
          id: 'q1_2_3',
          label: 'Q1.2.3. 부족한 역량의 보완 계획은?',
          hint: '구체적인 학습 전략',
          guide: {
            description: '답변 가이드: 부족한 역량을 어떻게 채울 것인지 구체적으로 계획하세요.',
            diagnosis: '즉석자가진단: "언제까지 어떻게 할 건가요?"라는 질문에 구체적 일정과 방법을 답변 가능한가?',
            helpQuestions: [
              '어떤 방법으로 학습할 것인가?',
              '목표 달성 시점은 언제인가?',
              '회사 교육과 어떻게 연계할 것인가?'
            ],
            ifDifficult: 'OJT + 자기주도 학습 + 온라인 강의의 3단계 접근을 제시하세요.',
            ifStillDifficult: '선배들의 노하우를 배우고, 퇴근 후 1시간씩 자기계발에 투자하겠다는 의지를 표현하세요.',
          },
          placeholder: '페이스북 광고 매니저는 입사 첫 달 내 선배의 실무를 관찰하며 배우고, 동시에 페이스북 공식 교육 자료로 이론을 병행 학습하겠습니다. 3개월 내 소규모 캠페인을 독립적으로 운영할 수 있는 수준까지 성장하겠습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 3,
      title: 'STEP 3: 역량 활용 경험',
      subtitle: '구체적인 프로젝트와 활동',
      questions: [
        {
          id: 'q1_3_1',
          label: 'Q1.3.1. 어떤 경험에서 해당 역량을 주로 활용했나요?',
          hint: '대표 경험 1-2개',
          guide: {
            description: '답변 가이드: 역량을 실제로 활용한 구체적 경험을 STAR 방식으로 작성하세요.',
            diagnosis: '즉석자가진단: "그때 정확히 뭘 하셨어요?"라는 질문에 상세히 설명 가능한가?',
            helpQuestions: [
              '언제, 어디서, 무엇을 했나?',
              '나의 구체적 역할과 책임은?',
              '어떤 과정과 결과가 있었나?'
            ],
            ifDifficult: '최근 6개월 이내의 경험 중 가장 기억에 남는 것을 선택하세요.',
            ifStillDifficult: '무엇을 했는지만이라도 구체적으로 작성하세요.',
          },
          placeholder: '대학 축제 홍보 TF팀에서 SNS 마케팅을 담당했습니다. 2주간 인스타그램과 페이스북에 매일 2개씩 콘텐츠를 제작하고 업로드했으며, 포토샵으로 직접 디자인한 카드뉴스가 특히 좋은 반응을 얻었습니다. 그 결과 팔로워가 300명 증가하고 축제 참여율이 전년 대비 20% 상승했습니다.',
          rows: 3
        },
        {
          id: 'q1_3_2',
          label: 'Q1.3.2. 그 경험에서 역량이 어떻게 도움이 되었나요?',
          hint: '역량과 성과의 인과관계',
          guide: {
            description: '답변 가이드: 역량과 성과 간의 인과관계를 명확히 보여주세요.',
            diagnosis: '즉석자가진단: "그 역량이 없었다면 어떻게 됐을까요?"라는 질문에 답변 가능한가?',
            helpQuestions: [
              '해당 역량이 문제 해결에 어떻게 기여했나?',
              '역량 덕분에 가능했던 것은?',
              '다른 방법과 비교해 어떤 장점이 있었나?'
            ],
            ifDifficult: '만약 이 역량이 없었다면 어떻게 되었을지 생각해보세요.',
            ifStillDifficult: '역량이 가져온 가장 단순한 이점이라도 작성하세요.',
          },
          placeholder: '포토샵 활용 능력 덕분에 외주 없이 직접 콘텐츠를 제작하여 예산을 50% 절감했습니다. 또한 즉각적인 수정이 가능해 트렌드에 빠르게 대응할 수 있었고, 팀원들의 아이디어를 바로 시각화하여 커뮤니케이션 효율성도 크게 향상되었습니다.',
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
            ifStillDifficult: '구체적인 평가를 인용하거나, 제안/부탁을 받은 것도 좋은 증거입니다.',
          },
          placeholder: '팀장님께서는 "신입치고 놀라운 완성도"라고 평가하셨고, 팀원들은 "덕분에 시간이 많이 절약됐다"고 했습니다. 이후 다른 학과 행사에서도 디자인 작업을 부탁받았습니다.',
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
            ifStillDifficult: '전후 비교나 타인의 평가라도 구체화하세요.',
          },
          placeholder: 'SNS 팔로워 300명 증가 (전년 대비 20% 상승), 축제 참여율 전년 대비 20% 증가, 카드뉴스 평균 좋아요 150개로 팀 내 최고 기록을 달성했습니다.',
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
            ifStillDifficult: '제안이나 부탁을 받은 것도 좋은 평가의 증거입니다.',
          },
          placeholder: '지도교수님께서는 "학부생 중 가장 완성도 높은 프로젝트"라고 평가하셨고, 실제로 후배들 대상 SNS 마케팅 특강을 부탁받아 진행하기도 했습니다.',
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
            ifDifficult: '성과의 직접적 영향과 장기적 가치를 생각해보세요.',
            ifStillDifficult: '한 가지 핵심 가치만 선택하세요.',
          },
          placeholder: '이 성과는 제가 실무에서 즉시 활용 가능한 실전 역량을 갖추었음을 증명합니다. 특히 한정된 예산 내에서 최대 효과를 내는 능력은 입사 후 마케팅 ROI 향상에 기여할 수 있습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 5,
      title: 'STEP 5: 증명',
      subtitle: '포트폴리오와 증빙 자료',
      questions: [
        {
          id: 'q1_5_1',
          label: 'Q1.5.1. 역량을 객관적으로 증명할 수 있는 자료는?',
          hint: '즉시 제시 가능한 증빙',
          guide: {
            description: '답변 가이드: 즉시 보여줄 수 있는 구체적인 증빙 자료를 제시하세요.',
            diagnosis: '즉석자가진단: "지금 바로 보여줄 수 있나요?"라는 질문에 YES라고 답할 수 있는가?',
            helpQuestions: [
              '포트폴리오나 작업물이 있는가?',
              '자격증이나 수료증이 있는가?',
              '온라인에서 확인 가능한 결과물이 있는가?'
            ],
            ifDifficult: 'GitHub, 블로그, SNS 계정, 과제물 등 무엇이든 증거가 될 수 있습니다.',
            ifStillDifficult: '요청 시 즉시 제출 가능한 자료라도 준비하세요.',
          },
          placeholder: '노션으로 제작한 온라인 포트폴리오에 디자인 작업물 20개를 정리해두었습니다. 구글 애널리틱스 자격증(GAIQ)과 블로그 6개월 운영 데이터를 보유하고 있습니다. GitHub에 마케팅 데이터 분석 프로젝트 3개의 코드와 결과를 공개해두었습니다.',
          rows: 3
        },
        {
          id: 'q1_5_2',
          label: 'Q1.5.2. 포트폴리오나 프로젝트의 핵심 특징은?',
          hint: '차별화 전략과 독창성',
          guide: {
            description: '답변 가이드: 차별화되는 포인트와 전문성을 드러내는 부분을 강조하세요.',
            diagnosis: '즉석자가진단: "다른 지원자와 뭐가 다른가요?"라는 질문에 차별점을 설명할 수 있는가?',
            helpQuestions: [
              '가장 자랑스러운 작업물은?',
              '남들과 다른 독특한 접근은?',
              '실무에 가장 가까운 결과물은?'
            ],
            ifDifficult: '수량, 다양성, 완성도, 창의성 중 하나라도 강점으로 내세울 수 있는 것을 찾으세요.',
            ifStillDifficult: '포트폴리오의 구성과 정리 자체를 특징으로 삼으세요.',
          },
          placeholder: '포트폴리오의 핵심은 "과정이 보이는 결과물"입니다. 각 프로젝트마다 초기 기획부터 최종 결과까지 단계별로 정리하여 사고 과정을 보여줍니다. 특히 A/B 테스트 결과와 개선 과정을 상세히 기록하여 데이터 기반 의사결정 능력을 입증했습니다.',
          rows: 3
        },
        {
          id: 'q1_5_3',
          label: 'Q1.5.3. 입사 전까지 포트폴리오를 어떻게 보완할 계획인가요?',
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
            ifStillDifficult: '기존 내용을 다듬는 것도 보완입니다.',
          },
          placeholder: '입사 전까지 실제 클라이언트 프로젝트 2개를 추가하고, 각 프로젝트의 성과 지표를 더 구체화할 계획입니다. 또한 최근 트렌드인 숏폼 콘텐츠 제작 사례도 포함하여 포트폴리오의 최신성을 높이겠습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 6,
      title: 'STEP 6: 실무 활용',
      subtitle: '입사 후 기여 방안',
      questions: [
        {
          id: 'q1_6_1',
          label: 'Q1.6.1. 입사 후 즉시 기여할 수 있는 부분은?',
          hint: '첫 날부터 가능한 것',
          guide: {
            description: '답변 가이드: 입사 직후 현실적으로 가능한 기여',
            diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"에 답변 가능한가?',
            helpQuestions: [
              '즉시 도움이 되는 부분은?',
              '선배들의 시간을 절약할 수 있는 것은?',
              '신입이라도 할 수 있는 것은?'
            ],
            ifDifficult: '단순 업무부터 생각해보세요.',
            ifStillDifficult: '배우면서 돕겠다는 자세를 표현하세요.',
          },
          placeholder: '포토샵 활용 능력으로 일일 SNS 콘텐츠 제작과 수정 작업을 즉시 수행할 수 있습니다. 구글 애널리틱스로 주간 트래픽 리포트를 작성하고 기초 인사이트를 도출할 수 있습니다. 영어 능력을 활용해 해외 마케팅 트렌드 조사와 벤치마킹 자료를 준비할 수 있습니다.',
          rows: 3
        },
        {
          id: 'q1_6_2',
          label: 'Q1.6.2. 부족한 역량의 보완 계획은?',
          hint: '구체적 학습 로드맵',
          guide: {
            description: '답변 가이드: 구체적이고 실행 가능한 학습 계획을 제시하세요.',
            diagnosis: '즉석자가진단: "어떻게 학습할 건가요?"라는 질문에 구체적 방법과 일정을 답할 수 있는가?',
            helpQuestions: [
              '어떤 방법으로 학습할 것인가?',
              '목표 달성 시점은 언제인가?',
              '회사 교육과 어떻게 연계할 것인가?'
            ],
            ifDifficult: 'OJT + 자기주도 학습 + 온라인 강의의 3단계 접근을 제시하세요.',
            ifStillDifficult: '선배들의 노하우를 적극적으로 배우고, 퇴근 후 1시간씩 자기계발에 투자하겠다는 의지를 표현하세요.',
          },
          placeholder: '페이스북 광고 매니저는 입사 첫 달 내 선배의 실무를 관찰하며 배우고, 동시에 페이스북 공식 교육 자료로 이론을 병행 학습하겠습니다. 3개월 내 소규모 캠페인을 독립적으로 운영할 수 있는 수준까지 성장하겠습니다.',
          rows: 3
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2_1_1',
        label: 'Q2.1.1. Q1.1.1(핵심 업무)에 대한 본인의 이해도를 구체적으로 설명해주세요',
        hint: '직무에 대한 깊이 있는 이해',
        guide: {
          description: '답변 가이드: 피상적이지 않은 구체적인 직무 이해',
          diagnosis: '즉석자가진단: "그 업무의 어려운 점은 뭔가요?"에 답변 가능한가?',
          helpQuestions: [
            '각 업무의 세부 프로세스는?',
            '업무 수행 시 고려사항은?',
            '다른 업무와의 연관성은?'
          ],
          ifDifficult: '현직자 인터뷰나 직무 설명회 내용을 참고하세요.',
          ifStillDifficult: '채용공고의 업무 설명을 본인 언어로 재구성하세요.',
          example: 'SNS 채널 운영은 단순히 콘텐츠를 올리는 것이 아니라, 타겟 분석→콘텐츠 기획→제작→게시→성과 분석→개선의 사이클입니다. 각 채널의 특성을 이해하고...'
        },
        placeholder: 'SNS 채널 운영은 단순히 콘텐츠를 올리는 것이 아니라, 타겟 분석→콘텐츠 기획→제작→게시→성과 분석→개선의 사이클입니다. 각 채널의 특성을 이해하고...',
        rows: 4
      },
      {
        id: 'q2_1_2',
        label: 'Q2.1.2. 이 직무를 수행하는 사람의 하루 일과는 어떨까요?',
        hint: '현실적인 업무 루틴',
        guide: {
          description: '답변 가이드: 시간대별 현실적인 일상',
          diagnosis: '즉석자가진단: "하루 일과를 설명해 보세요"에 답변 가능한가?',
          helpQuestions: [
            '출근 후 첫 업무는?',
            '주요 회의 시간은?',
            '퇴근 전 마무리 업무는?'
          ],
          ifDifficult: '회사 블로그나 유튜브에서 현직자 하루 vlog 검색',
          ifStillDifficult: '채용공고와 직무 설명을 기반으로 상상력을 발휘하세요.',
          example: '아침 9시 출근 후 어제 성과 리포트 확인과 오늘 콘텐츠 계획 세우기부터 시작합니다. 오전에는 콘텐츠 제작, 오후에는 광고 집행과 분석, 저녁에는 트렌드 조사로 마무리합니다.'
        },
        placeholder: '아침 9시 출근 후 어제 성과 리포트 확인과 오늘 콘텐츠 계획 세우기부터 시작합니다. 오전에는 콘텐츠 제작, 오후에는 광고 집행과 분석, 저녁에는 트렌드 조사로 마무리합니다.',
        rows: 4
      },
      {
        id: 'q2_1_3',
        label: 'Q2.1.3. 우리 회사가 특별히 원하는 역량은?',
        hint: '회사별 차별화된 역량',
        guide: {
          description: '답변 가이드: 회사의 특성, 산업, 문화를 고려한 차별화된 역량을 파악하세요.',
          diagnosis: '즉석자가진단: “왜 이 회사는 다른 역량이 필요하죠?”라는 질문에 답변 가능한가?',
          helpQuestions: [
            '이 회사만의 독특한 비즈니스 모델은?',
            '회사가 강조하는 핵심 가치는?',
            '업계 특성상 필요한 특별한 역량은?'
          ],
          ifDifficult: '회사 홈페이지의 “인재상”이나 “핵심가치”를 확인하고, 채용공고에서 유독 강조하는 표현을 찾아보세요.',
          ifStillDifficult: '최소한 해당 산업의 특성이라도 반영하세요. IT 기업이라면 “빠른 변화 적응력”, 제조업이라면 “품질 중시 마인드”.',
          example: '글로벌 진출을 준비 중인 이 회사는 특별히 영어 커뮤니케이션 능력과 해외 시장 이해도를 중요시합니다. 또한 스타트업 특성상 빠른 실행력과 애자일한 업무 방식에 적응할 수 있는 유연성을 원합니다.'
        },
        placeholder: '글로벌 진출을 준비 중인 이 회사는 특별히 영어 커뮤니케이션 능력과 해외 시장 이해도를 중요시합니다. 또한 스타트업 특성상 빠른 실행력과 애자일한 업무 방식에 적응할 수 있는 유연성을 원합니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2_2_1',
        label: 'Q2.2.1. STEP 1에서 파악한 역량 중 내가 보유한 것은?',
        hint: '실제 경험 기반 역량만',
        guide: {
          description: '답변 가이드: 실제로 사용해본 경험이 있는 역량만 솔직하게 작성하세요.',
          diagnosis: '즉석자가진단: "그 역량으로 뭘 해봤어요?"라는 질문에 구체적 사례로 답변 가능한가?',
          helpQuestions: [
            '실제로 사용해본 도구나 기술은?',
            '프로젝트나 과제에서 발휘한 역량은?',
            '남들이 인정하는 나의 강점은?'
          ],
          ifDifficult: '수업, 동아리, 아르바이트, 개인 프로젝트 등 모든 경험을 떠올려보세요.',
          ifStillDifficult: '가장 자신 있는 1-2개 역량만이라도 작성하세요.',
          example: '저는 포토샵과 일러스트레이터를 활용한 디자인 역량을 보유하고 있으며, 동아리에서 20개 이상의 포스터를 제작했습니다. 구글 애널리틱스는 자격증을 취득했고, 블로그 운영하며 6개월간 실제 데이터를 분석한 경험이 있습니다.'
        },
        placeholder: '저는 포토샵과 일러스트레이터를 활용한 디자인 역량을 보유하고 있으며, 동아리에서 20개 이상의 포스터를 제작했습니다. 구글 애널리틱스는 자격증을 취득했고, 블로그 운영하며 6개월간 실제 데이터를 분석한 경험이 있습니다.',
        rows: 4
      },
      {
        id: 'q2_2_2',
        label: 'Q2.2.2. 각 역량의 현재 수준은? (초급/중급/고급)',
        hint: '정직한 자기 평가',
        guide: {
          description: '답변 가이드: 과장하지 말고 현재 수준을 솔직하게 평가하세요.',
          diagnosis: '즉석자가진단: "그 수준이면 뭘 할 수 있나요?"라는 질문에 구체적 예시로 답변 가능한가?',
          helpQuestions: [
            '혼자서 할 수 있는 수준인가?',
            '실무에서 바로 활용 가능한가?',
            '다른 사람에게 가르칠 수 있나?'
          ],
          ifDifficult: '초급: 기본 기능 사용 가능, 중급: 실무 프로젝트 수행 가능, 고급: 전문적 활용 및 문제 해결 가능',
          ifStillDifficult: '구체적인 작업이나 프로젝트로 수준을 설명하세요.',
          example: '포토샵은 중급 수준으로, 포스터와 카드뉴스 제작이 가능합니다. 구글 애널리틱스는 초급으로, 기본 리포트 작성과 간단한 인사이트 도출이 가능합니다.'
        },
        placeholder: '포토샵은 중급 수준으로, 포스터와 카드뉴스 제작이 가능합니다. 구글 애널리틱스는 초급으로, 기본 리포트 작성과 간단한 인사이트 도출이 가능합니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2_3_1',
        label: 'Q2.3.1. 어떤 경험에서 해당 역량을 주로 활용했나요?',
        hint: '대표 경험 1-2개',
        guide: {
          description: '답변 가이드: 역량을 실제로 활용한 구체적 경험을 STAR 방식으로 작성하세요.',
          diagnosis: '즉석자가진단: "그때 정확히 뭘 하셨어요?"라는 질문에 상세히 설명 가능한가?',
          helpQuestions: [
            '언제, 어디서, 무엇을 했나?',
            '나의 구체적 역할과 책임은?',
            '어떤 과정과 결과가 있었나?'
          ],
          ifDifficult: '최근 6개월 이내의 경험 중 가장 기억에 남는 것을 선택하세요.',
          ifStillDifficult: '무엇을 했는지만이라도 구체적으로 작성하세요.',
          example: '대학 축제 홍보 TF팀에서 SNS 마케팅을 담당했습니다. 2주간 인스타그램과 페이스북에 매일 2개씩 콘텐츠를 제작하고 업로드했으며, 포토샵으로 직접 디자인한 카드뉴스가 특히 좋은 반응을 얻었습니다.'
        },
        placeholder: '대학 축제 홍보 TF팀에서 SNS 마케팅을 담당했습니다. 2주간 인스타그램과 페이스북에 매일 2개씩 콘텐츠를 제작하고 업로드했으며, 포토샵으로 직접 디자인한 카드뉴스가 특히 좋은 반응을 얻었습니다.',
        rows: 4
      },
      {
        id: 'q2_3_2',
        label: 'Q2.3.2. 그 경험에서 역량이 어떻게 도움이 되었나요?',
        hint: '역량과 성과의 인과관계',
        guide: {
          description: '답변 가이드: 역량과 성과 간의 인과관계를 명확히 보여주세요.',
          diagnosis: '즉석자가진단: "그 역량이 없었다면 어떻게 됐을까요?"라는 질문에 답변 가능한가?',
          helpQuestions: [
            '해당 역량이 문제 해결에 어떻게 기여했나?',
            '역량 덕분에 가능했던 것은?',
            '다른 방법과 비교해 어떤 장점이 있었나?'
          ],
          ifDifficult: '만약 이 역량이 없었다면 어떻게 되었을지 생각해보세요.',
          ifStillDifficult: '역량이 가져온 가장 단순한 이점이라도 작성하세요.',
          example: '포토샵 활용 능력 덕분에 외주 없이 직접 콘텐츠를 제작하여 예산을 50% 절감했습니다. 또한 즉각적인 수정이 가능해 트렌드에 빠르게 대응할 수 있었고, 팀원들의 아이디어를 바로 시각화하여 커뮤니케이션 효율성도 크게 향상되었습니다.'
        },
        placeholder: '포토샵 활용 능력 덕분에 외주 없이 직접 콘텐츠를 제작하여 예산을 50% 절감했습니다. 또한 즉각적인 수정이 가능해 트렌드에 빠르게 대응할 수 있었고, 팀원들의 아이디어를 바로 시각화하여 커뮤니케이션 효율성도 크게 향상되었습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2_4_1',
        label: 'Q2.4.1. 측정 가능한 구체적 성과는?',
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
          ifStillDifficult: '전후 비교나 타인의 평가라도 구체화하세요.',
          example: 'SNS 팔로워 300명 증가 (전년 대비 20% 상승), 축제 참여율 전년 대비 20% 증가, 카드뉴스 평균 좋아요 150개로 팀 내 최고 기록을 달성했습니다.'
        },
        placeholder: 'SNS 팔로워 300명 증가 (전년 대비 20% 상승), 축제 참여율 전년 대비 20% 증가, 카드뉴스 평균 좋아요 150개로 팀 내 최고 기록을 달성했습니다.',
        rows: 4
      },
      {
        id: 'q2_4_2',
        label: 'Q2.4.2. 객관적으로 평가받은 성과는?',
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
          ifStillDifficult: '제안이나 부탁을 받은 것도 좋은 평가의 증거입니다.',
          example: '지도교수님께서는 "학부생 중 가장 완성도 높은 프로젝트"라고 평가하셨고, 실제로 후배들 대상 SNS 마케팅 특강을 부탁받아 진행하기도 했습니다.'
        },
        placeholder: '지도교수님께서는 "학부생 중 가장 완성도 높은 프로젝트"라고 평가하셨고, 실제로 후배들 대상 SNS 마케팅 특강을 부탁받아 진행하기도 했습니다.',
        rows: 4
      }
    ],
    5: [
      {
        id: 'q2_5_1',
        label: 'Q2.5.1. 역량을 객관적으로 증명할 수 있는 자료는?',
        hint: '즉시 제시 가능한 증빙',
        guide: {
          description: '답변 가이드: 즉시 보여줄 수 있는 구체적인 증빙 자료를 제시하세요.',
          diagnosis: '즉석자가진단: "지금 바로 보여줄 수 있나요?"라는 질문에 YES라고 답할 수 있는가?',
          helpQuestions: [
            '포트폴리오나 작업물이 있는가?',
            '자격증이나 수료증이 있는가?',
            '온라인에서 확인 가능한 결과물이 있는가?'
          ],
          ifDifficult: 'GitHub, 블로그, SNS 계정, 과제물 등 무엇이든 증거가 될 수 있습니다.',
          ifStillDifficult: '요청 시 즉시 제출 가능한 자료라도 준비하세요.',
          example: '노션으로 제작한 온라인 포트폴리오에 디자인 작업물 20개를 정리해두었습니다. 구글 애널리틱스 자격증(GAIQ)과 블로그 6개월 운영 데이터를 보유하고 있습니다.'
        },
        placeholder: '노션으로 제작한 온라인 포트폴리오에 디자인 작업물 20개를 정리해두었습니다. 구글 애널리틱스 자격증(GAIQ)과 블로그 6개월 운영 데이터를 보유하고 있습니다.',
        rows: 4
      },
      {
        id: 'q2_5_2',
        label: 'Q2.5.2. 포트폴리오나 프로젝트의 핵심 특징은?',
        hint: '차별화 전략과 독창성',
        guide: {
          description: '답변 가이드: 차별화되는 포인트와 전문성을 드러내는 부분을 강조하세요.',
          diagnosis: '즉석자가진단: "다른 지원자와 뭐가 다른가요?"라는 질문에 차별점을 설명할 수 있는가?',
          helpQuestions: [
            '가장 자랑스러운 작업물은?',
            '남들과 다른 독특한 접근은?',
            '실무에 가장 가까운 결과물은?'
          ],
          ifDifficult: '수량, 다양성, 완성도, 창의성 중 하나라도 강점으로 내세울 수 있는 것을 찾으세요.',
          ifStillDifficult: '포트폴리오의 구성과 정리 자체를 특징으로 삼으세요.',
          example: '포트폴리오의 핵심은 "과정이 보이는 결과물"입니다. 각 프로젝트마다 초기 기획부터 최종 결과까지 단계별로 정리하여 사고 과정을 보여줍니다.'
        },
        placeholder: '포트폴리오의 핵심은 "과정이 보이는 결과물"입니다. 각 프로젝트마다 초기 기획부터 최종 결과까지 단계별로 정리하여 사고 과정을 보여줍니다.',
        rows: 4
      }
    ],
    6: [
      {
        id: 'q2_6_1',
        label: 'Q2.6.1. 입사 후 즉시 기여할 수 있는 부분은?',
        hint: '첫 날부터 가능한 것',
        guide: {
          description: '답변 가이드: 입사 직후 현실적으로 가능한 기여',
          diagnosis: '즉석자가진단: "첫 주에 뭘 할 건가요?"에 답변 가능한가?',
          helpQuestions: [
            '즉시 도움이 되는 부분은?',
            '선배들의 시간을 절약할 수 있는 것은?',
            '신입이라도 할 수 있는 것은?'
          ],
          ifDifficult: '단순 업무부터 생각해보세요.',
          ifStillDifficult: '배우면서 돕겠다는 자세를 표현하세요.',
          example: '포토샵 활용 능력으로 일일 SNS 콘텐츠 제작과 수정 작업을 즉시 수행할 수 있습니다. 구글 애널리틱스로 주간 트래픽 리포트를 작성하고 기초 인사이트를 도출할 수 있습니다.'
        },
        placeholder: '포토샵 활용 능력으로 일일 SNS 콘텐츠 제작과 수정 작업을 즉시 수행할 수 있습니다. 구글 애널리틱스로 주간 트래픽 리포트를 작성하고 기초 인사이트를 도출할 수 있습니다.',
        rows: 4
      },
      {
        id: 'q2_6_2',
        label: 'Q2.6.2. 부족한 역량의 보완 계획은?',
        hint: '구체적 학습 로드맵',
        guide: {
          description: '답변 가이드: 구체적이고 실행 가능한 학습 계획을 제시하세요.',
          diagnosis: '즉석자가진단: "어떻게 학습할 건가요?"라는 질문에 구체적 방법과 일정을 답할 수 있는가?',
          helpQuestions: [
            '어떤 방법으로 학습할 것인가?',
            '목표 달성 시점은 언제인가?',
            '회사 교육과 어떻게 연계할 것인가?'
          ],
          ifDifficult: 'OJT + 자기주도 학습 + 온라인 강의의 3단계 접근을 제시하세요.',
          ifStillDifficult: '선배들의 노하우를 적극적으로 배우고, 퇴근 후 1시간씩 자기계발에 투자하겠다는 의지를 표현하세요.',
          example: '페이스북 광고 매니저는 입사 첫 달 내 선배의 실무를 관찰하며 배우고, 동시에 페이스북 공식 교육 자료로 이론을 병행 학습하겠습니다.'
        },
        placeholder: '페이스북 광고 매니저는 입사 첫 달 내 선배의 실무를 관찰하며 배우고, 동시에 페이스북 공식 교육 자료로 이론을 병행 학습하겠습니다.',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_1_2',
      label: '연결 확인 1→2: 직무에서 필요한 역량에서 내가 보유한 역량으로',
      hint: 'STEP 1의 직무에서 필요한 역량이 STEP 2의 내가 보유한 역량으로 어떻게 이어졌나요?',
      placeholder: '예: 이러한 직무 요구사항을 바탕으로 제가 현재 보유한 역량과 준비 상황을 점검해보았습니다...',
      rows: 3,
      referenceSteps: [1, 2],
      referenceQuestions: ['q1_1_1', 'q1_1_2', 'q1_2_1']
    },
    {
      id: 'connect_2_3',
      label: '연결 확인 2→3: 내가 보유한 역량에서 역량 활용 경험으로',
      hint: 'STEP 2의 내가 보유한 역량이 STEP 3의 역량 활용 경험으로 어떻게 이어졌나요?',
      placeholder: '예: 이러한 역량들을 실제 프로젝트와 활동에서 다음과 같이 활용하고 발전시켜왔습니다...',
      rows: 3,
      referenceSteps: [2, 3],
      referenceQuestions: ['q1_2_1', 'q1_2_2', 'q1_3_1']
    },
    {
      id: 'connect_3_4',
      label: '연결 확인 3→4: 역량 활용 경험에서 성과 제시로',
      hint: 'STEP 3의 경험이 STEP 4의 구체적 성과로 어떻게 이어졌나요?',
      placeholder: '예: 역량을 활용한 결과, 구체적이고 의미 있는 성과들을 달성할 수 있었습니다...',
      rows: 3,
      referenceSteps: [3, 4],
      referenceQuestions: ['q1_3_1', 'q1_3_2', 'q1_4_1']
    },
    {
      id: 'connect_4_5',
      label: '연결 확인 4→5: 성과에서 증명으로',
      hint: 'STEP 4의 성과가 STEP 5의 포트폴리오에 어떻게 담겼나요?',
      placeholder: '예: 이러한 성과들을 객관적으로 증명할 수 있는 포트폴리오와 자료를 준비했습니다...',
      rows: 3,
      referenceSteps: [4, 5],
      referenceQuestions: ['q1_4_1', 'q1_4_2', 'q1_5_1']
    },
    {
      id: 'connect_5_6',
      label: '연결 확인 5→6: 증명에서 실무 활용으로',
      hint: 'STEP 5의 증명된 역량을 STEP 6에서 어떻게 활용할 건가요?',
      placeholder: '예: 검증된 역량을 바탕으로 입사 후 실무에서 즉시 기여하고 지속적으로 성장하겠습니다...',
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
              📋 직무확보역량 작성 워크북
            </h1>
            
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-2">이 워크북의 목적</h2>
              <p className="text-lg">
                채용담당자가 "이 사람은 우리 직무에 적합하고, 즉시 기여할 수 있겠다"라고 판단할 수 있는
                <strong className="ml-1">구체적이고 검증 가능한 역량 증명 자료</strong>를 체계적으로 완성하는 것
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-blue-800 mb-4 text-xl">워크북 구조와 소요 시간</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-gray-800">1라운드 (60분): 기본 직무확보역량 수립</p>
                    <p className="text-sm text-gray-600">6단계 모든 질문에 답변하여 전체 구조 완성</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-gray-800">2라운드 (40분): 구체화 및 보강</p>
                    <p className="text-sm text-gray-600">부족한 부분을 선택하여 심화 질문으로 보강</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-gray-800">3라운드 (20분): 연결 및 완성</p>
                    <p className="text-sm text-gray-600">각 단계를 자연스럽게 연결하여 최종 완성</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-yellow-800 mb-3 text-xl">💡 즉석자가진단이란?</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  각 질문마다 제시되는 <strong>"즉석자가진단"</strong>은 여러분이 작성한 내용이 실제 면접에서도 통할 만큼 구체적인지 스스로 점검하는 도구입니다.
                </p>
                <p>
                  즉, <strong>"면접관이 이렇게 물었을 때 3초 안에 자신있게 구체적인 예시나 증거를 댈 수 있는지"</strong> 확인하는 것입니다.
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
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 cursor-pointer'
                    }`}
                    onClick={() => toggleStepSelection(stepId)}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded border-2 mr-4 flex items-center justify-center ${
                        isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{step.title}</p>
                        <p className="text-sm text-gray-600">{step.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={goToPrevStep}
                className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                이전
              </button>
              <button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors ${
                  canGoNext()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                2라운드 시작
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
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
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                완성을 축하합니다! 🎉
              </h2>
              <p className="text-gray-600">
                직무확보역량 작성이 완료되었습니다
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-blue-800 mb-4">📝 완성된 직무확보역량</h3>
              <div className="bg-white p-6 rounded-lg max-h-96 overflow-y-auto border border-gray-200 whitespace-pre-wrap">
                {finalText || '완성된 내용이 없습니다.'}
              </div>
            </div>

            {downloadSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                파일 다운로드가 완료되었습니다.
              </div>
            )}

            <button
              onClick={downloadFinalText}
              className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center mb-4"
            >
              <Download className="w-5 h-5 mr-2" />
              DOC 파일로 다운로드
            </button>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">📋 원본 답변 모음</h3>
              <div className="bg-white p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm whitespace-pre-wrap">{getRawAnswersText()}</pre>
              </div>
            </div>

            <button
              onClick={goToPrevStep}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center mt-6"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              이전 단계로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderQuestion = (question, reference = false) => {
    const value = answers[question.id] || '';
    const guide = question.guide;

    return (
      <div key={question.id} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-1">{question.label}</label>
          <p className="text-sm text-gray-500 mb-2">{question.hint}</p>
          <textarea
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            placeholder={question.placeholder}
            rows={question.rows || 4}
          />
        </div>
        <button
          onClick={() => toggleGuide(question.id)}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          {showGuide[question.id] ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
          {showGuide[question.id] ? '가이드 숨기기' : '가이드 보기'}
        </button>
        {showGuide[question.id] && (
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <p><strong>답변 가이드:</strong> {guide.description}</p>
            <p><strong>즉석자가진단:</strong> {guide.diagnosis}</p>
            <p><strong>구체화 도움 질문:</strong></p>
            <ul className="list-disc pl-5">
              {guide.helpQuestions.map((q, i) => <li key={i}>{q}</li>)}
            </ul>
            <p><strong>답변하기 어렵다면:</strong> {guide.ifDifficult}</p>
            <p><strong>구체화 도움 질문으로도 어렵다면:</strong> {guide.ifStillDifficult}</p>
            {guide.example && <p><strong>답변 작성 예시:</strong> {guide.example}</p>}
          </div>
        )}
        {reference && question.referenceSteps && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <p className="font-medium">참고 답변:</p>
            {question.referenceQuestions.map((refId, index) => (
              <p key={refId}><strong>STEP {question.referenceSteps[index]}:</strong> {answers[refId] || '미작성'}</p>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStep = () => {
    if (currentPhase === 'round1') {
      const step = round1Steps[currentStep];
      if (step.id === 0) {
        return (
          <div className="space-y-6">
            <input
              type="text"
              value={basicInfo.industry}
              onChange={(e) => handleBasicInfoChange('industry', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="지원 산업 (예: IT, 마케팅, 제조 등)"
            />
            <input
              type="text"
              value={basicInfo.position}
              onChange={(e) => handleBasicInfoChange('position', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="지원 직무 (예: 디지털 마케터, 소프트웨어 개발자 등)"
            />
            <input
              type="text"
              value={basicInfo.company}
              onChange={(e) => handleBasicInfoChange('company', e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="지원 회사 (예: xAI, Google 등)"
            />
          </div>
        );
      } else {
        return (
          <div className="space-y-8">
            {step.questions.map(question => renderQuestion(question))}
          </div>
        );
      }
    } else if (currentPhase === 'round2') {
      const stepId = selectedSteps[currentStep];
      const step = round1Steps.find(s => s.id === stepId);
      const questions = round2Questions[stepId] || [];
      return (
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-gray-800">{step.title} 구체화</h3>
          {questions.map(question => renderQuestion(question))}
        </div>
      );
    } else if (currentPhase === 'round3') {
      const question = round3Questions[currentStep];
      return renderQuestion(question, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentPhase === 'round1' ? '1라운드' : currentPhase === 'round2' ? '2라운드' : '3라운드'} - {currentPhase === 'round1' ? round1Steps[currentStep].title : currentPhase === 'round2' ? round1Steps.find(s => s.id === selectedSteps[currentStep]).title : '스토리 연결'}
            </h2>
            <p className="text-gray-600">진행률: {Math.round(progress)}%</p>
          </div>
          <p className="text-gray-600 mb-8">
            {currentPhase === 'round1' ? round1Steps[currentStep].subtitle : currentPhase === 'round2' ? '심화 질문에 답변하세요' : '단계 간 연결 문구를 작성하세요'}
          </p>
          {renderStep()}
          <div className="flex gap-4 mt-8">
            <button
              onClick={goToPrevStep}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              이전
            </button>
            <button
              onClick={goToNextStep}
              disabled={!canGoNext()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-colors ${
                canGoNext()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              다음
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCompetencyWorkbook;