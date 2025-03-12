'use client'

import { useState } from 'react'
import { Answer, AnswerValue } from '@/types/mbti'
import { calculateMBTIType, getTypeAnalysis } from '@/lib/utils/mbti'
import { questions } from '@/lib/data/questions'
import { typeDescriptions } from '@/lib/data/type-descriptions'
import { QuestionFlow } from '@/components/ui/QuestionFlow'
import { ProgressIndicator } from '@/components/ui/progress-indicator'
import { MBTIChart } from '@/components/ui/mbti-chart'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answerMap, setAnswerMap] = useState<Record<string, AnswerValue>>({})
  const [showResult, setShowResult] = useState(false)
  const [showDebug, setShowDebug] = useState(false)

  // 回答を処理し、次の質問に進む
  const handleAnswer = (questionId: string, value: AnswerValue) => {
    // answerMapを更新
    setAnswerMap(prev => ({
      ...prev,
      [questionId]: value
    }))

    // 現在の質問に回答した場合、次の質問へ
    if (questionId === questions[currentQuestionIndex].id) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        setShowResult(true)
      }
    }
  }

  // 結果計算用のAnswerオブジェクト配列を作成
  const answers: Answer[] = Object.entries(answerMap).map(([questionId, value]) => ({
    questionId,
    value
  }))

  const result = showResult ? calculateMBTIType(answers) : null
  const typeDescription = result ? typeDescriptions[result.type] : null
  const analysis = showResult ? getTypeAnalysis(answers) : null

  if (showResult && typeDescription && result) {
    return (
      <main className="min-h-screen p-4 sm:p-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">診断結果</h1>
          <div className="space-y-8">
            <div className="bg-card p-4 sm:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                {typeDescription.type} - {typeDescription.title}
              </h2>
              <p className="mb-6 text-sm sm:text-base">{typeDescription.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">あなたの特性分布</h3>
                <MBTIChart result={result} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">強み</h3>
                  <p className="mb-4 text-sm sm:text-base whitespace-pre-line">{typeDescription.strengths}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">弱み</h3>
                  <p className="mb-4 text-sm sm:text-base whitespace-pre-line">{typeDescription.weaknesses}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">理想的な働き方</h3>
                  <p className="mb-4 text-sm sm:text-base whitespace-pre-line">{typeDescription.workStyle}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">注意点</h3>
                  <p className="mb-4 text-sm sm:text-base whitespace-pre-line">{typeDescription.carePoints}</p>
                  
                  <h3 className="text-lg font-semibold mb-2">ストレス対策</h3>
                  <p className="text-sm sm:text-base whitespace-pre-line">{typeDescription.stressTips}</p>
                </div>
              </div>

              {showDebug && analysis && (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm font-mono">
                  <h4 className="font-semibold mb-2">デバッグ情報</h4>
                  <div>
                    <p>E/I: E={analysis.EI.E} I={analysis.EI.I} (diff={analysis.EI.diff})</p>
                    <p>S/N: S={analysis.SN.S} N={analysis.SN.N} (diff={analysis.SN.diff})</p>
                    <p>T/F: T={analysis.TF.T} F={analysis.TF.F} (diff={analysis.TF.diff})</p>
                    <p>J/P: J={analysis.JP.J} P={analysis.JP.P} (diff={analysis.JP.diff})</p>
                  </div>
                  <div className="mt-2">
                    <p>正規化スコア:</p>
                    <p>E/I: {result.eScore}</p>
                    <p>S/N: {result.sScore}</p>
                    <p>T/F: {result.tScore}</p>
                    <p>J/P: {result.jScore}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  setShowResult(false)
                  setCurrentQuestionIndex(0)
                  setAnswerMap({})
                }}
                className="flex-1"
              >
                もう一度診断する
              </Button>
              <Button
                onClick={() => setShowDebug(!showDebug)}
                variant="outline"
              >
                {showDebug ? 'デバッグ情報を隠す' : 'デバッグ情報を表示'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center">MBTI診断テスト</h1>
        <div className="space-y-8">
          <ProgressIndicator
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
          />
          
          <QuestionFlow
            questions={questions}
            answers={answerMap}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestionIndex}
          />

          <div className="text-sm text-gray-600 text-center">
            ※ 各質問に対して、あなたの普段の行動や考え方に最も近いものを選んでください
          </div>
        </div>
      </div>
    </main>
  )
}
