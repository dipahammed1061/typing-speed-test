import React from 'react'
import { useTestMode } from '../Context/TestModeContext'

const UpperMenu = ({ countDown, currWordIndex }) => {
  const { testMode, testWords } = useTestMode()

  return (
    <div className="counter-bar">
      <span className="counter">
        {testMode === 'time' ? countDown : `${currWordIndex}/${testWords}`}
      </span>
    </div>
  )
}

export default UpperMenu
