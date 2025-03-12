import { TestResult } from '@/types/mbti'

export interface SavedResult extends TestResult {
  savedAt: string
}

export function saveResult(result: TestResult): void {
  try {
    const savedResults = getSavedResults()
    const newResults = [...savedResults, { ...result, savedAt: new Date().toISOString() }]
    localStorage.setItem('mbti_results', JSON.stringify(newResults))
  } catch (error) {
    console.error('Failed to save result:', error)
  }
}

export function getSavedResults(): SavedResult[] {
  try {
    const saved = localStorage.getItem('mbti_results')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Failed to get saved results:', error)
    return []
  }
}

export function clearSavedResults(): void {
  try {
    localStorage.removeItem('mbti_results')
  } catch (error) {
    console.error('Failed to clear saved results:', error)
  }
} 