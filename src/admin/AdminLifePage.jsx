import React, { useState, useEffect } from 'react';
import { Box, Stack, Input, Button, FormControl, InputLabel, Typography } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, addDoc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import AdminLifeTile from './AdminLifeTile';

export default function AdminLifePage() {

  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);

  const [lifeXPList, setLifeXPList] = useState([]);

  // States for new LifeXP
  const [newLifeXPOrder, setNewLifeXPOrder] = useState('');
  const [newLifeXPDate, setNewLifeXPDate] = useState('');
  const [newLifeXPTitle, setNewLifeXPTitle] = useState('');
  const [newLifeXPSubtitle, setNewLifeXPSubtitle] = useState('');
  const [newLifeXPText, setNewLifeXPText] = useState('');

  const lifeXPCollectionRef = collection(db, 'lifeExperience');

  async function getLifeXPList() {
    try {
      const data = await getDocs(lifeXPCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Sort data by the 'order' property in ascending order
      const sortedData = filteredData.sort((a, b) => b.order - a.order);
      setLifeXPList(sortedData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getLifeXPList();
  }, []);

  async function onSubmitLifeXP() {
    try {
      await addDoc(lifeXPCollectionRef, {
        order: newLifeXPOrder,
        date: newLifeXPDate,
        title: newLifeXPTitle,
        subtitle: newLifeXPSubtitle,
        text: newLifeXPText,
      });
      getLifeXPList();
      setNewLifeXPOrder('');
      setNewLifeXPDate('');
      setNewLifeXPTitle('');
      setNewLifeXPSubtitle('');
      setNewLifeXPText('');
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteLifeXP(id) {
    try {
        await deleteDoc(doc(db, 'lifeExperience', id));
        getLifeXPList();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateLifeXP(id, order, date, title, subtitle, text) {
    try {
      await updateDoc(doc(db, 'lifeExperience', id), {
        order,
        date,
        title,
        subtitle,
        text,
      });
      getLifeXPList();
    } catch (err) {
      console.log(err);
    }
  }

  function toggleCreateNew() {
    setIsHiddenCreateNew(!isHiddenCreateNew);
  }

  return (
    <>
  { isHiddenCreateNew ? 
      <Stack direction='row' sx={{justifyContent: 'end', mb: 4}}><Button onClick={toggleCreateNew} variant='contained'>Přidej novou zkušenost</Button></Stack> 
      : 
        <Box sx={{border: '1px solid var(--border-color)', p: 3, mb: 4}}>
            <Stack spacing={5} >
              <Stack direction='row' spacing={3} sx={{width: '100%'}}>
                  <FormControl>
                    <InputLabel htmlFor="order">Pořadí</InputLabel>
                    <Input
                      id="order"
                      value={newLifeXPOrder}
                      onChange={(e) => setNewLifeXPOrder(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="date">Měsíc Rok</InputLabel>
                    <Input
                      id="date"
                      value={newLifeXPDate}
                      onChange={(e) => setNewLifeXPDate(e.target.value)}
                    />
                  </FormControl>
              </Stack>
              <FormControl>
                <InputLabel htmlFor="title">Název</InputLabel>
                <Input
                  id="title"
                  value={newLifeXPTitle}
                  onChange={(e) => setNewLifeXPTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="subtitle">Podnázev</InputLabel>
                <Input
                  id="subtitle"
                  value={newLifeXPSubtitle}
                  onChange={(e) => setNewLifeXPSubtitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="text">Text</InputLabel>
                <Input
                  id="text"
                  value={newLifeXPText}
                  onChange={(e) => setNewLifeXPText(e.target.value)}
                />
              </FormControl>
              <Stack direction='row' spacing={2} sx={{justifyContent: 'end'}}>
                <Button onClick={toggleCreateNew} variant='outlined'>Zpět</Button>
                <Button onClick={onSubmitLifeXP} variant="contained">
                  Uložit
                </Button>
              </Stack>
            </Stack>
          </Box>
      }


          {/* List all LifeTiles */}
          <Stack spacing={4}>
                {lifeXPList.map((lifeXP) => (
                    <AdminLifeTile
                        id={lifeXP.id}
                        order={ lifeXP.order }
                        date={ lifeXP.date }
                        title={ lifeXP.title}
                        subtitle={ lifeXP.subtitle }
                        text={ lifeXP.text }
                        deleteLifeXP={deleteLifeXP}
                        updateLifeXP={updateLifeXP}
                    />
                    ))}
            </Stack>


    </>
  );
}