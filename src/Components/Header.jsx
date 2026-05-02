import React from 'react'
import AccountIcon from './AccountIcon'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import { useNavigate } from 'react-router-dom'
import { useTestMode } from '../Context/TestModeContext'

const KeyZenLogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="32" height="32" rx="8" stroke="currentColor" strokeWidth="2"/>
    <rect x="4.5" y="4.5" width="25" height="25" rx="5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35"/>
    <circle cx="17" cy="17" r="7.5" stroke="currentColor" strokeWidth="1.3" strokeOpacity="0.55"/>
    <circle cx="17" cy="17" r="3.8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.75"/>
    <circle cx="17" cy="17" r="2" fill="currentColor"/>
  </svg>
)

const TIME_OPTIONS = [30, 60, 300]
const WORD_OPTIONS = [20, 30, 50]

const Header = () => {
  const navigate = useNavigate()
  const { testMode, setTestMode, testSeconds, setTestSeconds, testWords, setTestWords } = useTestMode()

  return (
    <div className="header">

      {/* LEFT: logo only */}
      <div className="header-left">
        <div className="logo">
          <span className="logo-svg-icon"><KeyZenLogo /></span>
          <span className="logo-text">KeyZen</span>
        </div>
      </div>

      {/* CENTER: mode + value selectors */}
      <div className="header-center">
        <div className="hmode-group">
          <button
            className={testMode === 'time' ? 'hmode hmode-active' : 'hmode'}
            onClick={() => setTestMode('time')}
          >Time</button>
          <button
            className={testMode === 'word' ? 'hmode hmode-active' : 'hmode'}
            onClick={() => setTestMode('word')}
          >Word</button>
        </div>

        <div className="header-divider" />

        <div className="hval-group">
          {testMode === 'time'
            ? TIME_OPTIONS.map(s => (
                <button
                  key={s}
                  className={testSeconds == s ? 'hval hval-active' : 'hval'}
                  onClick={() => setTestSeconds(s)}
                >{s >= 120 ? `${s / 60}m` : `${s}s`}</button>
              ))
            : WORD_OPTIONS.map(w => (
                <button
                  key={w}
                  className={testWords == w ? 'hval hval-active' : 'hval'}
                  onClick={() => setTestWords(w)}
                >{w}</button>
              ))
          }
        </div>
      </div>

      {/* RIGHT: leaderboard + account controls */}
      <div className="header-right">
        <button className="lb-icon-btn" onClick={() => navigate('/leaderboard')} title="Leaderboard">
          <LeaderboardIcon style={{ fontSize: '1.4rem' }} />
        </button>
        <AccountIcon />
      </div>

    </div>
  )
}

export default Header
