import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme';
import './styles.css'
import AppRouter from './components/AppRouter';

function App() {

  return (
    <>
    <CssBaseline/>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppRouter/>
        </Router>
      </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App