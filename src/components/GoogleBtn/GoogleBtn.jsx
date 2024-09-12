import React from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { getGoogleOAuthUrl } from '../../service/googleOAuth';
import css from './GoogleBtn.module.css';

const GoogleBtn = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'client_id=YOUR_CLIENT_ID&' +
      'redirect_uri=https://project-water-bac.onrender.com/auth/google/callback&' +
      'scope=email profile&' +
      'response_type=code&' +
      'access_type=offline&' +
      'include_granted_scopes=true';
  };

  return (
    <button className={css.googleBtn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.iconGoogle} /> Sign in with Google
    </button>
  );
};

export default GoogleBtn;

