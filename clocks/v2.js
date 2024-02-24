const makeClock = () => {
  let interval = undefined
  const hour = document.getElementById('hour')
  const munites = document.getElementById('minutes')
  const seconds = document.getElementById('seconds')

  const update = () => {
    const now = new Date()
    const hourNow = now.getHours()
    hour.textContent = hourNow > 9 ? hourNow : '0' + hourNow
    const minutesNow = now.getMinutes()
    munites.textContent = minutesNow > 9 ? minutesNow : '0' + minutesNow
    const secondsNow = now.getSeconds()
    seconds.textContent = secondsNow > 9 ? secondsNow : '0' + secondsNow
  }

  const clean = () => {
    if (interval) clearInterval(interval)
    window.removeEventListener('beforeunload', clean)
  }
  interval = setInterval(update, 1000)
  window.addEventListener('beforeunload', clean)
}

window.onload = makeClock
