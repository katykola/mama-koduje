import React, { useState, useEffect } from 'react';
import { Stack, Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { db } from '../config/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import AdminLifeTile from './AdminLifeTile';
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';

export default function AdminLifePage() {
  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [lifeXPList, setLifeXPList] = useState([]);
  const [newLifeXPOrder, setNewLifeXPOrder] = useState('');
  const [newLifeXPDate, setNewLifeXPDate] = useState('');
  const [newLifeXPTitle, setNewLifeXPTitle] = useState('');
  const [newLifeXPSubtitle, setNewLifeXPSubtitle] = useState('');
  const [newLifeXPText, setNewLifeXPText] = useState('');
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

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
      setErrors({});
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

  const fields = [
    { name: 'order', label: 'Pořadí', value: newLifeXPOrder, required: true },
    { name: 'date', label: 'Měsíc Rok', value: newLifeXPDate, required: true },
    { name: 'title', label: 'Název', value: newLifeXPTitle, required: true },
    { name: 'subtitle', label: 'Podnázev', value: newLifeXPSubtitle, required: true },
    { name: 'text', label: 'Text', value: newLifeXPText, required: true, multiline: true, minRows: 4 },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'order':
        setNewLifeXPOrder(value);
        break;
      case 'date':
        setNewLifeXPDate(value);
        break;
      case 'title':
        setNewLifeXPTitle(value);
        break;
      case 'subtitle':
        setNewLifeXPSubtitle(value);
        break;
      case 'text':
        setNewLifeXPText(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isHiddenCreateNew ? (
        <Stack direction='row' sx={{ justifyContent: 'end', mb: 4 }}>
          <Button onClick={toggleCreateNew} variant='contained'>Přidej novou zkušenost</Button>
        </Stack>
      ) : (
        <AdminNewForm
          title="Nová zkušenost"
          fields={fields}
          errors={errors}
          onChange={handleFieldChange}
          onSubmit={onSubmitLifeXP}
          onCancel={toggleCreateNew}
        />
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

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
    </>
  );
}