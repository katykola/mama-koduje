import { useState, useEffect} from 'react';
import { Box, Stack, Typography, Link, Input, Button } from '@mui/material';
import MainImage from "../components/MainImage"
import LifeTile from "../components/LifeTile"
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";


export default function AboutPage() {

  const [lifeXPList, setlifeXPList] = useState([]);
  const lifeXPCollectionRef = collection(db, "lifeExperience");

  async function getlifeXPList(){
    try{
      const data = await getDocs(lifeXPCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Sort data by the 'order' property in ascending order
      const sortedData = filteredData.sort((a, b) => a.order - b.order);
      setlifeXPList(sortedData);
    } catch (err){
      console.log(err);
    }
    };

    useEffect(()=>{
      getlifeXPList();
    }, []);


    return (
      <>
        <Stack spacing={5}>
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


          <Stack spacing={4} direction="row" >

            {/* Sloupek s textem */}
            <Stack sx={{ml: '-6rem'}} spacing={4}>
                {lifeXPList.map((lifeXP) => (
                    <LifeTile
                      imgSrc="/littlehand_desktop.jpg"
                      order={ lifeXP.order }
                      date={ lifeXP.date }
                      title={ lifeXP.title}
                      subtitle={ lifeXP.subtitle }
                      text={ lifeXP.text }
                    />
                ))}
            </Stack>
           
           {/* Sloupek s fotkama */}
            <Stack spacing={4} sx={{display: { xs: 'none', sm: 'flex' }}}>
            <Box
                  component="img"
                  sx={{
                      width: '300px',
                      objectFit: 'cover', // Maintain aspect ratio and cover the area
                      objectPosition: 'top', // Align the top part of the image with the top of the container
                  }}
                  alt="placeholder"
                  src="/littlehand_desktop.jpg"
            />
                      <Box
                  component="img"
                  sx={{
                      width: '300px',
                      objectFit: 'cover', // Maintain aspect ratio and cover the area
                      objectPosition: 'top', // Align the top part of the image with the top of the container
                  }}
                  alt="placeholder"
                  src="/littlehand_desktop.jpg"
            />          <Box
            component="img"
            sx={{
                width: '300px',
                objectFit: 'cover', // Maintain aspect ratio and cover the area
                objectPosition: 'top', // Align the top part of the image with the top of the container
            }}
            alt="placeholder"
            src="/littlehand_desktop.jpg"
                />
            </Stack>

          </Stack>
        
        </Stack>

      </>
    )
}