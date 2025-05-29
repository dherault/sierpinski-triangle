import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'
import useCanvasWidth from './hooks/useCanvasWidth'

function SierpinskiTriangle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const width = useCanvasWidth()

  useEffect(() => {
    if (!canvasRef.current) return

    canvasRef.current.focus()

    return handleCanvas(canvasRef.current)
  }, [width])

  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen cursor-grab"
    />
  )
}

export default SierpinskiTriangle
