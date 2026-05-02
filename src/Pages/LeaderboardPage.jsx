import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

const MEDALS = ['🥇', '🥈', '🥉']

const aggregateByUser = (docs) => {
    const userMap = {}
    docs.forEach((doc) => {
        const r = { id: doc.id, ...doc.data() }
        const uid = r.userID
        if (!uid) return
        const adjustedScore = Math.round((r.wpm || 0) * ((r.accuracy || 0) / 100))
        if (!userMap[uid]) {
            userMap[uid] = {
                userID: uid,
                userName: r.userName || 'Anonymous',
                bestWPM: r.wpm || 0,
                bestAccuracy: r.accuracy || 0,
                adjustedScore,
                lastUpdated: r.timeStamp,
                totalTests: 1,
            }
        } else {
            userMap[uid].totalTests += 1
            if (r.userName) userMap[uid].userName = r.userName
            if (adjustedScore > userMap[uid].adjustedScore) {
                userMap[uid].bestWPM = r.wpm
                userMap[uid].bestAccuracy = r.accuracy
                userMap[uid].adjustedScore = adjustedScore
                userMap[uid].lastUpdated = r.timeStamp
            }
        }
    })
    return Object.values(userMap).sort((a, b) => b.adjustedScore - a.adjustedScore)
}

const fetchProfiles = async (uids) => {
    const profileMap = {}
    const chunks = []
    for (let i = 0; i < uids.length; i += 30) chunks.push(uids.slice(i, i + 30))
    await Promise.all(
        chunks.map(chunk =>
            db.collection('profiles').where('uid', 'in', chunk).get().then(snap => {
                snap.docs.forEach(doc => { profileMap[doc.id] = doc.data() })
            })
        )
    )
    return profileMap
}

const LeaderboardPage = () => {
    const [rows, setRows] = useState([])
    const [profileMap, setProfileMap] = useState({})
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState(null)
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = db
            .collection('Results')
            .orderBy('wpm', 'desc')
            .limit(500)
            .onSnapshot(
                async (snapshot) => {
                    const aggregated = aggregateByUser(snapshot.docs)
                    setRows(aggregated)
                    setLastUpdate(new Date())
                    setLoading(false)
                    if (aggregated.length > 0) {
                        const uids = aggregated.map(r => r.userID)
                        const profiles = await fetchProfiles(uids)
                        setProfileMap(profiles)
                    }
                },
                (err) => {
                    console.error('Leaderboard error:', err)
                    setLoading(false)
                }
            )
        return () => unsubscribe()
    }, [])

    const userRankIndex = rows.findIndex((r) => r.userID === user?.uid)

    const formatDate = (ts) => {
        if (!ts) return '—'
        try {
            const d = ts.toDate ? ts.toDate() : new Date(ts)
            return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' })
        } catch { return '—' }
    }

    const MiniAvatar = ({ uid, name }) => {
        const p = profileMap[uid]
        const initial = (name || '?').charAt(0).toUpperCase()
        if (p?.photoURL) return <img className="lb-avatar" src={p.photoURL} alt={name} />
        return <div className="lb-avatar lb-avatar-initial">{initial}</div>
    }

    return (
        <div className="lb-page">
            <div className="lb-container">

                <div className="lb-topbar">
                    <button className="lb-back-btn" onClick={() => navigate('/')}>
                        <ArrowBackIcon style={{ fontSize: '1rem' }} />
                        Home
                    </button>

                    <div className="lb-title-area">
                        <span className="lb-live-dot" />
                        <EmojiEventsIcon style={{ fontSize: '1.4rem', marginRight: '0.4rem' }} />
                        <span className="lb-heading" style={{ fontFamily: "'Syne', sans-serif" }}>KeyZen Leaderboard</span>
                    </div>

                    <div className="lb-meta">
                        {user && userRankIndex >= 0 && (
                            <span className="lb-your-rank">
                                Your rank&nbsp;&nbsp;<strong>#{userRankIndex + 1}</strong>
                            </span>
                        )}
                        {user && userRankIndex === -1 && !loading && (
                            <span className="lb-your-rank" style={{ opacity: 0.5 }}>
                                Complete a test to rank
                            </span>
                        )}
                        {lastUpdate && (
                            <span className="lb-updated">Updated {lastUpdate.toLocaleTimeString()}</span>
                        )}
                    </div>
                </div>

                <div className="lb-formula-note">
                    Score = WPM × (Accuracy ÷ 100) — rewards both speed and precision. Click any row to view their profile.
                </div>

                <div className="lb-table">
                    <div className="lb-row lb-head-row">
                        <span className="lb-col lb-col-rank">Rank</span>
                        <span className="lb-col lb-col-name">Player</span>
                        <span className="lb-col lb-col-score">Score</span>
                        <span className="lb-col lb-col-wpm">Best WPM</span>
                        <span className="lb-col lb-col-acc">Accuracy</span>
                        <span className="lb-col lb-col-tests">Tests</span>
                        <span className="lb-col lb-col-date">Last Best</span>
                    </div>

                    {loading ? (
                        <div className="lb-empty">
                            <span className="lb-loading-dots">Fetching live scores</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="lb-empty">No scores yet — be the first! 🚀</div>
                    ) : (
                        rows.map((row, i) => {
                            const isYou = row.userID === user?.uid
                            const rowClass = [
                                'lb-row lb-data-row lb-row-clickable',
                                isYou ? 'lb-row-you' : '',
                                i === 0 ? 'lb-row-gold' : '',
                                i === 1 ? 'lb-row-silver' : '',
                                i === 2 ? 'lb-row-bronze' : '',
                            ].filter(Boolean).join(' ')

                            return (
                                <div
                                    key={row.userID}
                                    className={rowClass}
                                    onClick={() => navigate(`/profile/${row.userID}`)}
                                    title="View profile"
                                >
                                    <span className="lb-col lb-col-rank">
                                        {i < 3
                                            ? <span style={{ fontSize: '1.2rem' }}>{MEDALS[i]}</span>
                                            : <span className="lb-rank-num">{i + 1}</span>
                                        }
                                    </span>

                                    <span className="lb-col lb-col-name">
                                        <MiniAvatar uid={row.userID} name={row.userName} />
                                        <span className="lb-player-name">{row.userName}</span>
                                        {isYou && <span className="lb-you-tag">YOU</span>}
                                    </span>

                                    <span className="lb-col lb-col-score">
                                        <span className="lb-score-val">{row.adjustedScore}</span>
                                    </span>

                                    <span className="lb-col lb-col-wpm">{row.bestWPM}</span>
                                    <span className="lb-col lb-col-acc">{row.bestAccuracy}%</span>
                                    <span className="lb-col lb-col-tests">{row.totalTests}</span>
                                    <span className="lb-col lb-col-date">{formatDate(row.lastUpdated)}</span>
                                </div>
                            )
                        })
                    )}
                </div>

                {!user && (
                    <div className="lb-login-hint">
                        Login to have your scores saved and appear on the leaderboard
                    </div>
                )}

            </div>
        </div>
    )
}

export default LeaderboardPage
