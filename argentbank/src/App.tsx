import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ProfilPage from './components/ProfilePage';
import SignIn from './components/SignIn';

const Home: React.FC = () => {
      return (
            <>
                  <Navbar />
                  <main>
                        <Hero />
                        <Features />
                  </main>
                  <Footer/>
                  <SignIn/>
                  <ProfilPage/>
            </>
      );
}

export default Home;
