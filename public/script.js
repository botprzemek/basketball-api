import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js'

const socket = io()

socket.on('initialData', (data) => {
  document.getElementById('pointsTeamA').textContent = data.pointsHost
  document.getElementById('pointsTeamB').textContent = data.pointsOpponent
  document.getElementById('gameTime').textContent = data.time
  document.getElementById('quarter').textContent = (data.quarter) ? data.quarter : 'Game ended'
})

socket.on('updateGameData', (data) => {
  document.getElementById('pointsTeamA').textContent = data.pointsHost
  document.getElementById('pointsTeamB').textContent = data.pointsOpponent
  document.getElementById('gameTime').textContent = data.time
  document.getElementById('quarter').textContent = (data.quarter) ? data.quarter : 'Game ended'
})

document.getElementById('addPointsTeamA').addEventListener('click', () => {
  socket.emit('updateScore', { pointsHost: 2, pointsOpponent: 0 })
})

document.getElementById('addPointsTeamB').addEventListener('click', () => {
  socket.emit('updateScore', { pointsHost: 0, pointsOpponent: 2 })
})

document.getElementById('updateGameInfo').addEventListener('click', () => {
  const quarter = prompt('Enter quarter:')
  socket.emit('updateGameInfo', { gameTime, quarter })
})
