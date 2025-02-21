import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Account Settings': 'Account Settings',
          'General': 'General',
          'Security': 'Security',
          'Notifications': 'Notifications',
          'Preferences': 'Preferences',
          'Profile Picture': 'Profile Picture',
          'Upload a new profile picture': 'Upload a new profile picture',
          'Display Name': 'Display Name',
          'Your display name': 'Your display name',
          'Bio': 'Bio',
          'Tell us about yourself': 'Tell us about yourself',
          'Email': 'Email',
          'Your email address': 'Your email address',
          // Add more translations
        }
      },
      hi: {
        translation: {
          'Account Settings': 'खाता सेटिंग्स',
          'General': 'सामान्य',
          'Security': 'सुरक्षा',
          'Notifications': 'सूचनाएं',
          'Preferences': 'प्राथमिकताएं',
          'Profile Picture': 'प्रोफ़ाइल चित्र',
          'Upload a new profile picture': 'नया प्रोफ़ाइल चित्र अपलोड करें',
          'Display Name': 'प्रदर्शित नाम',
          'Your display name': 'आपका प्रदर्शित नाम',
          'Bio': 'परिचय',
          'Tell us about yourself': 'अपने बारे में बताएं',
          'Email': 'ईमेल',
          'Your email address': 'आपका ईमेल पता',
          // Add more translations
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;