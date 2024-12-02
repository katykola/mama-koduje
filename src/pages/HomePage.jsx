import { Button, Stack, Typography, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import ReviewTile from '../components/ReviewTile';
import PostTile from '../components/PostTile';
import Icons from '../components/Icons';


export default function HomePage({posts, handlePostSelect}) {

    const postsWithAuthor = posts.filter(post => post.author);
    const postsWithoutAuthor = posts.filter(post => !post.author);

    return (
        <>        
      <Stack spacing={6}>

        <MainImage imgSrc="/littlehand_desktop.jpg"/>

        <Stack spacing={4}>
          <Typography variant="sectionTitle">RECENZE KURZŮ, BOOTCAMPŮ A KNIH </Typography>
          <Grid container>
            {postsWithAuthor.slice(0, 3).map((post, index) => (
              <Grid item xs={12} sm={4} key={post.id} sx={{ display: 'flex', paddingRight: index >= 2 ? 0 : 2}}>
                <ReviewTile
                  key={post.id}
                  id={post.id}
                  urlTitle={post.urlTitle}
                  tags={post.tags}
                  rating={post.rating}
                  title={post.title}  
                  author={post.author}
                  perex={post.perex}
                  onPostSelect={handlePostSelect}
                  sx={{ width: '100%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                />
              </Grid>
            ))}
          </Grid>
              <Stack sx={{ justifyContent: "center", alignItems: "flex-end"}}>
              <Link component={RouterLink} to='/o-me'><Button variant="contained">Zobrazit všechny recenze</Button></Link>
              </Stack>
        </Stack>

        <Grid container>

            <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                    <Typography variant='sectionTitle'>POSTŘEHY ZE ŽIVOTA</Typography>
                    {postsWithoutAuthor.map((post) => (
                    <PostTile key={post.id} imgSrc='../littlehand_desktop.jpg' id={post.id} title={post.title} date={post.date} perex={post.perex} onPostSelect={handlePostSelect}/>
                    ))}
                </Stack>
            </Grid>

            <Grid item xs={12} md={6} >
            <Stack spacing={4} sx={{ marginLeft:'6rem' }}>
                <Typography variant='sectionTitle'>O mě</Typography>
                <MainImage imgSrc="/littlehand_desktop.jpg"/>
                <Typography variant='body1'>
                Jsem matka malé Emy, která se rozhodla, že rodičovskou využiju k tomu, že se naučí kódovat.
                </Typography>
                <Typography variant='body1'>
                Začala jsem prvním kurzem a zjistila, že už není cesty zpět a že mě kódování baví neskutečně víc, než moje předchozí povolání. Dělat si rekvalifikaci a zároveň se starat o dítko není vůbec jednoduché, ale já pevně věřím, že na konci tohohle bootcampu vylezu jako šikovný IT odborník.
                </Typography>
                <Typography variant='body1'>
                Chtěla bych zde vytvořit místo, kde se programátorky s dětmi nebudou bát sdílet své reálné zkušenosti. Ty dobré, i ty těžké.
                </Typography>
                <Typography variant='body1'>
                Věřím, že nikdy není pozdě začít a podle tohoto hesla se řídím celý život. Stačí jen překonat počáteční strach.
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'right' }}><Link component={RouterLink} to='/o-me'>Více o mě</Link></Typography>
            </Stack>
            <Stack spacing={2} sx={{ mt: 6, marginLeft:'6rem' }}>
                <Typography variant='sectionTitle'>Sleduj mě</Typography>
                <Icons/>
            </Stack>
            </Grid>
             
        </Grid>

      </Stack>


        </>
    )
} 