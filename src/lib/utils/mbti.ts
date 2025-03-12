import { Answer, MBTIPersonalityType, TestResult, MBTIType, AnswerValue } from '@/types/mbti'

export function calculateMBTIType(answers: Answer[]): TestResult {
  // 各指標のスコアを初期化
  const scores: Record<MBTIType, number> = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  }

  // 各回答を集計
  answers.forEach(answer => {
    const { questionId, value } = answer
    const type = questionId[0].toUpperCase() as MBTIType
    scores[type] += value
  })

  // 各指標の相対スコアを計算
  const eScore = scores.E - scores.I
  const sScore = scores.S - scores.N
  const tScore = scores.T - scores.F
  const jScore = scores.J - scores.P

  // タイプを判定（スコアが0の場合は、より多く回答された方を選択）
  const type = `${eScore >= 0 ? 'E' : 'I'}${sScore >= 0 ? 'S' : 'N'}${tScore >= 0 ? 'T' : 'F'}${jScore >= 0 ? 'J' : 'P'}` as MBTIPersonalityType

  // スコアを正規化（-30から30の範囲に）
  const normalizeScore = (score: number) => {
    const maxPossibleScore = 30 // 各タイプ15問×最大値2
    return Math.max(-maxPossibleScore, Math.min(maxPossibleScore, score))
  }

  return {
    type,
    eScore: normalizeScore(eScore),
    sScore: normalizeScore(sScore),
    tScore: normalizeScore(tScore),
    jScore: normalizeScore(jScore),
  }
}

export function getAnswerLabel(value: AnswerValue): string {
  switch (value) {
    case 2:
      return '強く同意'
    case 1:
      return '同意'
    case 0:
      return '中立'
    case -1:
      return '不同意'
    case -2:
      return '強く不同意'
    default:
      return '未回答'
  }
}

export const ANSWER_OPTIONS: { value: AnswerValue; label: string }[] = [
  { value: 2, label: '強く同意' },
  { value: 1, label: '同意' },
  { value: 0, label: '中立' },
  { value: -1, label: '不同意' },
  { value: -2, label: '強く不同意' },
]

// デバッグ用：タイプ判定の詳細情報を取得
export function getTypeAnalysis(answers: Answer[]) {
  const scores: Record<MBTIType, number> = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  }

  answers.forEach(answer => {
    const { questionId, value } = answer
    const type = questionId[0].toUpperCase() as MBTIType
    scores[type] += value
  })

  return {
    EI: { E: scores.E, I: scores.I, diff: scores.E - scores.I },
    SN: { S: scores.S, N: scores.N, diff: scores.S - scores.N },
    TF: { T: scores.T, F: scores.F, diff: scores.T - scores.F },
    JP: { J: scores.J, P: scores.P, diff: scores.J - scores.P },
  }
} 