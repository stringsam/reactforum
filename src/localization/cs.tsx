import en from "./en";

// Thanks to typescript we can make sure that our localization texts in various languages have same keys
const cs: typeof en = {
  'login.title': 'Přihlásit se',
  'login.subtitle': 'Použijte svůj účet',
  'login.email': 'E-mail',
  'login.password': 'Heslo',
  'login.forgotEmail': 'Zapomněli jste e-mail?',
  'login.createAccount': 'Vytvořit účet',
  'login.login': 'Přihlásit',
};
export default cs;
