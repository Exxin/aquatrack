import React from 'react';
import { FcGoogle } from 'react-icons/fc';
// import { getGoogleOAuthUrl } from '../../service/googleOAuth';
import css from './GoogleBtn.module.css';

const GoogleBtn = () => {
const handleGoogleLogin = () => {
  const clientId = '1023602385270-fvjc183aqggcs1q49l8090rtjqg2nvus.apps.googleusercontent.com';
  const redirectUri = 'https://aquatrack-one.vercel.app/auth/google/callback';
  const scope = 'email profile';
  const responseType = 'code';
  const accessType = 'offline';
  const includeGrantedScopes = 'true';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(clientId)}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=${encodeURIComponent(scope)}&` +
    `response_type=${encodeURIComponent(responseType)}&` +
    `access_type=${encodeURIComponent(accessType)}&` +
    `include_granted_scopes=${encodeURIComponent(includeGrantedScopes)}`;

  window.location.href = authUrl;
};

  return (
    <button className={css.googleBtn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.iconGoogle} /> Sign in with Google
    </button>
  );
};

export default GoogleBtn;

