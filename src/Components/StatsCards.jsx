import React from 'react'
import { useTheme } from '../Context/ThemeContext'

const StatsCards = ({ bestWPM, avgWPM, bestAccuracy, avgAccuracy, totalTests, bestScore }) => {
    const { theme } = useTheme()

    const cards = [
        { label: 'Best WPM',       value: bestWPM,       color: theme.title },
        { label: 'Avg WPM',        value: avgWPM,         color: theme.title,   dim: true },
        { label: 'Best Accuracy',  value: bestAccuracy,   color: '#4ade80', unit: '%' },
        { label: 'Avg Accuracy',   value: avgAccuracy,    color: '#4ade80', unit: '%', dim: true },
        { label: 'Total Tests',    value: totalTests,     color: theme.title },
        { label: 'Best Score',     value: bestScore,      color: '#f59e0b' },
    ]

    return (
        <div className='sc-grid'>
            {cards.map(card => (
                <div key={card.label} className={`sc-card${card.dim ? ' sc-card-dim' : ''}`}>
                    <div className='sc-label'>{card.label}</div>
                    <div className='sc-value' style={{ color: card.color }}>
                        {card.value || 0}
                        {card.unit && <span className='sc-unit'>{card.unit}</span>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatsCards
