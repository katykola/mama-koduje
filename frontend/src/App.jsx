import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import theme from './theme';
import './styles.css'
import Header from './components/Header'; // import axios from 'axios';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ReviewPage from './pages/ReviewPage';
import PostPage from './pages/PostPage';
import PostDetailPage from './pages/PostDetailPage';

function App() {

  return (
    <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <Router>
    <Header />
    <Wrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recenze" element={<ReviewPage />} />
          <Route path="/ze-zivota" element={<PostPage />} />
          <Route path="/o-me" element={<AboutPage />} />
          <Route path="/post" element={<PostDetailPage />} />

        </Routes>
    </Wrapper>
    <Footer />
    </Router>
    </ThemeProvider>
    </>
  )
}

export default App
