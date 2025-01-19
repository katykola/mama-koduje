import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box } from "@mui/material";
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { LanguageProvider } from '../contexts/LanguageContext';

const HomePage = lazy(() => import('../pages/HomePage'));
const HomePageEng = lazy(() => import('../pages/HomePageEng'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const AboutPageEng = lazy(() => import('../pages/AboutPageEng'));
const ReviewPage = lazy(() => import('../pages/ReviewPage'));
const ReviewPageEng = lazy(() => import('../pages/ReviewPageEng'));
const PostPage = lazy(() => import('../pages/PostPage'));
const PostPageEng = lazy(() => import('../pages/PostPageEng'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const PostDetailPageEng = lazy(() => import('../pages/PostDetailPageEng'));
const ReviewDetailPage = lazy(() => import('../pages/ReviewDetailPage'));
const ReviewDetailPageEng = lazy(() => import('../pages/ReviewDetailPageEng'));
const LoginPage = lazy(() => import('../admin/LoginPage'));
const PrivateRoute = lazy(() => import('../admin/PrivateRoute'));
const DashboardPage = lazy(() => import('../admin/DashboardPage'));

export default function AppRouter() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/auth';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const data = await getDocs(collection(db, "posts"));
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(filteredData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <LanguageProvider>
    <Box
      sx={{
        backgroundColor: "var(--primary-color)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      {!isLoginPage && !isAdminRoute && <Header />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/admin/*" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />

          <Route path="/eng" element={<Wrapper sx={{ flex: 1 }}><HomePageEng posts={posts} /></Wrapper>} />
          <Route path="/reviews" element={<Wrapper sx={{ flex: 1 }}><ReviewPageEng posts={posts} /></Wrapper>} />
          <Route path="/blog" element={<Wrapper sx={{ flex: 1 }}><PostPageEng posts={posts} /></Wrapper>} />
          <Route path="/about-me" element={<Wrapper sx={{ flex: 1 }}><AboutPageEng /></Wrapper>} />
          <Route path="/blog/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><PostDetailPageEng posts={posts} /></Wrapper>} />
          <Route path="/reviews/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><ReviewDetailPageEng posts={posts} /></Wrapper>} />

          <Route path="/" element={<Wrapper sx={{ flex: 1 }}><HomePage posts={posts} /></Wrapper>} />
          <Route path="/recenze" element={<Wrapper sx={{ flex: 1 }}><ReviewPage posts={posts} /></Wrapper>} />
          <Route path="/clanky" element={<Wrapper sx={{ flex: 1 }}><PostPage posts={posts} /></Wrapper>} />
          <Route path="/o-me" element={<Wrapper sx={{ flex: 1 }}><AboutPage /></Wrapper>} />
          <Route path="/clanky/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><PostDetailPage posts={posts} /></Wrapper>} />
          <Route path="/recenze/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><ReviewDetailPage posts={posts} /></Wrapper>} />

        </Routes>
      </Suspense>
      <Footer />
    </Box>
    </LanguageProvider>
  );
}