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

  'toolbar.en': 'EN',
  'toolbar.cs': 'CZ',
  'toolbar.login': 'Login',
  'toolbar.logout': 'Logout',
  'toolbar.profile': 'Profil',

  'discussion.reply': 'Odpovedať',
  'discussion.submit': 'Pridať',

  'home.createThread': 'Pridať vlákno',

  'profile.edit': 'Upraviť profil',
  'profile.male': 'Muž',
  'profile.female': 'Žena',
  'profile.nick': 'Nick',
  'profile.phone': 'Telefón',
  'profile.sex': 'Pohlavie',
  'profile.save': 'Uložit',
};
export default cs;
