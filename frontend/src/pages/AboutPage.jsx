import { useState, useEffect} from 'react';
import { Box, Stack, Typography, IconButton, Link, Input, Button } from '@mui/material';
import MainImage from "../components/MainImage"
import LifeTile from "../components/LifeTile"
import Grid from '@mui/material/Grid';
import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";


export default function AboutPage() {

  const [lifeXPList, setlifeXPList] = useState([]);
  const lifeXPCollectionRef = collection(db, "lifeExperience");

  //New LifeXP Input
  const[newLifeXPOrder, setNewLifeXPOrder] = useState("");
  const[newLifeXPDate, setNewLifeXPDate] = useState("");
  const[newLifeXPTitle, setNewLifeXPTitle] = useState("");
  const[newLifeXPSubtitle, setNewLifeXPSubtitle] = useState("");
  const[newLifeXPText, setNewLifeXPText] = useState("");


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

  async function onSubmitLifeXP(){
    try{
      await addDoc(lifeXPCollectionRef, {
        order: newLifeXPOrder,
        date: newLifeXPDate, 
        title: newLifeXPTitle, 
        subtitle: newLifeXPSubtitle, 
        text: newLifeXPText
      });
      getlifeXPList();
      setNewLifeXPOrder("");
      setNewLifeXPDate("");
      setNewLifeXPTitle("");
      setNewLifeXPSubtitle("");
      setNewLifeXPText("");
    } catch(err){
      console.log(err);
    }
  };

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

          <Box>
          <Input 
            placeholder='order' 
            onChange={(e) => setNewLifeXPOrder(Number(e.target.value))}
            />
            <Input 
            placeholder='date' 
            onChange={(e) => setNewLifeXPDate(e.target.value)}
            />
            <Input 
            placeholder='title'
            onChange={(e) => setNewLifeXPTitle(e.target.value)}
            />
            <Input 
            placeholder='subtitle'
            onChange={(e) => setNewLifeXPSubtitle(e.target.value)}
            />
            <Input 
            placeholder='text'
            onChange={(e) => setNewLifeXPText(e.target.value)}
            />
            <Button onClick={onSubmitLifeXP} variant='contained'>Submit LifeXP</Button>
          </Box>
          
          <Box sx={{ml: '-6rem'}}>
            <Grid container spacing={4}>
              {lifeXPList.map((lifeXP) => (
                  <Grid item xs={12} sm={6} md={4}>
                  <LifeTile 
                    imgSrc="/littlehand_desktop.jpg" 
                    order={ lifeXP.order }
                    date={ lifeXP.date }
                    title={ lifeXP.title}
                    subtitle={ lifeXP.subtitle }
                    text={ lifeXP.text }
                  
                  />
                  </Grid>
              ))}
                </Grid>
          </Box>
        </Stack>

      </>
    )
}