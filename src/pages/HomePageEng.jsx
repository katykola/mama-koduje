import { Box, Button, Stack, Typography, Link, Grid, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import ReviewTile from '../components/ReviewTile';
import PostTile from '../components/PostTile';
import Icons from '../components/Icons';
import katyVeSlunci from '../assets/images/katy-ve-slunci300.jpg'; 
import katyUStolu from '../assets/images/katerina-kolarova.jpg';
import theme from '../styles/theme';


export default function HomePageEng({posts}) {

    const postsWithoutAuthor = posts.filter(post => !post.author);
    const reviewsEng = posts.filter(post => post.author && post.perex_eng);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>        
      <Stack spacing={6}>
        {isMobile ? 
        <>
          <Stack spacing={2}>
            <Typography variant='h1'>My name is Katy, and I started programming while on maternity leave.</Typography>
            <Typography variant='body1'>
            Hi, I’m a mom, marketer, knitting enthusiast, lover of road trips, the Alps, and now, a budding programmer.
            </Typography>
            <Typography variant='body1'>
            At first, I shared my <b>wins and struggles</b> only on Instagram. Later, during a Czechitas course, I created the first version of this blog.
            </Typography>
            <Typography variant='body1'>
            Mom Codes is <b>close to my heart.</b> It has connected me with interesting people and allowed me to preserve countless memories of my little girl.
            </Typography>
            <Typography variant='body1'>
            Here, you’ll find <b>reviews of courses</b> I’ve taken, as well as articles about my life—not just as a mom.
            </Typography>
            <Stack sx={{ alignItems: 'end' }}><Button variant='contained'><Link component={RouterLink} to='/o-me' style={{ textDecoration: 'none', color: 'white' }}>More about me</Link></Button></Stack>
            <Box
                  component="img"
                  sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover', 
                      objectPosition: 'center', 
                      padding: '1rem 1rem 0 1rem'
                  }}
                  alt="Katerina Kolarova"
                  src={katyUStolu}
              />  
          </Stack>
        </>
        : 
        <MainImage imgSrc="/littlehand_desktop.jpg"/> }

        <Stack spacing={2}>
          <Typography variant="sectionTitle">Course and bootcamp reviews </Typography>
          <Grid container spacing={2} sx={{position: 'relative', right: '1rem'}}>
            {reviewsEng.slice(0, 3).map((post, index) => (
              <Grid item xs={12} sm={4} key={post.id} sx={{ display: 'flex', mb: '1rem' }}>
                <ReviewTile
                  key={post.id}
                  id={post.id}
                  urlTitle={post.urlTitle}
                  tags={post.tags}
                  rating={post.rating}
                  title={post.title}  
                  author={post.author}
                  perex={post.perex}
                  sx={{ width: '100%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                />
              </Grid>
            ))}
          </Grid>
              <Stack sx={{ justifyContent: "center", alignItems: "flex-end"}}>
              <Link component={RouterLink} to='/recenze'><Button variant="contained" style={{ margin: '1rem 0' }}>Show all reviews</Button></Link>
              </Stack>
        </Stack>

        <Grid container>

            <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                    <Typography variant='sectionTitle'>ON LIFE</Typography>
                    {postsWithoutAuthor.slice(0, 4).map((post) => (
                    <PostTile key={post.id} imgSrc={post.image} id={post.id} title={post.title_eng} urlTitle={post.urlTitle_eng} date={post.date} perex={post.perex_eng}/>
                    ))}
                </Stack>
            </Grid>

            <Grid item xs={12} md={6} >
            <Stack spacing={4} sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
                {!isMobile && 
                  <>
                <Typography variant='sectionTitle' sx={{ paddingTop: {xs: '2rem', md: 0}}}>About me</Typography>
                {!isTablet &&
                <Box
                  component="img"
                  sx={{
                      width: '100%',
                      aspectRatio: '1/1',
                      objectFit: 'cover', 
                      objectPosition: 'center', 
                  }}
                  alt="placeholder"
                  src={katyVeSlunci}
              />                
                }
              <Typography variant='body1'>
                Hi, I’m Katy — a mom, marketer, knitting enthusiast, road trips lover, and a web app developer.
                </Typography>
                <Typography variant='body1'>
                At first, I shared my wins and struggles only on Instagram. Later, during a Czechitas course, I created the first version of this blog. 
                </Typography>
                <Typography variant='body1'>
                Mom Codes is close to my heart. Thanks to this project I was able to meet interesting people and preserve priceless memories of my little girl.
                </Typography>
                <Typography variant='body1'>
                Here, you’ll find reviews of courses I’ve taken, as well as articles about my life — not just as a mom.
                </Typography>
                <Stack sx={{ alignItems: 'end' }} style={{ margin: '2rem 0' }}><Button variant='contained'><Link component={RouterLink} to='/o-me' style={{ textDecoration: 'none', color: 'white' }}>More about me</Link></Button></Stack>
              </>
              }
            </Stack>
            {!isMobile &&
            <Stack spacing={2}  sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
                <Typography variant='sectionTitle' sx={{ paddingTop: {xs: '2rem', md: 0}}}>Follow me</Typography>
                <Box sx={{borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
                  <Icons/>
                </Box>
            </Stack>
    }

            </Grid>
             
        </Grid>

      </Stack>


        </>
    )
} 