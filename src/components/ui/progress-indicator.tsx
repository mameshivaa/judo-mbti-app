import { questions } from '@/lib/data/questions'

interface ProgressIndicatorProps {
  currentQuestionIndex: number
  answers: { questionId: string }[]
}

export function ProgressIndicator({ currentQuestionIndex, answers }: ProgressIndicatorProps) {
  const totalQuestions = questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100
  const remainingQuestions = totalQuestions - currentQuestionIndex - 1

  return (
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 pb-4 pt-2">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>質問 {currentQuestionIndex + 1} / {totalQuestions}</span>
          <span>{remainingQuestions > 0 ? `あと${remainingQuestions}問` : "最後の質問です"}</span>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
} 