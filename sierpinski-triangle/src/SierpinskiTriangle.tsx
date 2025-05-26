import { useEffect, useRef } from 'react'

import handleCanvas from './handleCanvas'

function SierpinskiTriangle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    return handleCanvas(canvasRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-screen w-screen"
    />
  )
}

export default SierpinskiTriangle
