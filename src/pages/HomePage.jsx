import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography, IconButton, Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import MainImage from '../components/MainImage';
import ReviewTile from '../components/ReviewTile';
import PostTile from '../components/PostTile';
import Icons from '../components/Icons';


export default function HomePage() {
    return (
        <>        
      <Stack spacing={6}>

        <MainImage imgSrc="/littlehand_desktop.jpg"/>

        <Stack spacing={4}>
          <Typography variant="sectionTitle">RECENZE KURZŮ, BOOTCAMPŮ A KNIH </Typography>
              <Stack  direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <ReviewTile/>
                  <ReviewTile/>
                  <ReviewTile/>
              </Stack>
              <Stack sx={{ justifyContent: "center", alignItems: "flex-end"}}>
                <Button variant="contained">Zobrazit všechny recenze</Button>
                      </Stack>
        </Stack>

        <Grid container>

            <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                    <Typography variant='sectionTitle'>POSTŘEHY ZE ŽIVOTA</Typography>
                    <PostTile imgSrc="/littlehand_desktop.jpg"/>
                    <PostTile imgSrc="/littlehand_desktop.jpg"/>
                    <PostTile imgSrc="/littlehand_desktop.jpg"/>
                </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
            <Stack spacing={2} sx={{marginLeft:'4rem'}}>
                <Typography variant='sectionTitle'>O mě</Typography>
                <MainImage imgSrc="/littlehand_desktop.jpg"/>
                <Typography variant='body1'>
                    Jsem matka malé Emy, která se rozhodla, že rodičovskou využiju k tomu, že se naučí kódovat.
                    Začala jsem prvním kurzem a zjistila, že už není cesty zpět a že mě kódování baví neskutečně víc, než moje předchozí povolání. Dělat si rekvalifikaci a zároveň se starat o dítko není vůbec jednoduché, ale já pevně věřím, že na konci tohohle bootcampu vylezu jako šikovný IT odborník.
                    Chtěla bych zde vytvořit místo, kde se programátorky s dětmi nebudou bát sdílet své reálné zkušenosti. Ty dobré, i ty těžké.
                    Věřím, že nikdy není pozdě začít a podle tohoto hesla se řídím celý život. Stačí jen překonat počáteční strach.
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'right' }}><Link>Více o mě</Link></Typography>
            </Stack>
            <Stack spacing={2} sx={{ mt: 2, marginLeft:'4rem' }}>
                <Typography variant='sectionTitle'>Sleduj mě</Typography>
                <Icons/>
            </Stack>
            </Grid>
             
        </Grid>

      </Stack>


        </>
    )
} 