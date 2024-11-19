import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header'; 
import AdminHeader from '../admin/AdminHeader';
import Footer from './Footer';
import Wrapper from './Wrapper';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ReviewPage from '../pages/ReviewPage';
import PostPage from '../pages/PostPage';
import PostDetailPage from '../pages/PostDetailPage';
import LoginPage from '../admin/LoginPage';
import PrivateRoute from '../admin/PrivateRoute';
import DashboardPage from '../admin/DashboardPage';

export default function AppRouter(){

    const location = useLocation();
    const isLoginPage = location.pathname === '/auth';
    const isAdminRoute = location.pathname.startsWith('/admin');
    const { currentUser } = useAuth();

    return (
        <>
    {!isLoginPage && !currentUser && < Header />}
    {isAdminRoute && <AdminHeader />}
        <Wrapper>
            <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/admin">
                <Route index element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/recenze" element={<ReviewPage />} />
            <Route path="/ze-zivota" element={<PostPage />} />
            <Route path="/o-me" element={<AboutPage />} />
            <Route path="/post" element={<PostDetailPage />} /> 
            </Routes>
        </Wrapper>
        <Footer />
        </>
    )
}