const allFields = {
  tags: { name: 'tags', label: 'Tagy', type: 'array', required: true },
  title: { name: 'title', label: 'Titulek', type: 'string', required: true },
  title_eng: { name: 'title_eng', label: 'Title ENG', type: 'string | undefined', required: false },
  author: { name: 'author', label: 'Autor', type: 'string', required: true },
  date: { name: 'date', label: 'Datum', type: 'date', required: true },
  termin: { name: 'termin', label: 'Termin', type: 'string', required: true },
  termin_eng: { name: 'termin_eng', label: 'Termin ENG', type: 'string', required: true },
  rating: { name: 'rating', label: 'Hodnocení', type: 'number', required: true },
  perex: { name: 'perex', label: 'Perex', type: 'string', required: true },
  perex_eng: { name: 'perex_eng', label: 'Perex ENG', type: 'string', required: false },
  content: { name: 'content', label: 'Obsah článku', type: 'string', required: true, multiline: true, minRows: 4 },
  content_eng: { name: 'content_eng', label: 'Blog content', type: 'string', required: false, multiline: true, minRows: 4 },
  positives: { name: 'positives', label: 'Pozitiva', type: 'array', required: true },
  positives_eng: { name: 'positives_eng', label: 'Positives ENG', type: 'array', required: false },
  negatives: { name: 'negatives', label: 'Negativa', type: 'array', required: true },
  negatives_eng: { name: 'negatives_eng', label: 'Negatives ENG', type: 'array', required: false },
  link: { name: 'link', label: 'Odkaz', type: 'string', required: false },
  order: { name: 'order', label: 'Pořadí', type: 'number', required: true },
  subtitle: { name: 'subtitle', label: 'Podnázev CS&ENG', type: 'string', required: true },
  text: { name: 'text', label: 'Text', type: 'string', required: true, multiline: true, minRows: 4 },
  text_eng: { name: 'text_eng', label: 'Text Eng', type: 'string', required: true, multiline: true, minRows: 4 },
  image: { name: 'image', label: 'Obrázek', type: 'string', required: true },
};

const postFields = ['title', 'title_eng', 'date', 'perex', 'perex_eng', 'content', 'content_eng', 'image'];

const lifeXPFields = ['order', 'title', 'title_eng', 'subtitle', 'termin', 'termin_eng', 'text', 'text_eng'];

const reviewFields = ['tags', 'title', 'title_eng', 'author', 'date', 'rating', 'perex', 'perex_eng', 'content', 'content_eng', 'positives', 'positives_eng', 'negatives', 'negatives_eng', 'link'];

export const getFields = (values = {}, isPost = false, isLifeXp = false) => {

  const fieldsToUse = isLifeXp ? lifeXPFields : isPost ? postFields : reviewFields;

  return fieldsToUse.map(fieldName => {
    const field = allFields[fieldName];
    return {
      ...field,
      value: values[fieldName] !== undefined ? values[fieldName] : (field.type === 'array' ? [] : field.type === 'date' ? new Date() : ''),
    };
  });
};