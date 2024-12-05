import { useState, useEffect} from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import LifeTile from "../components/LifeTile"
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import katyVeSlunci from '../assets/images/katy-ve-slunci300.jpg'; 
import miminkoSHrazdickou from '../assets/images/miminko-s-hrazdickou.jpg'; 
import nositko from '../assets/images/nositko.jpg';
import diteAPonozky from '../assets/images/dite-a-ponozky.jpg';
import batolatko from '../assets/images/batolatko.jpg';
import notebook from '../assets/images/notebook.jpg';
import katerinaKolarova from '../assets/images/katerina_kolarova.jpg';
import medvidek from '../assets/images/medvidek.jpg';


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

            <Box sx={{pb: 2}}>
              <Typography variant='body1'>Jsem matka malé Emy, která se rozhodla, že rodičovskou využiju k tomu, že se naučím kódovat.</Typography>
              <br />
              <Typography variant='body1'>Začala jsem prvním kurzem a zjistila, že už není cesty zpět a že mě kódování baví neskutečně víc, než moje předchozí povolání. Dělat si rekvalifikaci a zároveň se starat o dítko není vůbec jednoduché, ale já pevně věřím, že na konci tohohle bootcampu vylezu jako šikovný IT odborník.</Typography>
              <br />
              <Typography variant='body1'>Chtěla bych zde vytvořit místo, kde se programátorky s dětmi nebudou bát sdílet své reálné zkušenosti. Ty dobré, i ty těžké.</Typography>
              <br />
              <Typography variant='body1'>Věřím, že nikdy není pozdě začít a podle tohoto hesla se řídím celý život. Stačí jen překonat počáteční strach.</Typography>
            </Box>
          
          <Divider />

          <Typography variant='sectionTitle'>JAK HOLČIČKA EMA ROSTLA S NÍ MOJE RODIČOVSKÉ A PROGRAMÁTORSKÉ SKILLY</Typography>

          <Stack spacing={4} direction="row" >

            {/* Sloupek s textem */}
            <Stack sx={{ml: '-6rem'}} spacing={4}>
                {lifeXPList.map((lifeXP) => (
                    <LifeTile
                      key={lifeXP.id}
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
                  src={katyVeSlunci}
              />
              <Box
                  component="img"
                  sx={{
                      width: '300px',
                      objectFit: 'cover', // Maintain aspect ratio and cover the area
                      objectPosition: 'top', // Align the top part of the image with the top of the container
                  }}
                  alt="placeholder"
                  src={medvidek}
              />          
              <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={miminkoSHrazdickou}
                />
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={nositko}
                />
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={diteAPonozky}
                />
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={batolatko}
                />
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={notebook}
                />
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={katerinaKolarova}
                />
            </Stack>

          </Stack>
        
        </Stack>

      </>
    )
}