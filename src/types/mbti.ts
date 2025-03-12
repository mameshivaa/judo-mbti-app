export type MBTIType = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'
export type MBTITypeGroup = 'EI' | 'SN' | 'TF' | 'JP'
export type MBTIPersonalityType = 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ' | 'ISTP' | 'ISFP' | 'INFP' | 'INTP' | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP' | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ'

export type AnswerValue = -2 | -1 | 0 | 1 | 2

export interface Answer {
  questionId: string
  value: AnswerValue
}

export interface QuestionType {
  id: string
  text: string
  category: MBTIType
  type: MBTIType
}

export interface TestResult {
  type: MBTIPersonalityType
  eScore: number
  sScore: number
  tScore: number
  jScore: number
}

export interface TypeDescription {
  type: MBTIPersonalityType
  title: string
  description: string
  strengths: string
  weaknesses: string
  workStyle: string
  carePoints: string
  stressTips: string
} 