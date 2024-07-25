import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Use useDispatch for actions
import { Link } from 'react-router-dom';
import { setUser } from '../app/authSlice';
import { RootState } from '../app/store';

const Navbar: React.FC = () => {
      const dispatch = useDispatch();
      const user = useSelector((state: RootState) => state.auth.user);

      const handleSignOut = async () => {
            sessionStorage.removeItem('token');
            dispatch(setUser(null));
      };

      return (
            <nav className='main-nav'>
                  <Link className='main-nav-logo' to='/'>
                        <img
                              className='main-nav-logo-image'
                              src='./img/argentBankLogo.png'
                              alt='Argent Bank Logo'
                        />
                        <h1 className='sr-only'>Argent Bank</h1>
                  </Link>
                  {user ? (
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
                                    <span className='sign-out'>Sign out</span>
                              </button>
                        </div>
                  ) : (
                        <div>
                              <Link className='main-nav-item' to='/login'>
                                    <i className='fa fa-user-circle'></i>
                                    Sign In
                              </Link>
                        </div>
                  )}
            </nav>
      );
};

export default Navbar;
