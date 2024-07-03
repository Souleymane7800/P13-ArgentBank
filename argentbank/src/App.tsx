import './App.css';
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';


const Home: React.FC = () => {
      return (
            <>
                  <Navbar />
                  <main>
                        <Hero />
                        <Features />
                  </main>
                  <Footer/>
                 
            </>
      );
}

export default Home;
