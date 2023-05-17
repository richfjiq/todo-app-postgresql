import { MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useForm } from '../hooks';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

type AuthResponse = {
  email?: string;
  token?: string;
  message?: string;
};

export const Auth = () => {
  const [, setCookie] = useCookies(['Email', 'AuthToken']);
  const [isLogin, setIsLogin] = useState(true);
  const { email, password, confirmPassword, handleChange } = useForm<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const viewLogin = (status: boolean) => {
    setError('');
    setIsLogin(status);
  };

  const handleSubmit = async (
    e: MouseEvent<HTMLInputElement>,
    endpoint: string
  ) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );

    const data: AuthResponse = await response.json();

    if (response.status === 403 || response.status === 404) {
      setError(data.message ?? '');
      return;
    }

    setCookie('Email', data.email);
    setCookie('AuthToken', data.token);

    window.location.reload();
  };

  return (
    <div className="auth_container">
      <div className="auth_container_box">
        <form>
          <h2>{isLogin ? 'Please log in' : 'Please sign up'}</h2>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              onChange={handleChange}
              value={confirmPassword}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}
          />
          {error && <p>{error}</p>}
        </form>
        <div className="auth_options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? 'rgb(255, 255, 255)'
                : 'rgb(188, 188, 188)',
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
