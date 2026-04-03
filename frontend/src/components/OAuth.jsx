import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Google auth backend error:', res.status, text);
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (data.token) {
        document.cookie = `access_token=${data.token}; path=/`;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='w-full rounded-xl border border-slate-700 bg-slate-900/75 px-4 py-3 text-sm font-semibold text-slate-100 hover:border-indigo-400/50 hover:bg-slate-800/80 transition'
    >
      Continue with Google
    </button>
  );
}