import { Button } from './button'
import { TestResult, TypeDescription } from '@/types/mbti'

interface ShareResultProps {
  result: TestResult
  description: TypeDescription
}

export function ShareResult({ result, description }: ShareResultProps) {
  const shareText = `私の柔道整復師MBTI診断結果は「${result.type}：${description.title}」でした！`
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '柔道整復師MBTI診断結果',
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    } else {
      // フォールバック：クリップボードにコピー
      try {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`)
        alert('結果をクリップボードにコピーしました！')
      } catch (error) {
        console.error('Error copying to clipboard:', error)
        alert('結果のコピーに失敗しました。')
      }
    }
  }
  
  return (
    <Button 
      onClick={handleShare} 
      className="w-full"
      variant="outline"
    >
      結果をシェアする
    </Button>
  )
} 