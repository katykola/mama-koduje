import { useState, useEffect} from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import LifeTile from "../components/LifeTile"
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AboutMePhotos from '../components/About-me-photos';

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
              <Typography variant='body1'>Teda abych byla přesná, s prvním kurzem jsem začala, když jsem byla v posledním trimestru těhotenství, ale nejsem si úplně jistá, zda to můžu počítat.</Typography>
              <br />
              <Typography variant='body1'>Když bylo malé <b>3 měsíce</b> a já měla konečně dost psychické a fyzické energie na to, abych si ke kurzu sedla znova, bylo to jako bych ho viděla prvně.</Typography>
              <br />
              <Typography variant='body1'>Jak jsem ale zjistila později, onen restart neznamenal jen to, že se mi z hlavy vykouřily technikálie kolem CSS, ale hlavně dost zásadní přestavbu v mé osobnosti. Získala jsem totiž něco, co mi v životě chybělo. <b>Disciplínu, závazek a odhodlání.</b></Typography>
              <br />
              <Typography variant='body1'>Když se ohlédnu zpětně na výčet, který uvidíte na následujících řádcích, vidím za ním <b>stovky hodin práce, frustrace a radosti</b> z programování. Myslím, že můžu říct, že mateřství a programování ze mě udělalo silnějšího a sebeuvědomělejšího člověka.</Typography>
              <br />
              <Typography variant='body1'>Pokud jste na začátku této cesty a jste tu pro inspiraci, chci říct, že i hodina denně se počítá a že ne vše, co jsem dělala já, bude fungovat i vám. Začněte a <b>ta správná cesta se vám bude odkrývat postupně</b>.</Typography>
            </Box>
          
          <Typography variant='sectionTitle'>JAK HOLČIČKA EMA ROSTLA S NÍ MOJE RODIČOVSKÉ A PROGRAMÁTORSKÉ SKILLY</Typography>

          <Stack spacing={4} direction="row" >

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
           
          <AboutMePhotos />

          </Stack>
        
        </Stack>

      </>
    )
}