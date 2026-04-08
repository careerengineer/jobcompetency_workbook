import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Download, HelpCircle, Eye, Edit3 } from 'lucide-react';

const CompetencyWorkbook = () => {
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

  const round1Steps = [
    { id: 0, title: '기본 정보 입력', subtitle: '지원할 산업, 직무, 회사를 입력하세요' },
    {
      id: 1,
      title: 'Q1: 이 직무에서 무엇이 요구되는가',
      subtitle: '→ 최종 글 1단락 재료 — 역량 선언',
      questions: [
        {
          id: 'q1_1',
          label: 'Q1-1. 이 직무의 핵심 업무 3가지는 무엇인가요?',
          hint: '채용공고·직무소개서 기반 — 리서치 없이는 쓸 수 없는 내용이어야 합니다',
          guide: {
            description: '채용공고의 "주요업무" 섹션과 현직자 인터뷰를 함께 읽어야 진짜 핵심 업무가 보입니다.',
            diagnosis: '즉석자가진단: "그 업무를 왜 하나요?"라는 질문에 즉답 가능한가?',
            helpQuestions: [
              '채용공고에서 가장 많이 강조된 업무는?',
              '이 직무 현직자 인터뷰에서 "매일 하는 일"로 언급한 것은?',
              '이 직무의 최종 산출물(결과물)은 무엇인가?'
            ],
            ifDifficult: '채용공고의 "주요업무" 섹션을 다시 읽으면서, 각 항목이 왜 필요한지를 생각해보세요.',
            ifStillDifficult: '현직자 인터뷰 영상을 3편 이상 보고 공통으로 나오는 업무를 정리해보세요.'
          },
          placeholder: '예: 첫 번째는 SNS 콘텐츠 기획·제작입니다. 브랜드 메시지를 타겟에 맞는 형식으로 만들어 주 3회 이상 업로드합니다. 두 번째는 캠페인 성과 분석, 세 번째는 신규 채널 발굴입니다.',
          rows: 4
        },
        {
          id: 'q1_2',
          label: 'Q1-2. 그 업무들 중 잘하는 사람과 못하는 사람을 가르는 핵심 역량은 무엇인가요?',
          hint: '채용공고 복붙 금지 — "왜 그 역량이 없으면 이 업무를 못 하는가"까지',
          guide: {
            description: '"이 역량이 없으면 이 업무를 제대로 할 수 없다"는 인과관계로 생각해야 합니다.',
            diagnosis: '즉석자가진단: "왜 하필 그 역량인가요?"라고 물으면 자신의 언어로 즉답 가능한가?',
            helpQuestions: [
              '이 역량이 없는 신입과 있는 신입의 업무 결과가 어떻게 다른가?',
              '현직자들이 "이게 없으면 힘들더라"고 공통적으로 말하는 것은?',
              '채용공고 자격요건 중 "우대"가 아닌 "필수"에 해당하는 역량은?'
            ],
            ifDifficult: '각 업무를 단계별로 쪼개서 어느 단계에서 이 역량이 필요한지 생각해보세요.',
            ifStillDifficult: '"이 역량이 없었다면 그 업무의 어느 단계에서 막혔을까?"라고 스스로 질문해보세요.'
          },
          placeholder: '예: 가장 핵심은 콘텐츠 기획력입니다. 트렌드를 읽고 타겟의 언어로 변환하는 능력이 없으면 아무리 디자인이 좋아도 반응이 없습니다. 포토샵 스킬보다 "무엇을 왜 만드는가"를 아는 것이 더 중요합니다.',
          rows: 4
        },
        {
          id: 'q1_3',
          label: 'Q1-3. 그 역량 중 내가 "보유하고 있다"고 자신 있게 말할 수 있는 역량은 무엇인가요?',
          hint: '"있는 것 같습니다"가 아닌 — 경험으로 증명할 수 있는 것만',
          guide: {
            description: '이것이 1단락의 핵심 선언이 됩니다. 막연하게 "있다"가 아닌, Q2·Q3에서 증명할 수 있는 역량이어야 합니다.',
            diagnosis: '즉석자가진단: "그 역량을 증명할 경험이 있나요?"라고 물으면 구체적인 사례를 바로 댈 수 있는가?',
            helpQuestions: [
              '지금 당장 이 역량을 보여주는 작업물이나 경험이 있나요?',
              '이 역량으로 만들어낸 결과가 있나요?',
              '이 역량 때문에 누군가에게 도움을 요청받거나 인정받은 경험이 있나요?'
            ],
            ifDifficult: '완벽하지 않아도 됩니다. "기초~중급 수준이지만, 이 경험으로 증명 가능하다"도 충분합니다.',
            ifStillDifficult: 'Q1-2에서 파악한 역량 목록을 보면서, 내가 경험을 댈 수 있는 것을 하나 고르세요.'
          },
          placeholder: '예: 콘텐츠 기획·제작 역량입니다. 대학 축제 홍보 TF에서 2주간 30개 콘텐츠를 단독으로 기획하고 제작한 경험이 있고, SNS 팔로워가 300명 증가한 결과가 있습니다.',
          rows: 3
        }
      ]
    },
    {
      id: 2,
      title: 'Q2: 이 역량을 어떻게 갖게 됐고 어떻게 쌓아왔는가',
      subtitle: '→ 최종 글 2단락 재료 — 계기·과정·지속성',
      questions: [
        {
          id: 'q2_1',
          label: 'Q2-1. 이 역량이 필요하다는 것을 처음 깨달은 계기는 무엇인가요?',
          hint: '언제, 어떤 순간에, 어떤 감정이 들었는가 — 특정 장면이 있어야 합니다',
          guide: {
            description: '"이 역량을 쌓아야겠다"는 확신이 생긴 구체적인 순간을 찾아야 합니다. 막연하게 "중요하다고 생각해서"는 답이 아닙니다.',
            diagnosis: '즉석자가진단: "그때 어떤 상황이었나요?"라고 물으면 장면을 묘사하며 즉답 가능한가?',
            helpQuestions: [
              '이 역량이 없어서 막히거나 실패한 순간이 있었나요?',
              '이 역량을 가진 누군가를 보며 "저게 있으면 다르겠구나"를 느낀 순간은?',
              '이 역량의 가치를 처음 눈으로 확인한 순간은?'
            ],
            ifDifficult: '역량이 필요했던 상황을 먼저 떠올려보세요. "그때 이 역량이 있었다면..."이라고 가정해보세요.',
            ifStillDifficult: '처음 이 역량을 배우거나 익히기 시작했을 때로 돌아가세요. 무엇이 시작의 계기였나요?'
          },
          placeholder: '예: 대학교 2학년 때 동아리 홍보를 맡았는데, 열심히 만든 포스터가 아무 반응이 없었습니다. 옆 동아리 포스터는 같은 내용인데 "공유하고 싶다"는 말이 나왔고, 그때 "무엇을 왜 만드는가"를 모르면 아무리 잘 만들어도 의미 없다는 것을 깨달았습니다.',
          rows: 4
        },
        {
          id: 'q2_2',
          label: 'Q2-2. 그 이후 이 역량을 어떻게 의도적으로 쌓아왔나요?',
          hint: '단계적이고 반복적인 과정 — "그냥 하다 보니 생겼다"가 아닌 의도적인 축적',
          guide: {
            description: '면접관이 읽고 "이 사람은 이 역량을 우연히 갖게 된 게 아니라 의도적으로 키워왔구나"를 느껴야 합니다.',
            diagnosis: '즉석자가진단: "처음과 지금을 비교하면 어떻게 달라졌나요?"라고 물으면 단계별로 설명 가능한가?',
            helpQuestions: [
              '계기 이후 처음으로 취한 행동은?',
              '점점 더 어렵거나 복잡한 수준으로 발전시켜온 과정은?',
              '중간에 실패하거나 막힌 순간이 있었나요? 어떻게 극복했나요?'
            ],
            ifDifficult: '시간 순서대로 "이때 → 이렇게 했고 → 그다음에는"으로 정리해보세요.',
            ifStillDifficult: '규모가 작은 것에서 큰 것으로, 혼자서 팀으로, 이론에서 실전으로 성장한 흐름이 있나요?'
          },
          placeholder: '예: 그 순간 이후 브랜드 분석 블로그를 시작해 매주 하나씩 광고를 뜯어보며 "왜 이 카피를 썼을까"를 분석했습니다. 이후 동아리에서 실제 캠페인을 맡아 A/B 테스트를 설계했고, 마케팅 수업에서는 실제 스타트업 프로젝트에 참여해 데이터를 보며 전략을 수정하는 경험까지 했습니다.',
          rows: 5
        },
        {
          id: 'q2_3',
          label: 'Q2-3. 이 역량이 단 한 번이 아니라 반복적으로 나타나는 패턴이 있나요?',
          hint: '지속성의 증거 — 여러 상황에서 같은 역량이 작동했다는 것을 보여주세요',
          guide: {
            description: '한 번의 경험은 운일 수 있습니다. 여러 맥락에서 같은 역량이 반복적으로 발휘됐다면 그것은 진짜 역량입니다.',
            diagnosis: '즉석자가진단: "다른 상황에서도 이 역량이 발휘된 예가 있나요?"라고 물으면 2가지 이상 즉답 가능한가?',
            helpQuestions: [
              '수업, 동아리, 대외활동, 아르바이트 등 서로 다른 맥락에서 이 역량이 쓰인 적이 있나요?',
              '이 역량이 있어서 자연스럽게 맡게 된 역할이 반복되나요?',
              '이 역량과 관련해 주변에서 자주 요청받거나 의존받는 부분이 있나요?'
            ],
            ifDifficult: '같은 역량이 다른 이름으로 불린 경험들을 떠올려보세요.',
            ifStillDifficult: '"이 역량 덕분에 내가 그 팀에서 맡은 역할"이 반복되는 패턴이 있나요?'
          },
          placeholder: '예: 동아리 홍보, 마케팅 수업 프로젝트, 스타트업 인턴, 개인 블로그까지 맥락은 달랐지만 매번 "타겟의 언어로 메시지를 만드는 역할"을 자연스럽게 맡았습니다. 처음에는 우연이라고 생각했는데, 이 역량이 나의 강점이라는 것을 패턴으로 확인했습니다.',
          rows: 4
        }
      ]
    },
    {
      id: 3,
      title: 'Q3: 이 역량으로 무엇을 해냈는가',
      subtitle: '→ 최종 글 3단락 재료 — 성취·수준·할 수 있는 것',
      questions: [
        {
          id: 'q3_1',
          label: 'Q3-1. 이 역량이 가장 잘 발휘된 경험과 그 결과는 무엇인가요?',
          hint: '수치가 아니어도 됩니다 — 하지만 역량이 어느 수준인지, 역량으로 무엇이 가능한지는 드러나야 합니다',
          guide: {
            description: '결과가 꼭 숫자일 필요는 없습니다. 하지만 면접관이 "이 사람의 역량이 어느 수준인지"를 판단할 수 있는 근거가 있어야 합니다.',
            diagnosis: '즉석자가진단: "그때 역량이 없었다면 그 결과가 가능했을까요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '수치로 표현 가능한 결과가 있나요? (팔로워 수, 달성률, 시간 단축 등)',
              '수치가 없다면 — 이전과 비교해 무엇이 달라졌나요?',
              '그 결과를 보고 누가 어떻게 반응했나요? (인정, 요청, 평가)',
              '이 역량이 없었던 상태와 비교하면 어떻게 다른가요?'
            ],
            ifDifficult: '"역량이 없었다면 이 결과가 어떻게 달라졌을까?"라고 가정하면 역량과 결과의 연결이 보입니다.',
            ifStillDifficult: '수치보다 "타인의 인정"도 충분한 근거입니다. 요청받은 것, 다시 맡겨진 것을 찾아보세요.'
          },
          placeholder: '예: 대학 축제 홍보 TF에서 2주간 30개 콘텐츠를 단독 기획·제작했고, SNS 팔로워 300명 증가(전년 대비 20%)라는 결과를 만들었습니다. 이후 다른 학과 행사에서도 먼저 연락해 작업을 요청받았고, 지도교수님께서 "학부생 중 완성도가 다르다"고 평가하셨습니다.',
          rows: 5
        },
        {
          id: 'q3_2',
          label: 'Q3-2. 그 결과가 역량 없이는 불가능했다는 근거는 무엇인가요?',
          hint: '"덕분에"가 드러나야 합니다 — 역량이 결과를 만들었다는 인과관계',
          guide: {
            description: '역량이 있었기 때문에 그 결과가 가능했다는 인과관계가 명확해야 합니다. "역량 없이도 됐을 것 같다"면 그 역량은 증거가 아닙니다.',
            diagnosis: '즉석자가진단: "역량이 없었다면 어떻게 됐을까요?"라고 물으면 구체적으로 즉답 가능한가?',
            helpQuestions: [
              '이 역량이 없었다면 막혔을 단계는 어디인가요?',
              '역량 덕분에 가능했던 것, 빨라진 것, 달라진 것은?',
              '다른 팀원이나 사람과 비교했을 때 이 역량 때문에 달랐던 부분은?'
            ],
            ifDifficult: '"만약 이 역량이 없는 신입에게 같은 업무를 맡겼다면 어떤 결과가 나왔을까?"라고 생각해보세요.',
            ifStillDifficult: '아주 단순한 인과관계도 좋습니다. "포토샵이 없었다면 콘텐츠 외주에 의존했을 것이고, 속도와 비용이 달라졌을 것"처럼요.'
          },
          placeholder: '예: 포토샵 역량이 없었다면 콘텐츠 수정을 외주에 맡겨야 했고, 트렌드 반응 속도가 3~4일 늦어졌을 것입니다. 즉각 수정이 가능했기 때문에 반응 데이터를 보며 다음 콘텐츠에 바로 반영할 수 있었고, 이것이 팔로워 성장의 핵심 원인이었습니다.',
          rows: 4
        },
        {
          id: 'q3_3',
          label: 'Q3-3. 지금 현재 이 역량으로 무엇까지 할 수 있나요?',
          hint: '수준을 명시하세요 — "잘 합니다"가 아닌 "이것까지는 가능하고, 이것은 아직 보완 중"',
          guide: {
            description: '면접관에게 "이 사람은 현재 이 수준이구나"를 명확히 알려주는 단계입니다. 과장도, 과소평가도 아닌 객관적 수준이어야 합니다.',
            diagnosis: '즉석자가진단: "지금 당장 이 역량으로 어떤 업무를 독립적으로 수행할 수 있나요?"라고 물으면 즉답 가능한가?',
            helpQuestions: [
              '지금 당장 독립적으로 할 수 있는 것은?',
              '아직 지도나 피드백이 필요한 부분은?',
              '이 역량에서 아직 부족한 부분과 보완 계획은?'
            ],
            ifDifficult: '초급/중급/고급으로 구분해보세요. 신입이라면 초급~중급이 정상입니다.',
            ifStillDifficult: '"이 작업은 혼자 할 수 있다, 이 작업은 아직 도움이 필요하다"로 나눠보세요.'
          },
          placeholder: '예: 콘텐츠 기획과 포토샵 제작은 독립적으로 수행 가능한 중급 수준입니다. 광고 데이터 분석은 기초 수준으로 구글 애널리틱스로 트래픽 분석과 간단한 리포트 작성이 가능하지만, 유료 광고 집행 경험은 아직 없어 개인 프로젝트로 실습 중입니다.',
          rows: 4
        }
      ]
    },
    {
      id: 4,
      title: 'Q4: 이 역량이 이 직무에서 어떻게 작동하는가',
      subtitle: '→ 최종 글 4단락 재료 — 직무 키워드 연결 + 왜 그렇게 생각하는가',
      questions: [
        {
          id: 'q4_1',
          label: 'Q4-1. 이 회사 채용공고에서 내 역량과 가장 직접적으로 맞닿는 업무 키워드는?',
          hint: '채용공고를 지금 열어두고 작성하세요 — "기여할 수 있을 것 같아서"가 아닌 구체적 업무명',
          guide: {
            description: '채용공고의 주요업무 항목과 내 역량을 1:1로 연결하는 작업입니다. 연결이 안 되는 역량은 언급할 필요가 없습니다.',
            diagnosis: '즉석자가진단: "그 업무에서 당신의 역량이 어떻게 쓰이나요?"라고 물으면 구체적으로 즉답 가능한가?',
            helpQuestions: [
              '채용공고 주요업무 항목을 꺼내놓고, 내 Q3 경험과 1:1로 연결해보세요',
              '내 역량이 없으면 그 업무의 어느 단계에서 막히나요?',
              '이 회사가 아닌 다른 회사였다면 이 연결이 달라졌을까요?'
            ],
            ifDifficult: '채용공고 주요업무를 하나씩 읽으면서 "이건 내가 해봤다"에 해당하는 것부터 시작하세요.',
            ifStillDifficult: '완벽한 연결보다 "가장 강한 연결 하나"가 "약한 연결 열 개"보다 설득력 있습니다.'
          },
          placeholder: '예: 귀사 채용공고의 "SNS 콘텐츠 기획 및 제작" 업무입니다. Q3에서 서술한 30개 콘텐츠 단독 제작 경험이 이 업무와 직접 연결됩니다. 또한 "채널별 성과 분석" 업무는 구글 애널리틱스 활용 경험으로 연결됩니다.',
          rows: 4
        },
        {
          id: 'q4_2',
          label: 'Q4-2. 왜 그 업무에서 내 역량이 작동할 것이라고 생각하나요?',
          hint: '"할 수 있을 것 같아서"가 아닙니다 — Q2의 과정과 Q3의 성취가 근거가 되어야 합니다',
          guide: {
            description: '이 질문이 4단락에서 가장 중요합니다. "그렇게 생각하는 이유"가 Q2와 Q3의 경험에서 나와야 합니다. 마지막 단락이 1~3단락의 자연스러운 결론처럼 읽혀야 합니다.',
            diagnosis: '즉석자가진단: "왜 그 업무에서 당신이 잘 할 수 있다고 생각하나요?"라고 물으면 Q2·Q3 경험을 근거로 즉답 가능한가?',
            helpQuestions: [
              'Q2에서 쌓아온 과정이 이 업무의 어느 부분을 뒷받침하나요?',
              'Q3에서 만들어낸 결과가 이 업무에서도 재현될 수 있다는 근거는?',
              '이 회사가 아닌 다른 회사였다면 이 기여가 가능했을까요?'
            ],
            ifDifficult: '"Q2-Q3의 경험이 이 업무에서 어떻게 다시 작동할까?"라고 생각해보세요.',
            ifStillDifficult: '"열심히 하겠습니다"가 되지 않으려면, 앞에서 서술한 경험과 성취가 이 업무와 연결되는 이유가 있어야 합니다.'
          },
          placeholder: '예: Q2에서 서술한 것처럼 저는 단순히 콘텐츠를 만드는 것이 아니라 반응 데이터를 보며 다음 콘텐츠를 개선하는 사이클을 익혀왔습니다. Q3에서 이 방식으로 팔로워를 20% 성장시킨 경험이 있기 때문에, 귀사의 SNS 운영 업무에서도 같은 방식이 작동할 것이라고 생각합니다.',
          rows: 5
        },
        {
          id: 'q4_3',
          label: 'Q4-3. 입사 후 3개월/6개월 단계적 목표는?',
          hint: '신입 현실에 맞는 수준 — "빨리 성장하겠습니다"가 아닌 각 단계에서 구체적으로 무엇을 할 수 있는지',
          guide: {
            description: '성장 목표가 현실적이고 구체적이어야 신뢰를 줍니다. Q3-3에서 파악한 현재 수준을 출발점으로 설정하세요.',
            diagnosis: '즉석자가진단: "그게 신입 6개월 안에 가능한가요?"라는 질문에 납득할 수 있는 근거로 즉답 가능한가?',
            helpQuestions: [
              '3개월: 현재 Q3-3 수준에서 어떤 업무를 독립적으로 수행할 수 있는가?',
              '6개월: 팀에 실질적으로 기여하는 구체적 성과는?',
              '각 목표가 현재 역량 수준에서 실현 가능한가?'
            ],
            ifDifficult: '신입사원의 일반적인 성장 단계를 참고하세요: 적응 → 실무 참여 → 독립적 수행',
            ifStillDifficult: 'Q3-3에서 쓴 현재 수준을 출발점으로 "3개월 뒤에 이 수준이 되겠다"로 연결하면 자연스럽습니다.'
          },
          placeholder: '예: 3개월: SNS 콘텐츠 기획·제작 독립 수행, 채널별 성과 리포트 작성. 6개월: 소규모 캠페인 전체 기획부터 성과 분석까지 독립적으로 수행하고, 광고 집행 경험을 쌓아 퍼포먼스 마케팅 업무 참여.',
          rows: 4
        }
      ]
    }
  ];

  const round2Questions = {
    1: [
      {
        id: 'q2d_1_1',
        label: 'Q1 심화-1. 이 직무가 요구하는 역량을 어떻게 리서치로 확인했나요?',
        hint: '현직자·채용공고·시니어 JD 비교 — "중요한 것 같아서"가 아닌 근거',
        guide: {
          description: '이 직무에서 "실제로 중요한 역량"은 채용공고에 다 나와 있지 않습니다. 현직자 인터뷰나 시니어 채용공고를 봐야 진짜 핵심이 보입니다.',
          diagnosis: '즉석자가진단: "어떻게 그 역량이 이 직무에서 중요하다고 알게 됐나요?"라고 물으면 리서치 결과로 즉답 가능한가?',
          helpQuestions: [
            '현직자 인터뷰에서 "이게 없으면 힘들더라"고 말한 것은?',
            '신입 채용공고와 시니어 채용공고를 비교하면 어떤 역량이 공통으로 등장하나요?',
            '"이 역량이 없는 신입"과 "있는 신입"의 업무 차이를 현직자가 어떻게 설명했나요?'
          ],
          ifDifficult: '유튜브·브런치에서 "[직무명] 현직자 인터뷰"를 3편 보고, 공통으로 강조하는 역량을 정리해보세요.',
          ifStillDifficult: '최소한 이 회사 시니어 채용공고를 찾아보세요. 시니어에게 요구하는 것이 곧 이 직무의 핵심입니다.'
        },
        placeholder: '예: 현직 마케터 인터뷰 5편을 보니 공통적으로 "데이터 해석보다 타겟 언어 변환 능력이 더 중요하다"고 했습니다. 채용공고의 "자격요건"보다 "우대사항"에서 오히려 진짜 핵심 역량이 보였습니다.',
        rows: 4
      },
      {
        id: 'q2d_1_2',
        label: 'Q1 심화-2. 이 직무와 비슷해 보이는 다른 직무와 비교해보세요. 왜 하필 이 역량인가요?',
        hint: '비교를 통해 "이 역량을 왜 이 직무에서 써야 하는지"가 선명해집니다',
        guide: {
          description: '비슷한 직무와 비교할 때 "이 역량이 이 직무에서만 중요한 이유"가 드러납니다.',
          diagnosis: '즉석자가진단: "기획 직무나 영업 직무에서도 이 역량이 똑같이 중요하지 않나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '비슷한 직무 2개를 골라 각각의 핵심 역량을 비교해보세요',
            '이 직무에서만 이 역량이 특별히 중요한 이유는?',
            '이 역량 없이 다른 방법으로 대체 가능한가요? 가능하다면 왜 이 역량인가요?'
          ],
          ifDifficult: '각 직무의 채용공고를 나란히 놓고 비교해보세요.',
          ifStillDifficult: '"이 역량이 이 직무에서 유독 중요한 상황"을 하나 구체적으로 떠올려보세요.'
        },
        placeholder: '예: 기획 직무는 전략 설계, 영업은 관계 형성이 핵심이지만 마케팅은 타겟 언어 변환이 핵심입니다. 같은 아이디어라도 누가 어떤 언어로 전달하느냐에 따라 반응이 달라지는 직무이기 때문입니다.',
        rows: 4
      },
      {
        id: 'q2d_1_3',
        label: 'Q1 심화-3. 이 회사가 같은 역량을 다른 회사보다 더 중요하게 여기는 이유가 있나요?',
        hint: '이 회사의 비즈니스 모델·문화·현재 과제에서 이 역량이 특히 필요한 이유',
        guide: {
          description: '같은 마케터를 뽑더라도 스타트업과 대기업이 원하는 역량의 비중은 다릅니다. 이 회사가 "지금" 특히 이 역량을 원하는 이유가 있어야 합니다.',
          diagnosis: '즉석자가진단: "다른 회사에도 똑같이 쓸 수 있는 내용 아닌가요?"라고 물으면 이 회사에만 해당하는 내용으로 즉답 가능한가?',
          helpQuestions: [
            '이 회사의 최근 방향성이나 사업 특성과 이 역량이 어떻게 연결되나요?',
            '회사 인재상이나 핵심가치에서 이 역량과 직결되는 부분은?',
            '이 회사 현직자 후기에서 이 역량이 특히 필요하다고 언급된 내용은?'
          ],
          ifDifficult: '회사 홈페이지 뉴스룸에서 최근 1년 보도자료를 읽으면 힌트가 있습니다.',
          ifStillDifficult: '"업계 1위", "빠르게 성장 중" 같은 표현은 차별화가 아닙니다. 이 회사에만 해당하는 것을 찾으세요.'
        },
        placeholder: '예: 이 회사는 최근 MZ세대 신규 고객 확보를 과제로 삼고 있고, 기존 팀에 20~30대가 적습니다. 타겟 언어를 실제로 쓰는 세대로서의 역량이 다른 회사보다 이 회사에서 더 직접적인 기여가 됩니다.',
        rows: 4
      }
    ],
    2: [
      {
        id: 'q2d_2_1',
        label: 'Q2 심화-1. 역량을 쌓는 과정에서 가장 어려웠던 순간과 어떻게 극복했나요?',
        hint: '극복 과정이 역량의 깊이를 보여줍니다 — 어려움 없이 얻은 역량은 설득력이 약합니다',
        guide: {
          description: '어려움을 극복한 경험이 있다는 것은 그 역량을 진지하게 쌓아왔다는 증거입니다. 결과보다 과정의 진실성이 중요합니다.',
          diagnosis: '즉석자가진단: "역량을 쌓는 과정이 쉬웠나요?"라고 물으면 솔직하게 어려웠던 부분을 설명할 수 있는가?',
          helpQuestions: [
            '실패했거나 포기하고 싶었던 순간이 있었나요?',
            '어떤 방법이 효과가 없어서 방법을 바꾼 경험이 있나요?',
            '극복 과정에서 배운 것이 지금의 역량 수준에 어떻게 기여했나요?'
          ],
          ifDifficult: '처음 시작할 때와 지금의 차이를 떠올리면 중간에 넘어선 장벽이 보입니다.',
          ifStillDifficult: '아주 작은 어려움도 괜찮습니다. 중요한 건 어떻게 다음 단계로 나아갔는가입니다.'
        },
        placeholder: '예: 처음에는 콘텐츠를 많이 만들면 반응이 올 것이라고 생각했습니다. 30개를 올렸는데 반응이 없었고, 이때 "수량이 아닌 타겟 언어의 문제"임을 깨달았습니다. 이후 매번 콘텐츠마다 "이걸 누가 공유하고 싶을까?"를 먼저 물어보는 습관을 만들었습니다.',
        rows: 5
      },
      {
        id: 'q2d_2_2',
        label: 'Q2 심화-2. 이 역량을 위해 포기하거나 선택한 것이 있나요?',
        hint: '"기회비용"이 있다는 것은 이 역량에 진심이었다는 증거입니다',
        guide: {
          description: '어떤 역량에 의도적으로 투자했다는 것은 그냥 "하다 보니 생긴 것"과 다릅니다. 선택의 흔적이 역량의 진정성을 보여줍니다.',
          diagnosis: '즉석자가진단: "이 역량을 쌓기 위해 다른 무언가를 포기하거나 선택한 순간이 있나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '이 역량에 시간을 쓰기 위해 다른 활동을 줄이거나 포기한 것이 있나요?',
            '이 역량과 관련 없는 활동보다 관련 있는 활동을 우선한 선택이 있나요?',
            '이 역량을 쌓기 위해 의도적으로 어떤 환경에 자신을 놓았나요?'
          ],
          ifDifficult: '거창한 선택이 아니어도 됩니다. 매일 30분 블로그 운영, 강의 수강 등 작은 선택도 충분합니다.',
          ifStillDifficult: '"왜 그 활동을 선택했는가"에서 이 역량과의 연결이 보입니다.'
        },
        placeholder: '예: 학점 관리 대신 실제 캠페인 경험을 위해 동아리 활동에 더 많은 시간을 썼습니다. 이론 수업보다 실전에서 반응 데이터를 보며 배우는 게 이 역량에 더 효과적이라고 판단했습니다.',
        rows: 4
      },
      {
        id: 'q2d_2_3',
        label: 'Q2 심화-3. 지금 이 순간에도 이 역량을 쌓고 있나요? 현재 진행 중인 것은?',
        hint: '역량 쌓기가 "완료"가 아닌 "진행 중"임을 보여주세요',
        guide: {
          description: '입사 지원 직전에 급하게 쌓은 역량과, 꾸준히 쌓아온 역량은 다릅니다. 현재도 계속되고 있다는 것이 진정성의 증거입니다.',
          diagnosis: '즉석자가진단: "지금 이 역량을 어떻게 발전시키고 있나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            '지금 진행 중인 학습, 프로젝트, 활동은?',
            '가장 최근에 이 역량을 쓴 것은 언제인가요?',
            '입사 전까지 추가로 쌓으려는 것은?'
          ],
          ifDifficult: '아주 작은 것도 좋습니다. 매일 관련 콘텐츠를 읽는 것도 진행 중인 활동입니다.',
          ifStillDifficult: '오늘부터라도 시작할 수 있는 것을 실행하고, 그것을 답변에 포함하세요.'
        },
        placeholder: '예: 현재 개인 브랜드 분석 블로그를 주 1회 발행하고 있고(현재 62편), 구글 애널리틱스 자격증을 이달 내 취득 예정입니다. 또한 소액 광고비로 개인 쇼핑몰 광고를 직접 집행하며 유료 광고 경험을 쌓고 있습니다.',
        rows: 4
      }
    ],
    3: [
      {
        id: 'q2d_3_1',
        label: 'Q3 심화-1. 역량이 작동했다는 가장 강한 외부 인정 증거는 무엇인가요?',
        hint: '스스로의 평가가 아닌 — 타인이 인정한 구체적 장면',
        guide: {
          description: '자기 평가는 주관적입니다. 타인이 인정했다는 것은 역량이 실제로 작동했다는 객관적 증거입니다.',
          diagnosis: '즉석자가진단: "당신 말고 다른 누가 그 역량을 인정했나요?"라고 물으면 구체적인 사람과 말을 댈 수 있는가?',
          helpQuestions: [
            '다시 요청받거나 연락이 온 경험이 있나요?',
            '교수님·팀장님·동료의 구체적인 한 마디는?',
            '공식적인 인정(수상, 선발, 추천)이 있나요?'
          ],
          ifDifficult: '"부탁받은 것"도 인정입니다. 누군가 도움을 요청해온 경험을 떠올려보세요.',
          ifStillDifficult: '"행동으로 보여준 신뢰"도 인정입니다. 먼저 연락해온 것, 같이 하자고 한 것도 포함됩니다.'
        },
        placeholder: '예: 지도교수님께서 "학부생 수준을 넘어선 완성도"라고 했고, 다른 학과 행사 담당자가 직접 연락해 작업을 요청했습니다. 또한 팀원들이 "다음에도 같이 하고 싶다"며 다음 행사에 먼저 합류를 제안했습니다.',
        rows: 4
      },
      {
        id: 'q2d_3_2',
        label: 'Q3 심화-2. 이 역량의 현재 한계는 어디까지이고, 어떻게 보완하고 있나요?',
        hint: '모든 역량을 다 갖췄다고 하는 것보다 한계를 솔직히 인정하고 보완 계획을 제시하는 것이 더 설득력 있습니다',
        guide: {
          description: '한계를 아는 사람이 역량을 제대로 아는 사람입니다. 솔직한 자기 평가가 오히려 신뢰를 높입니다.',
          diagnosis: '즉석자가진단: "이 역량에서 아직 부족한 부분은 무엇인가요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            'Q1-2에서 파악한 필요 역량 중 아직 갭이 있는 부분은?',
            '지금 실행 중인 보완 활동은? (강의, 프로젝트, 자격증 등)',
            '언제까지, 어떤 방법으로 보완할 것인가?'
          ],
          ifDifficult: '필요 역량 목록을 꺼내놓고 "충분함 / 기초 수준 / 부족"으로 분류해보세요.',
          ifStillDifficult: '"열심히 배우겠습니다"는 계획이 아닙니다. 구체적 방법과 기간이 있어야 합니다.'
        },
        placeholder: '예: 콘텐츠 기획·제작은 중급, 성과 분석은 초급입니다. 유료 광고 집행 경험이 없는 것이 가장 큰 갭으로, 현재 개인 쇼핑몰에 소액 광고를 직접 집행하며 실전 경험을 쌓고 있고 다음 달부터 데이터를 정리할 예정입니다.',
        rows: 4
      },
      {
        id: 'q2d_3_3',
        label: 'Q3 심화-3. 이 역량으로 만든 결과물 중 지금 바로 보여줄 수 있는 것은?',
        hint: '포트폴리오, 링크, 작업물 — "있습니다"가 아닌 "이것입니다"',
        guide: {
          description: '역량의 증거를 즉시 제시할 수 있다는 것은 주장이 아닌 사실이라는 뜻입니다.',
          diagnosis: '즉석자가진단: "지금 바로 보여줄 수 있나요?"라고 물으면 URL이나 파일을 즉시 제시할 수 있는가?',
          helpQuestions: [
            'URL로 접근 가능한 온라인 자료는?',
            '포트폴리오나 작업물이 정리되어 있나요?',
            '정리가 안 되어 있다면 어떻게 보완할 예정인가요?'
          ],
          ifDifficult: '지금 당장 준비할 수 있는 것부터 시작하세요. 오늘 노션에 정리해도 됩니다.',
          ifStillDifficult: 'GitHub, 노션, 구글 드라이브 등을 활용해 링크로 제시할 수 있게 준비하세요.'
        },
        placeholder: '예: 포트폴리오 사이트(www.example.com)에 20개 프로젝트가 정리되어 있습니다. 각 프로젝트마다 "목표·과정·결과·배운 것"으로 구성했고, 브랜드 분석 블로그(blog.example.com)는 현재 62편이 발행되어 있습니다.',
        rows: 4
      }
    ],
    4: [
      {
        id: 'q2d_4_1',
        label: 'Q4 심화-1. Q2의 쌓아온 과정이 이 회사 업무의 어느 부분과 연결되나요?',
        hint: 'Q2 과정 → 이 회사 채용공고 업무 키워드와 1:1 연결',
        guide: {
          description: 'Q2에서 서술한 역량 쌓기 과정이 이 회사 업무에서 어떻게 재현되는지를 보여주면 설득력이 높아집니다.',
          diagnosis: '즉석자가진단: "Q2에서 쌓아온 것이 이 회사 어떤 업무에서 어떻게 작동하나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            'Q2-2에서 쌓아온 단계적 과정이 이 회사 업무 중 어느 것과 겹치나요?',
            'Q2-3에서 서술한 반복 패턴이 이 회사에서도 발휘될 수 있는 업무는?',
            '이 연결이 다른 회사에서는 이 정도로 직접적이지 않은 이유는?'
          ],
          ifDifficult: 'Q2 답변과 이 회사 채용공고 주요업무를 나란히 놓고 겹치는 것을 찾아보세요.',
          ifStillDifficult: '가장 직접적으로 연결되는 하나만 찾아도 충분합니다.'
        },
        placeholder: '예: Q2에서 서술한 "데이터 보며 다음 콘텐츠 개선하는 사이클"이 귀사 채용공고의 "채널별 성과 분석 후 전략 수정" 업무와 정확히 겹칩니다. 같은 방식을 더 큰 규모에서 수행하는 것이 이 업무입니다.',
        rows: 4
      },
      {
        id: 'q2d_4_2',
        label: 'Q4 심화-2. Q3의 성취가 이 회사 업무에서도 재현될 수 있다는 근거는?',
        hint: '"그 경험이 여기서도 작동한다" — 이 연결이 4단락의 핵심입니다',
        guide: {
          description: 'Q3에서 서술한 성취가 이 회사 업무에서도 같은 방식으로 나올 수 있다는 논리적 근거가 있어야 합니다.',
          diagnosis: '즉석자가진단: "Q3 경험이 이 회사 업무에서도 재현될 수 있다고 왜 생각하나요?"라고 물으면 즉답 가능한가?',
          helpQuestions: [
            'Q3의 성취를 만든 핵심 요인이 이 회사 업무에서도 동일하게 작동하는가?',
            '이 회사 업무의 성공 조건이 Q3에서 발휘한 역량과 일치하는가?',
            '이 회사가 아닌 다른 회사였다면 이 연결이 이 정도로 직접적이었을까?'
          ],
          ifDifficult: '"Q3에서 성취한 방법"과 "이 회사 업무를 잘하는 방법"이 겹치는 지점을 찾아보세요.',
          ifStillDifficult: '"Q3 경험에서 배운 것"이 이 업무에서 어떻게 쓰일지 구체적으로 상상해보세요.'
        },
        placeholder: '예: Q3에서 타겟 데이터를 기반으로 콘텐츠를 개선했더니 팔로워가 20% 증가했습니다. 귀사의 SNS 업무도 타겟 분석 → 콘텐츠 제작 → 성과 측정 → 개선의 사이클이기 때문에 같은 방식이 더 큰 규모에서 작동할 수 있다고 생각합니다.',
        rows: 4
      },
      {
        id: 'q2d_4_3',
        label: 'Q4 심화-3. 이 회사가 아닌 다른 회사였다면 이 기여가 이 정도로 직접적이었을까요?',
        hint: '"왜 하필 이 회사인가"에 대한 역량 관점의 답 — 이 회사에서 이 역량이 더 잘 작동하는 이유',
        guide: {
          description: '이 질문에 "아니요"라고 답할 수 있어야 합니다. 이 회사이기 때문에 이 역량이 더 잘 작동한다는 이유가 있어야 합니다.',
          diagnosis: '즉석자가진단: "다른 회사에도 이 역량이 필요하지 않나요?"라고 물으면 이 회사만의 이유로 즉답 가능한가?',
          helpQuestions: [
            '이 회사의 어떤 특징이 이 역량을 특히 가치 있게 만드나요?',
            '이 회사의 현재 과제나 방향성이 이 역량과 어떻게 연결되나요?',
            '경쟁사에서 같은 역량을 갖고 지원했다면 기여 방식이 어떻게 달라졌을까요?'
          ],
          ifDifficult: '이 회사의 최근 방향성이나 과제를 Q1-3에서 파악한 내용과 연결해보세요.',
          ifStillDifficult: '최소한 "이 회사에서 이 역량이 특히 필요한 이유" 하나만 찾아도 충분합니다.'
        },
        placeholder: '예: 다른 대형 마케팅 대행사에서는 이 역량이 여러 팀 중 하나의 부분이 됩니다. 하지만 귀사처럼 내부 팀이 직접 전략부터 실행까지 담당하는 구조에서는 이 역량이 더 핵심적으로 작동합니다. 이것이 귀사를 선택한 직접적인 이유입니다.',
        rows: 4
      }
    ]
  };

  const round3Questions = [
    {
      id: 'connect_para1',
      label: '연결 질문 1 — 1단락: 역량 선언',
      hint: 'Q1에서 파악한 직무 요구 역량 + Q2·Q3에서 증명한 보유 역량을 연결해, "나는 이 역량을 보유하고 있다"는 선언문을 완성하세요. 면접관이 첫 단락만 읽어도 "이 사람이 무슨 역량을 말하려는구나"를 바로 알 수 있어야 합니다.',
      placeholder: '예: 이 직무에서 가장 중요한 것은 타겟의 언어로 메시지를 만드는 콘텐츠 기획력입니다. 저는 이 역량을 2년간 반복된 경험으로 쌓아왔고, 30개 콘텐츠 단독 제작·팔로워 300명 성장이라는 결과로 증명했습니다.',
      rows: 5,
      referenceSteps: [1, 2, 3],
      referenceQuestions: ['q1_2', 'q1_3', 'q3_3']
    },
    {
      id: 'connect_para2',
      label: '연결 질문 2 — 2단락: 계기와 쌓아온 과정',
      hint: 'Q2-1(계기) + Q2-2(의도적 과정) + Q2-3(반복 패턴)을 하나의 서사로 연결하세요. 면접관이 "이 사람은 이 역량을 우연히 갖게 된 게 아니라 의도적으로 키워왔구나"를 느껴야 합니다.',
      placeholder: '예: 이 역량의 시작은 동아리 홍보 포스터가 아무 반응이 없었던 순간이었습니다. 그 이후 브랜드 분석 블로그를 시작해 매주 하나씩 광고를 분석했고, 실제 캠페인 경험과 데이터 기반 개선까지 단계적으로 쌓아왔습니다. 지금도 블로그를 발행하며 계속 키우고 있습니다.',
      rows: 5,
      referenceSteps: [2],
      referenceQuestions: ['q2_1', 'q2_2', 'q2_3']
    },
    {
      id: 'connect_para3',
      label: '연결 질문 3 — 3단락: 이 역량으로 해낸 것',
      hint: 'Q3-1(성취) + Q3-2(인과관계) + Q3-3(현재 수준)을 연결해, 역량이 실제로 작동했다는 증거와 지금 이 역량으로 무엇까지 할 수 있는지를 보여주세요. 수치가 없어도 되지만, 역량의 수준이 드러나야 합니다.',
      placeholder: '예: 이 역량이 가장 잘 드러난 것은 2주간 30개 콘텐츠를 단독 기획·제작해 팔로워를 300명 늘린 경험입니다. 포토샵 없이는 불가능한 속도였고, 덕분에 다른 행사에서도 연락이 왔습니다. 현재 콘텐츠 기획·제작은 독립 수행 가능한 중급, 데이터 분석은 기초 수준입니다.',
      rows: 5,
      referenceSteps: [3],
      referenceQuestions: ['q3_1', 'q3_2', 'q3_3']
    },
    {
      id: 'connect_para4',
      label: '연결 질문 4 — 4단락: 직무 키워드 연결 + 왜 그렇게 생각하는가',
      hint: 'Q4-1(업무 키워드) + Q4-2(왜 작동하는가)를 연결해 마무리하세요. "기여할 수 있을 것 같다"가 아니라, Q2·Q3의 경험과 성취가 이 업무에서도 재현된다는 논리적 결론이어야 합니다. 이 단락이 1~3단락의 자연스러운 결론처럼 읽혀야 합니다.',
      placeholder: '예: 귀사 채용공고의 "SNS 콘텐츠 기획·제작"과 "성과 분석 후 전략 수정" 업무가 제 역량과 가장 직접적으로 연결됩니다. 앞서 서술한 것처럼 저는 타겟 분석 → 콘텐츠 제작 → 반응 데이터 기반 개선의 사이클을 이미 경험했습니다. 이 방식이 귀사 규모에서도 작동할 수 있다고 생각하기 때문에 지원했습니다.',
      rows: 5,
      referenceSteps: [4],
      referenceQuestions: ['q4_1', 'q4_2']
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

    // 1단락: 역량 선언
    if (answers.connect_para1) parts.push(answers.connect_para1);
    else {
      if (answers.q1_2) parts.push(answers.q1_2);
      if (answers.q1_3) parts.push(answers.q1_3);
    }

    // 2단락: 계기와 쌓아온 과정
    if (answers.connect_para2) parts.push('\n' + answers.connect_para2);
    else {
      if (answers.q2_1) parts.push('\n' + answers.q2_1);
      if (answers.q2_2) parts.push(answers.q2_2);
      if (answers.q2_3) parts.push(answers.q2_3);
    }

    // 3단락: 역량으로 해낸 것
    if (answers.connect_para3) parts.push('\n' + answers.connect_para3);
    else {
      if (answers.q3_1) parts.push('\n' + answers.q3_1);
      if (answers.q3_2) parts.push(answers.q3_2);
      if (answers.q3_3) parts.push(answers.q3_3);
    }

    // 4단락: 직무 키워드 연결
    if (answers.connect_para4) parts.push('\n' + answers.connect_para4);
    else {
      if (answers.q4_1) parts.push('\n' + answers.q4_1);
      if (answers.q4_2) parts.push(answers.q4_2);
    }

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
    return `📋 원본 답변 모음\n\n[기본 정보]\n산업: ${basicInfo.industry || '-'}\n직무: ${basicInfo.position || '-'}\n회사: ${basicInfo.company || '-'}\n\n[Q1: 이 직무에서 무엇이 요구되는가]\nQ1-1 핵심 업무 3가지: ${answers.q1_1 || '-'}\nQ1-2 잘하는 사람을 가르는 핵심 역량: ${answers.q1_2 || '-'}\nQ1-3 내가 보유한 역량: ${answers.q1_3 || '-'}\n\n[Q2: 이 역량을 어떻게 갖게 됐고 어떻게 쌓아왔는가]\nQ2-1 계기: ${answers.q2_1 || '-'}\nQ2-2 의도적 과정: ${answers.q2_2 || '-'}\nQ2-3 반복 패턴: ${answers.q2_3 || '-'}\n\n[Q3: 이 역량으로 무엇을 해냈는가]\nQ3-1 성취와 결과: ${answers.q3_1 || '-'}\nQ3-2 역량의 인과관계: ${answers.q3_2 || '-'}\nQ3-3 현재 수준: ${answers.q3_3 || '-'}\n\n[Q4: 이 역량이 이 직무에서 어떻게 작동하는가]\nQ4-1 직무 키워드 연결: ${answers.q4_1 || '-'}\nQ4-2 왜 그렇게 생각하는가: ${answers.q4_2 || '-'}\nQ4-3 단계적 성장 목표: ${answers.q4_3 || '-'}\n\n[3라운드 연결 질문]\n1단락(역량 선언): ${answers.connect_para1 || '-'}\n2단락(계기·과정): ${answers.connect_para2 || '-'}\n3단락(성취·수준): ${answers.connect_para3 || '-'}\n4단락(직무 연결): ${answers.connect_para4 || '-'}`;
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

  // ── 인트로 화면 ────────────────────────────────────────────────────────────
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
                  <h3 className="font-bold text-gray-800 mb-2">1라운드: 4개 핵심 질문 기본 작성</h3>
                  <p className="text-sm text-gray-700">Q1(직무 요구) → Q2(계기·과정) → Q3(성취·수준) → Q4(직무 연결) — 최종 글의 4단락 재료를 모읍니다</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-500">
                  <h3 className="font-bold text-gray-800 mb-2">2라운드: 약한 부분 심화</h3>
                  <p className="text-sm text-gray-700">부족한 Q 선택 → 새로운 각도의 심화 질문으로 구체화 (역량 리서치 강화 · 과정의 진실성 · 외부 인정 근거 등)</p>
                </div>
                <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                  <h3 className="font-bold text-gray-800 mb-2">3라운드: 4단락으로 완성</h3>
                  <p className="text-sm text-gray-700">4개 연결 질문으로 최종 텍스트를 완성합니다 — 역량 선언 · 계기와 과정 · 성취와 수준 · 직무 키워드 연결</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">핵심 원칙</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>역량 선언:</strong> "있습니다"가 아닌 — Q2·Q3 경험으로 증명 가능한 역량만 선언하세요</li>
                <li><strong>과정의 진실성:</strong> "하다 보니 생겼다"가 아닌 — 의도적으로 쌓아온 흔적이 있어야 합니다</li>
                <li><strong>성취 근거:</strong> 수치가 아니어도 됩니다 — 하지만 역량이 어느 수준인지, 무엇을 할 수 있는지는 드러나야 합니다</li>
                <li><strong>연결의 논리:</strong> "기여할 수 있을 것 같다"가 아닌 — Q2·Q3가 Q4의 이유가 되는 인과 흐름이어야 합니다</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-300">
                <p className="text-sm font-semibold text-gray-800 mb-2">💡 즉석자가진단이란?</p>
                <p className="text-sm text-gray-700">
                  면접관이 <strong>"왜 그 역량이 이 직무에서 작동한다고 생각하나요?"</strong>라고 물었을 때, Q2(과정)와 Q3(성취)를 근거로 3초 안에 즉답 가능한지 확인하는 것입니다. 통과하지 못하는 답변은 더 구체화가 필요합니다.
                </p>
              </div>
            </div>

            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-red-800 mb-2">⚠️ 반드시 확인</h3>
              <p className="text-sm text-red-700">
                작성하는 내용은 자동으로 저장되지 않으며 새로고침 버튼을 누르면 그동안 작성했던 내용은 사라집니다. 내용 작성 후 마지막 페이지에서 반드시 워드 파일(.doc)로 다운로드 하여 작성한 내용을 보관하세요.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-800 text-center">
                  © 2026 CareerEngineer All Rights Reserved.
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

  // ── 평가 화면 (라운드 선택) ──────────────────────────────────────────────
  if (currentPhase === 'evaluation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              1라운드 완료! 🎉
            </h2>
            <p className="text-center text-gray-600 mb-4">
              답변이 얕거나 더 구체화가 필요한 STEP을 선택하여 2라운드에서 심화 질문에 답변하세요
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 text-sm text-amber-900 rounded">
              <p className="font-semibold mb-1">💡 선택 기준</p>
              <p>답변을 다시 읽었을 때 면접관이 <strong>"더 구체적으로 말해줄 수 있어요?"</strong>라고 물을 것 같은 STEP을 선택하세요.</p>
              <p className="mt-1 text-amber-700">특히 즉석자가진단을 통과하기 어려웠던 STEP을 우선 선택하세요.</p>
            </div>

            <div className="space-y-4 mb-8">
              {round1Steps.slice(1).map(step => {
                const stepId = step.id;
                const isSelected = selectedSteps.includes(stepId);

                return (
                  <div
                    key={stepId}
                    className={`border-2 rounded-lg p-5 transition-all ${isSelected
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
                        className={`ml-4 px-4 py-2 rounded-lg font-semibold transition-colors ${isSelected
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
              © 2026 CareerEngineer All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── 완성 화면 ──────────────────────────────────────────────────────────────
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

              {/* 첫 문장 가이드 */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 rounded">
                <p className="text-sm font-bold text-amber-900 mb-2">💡 4단락 구조 — 최종 글의 뼈대</p>
                <p className="text-sm text-amber-800 mb-1"><strong>1단락</strong> [역량 선언] → 이 직무에서 요구하는 역량 + 내가 보유하고 있다는 선언</p>
                <p className="text-sm text-amber-800 mb-1"><strong>2단락</strong> [계기·과정] → 이 역량을 갖게 된 계기 + 의도적으로 쌓아온 과정 + 반복 패턴</p>
                <p className="text-sm text-amber-800 mb-1"><strong>3단락</strong> [성취·수준] → 역량이 작동했다는 구체적 성취 + 현재 무엇까지 할 수 있는가</p>
                <p className="text-sm text-amber-800 mb-1"><strong>4단락</strong> [직무 연결] → 이 직무의 업무 키워드 + 왜 내 역량이 그 업무에서 작동하는가 (Q2·Q3가 근거)</p>
                <p className="text-xs text-amber-700 mt-2 border-t border-amber-200 pt-2">⚠️ 피해야 할 표현: "기여할 수 있을 것 같다"로 마무리 / 경험 없이 역량만 선언 / 4단락이 1~3단락의 결론이 아닌 새로운 주장</p>
              </div>

              {/* 전체 흐름 가이드 + 실제 답변 참조 */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-purple-900 mb-3">📋 내 답변 활용 가이드 — 단락별 재료</p>
                <p className="text-xs text-purple-700 mb-4">3라운드 연결 질문 답변을 우선 사용하세요. 없으면 아래 Q 답변에서 핵심만 골라 연결하세요.</p>

                {/* 1단락 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">1단락 — 역량 선언 (Q1+Q2+Q3에서 재료)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결1이 있으면 우선 사용</p>
                  {answers.connect_para1 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결1 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_para1.substring(0, 150)}{answers.connect_para1.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">직무 핵심 역량 (Q1-2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_2.substring(0, 100)}{answers.q1_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q1_3 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">내가 보유한 역량 (Q1-3)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q1_3.substring(0, 100)}{answers.q1_3.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "이 직무에서 가장 중요한 [역량]을 저는 보유하고 있습니다..."</p>
                </div>

                {/* 2단락 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-pink-700 mb-2">2단락 — 계기와 쌓아온 과정 (Q2에서 재료)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결2가 있으면 우선 사용. 없으면 Q2-1~Q2-3에서 핵심 하나씩</p>
                  {answers.connect_para2 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결2 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_para2.substring(0, 150)}{answers.connect_para2.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q2_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">역량 갖게 된 계기 (Q2-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q2_1.substring(0, 100)}{answers.q2_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q2_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">의도적으로 쌓아온 과정 (Q2-2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q2_2.substring(0, 100)}{answers.q2_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "이 역량의 시작은 [계기]였고, 그 이후 [과정]을 통해 의도적으로 키워왔습니다..."</p>
                </div>

                {/* 3단락 */}
                <div className="bg-white border-l-4 border-purple-500 rounded p-3 mb-3">
                  <p className="text-xs font-bold text-purple-700 mb-2">3단락 — 성취와 수준 (Q3에서 재료)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결3이 있으면 우선 사용. 수치 없어도 되지만 수준이 드러나야 함</p>
                  {answers.connect_para3 && (
                    <div className="bg-purple-50 rounded p-2 mb-2">
                      <p className="text-xs text-purple-600 font-semibold">✅ 연결3 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_para3.substring(0, 150)}{answers.connect_para3.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q3_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">역량으로 해낸 것 (Q3-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q3_1.substring(0, 100)}{answers.q3_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q3_3 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">현재 역량 수준 (Q3-3)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q3_3.substring(0, 100)}{answers.q3_3.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-purple-600 mt-2 italic">연결 문장 예시: "이 역량이 가장 잘 드러난 것은 [경험]이었고, 현재는 [수준]까지 가능합니다..."</p>
                </div>

                {/* 4단락 */}
                <div className="bg-white border-l-4 border-pink-500 rounded p-3 mb-2">
                  <p className="text-xs font-bold text-pink-700 mb-2">4단락 — 직무 키워드 연결 (Q4에서 재료, Q2·Q3가 근거)</p>
                  <p className="text-xs text-gray-500 mb-1">👉 3라운드 연결4가 있으면 우선 사용. "기여할 수 있을 것 같다"가 아닌 Q2·Q3가 이유여야 함</p>
                  {answers.connect_para4 && (
                    <div className="bg-pink-50 rounded p-2 mb-2">
                      <p className="text-xs text-pink-600 font-semibold">✅ 연결4 (권장)</p>
                      <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">{answers.connect_para4.substring(0, 150)}{answers.connect_para4.length > 150 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q4_1 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">직무 키워드 연결 (Q4-1)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q4_1.substring(0, 100)}{answers.q4_1.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  {answers.q4_2 && (
                    <div className="bg-gray-50 rounded p-2 mb-1">
                      <p className="text-xs text-gray-500 font-semibold">왜 그렇게 생각하는가 (Q4-2)</p>
                      <p className="text-xs text-gray-700 mt-1">{answers.q4_2.substring(0, 100)}{answers.q4_2.length > 100 ? '...' : ''}</p>
                    </div>
                  )}
                  <p className="text-xs text-pink-600 mt-2 italic">연결 문장 예시: "앞서 서술한 과정과 성취를 바탕으로, 귀사의 [업무 키워드]에서 이 역량이 이렇게 작동할 것이라고 생각합니다..."</p>
                </div>
              </div>

              {/* 수정 전 최종 확인 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-bold text-blue-900 mb-3">✅ 수정 전 최종 확인 — 통과 못 하면 해당 질문으로 돌아가세요</p>
                <div className="space-y-3">

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">① 1단락: 선언한 역량을 Q2·Q3에서 실제로 증명하고 있는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-purple-600 font-semibold">Q1-3(보유 역량 선언)</span>을 Q2·Q3의 경험과 연결해 다시 쓰세요</p>
                    {answers.connect_para1 && <p className="text-xs text-gray-600 mt-1 bg-purple-50 rounded p-1 italic">"{answers.connect_para1.substring(0, 60)}{answers.connect_para1.length > 60 ? '...' : ''}" — 연결1</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">② 2단락: 역량을 쌓은 과정이 의도적이고 지속적으로 드러나는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-purple-600 font-semibold">Q2-1(계기)</span>과 <span className="text-purple-600 font-semibold">Q2-2(과정)</span>에서 가장 구체적인 장면을 끌어오세요</p>
                    {answers.connect_para2 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">"{answers.connect_para2.substring(0, 60)}{answers.connect_para2.length > 60 ? '...' : ''}" — 연결2</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">③ 3단락: 역량의 수준을 판단할 수 있는 근거(성취·인정·수준 명시)가 있는가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">Q3-1(성취)</span>과 <span className="text-pink-600 font-semibold">Q3-3(현재 수준)</span>을 더 구체적으로 보완하세요</p>
                    {answers.connect_para3 && <p className="text-xs text-gray-600 mt-1 bg-purple-50 rounded p-1 italic">"{answers.connect_para3.substring(0, 60)}{answers.connect_para3.length > 60 ? '...' : ''}" — 연결3</p>}
                  </div>

                  <div className="bg-white rounded p-3 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">④ 4단락: "기여할 것 같다"가 아닌, Q2·Q3가 이유인 논리적 결론인가?</p>
                    <p className="text-xs text-gray-500">통과 못 하면 → <span className="text-pink-600 font-semibold">Q4-2(왜 그렇게 생각하는가)</span>에서 Q2·Q3 경험을 근거로 다시 연결하세요</p>
                    {answers.connect_para4 && <p className="text-xs text-gray-600 mt-1 bg-pink-50 rounded p-1 italic">"{answers.connect_para4.substring(0, 60)}{answers.connect_para4.length > 60 ? '...' : ''}" — 연결4</p>}
                  </div>

                </div>
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
                © 2026 CareerEngineer All Rights Reserved.
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

  // ── 메인 워크북 화면 ────────────────────────────────────────────────────────
  const currentStepData = currentPhase === 'round1'
    ? round1Steps[currentStep]
    : currentPhase === 'round2'
    ? {
        title: `${round1Steps[selectedSteps[currentStep]].title.replace('→ 최종 글 ', '').split(' — ')[0]} — 심화`,
        subtitle: '부족한 부분을 새로운 각도의 질문으로 구체화하세요',
        questions: round2Questions[selectedSteps[currentStep]]
      }
    : {
        title: '3라운드: 4단락으로 완성',
        subtitle: '각 연결 질문이 최종 글의 한 단락이 됩니다',
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
              {currentStepData.questions.map((q: any) => (
                <div key={q.id} className="mb-6 border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <label className="text-lg font-semibold text-gray-800">
                      {q.label}
                    </label>
                    {q.guide && (
                      <button
                        onClick={() => toggleGuide(q.id)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 ml-4 flex-shrink-0"
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
                    <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${currentPhase === 'round3' ? 'bg-purple-50 border-purple-400' : 'bg-indigo-50 border-indigo-400'}`}>
                      <p className={`text-sm font-semibold mb-1 ${currentPhase === 'round3' ? 'text-purple-900' : 'text-indigo-900'}`}>
                        {currentPhase === 'round3' ? '📚 아래 답변들을 읽고, 하나의 흐름으로 연결해서 위 질문에 답하세요' : '📚 참고: 이전 답변'}
                      </p>
                      {currentPhase === 'round3' && (
                        <p className="text-xs text-purple-700 mb-3">모든 내용을 다 쓸 필요는 없습니다. 각 답변에서 가장 핵심적인 부분을 골라 자연스럽게 연결하세요.</p>
                      )}
                      <div className="space-y-3">
                        {q.referenceQuestions.map((refId) => {
                          const allQuestions = round1Steps.flatMap((s: any) => s.questions || []);
                          const refQuestion = allQuestions.find((rq: any) => rq?.id === refId);
                          if (!refQuestion || !answers[refId]) return null;
                          const charLimit = currentPhase === 'round3' ? 300 : 150;
                          return (
                            <div key={refId} className={`rounded text-sm p-3 ${currentPhase === 'round3' ? 'bg-white border border-purple-100' : 'bg-white'}`}>
                              <p className={`font-semibold mb-1 text-xs ${currentPhase === 'round3' ? 'text-purple-700' : 'text-gray-700'}`}>
                                {refQuestion.label}
                              </p>
                              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {answers[refId]?.substring(0, charLimit)}{answers[refId]?.length > charLimit ? '...' : ''}
                              </p>
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
            © 2026 CareerEngineer All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompetencyWorkbook;
