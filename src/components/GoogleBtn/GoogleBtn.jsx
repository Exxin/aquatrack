import React from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { getGoogleOAuthUrl } from '../../service/googleOAuth';
import css from './GoogleBtn.module.css';

const GoogleBtn = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      'client_id=1023602385270-fvjc183aqggcs1q49l8090rtjqg2nvus.apps.googleusercontent.com&' +
      'redirect_uri=https://test-aquatrack-backend.onrender.com/auth/google/callback&' +
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

