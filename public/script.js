import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'

const socket = io('http://localhost:3001')

const formatTime = (sec) => {
  if (!sec) return '00:00'
  const min = Math.floor(sec / 60)
  const secLeft = sec % 60
  const newMin = min < 10 ? `0${min}` : `${min}`
  const newSec = secLeft < 10 ? `0${secLeft}` : `${secLeft}`

  return `${newMin}:${newSec}`
}

// socket.on("connect_error", (err) => {
//   console.log(`connect_error due to ${err.message}`);
// });

socket.on('initialData', (data) => {
  document.getElementById('gameTime').textContent = formatTime(data.time)
  document.getElementById('quarter').textContent = data.quarter ? data.quarter : 'End of regulation'
  document.getElementById('status').textContent = data.status ? 'Started' : 'Ended'
})

socket.on('updateData', (data) => {
  document.querySelector('.scoreHost').textContent = data.scoreHost
  document.querySelector('.scoreOpponent').textContent = data.scoreOpponent
  document.getElementById('gameTime').textContent = formatTime(data.time)
  document.getElementById('quarter').textContent = data.quarter ? data.quarter : 'End of regulation'
  document.getElementById('status').textContent = data.status ? 'Started' : 'Ended'
})

socket.on('updateScore', (data) => {
  document.querySelector('.scoreHost').textContent = data.scoreHost
  document.querySelector('.scoreOpponent').textContent = data.scoreOpponent
})

socket.on('updateTimer', (data) => {
  document.getElementById('gameTime').textContent = formatTime(data.time)
  document.getElementById('quarter').textContent = data.quarter ? data.quarter : 4
  document.getElementById('status').textContent = data.status ? 'Started' : 'End of regulation'
  document.getElementById('paused').textContent = data.paused ? 'Paused' : 'Playing'
})

document.getElementById('changeStatus').addEventListener('click', () => {
  socket.emit('changeStatus')
})

document.getElementById('pauseGame').addEventListener('click', () => {
  socket.emit('pauseGame')
})

document.querySelectorAll('.changeScoreHost').forEach((element) =>
  element.addEventListener('click', () => {
    socket.emit('updateScore', { scoreHost: element.value, scoreOpponent: 0 })
  }),
)

document.querySelectorAll('.changeScoreOpponent').forEach((element) =>
  element.addEventListener('click', () => {
    socket.emit('updateScore', { scoreHost: 0, scoreOpponent: element.value })
  }),
)
