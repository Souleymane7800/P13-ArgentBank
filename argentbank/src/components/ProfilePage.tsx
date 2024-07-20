import { RootState } from '@reduxjs/toolkit/query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../app/authSlice';

// import './css/main.css';
interface User {
      _id: string;
      email: string;
      firstName: string;
      lastName: string;
      createdAt: string;
      updatedAt: string;
}

interface ServerResponse {
      status: number;
      message: string;
      body: User;
}

const FetchUserProfile: React.FC = () => {
      const [updatedFirstName, setUpdatedFirstName] = useState('');
      const [updatedLastName, setUpdatedLastName] = useState('');
      const [isEditing, setIsEditing] = useState(false);
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const user = useSelector((state: RootState) => state.auth.user);
      console.log(user);

      useEffect(() => {
            const fetchUserProfile = async () => {
                  try {
                        const token = localStorage.getItem('token');
                        console.log('Token from localStorage', token);

                        if (!token) {
                              console.log('No token find in localStorage');
                              navigate('/');
                        }

                        console.log('Fetching user profile');
                        console.log('Token used:', token);
                        const response = await axios.post<ServerResponse>(
                              'http://localhost:3001/api/v1/user/profile',
                              {},
                              {
                                    headers: {
                                          Authorization: `Bearer ${token}`,
                                    },
                              }
                        );

                        console.log('Response from server:', response.data);
                        dispatch(setUser(response.data.body));
                        console.log('User profile fetched successfully');
                  } catch (error) {
                        console.error('Error fetching user profile:', error);
                        console.log('Failed to fetch user profile');
                  }
            };
            fetchUserProfile();
      }, [dispatch, navigate]);

      const handleEdit = () => {
            setUpdatedFirstName(user?.firstName || '');
            setUpdatedLastName(user?.lastName || '');
            setIsEditing(true);
      };

      const handleSaveProfile = async () => {
            try {
                  const token = localStorage.getItem('token');
                  if (!token) {
                        console.log('No token found in localStorage');
                        return;
                  }

                  const response = await axios.put(
                        'http://localhost:3001/api/v1/user/profile',
                        {
                              firstName: updatedFirstName,
                              lastName: updatedLastName,
                        },
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        }
                  );

                  console.log('Profile updated successfully:', response.data);
                  dispatch(setUser(response.data.body));
                  setIsEditing(false);
            } catch (error) {
                  console.error('Error updating profile:', error);
            }
      };

      const handleCancelUpdate = () => {
            setIsEditing(false);
      };

      const handleSignOut = () => {
            console.log('Signing out...');
            localStorage.removeItem('token');
            console.log('Token removed from localStorage');
            dispatch(setUser(null)); // Clear the user in Redux store
            dispatch(setToken(null)); // Clear the token in Redux store
            console.log('User state cleared');
            console.log('User state cleared');
            navigate('/');
            console.log('Navigated to the index page');
      };

      return (
            <>
                  <nav className='main-nav'>
                        <Link className='main-nav-logo' to='/'>
                              <img
                                    className='main-nav-logo-image'
                                    src='./img/argentBankLogo.png'
                                    alt='Argent Bank Logo'
                              />
                              <h1 className='sr-only'>Argent Bank</h1>
                        </Link>
                        <div>
                              <Link className='main-nav-item' to='/profile'>
                                    <i className='fa fa-user-circle'></i>
                                    {user?.firstName}
                              </Link>
                              <button
                                    className='main-nav-item'
                                    onClick={handleSignOut}
                              >
                                    <i className='fa fa-sign-out'></i>
                                    Sign Out
                              </button>
                        </div>
                  </nav>
                  <main className='main bg-dark'>
                        <div className='header'>
                              {isEditing ? (
                                    <>
                                          <h1>Welcome back</h1>
                                          <div>
                                                <input
                                                      type='text'
                                                      value={updatedFirstName}
                                                      onChange={(e) =>
                                                            setUpdatedFirstName(
                                                                  e.target.value
                                                            )
                                                      }
                                                />
                                                <input
                                                      type='text'
                                                      value={updatedLastName}
                                                      onChange={(e) =>
                                                            setUpdatedLastName(
                                                                  e.target.value
                                                            )
                                                      }
                                                />
                                          </div>
                                          <div>
                                                <button
                                                      className='edit-button'
                                                      onClick={
                                                            handleSaveProfile
                                                      }
                                                >
                                                      Save
                                                </button>
                                                <button
                                                      className='edit-button'
                                                      onClick={
                                                            handleCancelUpdate
                                                      }
                                                >
                                                      Cancel
                                                </button>
                                          </div>
                                    </>
                              ) : (
                                    <>
                                          <h1>Welcome Back</h1>
                                          <br />
                                          <p>
                                                {user?.firstName}{' '}
                                                {user?.lastName}!
                                          </p>

                                          <button
                                                className='edit-button'
                                                onClick={handleEdit}
                                          >
                                                Edit name
                                          </button>
                                    </>
                              )}
                        </div>
                        <h2 className='sr-only'>Accounts</h2>
                        <section className='account'>
                              <div className='account-content-wrapper'>
                                    <h3 className='account-title'>
                                          Argent Bank Checking (x8349)
                                    </h3>
                                    <p className='account-amount'>$2,082.79</p>
                                    <p className='account-amount-description'>
                                          Available Balance
                                    </p>
                              </div>
                              <div className='account-content-wrapper cta'>
                                    <button className='transaction-button'>
                                          View transactions
                                    </button>
                              </div>
                        </section>
                        <section className='account'>
                              <div className='account-content-wrapper'>
                                    <h3 className='account-title'>
                                          Argent Bank Savings (x6712)
                                    </h3>
                                    <p className='account-amount'>$10,928.42</p>
                                    <p className='account-amount-description'>
                                          Available Balance
                                    </p>
                              </div>
                              <div className='account-content-wrapper cta'>
                                    <button className='transaction-button'>
                                          View transactions
                                    </button>
                              </div>
                        </section>
                        <section className='account'>
                              <div className='account-content-wrapper'>
                                    <h3 className='account-title'>
                                          Argent Bank Credit Card (x8349)
                                    </h3>
                                    <p className='account-amount'>$184.30</p>
                                    <p className='account-amount-description'>
                                          Current Balance
                                    </p>
                              </div>
                              <div className='account-content-wrapper cta'>
                                    <button className='transaction-button'>
                                          View transactions
                                    </button>
                              </div>
                        </section>
                  </main>
                  <footer className='footer'>
                        <p className='footer-text'>
                              Copyright 2020 Argent Bank
                        </p>
                  </footer>
            </>
      );
};

export default FetchUserProfile;
