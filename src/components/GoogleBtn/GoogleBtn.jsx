import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { getGoogleOAuthUrl } from '../../services/googleOAuth';
import css from './GoogleBtn.module.css';

const GoogleBtn = () => {
  const handleGoogleLogin = async () => {
    try {
      const url = await getGoogleOAuthUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button className={css.googleBtn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.iconGoogle} /> Sign in with Google
    </button>
  );
};

export default GoogleBtn;

