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

          <Typography variant='h1' sx={{ mb: 2 }}>Ciao! My name is Katy, and I started programming while on maternity leave.</Typography>

            <Box sx={{pb: 2}}>
              <Typography variant='body1'>Well, to be precise, I took my first course during the last trimester of my pregnancy, but I’m not entirely sure if I can count that.</Typography>
              <br />
              <Typography variant='body1'>When my little one was <b>3 months old</b>, and I finally had enough mental and physical energy to return to the course, it felt like I was seeing it for the first time.</Typography>
              <br />
              <Typography variant='body1'>As I later discovered, that restart didn’t just mean that all the technical stuff about CSS had vanished from my head—it also triggered a significant transformation in my personality. I gained something that had been missing in my life: <b>discipline, commitment, and determination.</b></Typography>
              <br />
              <Typography variant='body1'>Looking back at the list you’ll see in the following lines, I see <b>hundreds of hours of work, frustration, and the joy</b> of programming. I think I can confidently say that motherhood and programming have made me a stronger and more self-aware person.</Typography>
              <br />
              <Typography variant='body1'>If you’re just starting this journey and looking for inspiration, I want to say that even an hour a day counts, and not everything I did will necessarily work for you. Start, and <b>he right path will reveal itself to you over time.</b></Typography>
            </Box>
          
          <Typography variant='sectionTitle'>AS LITTLE EMA GREW, SO DID MY PARENTING AND PROGRAMMING SKILLS</Typography>

          <Stack spacing={4} direction="row" >

            <Stack sx={{ml: '-6rem'}} spacing={4}>
                {lifeXPList.map((lifeXP) => (
                    <LifeTile
                      key={lifeXP.id}
                      order={ lifeXP.order }
                      date={ lifeXP.termin_eng }
                      title={ lifeXP.title_eng}
                      subtitle={ lifeXP.subtitle }
                      text={ lifeXP.text_eng }
                    />
                ))}
            </Stack>
           
          <AboutMePhotos />

          </Stack>
        
        </Stack>

      </>
    )
}