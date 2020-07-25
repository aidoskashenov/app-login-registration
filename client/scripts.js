const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let isMouseDown = false
let cords = []

canvas.width = window.innerWidth
canvas.height = window.innerHeight

canvas.addEventListener('mousedown', function () {
  isMouseDown = true
})
canvas.addEventListener('mouseup', function () {
  isMouseDown = false
  ctx.beginPath()
  cords.push('mouseup')
})
ctx.lineWidth = 10 * 2

canvas.addEventListener('mousemove', function (e) {
  if (isMouseDown) {
    cords.push([e.clientX, e.clientY])

    ctx.lineTo(e.clientX, e.clientY)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2)

    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
  }

  function save () {
    localStorage.setItem('cords', JSON.stringify(cords))
  }

  function clear () {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    ctx.fillStyle = 'black'
  }

  function replay () {
    var timer = setInterval(function () {
      if (!cords.length) {
        clearInterval(timer)
        ctx.beginPath()
      }
      var crd = cords.shift()
      var e = { clientX: crd['0'], clientY: crd['1'] }
      ctx.lineTo(e.clientX, e.clientY)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2)

      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(e.clientX, e.clientY)
    })
  }
  document.addEventListener('keydown', function (e) {
    if (e.keyCode == 83) {
      save()
      console.log('Saved')
    }
    if (e.keyCode == 82) {
      console.log('Replaying ...')
      cords = JSON.parse(localStorage.getItem('cords'))
      clear()
      replay()
    }
    if (e.keyCode == 67) {
      clear()
      console.log('cleared')
    }
  })
})
