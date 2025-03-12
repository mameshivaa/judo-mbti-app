import { useEffect, useRef } from 'react'
import { QuestionType, AnswerValue } from '@/types/mbti'
import { QuestionItem } from './QuestionItem'

interface QuestionFlowProps {
  questions: QuestionType[]
  answers: Record<string, AnswerValue>
  onAnswer: (questionId: string, value: AnswerValue) => void
  currentQuestionIndex: number
}

export function QuestionFlow({ questions, answers, onAnswer, currentQuestionIndex }: QuestionFlowProps) {
  // 表示する質問（現在の質問までを表示）
  const visibleQuestions = questions.slice(0, currentQuestionIndex + 1)
  const currentQuestionRef = useRef<HTMLDivElement>(null)
  
  // 現在の質問へスクロール
  useEffect(() => {
    if (currentQuestionRef.current) {
      currentQuestionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }, [currentQuestionIndex])
  
  return (
    <div className="space-y-8 pb-20">
      {visibleQuestions.map((question, index) => {
        const isCurrentQuestion = index === currentQuestionIndex
        
        return (
          <div 
            key={question.id}
            ref={isCurrentQuestion ? currentQuestionRef : null}
            className={`transition-all duration-300 ${
              isCurrentQuestion 
                ? 'opacity-100 scale-100' 
                : 'opacity-70 scale-95'
            }`}
          >
            <QuestionItem
              question={question}
              selectedValue={answers[question.id]}
              onChange={(value) => onAnswer(question.id, value)}
              isActive={isCurrentQuestion}
            />
          </div>
        )
      })}
    </div>
  )
} 