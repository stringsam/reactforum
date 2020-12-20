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

  'discussion.reply': 'Odpovědět',
  'discussion.submit': 'Přidat',
  'discussion.description': 'Popis',

  'home.createThread': 'Přidat vlákno',

  'profile.edit': 'Upravit profil',
  'profile.male': 'Muž',
  'profile.female': 'Žena',
  'profile.nick': 'Přezdívka',
  'profile.phone': 'Telefon',
  'profile.sex': 'Pohlaví',
  'profile.save': 'Uložit',

  'thread.title': 'Název vlákna',

  'format': 'cs-CZ'
};
export default cs;
