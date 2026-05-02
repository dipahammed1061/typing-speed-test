import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db, storage } from '../firebaseConfig'
import { useAlert } from '../Context/AlertContext'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

const UserInfo = ({ totalTestTaken }) => {
  const [user] = useAuthState(auth)
  const { setAlert } = useAlert()
  const [profile, setProfile] = useState({ photoURL: '', bio: '' })
  const [editingBio, setEditingBio] = useState(false)
  const [bioText, setBioText] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [nameText, setNameText] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    if (!user) return
    const displayName = user.displayName || user.email?.split('@')[0] || ''
    setNameText(displayName)
    db.collection('profiles').doc(user.uid).get().then(doc => {
      if (doc.exists) {
        const data = doc.data()
        setProfile(data)
        setBioText(data.bio || '')
      }
    })
  }, [user])

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setAlert({ open: true, type: 'error', message: 'Please select an image file' })
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setAlert({ open: true, type: 'error', message: 'Image must be under 2 MB' })
      return
    }
    setUploading(true)
    fileRef.current.value = ''
    try {
      const storageRef = storage.ref(`avatars/${user.uid}`)
      await storageRef.put(file)
      const photoURL = await storageRef.getDownloadURL()
      await db.collection('profiles').doc(user.uid).set({ photoURL, uid: user.uid }, { merge: true })
      setProfile(prev => ({ ...prev, photoURL }))
      setAlert({ open: true, type: 'success', message: 'Profile picture updated!' })
    } catch (e) {
      console.error('Photo upload error:', e)
      const msg = e?.code === 'storage/unauthorized'
        ? 'Permission denied — update your Firebase Storage rules to allow authenticated writes'
        : e?.message || 'Upload failed'
      setAlert({ open: true, type: 'error', message: msg })
    } finally {
      setUploading(false)
    }
  }

  const saveName = async () => {
    const trimmed = nameText.trim()
    if (!trimmed) return
    try {
      await user.updateProfile({ displayName: trimmed })
      await db.collection('profiles').doc(user.uid).set(
        { displayName: trimmed, uid: user.uid },
        { merge: true }
      )
      const lbDoc = await db.collection('Leaderboard').doc(user.uid).get()
      if (lbDoc.exists) {
        await db.collection('Leaderboard').doc(user.uid).update({ userName: trimmed })
      }
      setEditingName(false)
      setAlert({ open: true, type: 'success', message: 'Name updated!' })
    } catch {
      setAlert({ open: true, type: 'error', message: 'Failed to update name' })
    }
  }

  const saveBio = async () => {
    const trimmed = bioText.trim()
    await db.collection('profiles').doc(user.uid).set({ bio: trimmed }, { merge: true })
    setProfile(prev => ({ ...prev, bio: trimmed }))
    setEditingBio(false)
    setAlert({ open: true, type: 'success', message: 'Bio saved!' })
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="up-profile-card">

      {/* Avatar */}
      <div className="up-avatar-wrap" onClick={() => !uploading && fileRef.current.click()} title="Change profile photo">
        {profile.photoURL
          ? <img className="up-avatar-img" src={profile.photoURL} alt="avatar" />
          : <div className="up-avatar-fallback">{initial}</div>
        }
        <div className="up-avatar-overlay">
          {uploading
            ? <span className="up-uploading-dot" />
            : <CameraAltIcon style={{ fontSize: '1.3rem' }} />
          }
        </div>
      </div>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
      <div className="up-avatar-hint">click to change photo</div>

      {/* Display name */}
      {editingName ? (
        <div className="up-name-edit-wrap">
          <input
            className="up-name-input"
            value={nameText}
            onChange={e => setNameText(e.target.value)}
            maxLength={30}
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') { setEditingName(false); setNameText(displayName) } }}
          />
          <div className="up-name-actions">
            <button className="up-action-save" onClick={saveName}><CheckIcon style={{ fontSize: '0.9rem' }} />Save</button>
            <button className="up-action-cancel" onClick={() => { setEditingName(false); setNameText(displayName) }}><CloseIcon style={{ fontSize: '0.9rem' }} />Cancel</button>
          </div>
        </div>
      ) : (
        <div className="up-name-row">
          <span className="up-name">{displayName}</span>
          <button className="up-edit-icon-btn" onClick={() => setEditingName(true)} title="Edit name">
            <EditIcon style={{ fontSize: '0.85rem' }} />
          </button>
        </div>
      )}

      <div className="up-email">{user?.email}</div>

      <div className="up-divider" />

      {/* Meta stats */}
      <div className="up-meta-row">
        <div className="up-meta-item">
          <span className="up-meta-label">Joined</span>
          <span className="up-meta-value">{user?.metadata?.creationTime?.split(' ').slice(1, 4).join(' ')}</span>
        </div>
        <div className="up-meta-item">
          <span className="up-meta-label">Tests</span>
          <span className="up-meta-value">{totalTestTaken}</span>
        </div>
      </div>

      <div className="up-divider" />

      {/* Bio */}
      <div className="up-bio-section">
        <div className="up-bio-heading">Bio</div>
        {editingBio ? (
          <>
            <textarea
              className="up-bio-textarea"
              value={bioText}
              onChange={e => setBioText(e.target.value)}
              maxLength={160}
              placeholder="Write a short bio…"
              autoFocus
            />
            <div className="up-bio-actions">
              <span className="up-bio-count">{bioText.length}/160</span>
              <button className="up-action-cancel" onClick={() => { setEditingBio(false); setBioText(profile.bio || '') }}>Cancel</button>
              <button className="up-action-save" onClick={saveBio}>Save</button>
            </div>
          </>
        ) : (
          <div className="up-bio-display" onClick={() => setEditingBio(true)}>
            {profile.bio
              ? <span>{profile.bio}</span>
              : <span className="up-bio-empty">Add a short bio…</span>
            }
            <EditIcon className="up-bio-edit-icon" style={{ fontSize: '0.85rem' }} />
          </div>
        )}
      </div>

    </div>
  )
}

export default UserInfo
