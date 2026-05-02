import React from 'react'

const EncouragementToast = ({ toasts }) => {
    return (
        <div className="encourage-space">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className="encourage-toast"
                    style={{ left: `${t.x}%`, top: `${t.y}%` }}
                >
                    <span className="encourage-emoji">{t.emoji}</span>
                    <span className="encourage-text">{t.text}</span>
                </div>
            ))}
        </div>
    )
}

export default EncouragementToast
