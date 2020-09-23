const FORM_ERROR_MSG = {
  en: {
    email: "Must be a valid email address",
    subject: "Must be at least 4 characters",
    body: "Must be at least 4 characters",
  },
  fr: {
    email: "Doit être une adresse email valide",
    subject: "Doit contenir au moins 4 caractères",
    body: "Doit contenir au moins 4 caractères",
  },
};

const formErrorMsg = (value, req, field) => {
  const { lang = "en" } = req.body;
  return FORM_ERROR_MSG[lang][field];
};

module.exports = formErrorMsg;
