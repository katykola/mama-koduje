import { Box, Button, Stack, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import ReviewTile from '../components/ReviewTile';
import PostTile from '../components/PostTile';
import Icons from '../components/Icons';
import katyVeSlunci from '../assets/images/katy-ve-slunci300.jpg'; 
import { useMediaQuery } from '@mui/material';
import theme from '../styles/theme';


export default function HomePage({posts}) {

    const postsWithAuthor = posts.filter(post => post.author);
    const postsWithoutAuthor = posts.filter(post => !post.author);
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>        
      <Stack spacing={6}>

        <MainImage imgSrc="/littlehand_desktop.jpg"/>

        <Stack spacing={2}>
          <Typography variant="sectionTitle">RECENZE KURZŮ, BOOTCAMPŮ A KNIH </Typography>
          <Grid container spacing={2} sx={{position: 'relative', right: '1rem'}}>
            {postsWithAuthor.slice(0, 3).map((post, index) => (
              <Grid item xs={12} sm={4} key={post.id} sx={{ display: 'flex'}}>
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
              <Link component={RouterLink} to='/recenze'><Button variant="contained">Zobrazit všechny recenze</Button></Link>
              </Stack>
        </Stack>

        <Grid container>

            <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                    <Typography variant='sectionTitle'>POSTŘEHY ZE ŽIVOTA</Typography>
                    {postsWithoutAuthor.slice(0, 4).map((post) => (
                    <PostTile key={post.id} imgSrc={post.image} id={post.id} title={post.title} urlTitle={post.urlTitle} date={post.date} perex={post.perex} />
                    ))}
                </Stack>
            </Grid>

            <Grid item xs={12} md={6} >
            <Stack spacing={2} sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
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
                Ahoj, jsem Katy. Máma, milovnice pletení, háčkování, cestování na blízko a programování.
                </Typography>
                <Typography variant='body1'>
                Tohle je můj projekt, který jsem začala v den, kdy moje cesta začala. Nejdřív jsem svoje výhry a prohry sdílela jen na Instagramu a později jsem v rámci kurzu u Czechitas vytvořila první verzi tohoto blogu. 
                </Typography>
                <Typography variant='body1'>
                Máma kóduje pro mě byla v prvních měsících mateřství kotva, která mě držela pohromadě, když jsem měla pocit, že se v té nové existenci mámy začínám rozpouštět. Je to projekt blízký mému srdci i proto, že je plný vzpomínek na mou malou holčičku.
                </Typography>
                <Typography variant='body1'>
                Najdete tu recenze na kurzy, které jsem absolvovala, ale taky nějaké ty poznatky z mého nejen mateřského života.
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'right' }}><Link component={RouterLink} to='/o-me'>Více o mě</Link></Typography>
            </Stack>
            <Stack spacing={2}  sx={{ marginLeft: { xs: 0, md: '6rem' } }}>
                <Typography variant='sectionTitle' sx={{ paddingTop: {xs: '2rem', md: 0}}}>Sleduj mě</Typography>
                <Box sx={{borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)'}}>
                  <Icons/>
                </Box>
            </Stack>
            </Grid>
             
        </Grid>

      </Stack>


        </>
    )
} 