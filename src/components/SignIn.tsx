import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginPayload, loginUser } from '../app/authSlice';
import { useAppDispatch } from '../app/hook';

/**
 * Renders the sign-in form for the application.
 * Allows users to enter their email and password to log in.
 * Displays error messages if login fails.
 *
 * @returns {JSX.Element} The JSX representation of the sign-in form.
 */
const SignIn: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [errorMessage, setErrorMessage] = useState('');
      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      /**
       * Handles form submission for sign-in.
       * Dispatches the `loginUser` action with user credentials.
       * Navigates to the profile page on successful login.
       * Displays error messages based on the login response.
       *
       * @param {React.FormEvent<HTMLFormElement>} event The form submission event.
       */
      const handleFormSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            setErrorMessage('');
            try {
                  const payload: LoginPayload = { email, password };

                  const result = await dispatch(loginUser(payload)).unwrap();
                  console.log('Login successful');

                  if (result && result.body && result.body.token) {
                        navigate('/profile');
                  } else {
                        console.log('JWT token not found in the result');
                        setErrorMessage(
                              'Login failed. Please check your credentials.'
                        );
                  }

                  // const tokenFromSessionStorage =
                  //       sessionStorage.getItem('token');
                  // console.log(
                  //       'Token from sessionStorage:',
                  //       tokenFromSessionStorage
                  // );
            } catch (error) {
                  console.error('Login error:', error);
                  if (typeof error === 'string') {
                        setErrorMessage(error);
                  } else {
                        setErrorMessage(
                              'An unknown error occurred. Please try again.'
                        );
                  }
            }
      };

      return (
            <div className='main-container'>
                  <nav className='main-nav'>
                        <Link className='main-nav-logo' to='/'>
                              <img
                                    className='main-nav-logo-image'
                                    src='/img/argentBankLogo.png'
                                    alt='Argent Bank Logo'
                              />
                              <h1 className='sr-only'>Argent Bank</h1>
                        </Link>
                        <div>
                              <a className='main-nav-item' href='/sign-in'>
                                    <i className='fa fa-user-circle'></i>
                                    Sign In
                              </a>
                        </div>
                  </nav>
                  <main className='main bg-dark'>
                        <section className='sign-in-content'>
                              <i className='fa fa-user-circle sign-in-icon'></i>
                              <h1>Sign In</h1>
                              <form onSubmit={handleFormSubmit}>
                                    <div className='input-wrapper'>
                                          <label htmlFor='email'>Email</label>
                                          <input
                                                type='text'
                                                id='email'
                                                value={email}
                                                onChange={(e) =>
                                                      setEmail(e.target.value)
                                                }
                                                placeholder='Email'
                                          />
                                    </div>
                                    <div className='input-wrapper'>
                                          <label htmlFor='password'>
                                                Password
                                          </label>
                                          <input
                                                type='password'
                                                id='password'
                                                value={password}
                                                onChange={(e) =>
                                                      setPassword(
                                                            e.target.value
                                                      )
                                                }
                                                placeholder='Password'
                                          />
                                    </div>
                                    <div className='input-remember'>
                                          <input
                                                type='checkbox'
                                                id='remember-me'
                                          />
                                          <label htmlFor='remember-me'>
                                                Remember me
                                          </label>
                                    </div>
                                    <button
                                          className='sign-in-button'
                                          type='submit'
                                    >
                                          Sign In
                                    </button>
                                    {errorMessage && (
                                          <div
                                                className='error-message'
                                                style={{
                                                      color: 'red',
                                                      marginTop: '10px',
                                                }}
                                          >
                                                {errorMessage}
                                          </div>
                                    )}
                              </form>
                        </section>
                  </main>
                  <footer className='footer'>
                        <p className='footer-text'>
                              Copyright 2020 Argent Bank
                        </p>
                  </footer>
            </div>
      );
};

export default SignIn;
