import React, { useEffect } from 'react'
import Graph from './Graph'
import { db, auth } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'
import { useAuthState } from 'react-firebase-hooks/auth'
import RefreshIcon from '@mui/icons-material/Refresh'

const Stats = ({ wpm, resetTest, accuracy, correctChars, incorrectChars, missedChars, extraChars, graphData }) => {

    var timeSet = new Set()
    const { setAlert } = useAlert()

    const newGraph = graphData.filter((i) => {
        if (!timeSet.has(i[0])) {
            timeSet.add(i[0])
            return i
        }
    })

    const [user] = useAuthState(auth)

    const pushResultToDatabase = () => {
        const { uid, displayName, email } = auth.currentUser
        const userName = displayName || (email ? email.split('@')[0] : 'Anonymous')

        if (!isNaN(accuracy)) {
            const adjustedScore = Math.round(wpm * accuracy / 100)

            // 1. Save individual result as before
            db.collection('Results').add({
                wpm,
                accuracy,
                characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
                userID: uid,
                userName,
                timeStamp: new Date(),
            }).then(() => {
                setAlert({ open: true, type: 'success', message: 'Result saved!' })
            })

            // 2. Update Leaderboard collection — one document per user, tracks personal best
            const lbRef = db.collection('Leaderboard').doc(uid)
            lbRef.get().then((doc) => {
                const prev = doc.exists ? doc.data() : null
                const prevScore = prev?.adjustedScore || 0
                const prevTests = prev?.totalTests || 0

                if (!prev || adjustedScore > prevScore) {
                    // New personal best — overwrite the entry
                    lbRef.set({
                        userName,
                        userID: uid,
                        bestWPM: wpm,
                        bestAccuracy: accuracy,
                        adjustedScore,
                        totalTests: prevTests + 1,
                        lastUpdated: new Date(),
                    })
                } else {
                    // Not a new best — just increment test count and refresh name
                    lbRef.update({
                        totalTests: prevTests + 1,
                        userName,
                        lastUpdated: new Date(),
                    })
                }
            })
        } else {
            setAlert({ open: true, type: 'error', message: 'Invalid test — not saved.' })
        }
    }

    useEffect(() => {
        if (user) {
            pushResultToDatabase()
        } else {
            setAlert({ open: true, type: 'warning', message: 'Login to save results' })
        }
    }, [])

    return (
        <div className="stats-box">

            <div className="left-stats">

                <div>
                    <div className="title">WPM</div>
                    <div className="subtitle">{wpm}</div>
                </div>

                <div>
                    <div className="title">Accuracy</div>
                    <div className="subtitle">{accuracy}<span style={{ fontSize: '1.4rem', fontWeight: 500 }}>%</span></div>
                </div>

                <div>
                    <div className="title">Characters</div>
                    <div className="subtitle-sm">
                        <span style={{ color: '#4ade80' }}>{correctChars}</span>
                        <span style={{ opacity: 0.4 }}> / </span>
                        <span style={{ color: '#f55353' }}>{incorrectChars}</span>
                        <span style={{ opacity: 0.4 }}> / </span>
                        <span style={{ opacity: 0.5 }}>{missedChars}</span>
                        <span style={{ opacity: 0.4 }}> / </span>
                        <span style={{ opacity: 0.5 }}>{extraChars}</span>
                    </div>
                    <div className="title" style={{ marginTop: '0.3rem' }}>
                        correct / wrong / missed / extra
                    </div>
                </div>

                <div
                    className="restart-btn"
                    onClick={resetTest}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && resetTest()}
                >
                    <RefreshIcon style={{ fontSize: '1rem' }} />
                    Restart
                </div>

            </div>

            <div className="right-stats">
                <Graph graphData={newGraph} />
            </div>

        </div>
    )
}

export default Stats
