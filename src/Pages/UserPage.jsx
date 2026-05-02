import React, { useEffect, useMemo, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import ResultTable from '../Components/ResultTable'
import Graph from '../Components/Graph'
import UserInfo from '../Components/UserInfo'
import StatsCards from '../Components/StatsCards'
import { useTheme } from '../Context/ThemeContext'
import { CircularProgress } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const UserPage = () => {
    const [data, setData] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [user, loading] = useAuthState(auth)
    const { theme } = useTheme()
    const navigate = useNavigate()

    const fetchUserData = () => {
        const { uid } = auth.currentUser
        db.collection('Results')
            .where('userID', '==', uid)
            .orderBy('timeStamp', 'desc')
            .get()
            .then(snapshot => {
                const tempData = snapshot.docs.map(doc => ({ ...doc.data() }))
                setData(tempData)
                setDataLoading(false)
            })
    }

    useEffect(() => {
        if (!loading && user) {
            fetchUserData()
        }
    }, [loading])

    const { totalTests, avgWPM, avgAccuracy, bestWPM, bestAccuracy, bestScore, wpmGraphData, accGraphData } = useMemo(() => {
        const n = data.length
        if (n === 0) return { totalTests: 0, avgWPM: 0, avgAccuracy: 0, bestWPM: 0, bestAccuracy: 0, bestScore: 0, wpmGraphData: [], accGraphData: [] }
        const reversed = [...data].reverse()
        return {
            totalTests:   n,
            avgWPM:       Math.round(data.reduce((s, d) => s + d.wpm, 0) / n),
            avgAccuracy:  Math.round(data.reduce((s, d) => s + d.accuracy, 0) / n),
            bestWPM:      Math.max(...data.map(d => d.wpm)),
            bestAccuracy: Math.max(...data.map(d => d.accuracy)),
            bestScore:    Math.max(...data.map(d => Math.round(d.wpm * d.accuracy / 100))),
            wpmGraphData: reversed.map(d => [d.timeStamp, d.wpm]),
            accGraphData: reversed.map(d => [d.timeStamp, d.accuracy]),
        }
    }, [data])

    if (!loading && !user) {
        return <div className='center-of-screen'><span>Login to view your profile!</span></div>
    }

    if (loading || dataLoading) {
        return <div className='center-of-screen'><CircularProgress size={80} /></div>
    }

    return (
        <div className='up-page'>

            {/* Top bar */}
            <div className='up-topbar'>
                <button className='lb-back-btn' onClick={() => navigate('/')}>
                    <ArrowBackIcon style={{ fontSize: '1rem' }} />
                    Home
                </button>
                <span className='up-page-title'>My Profile</span>
                <div style={{ width: '80px' }} />
            </div>

            {/* Main two-column body */}
            <div className='up-body'>

                {/* Left sidebar: profile card */}
                <div className='up-sidebar'>
                    <UserInfo totalTestTaken={totalTests} />
                </div>

                {/* Right content: stats + charts */}
                <div className='up-content'>
                    <StatsCards
                        bestWPM={bestWPM}
                        avgWPM={avgWPM}
                        bestAccuracy={bestAccuracy}
                        avgAccuracy={avgAccuracy}
                        totalTests={totalTests}
                        bestScore={bestScore}
                    />

                    {totalTests > 0 && (
                        <div className='up-charts'>
                            <div className='up-chart-box'>
                                <div className='up-chart-label'>WPM over time</div>
                                <Graph graphData={wpmGraphData} type='date' label='WPM' />
                            </div>
                            <div className='up-chart-box'>
                                <div className='up-chart-label'>Accuracy over time</div>
                                <Graph graphData={accGraphData} type='date' label='Accuracy %' color='#4ade80' />
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Test history */}
            {totalTests > 0 ? (
                <div className='up-history'>
                    <div className='up-section-title'>Test History</div>
                    <ResultTable data={data} />
                </div>
            ) : (
                <div className='up-no-tests'>
                    Take some tests to see your stats and charts here!
                </div>
            )}

        </div>
    )
}

export default UserPage
