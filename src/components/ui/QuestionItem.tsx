import { QuestionType, AnswerValue } from '@/types/mbti'
import { ANSWER_OPTIONS } from '@/lib/utils/mbti'
import { Card, CardContent, CardHeader, CardTitle } from './card'

interface QuestionItemProps {
  question: QuestionType
  selectedValue?: AnswerValue
  onChange: (value: AnswerValue) => void
  isActive: boolean
}

export function QuestionItem({ question, selectedValue, onChange, isActive }: QuestionItemProps) {
  return (
    <Card className={`w-full ${!isActive ? 'bg-gray-50' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg ${!isActive ? 'text-gray-700' : ''}`}>
          {question.text}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {ANSWER_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`p-3 rounded-md border cursor-pointer transition-all ${
                selectedValue === option.value
                  ? 'bg-blue-50 border-blue-300 font-medium'
                  : 'hover:bg-gray-50 border-gray-200'
              }`}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 