import { useState, useEffect } from 'react';
import { Stack,Button } from '@mui/material';
import { db, auth } from '../config/firebase';
import { updateDocument } from '../utils/firebaseUtils';
import { collection, doc, getDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import AdminLifeTile from './AdminLifeTile';
import AdminDeleteDialog from './AdminDeleteDialog';
import AdminNewForm from './AdminNewForm';

export default function AdminLifePage() {

  const [isHiddenCreateNew, setIsHiddenCreateNew] = useState(true);
  const [lifeXPList, setLifeXPList] = useState([]);

  const [newLifeXPOrder, setNewLifeXPOrder] = useState('');
  const [newLifeXPTermin, setNewLifeXPTermin] = useState('');
  const [newLifeXPTerminEng, setNewLifeXPTerminEng] = useState('');
  const [newLifeXPTitle, setNewLifeXPTitle] = useState('');
  const [newLifeXPTitleEng, setNewLifeXPTitleEng] = useState('');
  const [newLifeXPSubtitle, setNewLifeXPSubtitle] = useState('');
  const [newLifeXPText, setNewLifeXPText] = useState('');
  const [newLifeXPTextEng, setNewLifeXPTextEng] = useState('');

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
    if (!newLifeXPTermin) newErrors.termin = 'Měsíc Rok je povinné';
    if (!newLifeXPTerminEng) newErrors.termin_eng = 'Month and Year are required';
    if (!newLifeXPTitle) newErrors.title = 'Název je povinné';
    if (!newLifeXPTitleEng) newErrors.title_eng = 'Title is required';
    if (!newLifeXPSubtitle) newErrors.subtitle = 'Podnázev je povinné';
    if (!newLifeXPText) newErrors.text = 'Text je povinné';
    if (!newLifeXPTextEng) newErrors.text_eng = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmitLifeXP() {
    if (!validateFields()) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      await addDoc(lifeXPCollectionRef, {
        order: newLifeXPOrder,
        termin: newLifeXPTermin,
        termin_eng: newLifeXPTerminEng,
        title: newLifeXPTitle,
        title_eng: newLifeXPTitleEng,
        subtitle: newLifeXPSubtitle,
        text: newLifeXPText,
        text_eng: newLifeXPTextEng,
        userId: user.uid, 
      });
      getLifeXPList();
      setNewLifeXPOrder('');
      setNewLifeXPTermin('');
      setNewLifeXPTerminEng('');
      setNewLifeXPTitle('');
      setNewLifeXPTitleEng('');
      setNewLifeXPSubtitle('');
      setNewLifeXPText('');
      setNewLifeXPTextEng('');
      setErrors({});
      toggleCreateNew();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteDoc() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }


      if (docToDelete) {
        const docRef = doc(db, 'lifeExperience', docToDelete);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          if (docSnapshot.data().userId === user.uid) {
            await deleteDoc(docRef);
            getLifeXPList();
            setIsDialogOpen(false);
            setDocToDelete(null);
          } else {
            throw new Error('User does not have permission to delete this document');
          }
        } else {
          throw new Error('Document does not exist');
        }
      }
    } catch (err) {
      console.log('Error in handleDeleteDoc:', err);
    }
  }

   async function updateLifeXP(id, order, termin, termin_eng, title, title_eng, subtitle, text, text_eng) {
    console.log('update')
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      console.log('user auth:', user.uid);
      console.log('Attempting to update document:', id);
  
      const docRef = doc(db, 'lifeExperience', id);
      const docSnapshot = await getDoc(docRef);

      console.log('docSnapshot:', docSnapshot.data());
  
      if (docSnapshot.exists()) {
        console.log('true');
        if (docSnapshot.data().userId === user.uid) {
          console.log('docSnapshot.data().userId:', docSnapshot.data().userId);
          console.log('docSnapshot.data().id:', docSnapshot.data().id);
          await updateDocument('lifeExperience', id, {
            order,
            termin,
            termin_eng,
            title,
            title_eng,
            subtitle,
            text,
            text_eng
          });
          getLifeXPList();
        } else {
          throw new Error('User does not have permission to update this document');
        }
      } else {
        throw new Error('Document does not exist');
      }
    } catch (err) {
      console.error('Error updating post:', err);
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
    { name: 'termin', label: 'Měsíc Rok', value: newLifeXPTermin, required: true },
    { name: 'termin_eng', label: 'ENG - Month Year', value: newLifeXPTerminEng, required: true },
    { name: 'title', label: 'Název', value: newLifeXPTitle, required: true },
    { name: 'title_eng', label: 'ENG - Title', value: newLifeXPTitleEng, required: true },
    { name: 'subtitle', label: 'Podnázev', value: newLifeXPSubtitle, required: true },
    { name: 'text', label: 'Text', value: newLifeXPText, required: true, multiline: true, minRows: 4 },
    { name: 'text_eng', label: 'ENG - Text', value: newLifeXPTextEng, required: true, multiline: true, minRows: 4 },
  ];

  const handleFieldChange = (name, value) => {
    switch (name) {
      case 'order':
        setNewLifeXPOrder(value);
        break;
      case 'termin':
        setNewLifeXPTermin(value);
        break;
      case 'termin_eng':
        setNewLifeXPTerminEng(value);
        break;
      case 'title':
        setNewLifeXPTitle(value);
        break;
      case 'title_eng':
        setNewLifeXPTitleEng(value);
        break;
      case 'subtitle':
        setNewLifeXPSubtitle(value);
        break;
      case 'text':
        setNewLifeXPText(value);
        break;
      case 'text_eng':
        setNewLifeXPTextEng(value);
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
            termin={lifeXP.termin}
            termin_eng={lifeXP.termin_eng}
            title={lifeXP.title}
            title_eng={lifeXP.title_eng}
            subtitle={lifeXP.subtitle}
            text={lifeXP.text}
            text_eng={lifeXP.text_eng}
            deleteLifeXP={() => openDialog(lifeXP.id)}
            updateLifeXP={updateLifeXP}
          />
        ))}
      </Stack>

      <AdminDeleteDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} handleDeleteDoc={handleDeleteDoc} />
    </>
  );
}