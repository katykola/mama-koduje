import { Box, Button, Stack, Typography, Link, Grid, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import ReviewTile from '../components/ReviewTile';
import PostTile from '../components/PostTile';
import Icons from '../components/Icons';
import katyVeSlunci from '../assets/images/katy-ve-slunci300.jpg'; 
import katyUStolu from '../assets/images/katerina-kolarova.jpg';
import theme from '../styles/theme';


export default function HomePage({posts}) {

    const postsWithAuthor = posts.filter(post => post.author);
    const postsWithoutAuthor = posts.filter(post => !post.author);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>        
      <Stack spacing={6}>
        {isMobile ? 
        <>
          <Stack spacing={2}>
            <Typography variant='h1'>Jsem Katy a na mateřské jsem začala programovat</Typography>
            <Typography variant='body1'>
            Ahoj, jsem máma, markeťačka, milovnice pletení, cestování autem, Alp a nově taky programátorka.
            </Typography>
            <Typography variant='body1'>
            Svoje <b>výhry a prohry</b> jsem nejdřív sdílela jen na Instagramu. Později jsem v kurzu u Czechitas vytvořila první verzi tohoto blogu.
            </Typography>
            <Typography variant='body1'>
            Máma kóduje je <b>blízká mému srdci</b>. Potkala jsem díky ní zajímavé lidi, ale taky si uchovala spoustu vzpomínek na mou holčičku.
            </Typography>
            <Typography variant='body1'>
            Najdete tu <b>recenze na kurzy</b>, které jsem absolvovala, ale taky <b>články</b> o mém nejen mateřském životě.
            </Typography>
            <Stack sx={{ alignItems: 'end' }}><Button variant='contained'><Link component={RouterLink} to='/o-me' style={{ textDecoration: 'none', color: 'white' }}>Více o mě</Link></Button></Stack>
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
          <Typography variant="sectionTitle">RECENZE KURZŮ, BOOTCAMPŮ A KNIH </Typography>
          <Grid container spacing={2} sx={{position: 'relative', right: '1rem'}}>
            {postsWithAuthor.slice(0, 3).map((post, index) => (
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
              <Link component={RouterLink} to='/recenze'><Button variant="contained" style={{ margin: '1rem 0' }}>Zobrazit všechny recenze</Button></Link>
              </Stack>
        </Stack>

        <Grid container>

            <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                    <Typography variant='sectionTitle'>POSTŘEHY ZE ŽIVOTA</Typography>
                    {postsWithoutAuthor.slice(0, 4).map((post) => (
                    <PostTile key={post.id} imgSrc={post.image} id={post.id} title={post.title} urlTitle={post.urlTitle} date={post.date} perex={post.perex}/>
                    ))}
                </Stack>
            </Grid>

            <Grid item xs={12} md={6} >
            <Stack spacing={4} sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
                {!isMobile && 
                  <>
                <Typography variant='sectionTitle' sx={{ paddingTop: {xs: '2rem', md: 0}}}>O mě</Typography>
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
                Ahoj, jsem Katy. Máma, markeťačka, milovnice pletení, cestování autem, Alp a nově taky programátorka.
                </Typography>
                <Typography variant='body1'>
                Svoje výhry a prohry jsem nejdřív sdílela jen na Instagramu. Později jsem v kurzu u Czechitas vytvořila první verzi tohoto blogu. 
                </Typography>
                <Typography variant='body1'>
                Máma kóduje je blízká mému srdci. Potkala jsem díky ní zajímavé lidi, ale taky si uchovala spoustu vzpomínek na mou holčičku.
                </Typography>
                <Typography variant='body1'>
                Najdete tu recenze na kurzy, které jsem absolvovala, ale taky články o mém nejen mateřském životě.
                </Typography>
                <Stack sx={{ alignItems: 'end' }} style={{ margin: '2rem 0' }}><Button variant='contained'><Link component={RouterLink} to='/o-me' style={{ textDecoration: 'none', color: 'white' }}>Více o mě</Link></Button></Stack>
              </>
              }
            </Stack>
            {!isMobile &&
            <Stack spacing={2}  sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
                <Typography variant='sectionTitle' sx={{ paddingTop: {xs: '2rem', md: 0}}}>Sleduj mě</Typography>
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