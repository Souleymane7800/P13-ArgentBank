import './App.css';
import Features from './components/Features';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
      return (
            <>
                  <Navbar />
                  <main>
                        <Hero />
                        <Features />
                  </main>
            </>
      );
}

export default App;
