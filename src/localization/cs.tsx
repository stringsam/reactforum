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
  'login.search': 'Hledat',

  'toolbar.en': 'EN',
  'toolbar.cs': 'CZ',
  'toolbar.login': 'Přihlášení',
  'toolbar.logout': 'Odhlášení',
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

  'thread.title': 'Název vlákna',

  'format': 'cs-CZ'
};
export default cs;
