import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import theme from './styles/theme';
import './styles/styles.css'
import ScrollToTop from './routing/ScrollToTop';
import AppRouter from './routing/AppRouter';



function App() {

  return (
    <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <ScrollToTop/>
          <AppRouter/>
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
