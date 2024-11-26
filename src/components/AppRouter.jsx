import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box } from "@mui/material";
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
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AppRouter(){

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
    };
  
    useEffect(() => {
      getPosts();
    }, []);

 
    const handlePostSelect = (id) => {
      console.log('Selected Post ID:', id);
      setSelectedPostId(id);
    };

    return (
        <>
    <Box
     sx={{
        backgroundColor: "var(--primary-color)",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", 
        justifyContent: "space-between",
      }}
    >
        {!isLoginPage && !currentUser && < Header />}
        {isAdminRoute && <AdminHeader />}
            <Wrapper sx={{flex: 1}}>
                <Routes>
                <Route path="/auth" element={<LoginPage />} />
                <Route path="/admin">
                    <Route index element={
                        <PrivateRoute>
                            <DashboardPage />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path="/" element={<HomePage posts={posts} handlePostSelect={handlePostSelect} />} />
                <Route path="/recenze" element={<ReviewPage posts={posts} handlePostSelect={handlePostSelect} />} />
                <Route path="/ze-zivota" element={<PostPage posts={posts} handlePostSelect={handlePostSelect}/>} />
                <Route path="/o-me" element={<AboutPage />} />
                <Route path="/post/:id" element={<PostDetailPage posts={posts} handlePostSelect={handlePostSelect}/>} />                
                </Routes>
            </Wrapper>
            <Footer />
    </Box>
        </>
    )
}