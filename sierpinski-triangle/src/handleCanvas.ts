type XY = {
  x: number
  y: number
}

function handleCanvas(canvas: HTMLCanvasElement) {
  const _ = canvas.getContext('2d')!

  const devicePixelRatio = window.devicePixelRatio || 1

  canvas.width = canvas.clientWidth * devicePixelRatio
  canvas.height = canvas.clientHeight * devicePixelRatio

  const width = canvas.clientWidth
  const height = canvas.clientHeight

  _.scale(devicePixelRatio, devicePixelRatio)

  const center: XY = { x: width / 2, y: height / 1.666 }
  const scale = 666 * 1.333
  const nRecursion = 6

  /* ---
    Draw
  --- */

  function draw() {
    _.clearRect(0, 0, width, height)

    function drawIteration(center: XY, index: number) {
      if (index === nRecursion) return

      const { nodes, sides, centers } = getTrianglePoints(center, 0.5 ** index)

      if (index === nRecursion - 1) {
        drawTriangle(nodes)
        drawTriangle(sides)
      }

      centers.forEach(c => {
        drawIteration(c, index + 1)
      })
    }

    drawIteration(center, 0)
  }

  function drawTriangle(nodes: XY[]) {
    _.strokeStyle = 'black'
    _.beginPath()
    _.moveTo(nodes[0].x, nodes[0].y)
    _.lineTo(nodes[1].x, nodes[1].y)
    _.lineTo(nodes[2].x, nodes[2].y)
    _.closePath()
    _.stroke()
  }

  function getTrianglePoints(center: XY, sizeFactor: number,) {
    const length = Math.sqrt(0.75) / 2 * sizeFactor * scale

    const a: XY = { x: 0, y: -length }
    const b = rotateVector(a, 2 * Math.PI / 3)
    const c = rotateVector(a, -2 * Math.PI / 3)
    const sa = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
    const sb = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 }
    const sc = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 }
    const ca = { x: (a.x + sa.x + sc.x) / 3, y: (a.y + sa.y + sc.y) / 3 }
    const cb = { x: (b.x + sa.x + sb.x) / 3, y: (b.y + sa.y + sb.y) / 3 }
    const cc = { x: (c.x + sb.x + sc.x) / 3, y: (c.y + sb.y + sc.y) / 3 }

    return {
      nodes: [a, b, c].map(n => addVectors(center, n)),
      sides: [sa, sb, sc].map(n => addVectors(center, n)),
      centers: [ca, cb, cc].map(n => addVectors(center, n)),
    }
  }

  function addVectors(a: XY, b: XY): XY {
    return { x: a.x + b.x, y: a.y + b.y }
  }

  function rotateVector(vector: XY, angle: number): XY {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)

    return {
      x: vector.x * cos - vector.y * sin,
      y: vector.x * sin + vector.y * cos,
    }
  }

  /* ---
    Update
  --- */

  function update() {
  }

  /* ---
    Visualization loop
  --- */

  let stopped = false

  function step() {
    update()
    draw()

    if (stopped) return

    requestAnimationFrame(step)
  }

  requestAnimationFrame(step)

  return () => {
    stopped = true
  }
}

export default handleCanvas
