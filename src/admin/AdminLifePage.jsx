import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Stack, Typography, FormControl,  InputLabel, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const [errors, setErrors] = useState({});
  
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

  function validateFields() {
    const newErrors = {};
    if (!newLifeXPOrder) newErrors.order = 'Pořadí je povinné';
    if (!newLifeXPDate) newErrors.date = 'Měsíc Rok je povinné';
    if (!newLifeXPTitle) newErrors.title = 'Název je povinné';
    if (!newLifeXPSubtitle) newErrors.subtitle = 'Podnázev je povinné';
    if (!newLifeXPText) newErrors.text = 'Text je povinné';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitLifeXP() {
    if (!validateFields()) return;

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
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDoc() {
    try {
      if (docToDelete) {
        await deleteDoc(doc(db, 'lifeExperience', docToDelete));
        getLifeXPList();
        setIsDialogOpen(false);
        setDocToDelete(null);
      }
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

  function openDialog(id) {
    setDocToDelete(id);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setDocToDelete(null);
  }

  return (
    <>
      {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej novou zkušenost</Button>
        </Stack>
      ) : (
        <Box sx={{ border: '1px solid var(--secondary-color)', p: 3, mb: 4, backgroundColor: '#f7e6e6' }}>
          <Stack spacing={5}>
            <Typography variant='h5'>Nová zkušenost</Typography>
            <Stack direction='row' spacing={3} sx={{ width: '100%' }}>
              <FormControl>
               <TextField
                  required
                  label="Pořadí"
                  id="order"
                  value={newLifeXPOrder}
                  onChange={(e) => setNewLifeXPOrder(Number(e.target.value))}
                  error={!!errors.order}
                  helperText={errors.order}
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  label="Měsíc Rok"
                  id="date"
                  value={newLifeXPDate}
                  onChange={(e) => setNewLifeXPDate(e.target.value)}
                  error={!!errors.order}
                  helperText={errors.order}
                  sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <TextField
                required
                label="Název"
                id="title"
                value={newLifeXPTitle}
                onChange={(e) => setNewLifeXPTitle(e.target.value)}
                error={!!errors.order}
                helperText={errors.order}
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
            </FormControl>
            <FormControl>
              <TextField
                required
                label="Podnázev"
                id="subtitle"
                value={newLifeXPSubtitle}
                onChange={(e) => setNewLifeXPSubtitle(e.target.value)}
                error={!!errors.order}
                helperText={errors.order}
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
            </FormControl>
            <FormControl>
              <TextField
                required
                label="Text"
                id="text"
                value={newLifeXPText}
                onChange={(e) => setNewLifeXPText(e.target.value)}
                error={!!errors.order}
                helperText={errors.order}
                multiline
                minRows={4}
                sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
            </FormControl>
            <Stack direction='row' spacing={2} sx={{ justifyContent: 'end' }}>
              <Button onClick={toggleCreateNew} variant='outlined'>Zpět</Button>
              <Button onClick={onSubmitLifeXP} variant="contained">
                Uložit
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* List all LifeTiles */}
      <Stack spacing={4}>
        {lifeXPList.map((lifeXP) => (
          <AdminLifeTile
            key={lifeXP.id}
            id={lifeXP.id}
            order={lifeXP.order}
            date={lifeXP.date}
            title={lifeXP.title}
            subtitle={lifeXP.subtitle}
            text={lifeXP.text}
            deleteLifeXP={() => openDialog(lifeXP.id)}
            updateLifeXP={updateLifeXP}
          />
        ))}
      </Stack>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Opravdu chcete záznam vymazat?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={closeDialog} color="primary">
            Zpět
          </Button>
          <Button variant='contained' onClick={handleDeleteDoc} color="primary" autoFocus>
            Vymazat
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}