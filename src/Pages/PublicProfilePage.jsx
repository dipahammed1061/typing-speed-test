import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../firebaseConfig'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const PublicProfilePage = () => {
  const { uid } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    Promise.all([
      db.collection('profiles').doc(uid).get(),
      db.collection('Results').where('userID', '==', uid).orderBy('wpm', 'desc').limit(100).get()
    ]).then(([profileDoc, resultsSnap]) => {
      if (!profileDoc.exists && resultsSnap.empty) {
        setNotFound(true)
        setLoading(false)
        return
      }

      let bestWPM = 0, bestAcc = 0, bestScore = 0, totalTests = 0
      resultsSnap.docs.forEach(doc => {
        const r = doc.data()
        totalTests++
        const score = Math.round((r.wpm || 0) * ((r.accuracy || 0) / 100))
        if (score > bestScore) {
          bestScore = score
          bestWPM = r.wpm || 0
          bestAcc = r.accuracy || 0
        }
      })

      setProfile(profileDoc.exists ? profileDoc.data() : null)
      setStats({ bestWPM, bestAcc, bestScore, totalTests })
      setLoading(false)
    }).catch(() => {
      setNotFound(true)
      setLoading(false)
    })
  }, [uid])

  if (loading) {
    return (
      <div className="pub-page">
        <div className="center-of-screen" style={{ fontSize: '1rem' }}>Loading profile…</div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="pub-page">
        <div className="center-of-screen" style={{ fontSize: '1.2rem' }}>Profile not found</div>
      </div>
    )
  }

  const displayName = profile?.displayName || 'Anonymous'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="pub-page">
      <div className="pub-container">

        <button className="lb-back-btn" onClick={() => navigate('/leaderboard')}>
          <ArrowBackIcon style={{ fontSize: '1rem' }} />
          Leaderboard
        </button>

        <div className="pub-card">
          <div className="pub-avatar">
            {profile?.photoURL
              ? <img src={profile.photoURL} alt={displayName} className="pub-avatar-img" />
              : <div className="pub-avatar-fallback">{initial}</div>
            }
          </div>

          <div className="pub-name">{displayName}</div>

          {profile?.bio && (
            <div className="pub-bio">{profile.bio}</div>
          )}

          <div className="pub-stats">
            <div className="pub-stat">
              <div className="pub-stat-val">{stats?.bestScore ?? '—'}</div>
              <div className="pub-stat-label">Best Score</div>
            </div>
            <div className="pub-stat">
              <div className="pub-stat-val">{stats?.bestWPM ?? '—'}</div>
              <div className="pub-stat-label">Best WPM</div>
            </div>
            <div className="pub-stat">
              <div className="pub-stat-val">{stats?.bestAcc ? `${stats.bestAcc}%` : '—'}</div>
              <div className="pub-stat-label">Accuracy</div>
            </div>
            <div className="pub-stat">
              <div className="pub-stat-val">{stats?.totalTests ?? '—'}</div>
              <div className="pub-stat-label">Tests</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PublicProfilePage
