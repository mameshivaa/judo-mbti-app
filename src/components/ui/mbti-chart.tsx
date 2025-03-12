import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { TestResult } from '@/types/mbti'

interface MBTIChartProps {
  result: TestResult
}

export function MBTIChart({ result }: MBTIChartProps) {
  const data = [
    {
      subject: '外向性 (E)',
      value: result.eScore > 0 ? result.eScore : 0,
      fullMark: 30,
    },
    {
      subject: '感覚 (S)',
      value: result.sScore > 0 ? result.sScore : 0,
      fullMark: 30,
    },
    {
      subject: '思考 (T)',
      value: result.tScore > 0 ? result.tScore : 0,
      fullMark: 30,
    },
    {
      subject: '判断 (J)',
      value: result.jScore > 0 ? result.jScore : 0,
      fullMark: 30,
    },
    {
      subject: '内向性 (I)',
      value: result.eScore < 0 ? -result.eScore : 0,
      fullMark: 30,
    },
    {
      subject: '直観 (N)',
      value: result.sScore < 0 ? -result.sScore : 0,
      fullMark: 30,
    },
    {
      subject: '感情 (F)',
      value: result.tScore < 0 ? -result.tScore : 0,
      fullMark: 30,
    },
    {
      subject: '知覚 (P)',
      value: result.jScore < 0 ? -result.jScore : 0,
      fullMark: 30,
    },
  ]

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={45} domain={[0, 30]} />
          <Radar
            name="MBTIスコア"
            dataKey="value"
            stroke="#2563eb"
            fill="#3b82f6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
} 