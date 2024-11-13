import { Box, Stack, Typography, IconButton, Link } from '@mui/material';
import MainImage from "../components/MainImage"
import LifeTile from "../components/LifeTile"
import Grid from '@mui/material/Grid';


export default function AboutPage() {
    return (
      <>
        <Stack spacing={4}>
          <Typography variant='h1' sx={{ mb: 2 }}>Ciao! Jmenuju se Katy a na rodičáku jsem se stala kodérkou</Typography>

          <MainImage imgSrc="/littlehand_desktop.jpg" />

          <Box>
            <Typography variant='body1'>Jsem matka malé Emy, která se rozhodla, že rodičovskou využiju k tomu, že se naučím kódovat.</Typography>
            <br />
            <Typography variant='body1'>Začala jsem prvním kurzem a zjistila, že už není cesty zpět a že mě kódování baví neskutečně víc, než moje předchozí povolání. Dělat si rekvalifikaci a zároveň se starat o dítko není vůbec jednoduché, ale já pevně věřím, že na konci tohohle bootcampu vylezu jako šikovný IT odborník.</Typography>
            <br />
            <Typography variant='body1'>Chtěla bych zde vytvořit místo, kde se programátorky s dětmi nebudou bát sdílet své reálné zkušenosti. Ty dobré, i ty těžké.</Typography>
            <br />
            <Typography variant='body1'>Věřím, že nikdy není pozdě začít a podle tohoto hesla se řídím celý život. Stačí jen překonat počáteční strach.</Typography>
          </Box>

          <Typography variant='sectionTitle'>JAK HOLČIČKA EMA ROSTLA S NÍ MOJE RODIČOVSKÉ A PROGRAMÁTORSKÉ SKILLY</Typography>

          {/* <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
            <LifeTile imgSrc="/littlehand_desktop.jpg"/>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <LifeTile imgSrc="/littlehand_desktop.jpg"/>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <LifeTile imgSrc="/littlehand_desktop.jpg"/>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
            <LifeTile imgSrc="/littlehand_desktop.jpg"/>
            </Grid>
          </Grid> */}
          
          <Box sx={{ml: '-6rem'}}>
            <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile imgSrc="/littlehand_desktop.jpg"/>
                  </Grid>
                </Grid>
          </Box>
        </Stack>

      </>
    )
}