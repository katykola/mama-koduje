const allFields = {
  tags: { name: 'tags', label: 'Tagy', type: 'array', required: true },
  title: { name: 'title', label: 'Titulek', required: true },
  author: { name: 'author', label: 'Autor', required: true },
  date: { name: 'date', label: 'Datum', type: 'date', required: true },
  rating: { name: 'rating', label: 'Hodnocení', type: 'number', required: true },
  perex: { name: 'perex', label: 'Perex', required: true },
  content: { name: 'content', label: 'Obsah článku', required: true, multiline: true, minRows: 4 },
  positives: { name: 'positives', label: 'Pozitiva', type: 'array', required: true },
  negatives: { name: 'negatives', label: 'Negativa', type: 'array', required: true },
  link: { name: 'link', label: 'Odkaz', required: false },
  order: { name: 'order', label: 'Pořadí', required: true },
  subtitle: { name: 'subtitle', label: 'Podnázev', required: true },
  text: { name: 'text', label: 'Text', required: true, multiline: true, minRows: 4 },
};

const postFields = ['title', 'date', 'perex', 'content'];

const lifeXPFields = ['order', 'title', 'subtitle', 'date', 'text'];

const reviewFields = ['tags', 'title', 'author', 'date', 'rating', 'perex', 'content', 'positives', 'negatives', 'link'];

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