import React, { useState, useEffect } from 'react'
import Control from './Component/Control'
import TimerDisplay from './Component/TimerDisplay'
import './App.css'

function App() {
  const initialState = 1500 // 25 minutes in seconds

  const [timeLeft, setTimeLeft] = useState(initialState)
  const [isRunning, setIsRunning] = useState(false)

  const handleClick = () => {
    setTimeLeft(initialState)
    setIsRunning(true)
  }

  useEffect(() => {
    if (!isRunning) return

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [isRunning])

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`

  return (
    <>
      <Control handleClick={handleClick} />
      <TimerDisplay display={display} />
    </>
  )
}

export default App
