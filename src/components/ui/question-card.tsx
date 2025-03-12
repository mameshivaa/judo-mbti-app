import { QuestionType, AnswerValue } from '@/types/mbti'
import { ANSWER_OPTIONS } from '@/lib/utils/mbti'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from './label'

interface QuestionCardProps {
  question: QuestionType
  value?: AnswerValue
  onChange: (value: AnswerValue) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{question.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={value?.toString()}
          onValueChange={(val) => onChange(parseInt(val) as AnswerValue)}
          className="flex flex-col space-y-2"
        >
          {ANSWER_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
              <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
} 