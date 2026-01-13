import { createI18n } from 'vue-i18n'


const messages = {
  en: {
    nav: {
      home: 'Home',
      menu: 'Menu',
      pages: 'Pages',
      blog: 'Blog',
      shop: 'Shop'
    },
    search: 'Search...',
    hotline: 'HOT LINE',
    contact_us: 'Contact Us',
    select_lang: 'Select Language'
  },
  uz: {
    nav: {
      home: 'Bosh Sahifa',
      menu: 'Menyu',
      pages: 'Sahifalar',
      blog: 'Blog',
      shop: "Do'kon"
    },
    search: 'Qidirish...',
    hotline: 'QAYNOQ XAT',
    contact_us: "Biz bilan bog'laning",
    select_lang: 'Tilni Tanlang'
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      menu: 'Menü',
      pages: 'Sayfalar',
      blog: 'Blog',
      shop: 'Mağaza'
    },
    search: 'Ara...',
    hotline: 'DESTEK HATTI',
    contact_us: 'Bize Ulaşın',
    select_lang: 'Dil Seçin'
  }
}

const i18n = createI18n({
  legacy: false, // Vue 3 Composition API uchun false bo'lishi shart
  locale: 'uz', // Boshlang'ich til
  fallbackLocale: 'en', // Agar tarjima topilmasa ingliz tiliga o'tadi
  messages
})

export default i18n