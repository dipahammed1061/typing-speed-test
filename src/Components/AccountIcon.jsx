import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Alert, AppBar, Box, Modal, Tab, Tabs } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import GoogleButton from 'react-google-button';
import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center'
    }
}))


const AccountIcon = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [user] = useAuthState(auth);
    const {setAlert} = useAlert();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            setOpen(false);
        }
    }, [user]);

    const handleClose = ()=>{
        setOpen(false);
    }

    const handleSuccess = ()=>{
        setOpen(false);
    }

    const handleValueChange = (e,v)=>{
        setValue(v);
    }

    const handleOpen = ()=>{
        if(user){
            //routing because user is logged in;
            navigate('/user');
        }
        else{
            //no user, so open login/signup form
            setOpen(true);
        }
    }

    const logout = ()=>{
        auth.signOut().then((response)=>{
            setAlert({
                open: true,
                type: 'success',
                message: 'logged out'
            });
        }).catch(()=>{
            setAlert({
                open: true,
                type: 'error',
                message: 'not able to logout'
            });
        });
    }

    const signInWithGoogle = ()=>{
        signInWithPopup(auth,googleProvider).then(async(response)=>{
            const username = response.user.email;
            await db.collection('usernames').doc(username).set({
                uid: response.user.uid
            });
            setAlert({
                open: true,
                type: 'success',
                message: 'login successful'
            });
            handleSuccess();
        }).catch((err)=>{
            setAlert({
                open: true,
                type: 'error',
                message: 'google auth is not working'
            });
        });
    }

    const signInWithGithub = ()=>{
        signInWithPopup(auth, githubProvider).then(async(response)=>{
            const username = response.user.email.split('@')[0];
            await db.collection('usernames').doc(username).set({
                uid: response.user.uid
            });
            setAlert({
                open: true,
                type: 'success',
                message: 'login successful'
            });
        }).catch(()=>{
            setAlert({
                open: true,
                type: 'error',
                message: 'github auth is not working'
            });
        });
    }
    const {theme} = useTheme();
    const classes = useStyles();

  const displayName = user
    ? (user.displayName || user.email?.split('@')[0] || 'User')
    : null
  const initial = displayName ? displayName.charAt(0).toUpperCase() : ''

  return (
    <div className="account-controls">
        {user ? (
            <>
                <button className="account-profile-btn" onClick={handleOpen} title="My Profile">
                    <span className="account-avatar">{initial}</span>
                    <span className="account-name">{displayName}</span>
                </button>
                <button className="account-logout-btn" onClick={logout} title="Sign Out">
                    <LogoutIcon style={{ fontSize: '1rem' }} />
                    <span>Sign Out</span>
                </button>
            </>
        ) : (
            <button className="account-signin-btn" onClick={() => setOpen(true)}>
                <AccountCircleIcon style={{ fontSize: '1.1rem' }} />
                <span>Sign In</span>
            </button>
        )}

        <Modal
            open={open}
            onClose={handleClose}
            className={classes.modal}
        >
            <div className={classes.box}>
                <AppBar position='static'
                    style={{backgroundColor:'transparent'}}>
                    <Tabs
                        value={value}
                        onChange={handleValueChange}
                        variant='fullWidth'
                    >
                        <Tab label='login' style={{color: theme.title}}></Tab>
                        <Tab label='signup' style={{color: theme.title}}></Tab>
                    </Tabs>
                </AppBar>
                {value===0 && <LoginForm handleClose={handleSuccess}/>}
                {value===1 && <SignupForm handleClose={handleSuccess}/>}

                <Box>
                    <span>OR</span>
                    <GoogleButton
                        style={{width:'100%',marginTop:'8px'}}
                        onClick={signInWithGoogle}
                    />
                </Box>
            </div>
        </Modal>
    </div>
  )
}

export default AccountIcon