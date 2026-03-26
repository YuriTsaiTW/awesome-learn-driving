import type { ExamQuestion } from '../types/exam';

/**
 * Seed exam questions converted from the 12 scenario quizzes.
 * Each question links back to its source scenario via scenarioId.
 * Additional official questions will be appended by the parse script.
 */
export const EXAM_QUESTIONS: ExamQuestion[] = [
  // --- 高速公路拋錨 ---
  {
    id: 'EQ-0001',
    category: 'regulation-mc',
    scenarioId: 'highway-breakdown',
    question: '高速公路拋錨後，應該優先做什麼？',
    options: ['立刻下車站在車旁', '開啟危險警示燈並駛向路肩', '打電話求救', '原地等待'],
    correct: 1,
    explanation: '移車並開啟警示燈是優先動作，先確保車輛不阻塞車流、不被後車追撞。',
  },
  {
    id: 'EQ-0002',
    category: 'regulation-mc',
    scenarioId: 'highway-breakdown',
    question: '警告三角架應放置在車輛後方多遠處？',
    options: ['10 公尺', '30～50 公尺', '100 公尺', '不需要放置'],
    correct: 1,
    explanation: '30～50 公尺讓後方來車有足夠的反應時間和煞停距離。',
  },
  {
    id: 'EQ-0003',
    category: 'regulation-mc',
    scenarioId: 'highway-breakdown',
    question: '等待救援時，人員應該待在哪裡？',
    options: ['坐在車內等待', '站在車旁', '越過護欄在安全區域', '站在車道上指揮交通'],
    correct: 2,
    explanation: '必須越過護欄到護欄外側，留在車道旁仍有被車輛撞擊的高度風險。',
  },

  // --- 行駛中爆胎 ---
  {
    id: 'EQ-0004',
    category: 'regulation-mc',
    scenarioId: 'tire-blowout',
    question: '爆胎時最重要的第一個動作是？',
    options: ['緊急煞車', '緊握方向盤保持直線', '猛打方向盤轉向', '立刻停車'],
    correct: 1,
    explanation: '保持直線是爆胎後最重要的事，防止車輛劇烈偏移引發更嚴重的事故。',
  },
  {
    id: 'EQ-0005',
    category: 'regulation-mc',
    scenarioId: 'tire-blowout',
    question: '爆胎後為什麼不應該急踩煞車？',
    options: ['會增加輪胎損壞', '可能造成車輛失控打滑', '會讓引擎受損', '會損壞地面'],
    correct: 1,
    explanation: '高速爆胎後急踩煞車，車輪鎖死後車子會嚴重偏移甚至翻滾。',
  },
  {
    id: 'EQ-0006',
    category: 'regulation-mc',
    scenarioId: 'tire-blowout',
    question: '爆胎後的正確減速方式是？',
    options: ['踩下煞車踏板', '拉手煞車', '慢慢放開油門自然減速', '快速切換低速檔'],
    correct: 2,
    explanation: '慢慢放開油門讓車子自然減速，不會造成額外的不穩定。',
  },

  // --- 大雨大霧能見度極低 ---
  {
    id: 'EQ-0007',
    category: 'regulation-mc',
    scenarioId: 'heavy-rain-fog',
    question: '大霧中行駛應該開啟哪種燈？',
    options: ['遠光燈', '近光燈和霧燈', '只開危險警示燈', '不開燈'],
    correct: 1,
    explanation: '近光燈配合霧燈是正確選擇，遠光燈會被霧氣反射形成炫光，反而讓能見度更差。',
  },
  {
    id: 'EQ-0008',
    category: 'regulation-mc',
    scenarioId: 'heavy-rain-fog',
    question: '濃霧中為什麼不應開遠光燈？',
    options: [
      '耗電量太大',
      '光線被霧氣反射形成炫光，能見度更差',
      '對對向駕駛不禮貌',
      '法規明確禁止',
    ],
    correct: 1,
    explanation: '遠光燈射出的光線被霧氣水分子散射，形成一堵光牆，讓前方更看不清楚。',
  },
  {
    id: 'EQ-0009',
    category: 'regulation-mc',
    scenarioId: 'heavy-rain-fog',
    question: '能見度不足 50 公尺時，建議車速控制在？',
    options: ['30 km/h 以下', '50 km/h 以下', '80 km/h 以下', '不需要降速'],
    correct: 1,
    explanation: '50 公尺能見度下，建議時速不超過 50 km/h，確保有足夠的煞停距離。',
  },

  // --- 輕微追撞事故 ---
  {
    id: 'EQ-0010',
    category: 'regulation-mc',
    scenarioId: 'rear-end-collision',
    question: '在快速道路發生輕微追撞，第一步應該？',
    options: ['下車與對方理論', '開啟警示燈，移車至路肩', '立刻報警', '拍照存證'],
    correct: 1,
    explanation: '人身安全優先，先把車移至安全位置，再處理後續理賠和報警事宜。',
  },
  {
    id: 'EQ-0011',
    category: 'regulation-mc',
    scenarioId: 'rear-end-collision',
    question: '移車前一定要先做的事是？',
    options: ['打電話給家人', '拍照記錄現場', '等警察到場', '測量車損距離'],
    correct: 1,
    explanation: '移車前必須先拍照記錄現場（車損、車牌、位置），否則事後難以舉證。',
  },
  {
    id: 'EQ-0012',
    category: 'regulation-mc',
    scenarioId: 'rear-end-collision',
    question: '發生事故有人受傷時，必須？',
    options: ['先拍照再報警', '立即報警並叫救護車（110+119）', '協商私下解決', '送醫後再報警'],
    correct: 1,
    explanation: '有人受傷必須立即報警並叫救護車，這是法律義務，不可拖延或私下協商。',
  },

  // --- 煞車異常失靈 ---
  {
    id: 'EQ-0013',
    category: 'regulation-mc',
    scenarioId: 'brake-failure',
    question: '煞車失靈時，正確的應對方式是？',
    options: ['立刻猛拉手煞車', '連續點踩煞車並降檔減速', '放棄操控等車停下', '加速衝過危險路段'],
    correct: 1,
    explanation: '連續點踩配合降檔是最正確的應對，能最大程度降低車速並維持車輛穩定性。',
  },
  {
    id: 'EQ-0014',
    category: 'regulation-mc',
    scenarioId: 'brake-failure',
    question: '降檔的目的是？',
    options: ['讓車加速', '利用引擎阻力降低車速', '保護引擎不受損', '讓方向盤更好控制'],
    correct: 1,
    explanation: '低速檔時引擎轉速提升會產生阻力，有效幫助車輛減速，稱為「引擎煞車」。',
  },
  {
    id: 'EQ-0015',
    category: 'regulation-mc',
    scenarioId: 'brake-failure',
    question: '為什麼猛拉手煞車很危險？',
    options: ['會損壞手煞車系統', '可能造成後輪鎖死甩尾失控', '手煞車根本煞不住', '法規禁止使用'],
    correct: 1,
    explanation: '手煞車作用於後輪，猛拉會造成後輪鎖死，車尾急速甩出，高速時後果非常嚴重。',
  },

  // --- 窄路會車 ---
  {
    id: 'EQ-0016',
    category: 'regulation-mc',
    scenarioId: 'narrow-road',
    question: '窄路會車時，應優先採取什麼行動？',
    options: ['按喇叭要求對方讓路', '立即減速靠右停車', '加速快速通過', '開雙黃燈原地等待'],
    correct: 1,
    explanation: '遇到窄路會車首要動作是立即減速靠右，爭取空間並讓對方看清你的位置，避免正面衝突。',
  },
  {
    id: 'EQ-0017',
    category: 'regulation-mc',
    scenarioId: 'narrow-road',
    question: '兩車都無法繼續前進時，正確做法是？',
    options: [
      '雙方同時強行擠過',
      '有空間倒車的一方緩緩倒退至寬處',
      '搖下車窗協商誰應讓路',
      '撥打 110 讓警察協調',
    ],
    correct: 1,
    explanation:
      '有較多空間（如位於寬處附近、上坡方）的車輛應主動緩緩倒退至可錯車的位置，讓兩車安全通過。',
  },
  {
    id: 'EQ-0018',
    category: 'regulation-mc',
    scenarioId: 'narrow-road',
    question: '通過窄路會車時，適當的車速是？',
    options: ['10-20 公里/時（步行速度）', '30-40 公里/時', '維持原速不變', '對方配合後快速通過'],
    correct: 0,
    explanation:
      '兩車錯車時速度應降至接近步行速度（約 10-20 公里/時），注意兩側後視鏡與山壁距離，緩慢通過最安全。',
  },

  // --- 路口碰撞危機 ---
  {
    id: 'EQ-0019',
    category: 'regulation-mc',
    scenarioId: 'intersection-crash',
    question: '綠燈亮起後，最安全的起步方式是？',
    options: ['立刻加速通過路口', '先左右確認安全再起步', '只看前方就好', '跟著前車走即可'],
    correct: 1,
    explanation: '綠燈不代表絕對安全，先左右確認無闖紅燈車輛再起步，是防禦駕駛的基本習慣。',
  },
  {
    id: 'EQ-0020',
    category: 'regulation-mc',
    scenarioId: 'intersection-crash',
    question: '側方突然衝出車輛，第一反應應該是？',
    options: ['加速通過', '猛打方向盤閃避', '踩煞車停住', '什麼都不做'],
    correct: 2,
    explanation: '低速起步時煞停距離很短，煞車是最快最安全的反應。猛打方向盤反而可能波及其他車道。',
  },
  {
    id: 'EQ-0021',
    category: 'regulation-mc',
    scenarioId: 'intersection-crash',
    question: '以下哪一項不是「防禦駕駛」的路口習慣？',
    options: [
      '綠燈起步前先左右確認',
      '通過路口時腳放在煞車上方預備',
      '綠燈就全速通過，因為自己有路權',
      '注意右轉車輛的內輪差盲區',
    ],
    correct: 2,
    explanation:
      '「有路權就全速通過」是危險心態。防禦駕駛的核心是：即使自己有路權，也要隨時準備應對他人的違規。',
  },

  // --- 機車突然鑽車縫 ---
  {
    id: 'EQ-0022',
    category: 'regulation-mc',
    scenarioId: 'scooter-weaving',
    question: '右轉前除了看後視鏡，還應該做什麼？',
    options: ['開大燈', '轉頭確認 A 柱死角', '按喇叭示警', '加速快速通過'],
    correct: 1,
    explanation: '後視鏡有盲區，尤其 A 柱會遮擋視線。轉頭確認死角是避免碰撞機車的關鍵動作。',
  },
  {
    id: 'EQ-0023',
    category: 'regulation-mc',
    scenarioId: 'scooter-weaving',
    question: '右轉時發現機車從右側竄出，正確反應是？',
    options: ['繼續轉彎，機車會閃開', '猛打方向盤左閃', '立即停止轉向並煞車', '加速完成轉彎'],
    correct: 2,
    explanation: '停止轉向並煞車，給機車通過空間，是最安全的做法。猛打方向盤可能波及其他車道。',
  },
  {
    id: 'EQ-0024',
    category: 'regulation-mc',
    scenarioId: 'scooter-weaving',
    question: '方向燈應該在轉彎前多遠距離開啟？',
    options: ['5 公尺', '10 公尺', '至少 30 公尺', '不需要提前'],
    correct: 2,
    explanation: '依照交通規則，轉彎前至少 30 公尺應開啟方向燈，讓後方車輛和機車有充足反應時間。',
  },

  // --- 疲勞駕駛打瞌睡 ---
  {
    id: 'EQ-0025',
    category: 'regulation-mc',
    scenarioId: 'drowsy-driving',
    question: '以下哪種狀況是疲勞駕駛的警訊？',
    options: ['只打了一個哈欠', '忘記剛才經過了哪個路段', '覺得空調太冷', '收音機訊號不好'],
    correct: 1,
    explanation: '「忘記剛才的路段」代表你已經出現微睡眠（數秒無意識），這是極度危險的疲勞警訊。',
  },
  {
    id: 'EQ-0026',
    category: 'regulation-mc',
    scenarioId: 'drowsy-driving',
    question: '疲勞駕駛時，唯一真正有效的解方是？',
    options: ['開窗吹冷風', '喝能量飲料', '找安全地點停下來小睡 15～20 分鐘', '大聲唱歌保持清醒'],
    correct: 2,
    explanation:
      '所有提神方法都只能撐幾分鐘。只有真正的睡眠才能恢復大腦的警覺性，15～20 分鐘的小睡最有效。',
  },
  {
    id: 'EQ-0027',
    category: 'regulation-mc',
    scenarioId: 'drowsy-driving',
    question: '「微睡眠」發生時，大約持續多久就可能釀成事故？',
    options: ['30 秒以上', '10 秒以上', '3～4 秒', '1 分鐘以上'],
    correct: 2,
    explanation:
      '微睡眠只需 3～4 秒。以時速 100 km/h 計算，3 秒就會前進約 83 公尺，足以偏出車道或追撞前車。',
  },

  // --- 雨天水漂失控 ---
  {
    id: 'EQ-0028',
    category: 'regulation-mc',
    scenarioId: 'hydroplaning',
    question: '水漂發生時，最正確的反應是？',
    options: ['用力踩煞車', '放開油門、穩住方向盤', '猛打方向盤修正', '拉手煞車減速'],
    correct: 1,
    explanation:
      '水漂時輪胎浮在水面上，煞車和方向盤都無效。放開油門讓車速自然下降是唯一安全的做法。',
  },
  {
    id: 'EQ-0029',
    category: 'regulation-mc',
    scenarioId: 'hydroplaning',
    question: '水漂現象通常在車速低於多少時會消失？',
    options: ['80 km/h', '70 km/h', '55 km/h', '40 km/h'],
    correct: 2,
    explanation: '一般而言，車速降到約 55 km/h 以下，輪胎就能重新排開積水接觸路面，恢復抓地力。',
  },
  {
    id: 'EQ-0030',
    category: 'regulation-mc',
    scenarioId: 'hydroplaning',
    question: '以下何者會大幅增加水漂的風險？',
    options: ['胎紋深度充足', '胎壓正常', '輪胎磨損嚴重、胎紋不足', '車速低於 60 km/h'],
    correct: 2,
    explanation: '胎紋的功能就是排水。胎紋不足 1.6mm 時排水能力大幅下降，水漂風險急劇升高。',
  },

  // --- 右轉遇機車直行 ---
  {
    id: 'EQ-0031',
    category: 'regulation-mc',
    scenarioId: 'right-turn-motorcycle',
    question: '右轉前靠右行駛的主要目的是？',
    options: ['加快通過路口', '壓縮機車從右側超車的空間', '避免左側來車碰撞', '讓行人有更多空間'],
    correct: 1,
    explanation: '靠右行駛可以縮小機車在右側縫隙直行的空間，降低右轉時發生機車衝突的機率。',
  },
  {
    id: 'EQ-0032',
    category: 'regulation-mc',
    scenarioId: 'right-turn-motorcycle',
    question: '右轉方向燈應該在何時打？',
    options: ['開始轉彎的瞬間', '進入路口後', '路口前至少 30 公尺', '看到紅燈變綠燈時'],
    correct: 2,
    explanation: '提前 30 公尺打方向燈，讓後方機車和行人有充分時間預判你的意圖，避免措手不及。',
  },
  {
    id: 'EQ-0033',
    category: 'regulation-mc',
    scenarioId: 'right-turn-motorcycle',
    question: '若右後方有機車正在直行，應該怎麼做？',
    options: ['加速先通過', '按喇叭後通過', '等機車完全通過再轉彎', '閃大燈示意機車停下'],
    correct: 2,
    explanation:
      '直行機車有路權優先，右轉車必須禮讓。等機車完全通過後才能右轉，這是法規也是安全的做法。',
  },

  // --- 左轉時對向來車 ---
  {
    id: 'EQ-0034',
    category: 'regulation-mc',
    scenarioId: 'left-turn-oncoming',
    question: '左轉時，誰擁有優先路權？',
    options: ['左轉車，因為在等了很久', '對向直行車', '先進入路口的車', '車速較快的車'],
    correct: 1,
    explanation: '對向直行車擁有優先路權。左轉車必須禮讓對向直行車完全通過後，才能左轉。',
  },
  {
    id: 'EQ-0035',
    category: 'regulation-mc',
    scenarioId: 'left-turn-oncoming',
    question: '在路口等待左轉時，車輛應停在哪裡？',
    options: ['停在停止線後方', '停在路口中央等待區', '進入對向車道等待', '路口前的機車停等區'],
    correct: 1,
    explanation: '左轉等待時應進入路口中央等待區，這樣後方直行車可以繼續通行，不造成阻塞。',
  },
  {
    id: 'EQ-0036',
    category: 'regulation-mc',
    scenarioId: 'left-turn-oncoming',
    question: '判斷對向來車距離夠遠後加速左轉，這樣做有什麼風險？',
    options: [
      '沒有風險，這是正確做法',
      '對向車可能比視覺估計快',
      '只有雨天才有風險',
      '只有夜晚才危險',
    ],
    correct: 1,
    explanation:
      '肉眼判斷車速和距離容易失誤，尤其對向車速偏快時，實際到達時間遠比預期短，非常危險。',
  },
];

/** Map from question ID to question object for O(1) lookup */
export const EXAM_QUESTION_MAP = new Map<string, ExamQuestion>(
  EXAM_QUESTIONS.map((q) => [q.id, q]),
);
