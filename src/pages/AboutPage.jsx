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
import naHristi from '../assets/images/na-hristi.jpg';


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

          <Typography variant='h1' sx={{ mb: 2 }}>Ciao! Jmenuju se Katy a na mateřské jsem začala programovat</Typography>

            <Box sx={{pb: 2}}>
              <Typography variant='body1'>Teda abych byla přesná, s prvním kurzem jsem začala, když jsem byla v posledním trimestru těhotenství, ale nejsem si úplně jistá, zda to můžu počítat. Ono ten kolotoč, který nastal potom způsobil, že se mi zdá, že ty poslední měsíce přes porodem se mi snad jen zdály.</Typography>
              <br />
              <Typography variant='body1'>Když bylo malé 3 měsíce a já měla konečně dost psychické a fyzické energie na to, abych si ke kurzu sedla znova, bylo to jako bych ho viděla prvně. Sice věřím, že nějaké principy mi v hlavě zůstaly, ale samotné techniky určitě ne.</Typography>
              <br />
              <Typography variant='body1'>Jak jsem ale zjistila později onen restart neznamenal jen to, že se mi z hlavy vykouřily technikálie kolem CSS, ale hlavně dost zásadní přestavbu v mé osobnosti. Získala jsem totiž něco, co mi v životě chybělo. Disciplínu, závazek a odhodlání.</Typography>
              <br />
              <Typography variant='body1'>Když se ohlédnu zpětně na výčet, který uvidíte na následujících řádcích, vidím za ním stovky hodin práce, frustrace a radosti z programování. Myslím, že můžu říct, že mateřství a programování ze mě udělalo silnějšího a sebeuvědomělejšího člověka.</Typography>
              <br />
              <Typography variant='body1'>Pokud jste na začátku této cesty a jste tu pro inspiraci, chci říct, že i hodina denně se počítá a že ne vše, co jsem dělala já, bude fungovat i vám. Začněte a ta správná cesta se vám bude odkrývat postupně.</Typography>
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
                <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={naHristi}
                />
            </Stack>

          </Stack>
        
        </Stack>

      </>
    )
}