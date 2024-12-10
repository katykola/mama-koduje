import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box } from "@mui/material";
import Header from '../components/Header'; 
import Footer from '../components/Footer';
import Wrapper from '../components/Wrapper';
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ReviewPage = lazy(() => import('../pages/ReviewPage'));
const PostPage = lazy(() => import('../pages/PostPage'));
const PostDetailPage = lazy(() => import('../pages/PostDetailPage'));
const ReviewDetailPage = lazy(() => import('../pages/ReviewDetailPage'));
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
          <Route path="/" element={<Wrapper sx={{ flex: 1 }}><HomePage posts={posts} /></Wrapper>} />
          <Route path="/recenze" element={<Wrapper sx={{ flex: 1 }}><ReviewPage posts={posts} /></Wrapper>} />
          <Route path="/ze-zivota" element={<Wrapper sx={{ flex: 1 }}><PostPage posts={posts} /></Wrapper>} />
          <Route path="/o-me" element={<Wrapper sx={{ flex: 1 }}><AboutPage /></Wrapper>} />
          <Route path="/post/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><PostDetailPage posts={posts} /></Wrapper>} />
          <Route path="/recenze/:urlTitle" element={<Wrapper sx={{ flex: 1 }}><ReviewDetailPage posts={posts} /></Wrapper>} />
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
}