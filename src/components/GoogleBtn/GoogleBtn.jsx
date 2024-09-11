import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getGoogleOAuthUrl } from '../../service/googleOAuth';
import css from './GoogleBtn.module.css';

const GoogleBtn = () => {
  const handleGoogleLogin = async () => {
    window.location.href = 'https://aquatrack-one.vercel.app/auth/google'; // Redirect to backend for Google auth
  };

  return (
    <button className={css.googleBtn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.iconGoogle} /> Sign in with Google
    </button>
  );
};

export default GoogleBtn;

