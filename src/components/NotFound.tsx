import React from 'react';

/**
 * Renders the 404 Not Found page.
 * Displays an error message and the application logo.
 *
 * @returns The JSX representation of the 404 page.
 */
const NotFound: React.FC = () => {
      return (
            <div className='not-found'>
                  <div>
                        <img
                              className='main-nav-logo-image'
                              src='./img/argentBankLogo.png'
                              alt='Argent Bank Logo'
                        />
                  </div>
                  <h1>404 - Not Found</h1>
                  <p>The page you are looking for does not exist.</p>
            </div>
      );
};

export default NotFound;
