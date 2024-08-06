import React from 'react';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

/**
 * Renders the home page of the application.
 * Displays the navbar, hero section, features, and footer components.
 *
 * @returns The JSX representation of the home page.
 */
const Home: React.FC = () => {
      return (
            <>
                  <Navbar />
                  <main>
                        <Hero />
                        <Features />
                  </main>
                  <Footer />
            </>
      );
};

export default Home;
