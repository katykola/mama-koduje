export const validateFields = (values, isPost = false, isLifeXP = false) => {
  const newErrors = {};

  if (isPost) {
    if (!values.title) newErrors.title = 'Název je povinné';
    if (!values.date) newErrors.date = 'Datum je povinné';
    if (!values.perex) newErrors.perex = 'Perex je povinné';
    if (!values.content) newErrors.content = 'Obsah je povinné';
    if (!values.image) newErrors.image = 'Obrázek je povinný';
  } else if (isLifeXP){
    if (!values.order) newErrors.order = 'Pořadí je povinné';
    if (!values.termin) newErrors.date = 'Měsíc Rok je povinné';
    if (!values.title) newErrors.title = 'Název je povinné';
    if (!values.subtitle) newErrors.subtitle = 'Podnázev je povinné';
    if (!values.text) newErrors.text = 'Text je povinné';
  } else {
    if (values.tags.length === 0) newErrors.tags = 'Musíte vybrat alespoň jeden štítek';
    if (!values.title) newErrors.title = 'Název je povinné';
    if (!values.date) newErrors.date = 'Datum je povinné';
    if (values.rating < 1 || values.rating > 5) newErrors.rating = 'Hodnocení musí být mezi 1 a 5';
    if (!values.perex) newErrors.perex = 'Perex je povinné';
    if (!values.content) newErrors.content = 'Obsah je povinné';
    if (values.positives.length === 0) newErrors.positives = 'Musíte vyplnit alespoň jedno pozitivum';
    if (values.negatives.length === 0) newErrors.negatives = 'Musíte vyplnit alespoň jedno negativum';
  }

  return newErrors;
};