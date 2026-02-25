import { createI18n } from 'vue-i18n'


const messages = {
  en: {
    nav: {
      home: 'Home',
      menu: 'Menu',
      about: 'About'
    },
    search: 'Search...',
    hotline: 'HOT LINE',
    contact_us: 'Contact Us',
    select_lang: 'Select Language',
    hero: {
      slides: [
        { title: "Real Turkish Taste", subtitle: "Selected ingredients, true flavors." },
        { title: "Delicious Breakfasts", subtitle: "Start your day deliciously." },
        { title: "Special Desserts", subtitle: "Desserts crafted like art." },
        { title: "Family Atmosphere", subtitle: "Enjoy with your loved ones." },
        { title: "Fast & Hot", subtitle: "Delivered hot without waiting." }
      ]
    },
    read_more: 'Read more',
    categories: {
      lead: 'We serve the most delicious Turkish dishes',
      title_prefix: 'We offer you the most enjoyable and convenient way',
      title_highlight: 'delicious',
      title_suffix: 'to enjoy Turkish cuisine.'
    },
    menu: {
      title: 'Our Menus',
      loading: 'Menu is loading...',
      load_error: 'Failed to load the menu. Please try again.',
      retry: 'Retry',
      no_results: 'Nothing found',
      all: 'All',
      other: 'Other',
      price: 'Price',
      no_image: 'No image',
      add: "Add",
      order: 'Order now'
    },
    footer: {
      company_name: 'Beyoglu Karshi',
      description: "We serve Turkish cuisine, fast food and breakfast. Quality and tasty meals with friendly service.",
      contact_heading: 'Contact',
      address_line1: 'Karshi city,',
      address_line2: "Amir Temur street 7/9",
      address_note: "Landmark: Karshi State University",
      phones: ['+998 20 005-10-11', '+998 20 005-50-11'],
      email: "info{'@'}beyouglikarshi.uz",
      hours_heading: 'Opening hours',
      everyday: 'Every day:',
      copyright: '© 2025 Beyougli Karshi. All rights reserved.'
    }
    ,
    about: {
      overline: 'About Us',
      title_prefix: 'Real',
      title_highlight: " Turkish Taste",
      title_suffix: ' and Hospitality',
      paragraph1: "Beyoglu Karshi is more than a restaurant — it's a place that brings the rich culinary culture of Turkey to Qarshi. We prepare each dish with care and high-quality ingredients.",
      paragraph2: "Here you can enjoy not only delicious kebabs and pides, but also desserts made from special recipes and authentic Turkish tea. Our goal is to make every guest feel like they are walking the streets of Istanbul.",
      features: ['Halal Ingredients','Professional Chefs','Fast Delivery','Cozy Atmosphere'],
      view_menu: "View Menu"
    },
    tables: {
      title: 'Restaurant Hall',
      subtitle: 'Choose a table to place an order',
      table: 'Table',
      orders_title: 'Orders',
      no_orders: 'No orders found',
      total: 'Total',
      free: 'Free table',
      close: 'Close',
      no_image: 'No image'
    },
    error_page: {
      badge: 'Error!',
      not_found: 'Page not found',
      server_error: 'Server error',
      unknown: 'Unknown error',
      description: 'Sorry, the page you are looking for was not found or may have been moved.',
      home: 'Home',
      back: 'Go back'
    },
    meal: {
      details: 'Meal details',
      no_description: 'No description',
      price: 'Price',
      total_price: 'Total price',
      delivery_available: 'Delivery service available',
      back: 'Go back',
      not_found: 'Meal not found',
      bad_format: 'Invalid data format',
      load_error: 'Failed to load meal details.',
      loading: 'Loading...'
    }
  },
  uz: {
    nav: {
      home: 'Bosh Sahifa',
      menu: 'Menyu',
      about: 'Haqida'
    },
    search: 'Qidirish...',
    hotline: 'QAYNOQ XAT',
    contact_us: "Biz bilan bog'laning",
    select_lang: 'Tilni Tanlang',
    hero: {
      slides: [
        { title: "Haqiqiy Turk Ta'mi", subtitle: "Eng saralangan masalliqlar." },
        { title: "Mazali Nonushtalar", subtitle: "Kuningizni ajoyib boshlang." },
        { title: "Maxsus Shirinliklar", subtitle: "San'at darajasidagi shirinliklar." },
        { title: "Oilaviy Muhit", subtitle: "Yaqinlaringiz bilan birga." },
        { title: "Tez va Issiq", subtitle: "Kutdirmasdan yetkazamiz." }
      ]
    },
    read_more: 'Batafsil',
    categories: {
      lead: 'Turk oshxonasining eng mazali taomlarini taqdim etamiz',
      title_prefix: 'Sizga turk taomlaridan bahramand bo‘lishning',
      title_highlight: 'eng mazali',
      title_suffix: 'va qulay usulini taklif qilamiz.'
    },
    menu: {
      title: 'Bizning Menyular',
      loading: "Menyu yuklanmoqda...",
      load_error: "Menyuni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      retry: 'Qayta urinish',
      no_results: 'Hech narsa topilmadi',
      all: 'Barchasi',
      other: 'Boshqa',
      price: 'Narx',
      no_image: "Rasm yo'q",
      add: "Qo'shish",
      order: 'Buyurtma berish'
    },
    footer: {
      company_name: 'Beyoglu Karshi',
      description: "Turkiya taomlari, fast food va nonushta taomlarini taqdim etamiz. Sifatli va mazali ovqatlar bilan xizmat ko'rsatamiz.",
      contact_heading: 'Bog\'lanish',
      address_line1: 'Qarshi shahar,',
      address_line2: "Amir Temur ko'chasi 7/9 uy",
      address_note: "Mo'ljal: Qarshi davlat universiteti",
      phones: ['+998 20 005-10-11', '+998 20 005-50-11'],
      email: "info{'@'}beyouglikarshi.uz",
      hours_heading: 'Ish vaqti',
      everyday: 'Har kuni:',
      copyright: '© 2025 Beyoglu Karshi. Barcha huquqlar himoyalangan.'
    }
    ,
    about: {
      overline: 'Biz Haqimizda',
      title_prefix: 'Haqiqiy',
      title_highlight: " Turk Ta'mi",
      title_suffix: " va Mehmondo'stlik",
      paragraph1: "Beyoglu Karshi — bu shunchaki restoran emas, balki Turkiyaning boy oshxona madaniyatini Qarshi shahriga olib kelgan maskan. Biz har bir taomni mehr va eng sara masalliqlar bilan tayyorlaymiz.",
      paragraph2: "Siz bizda nafaqat mazali kaboblar va pidelarni, balki maxsus retsept asosida tayyorlangan shirinliklar va haqiqiy turk choyini ham tatib ko'rishingiz mumkin. Bizning maqsadimiz — har bir mehmonimizga o'zini xuddi Istanbulda yurgandek his qildirishdir.",
      features: ['Halol Masalliqlar','Professional Oshpazlar','Tezkor Yetkazib Berish','Shinam Muhit'],
      view_menu: "Menyuni ko'rish"
    },
    tables: {
      title: 'Restoran Zali',
      subtitle: 'Buyurtma berish uchun stolni tanlang',
      table: 'Stol',
      orders_title: 'Buyurtmalar',
      no_orders: 'Buyurtma topilmadi',
      total: 'Jami',
      free: "Bo'shatish",
      close: 'Yopish',
      no_image: "Rasm yo'q"
    },
    error_page: {
      badge: 'Xatolik!',
      not_found: 'Sahifa topilmadi',
      server_error: 'Server xatosi',
      unknown: "Noma'lum xatolik",
      description: "Kechirasiz, siz qidirayotgan sahifa topilmadi yoki ko'chirilgan bo'lishi mumkin.",
      home: 'Bosh sahifa',
      back: 'Orqaga qaytish'
    },
    meal: {
      details: 'Taom tafsilotlari',
      no_description: "Tavsif yo'q",
      price: 'Narx',
      total_price: 'Jami narx',
      delivery_available: 'Yetkazib berish xizmati mavjud',
      back: 'Ortga qaytish',
      not_found: 'Bunday ovqat topilmadi',
      bad_format: "Ma'lumotlar formati noto'g'ri",
      load_error: "Ma'lumotni yuklashda xatolik yuz berdi yoki ovqat topilmadi.",
      loading: 'Yuklanmoqda...'
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      menu: 'Menü',
      about: 'Hakkımızda'
    },
    search: 'Ara...',
    hotline: 'DESTEK HATTI',
    contact_us: 'Bize Ulaşın',
    select_lang: 'Dil Seçin',
    hero: {
      slides: [
        { title: "Gerçek Türk Lezzeti", subtitle: "Seçkin malzemelerle gerçek tatlar." },
        { title: "Lezzetli Kahvaltılar", subtitle: "Gününüzü muhteşem başlatın." },
        { title: "Özel Tatlılar", subtitle: "Sanat düzeyinde tatlılar." },
        { title: "Aile Ortamı", subtitle: "Sevdiklerinizle birlikte." },
        { title: "Hızlı ve Sıcak", subtitle: "Bekletmeden teslim ediyoruz." }
      ]
    },
    read_more: 'Daha fazla',
    categories: {
      lead: 'En lezzetli Türk yemeklerini sunuyoruz',
      title_prefix: 'Size Türk mutfağının tadını çıkarmanın',
      title_highlight: 'en lezzetli',
      title_suffix: 've en pratik yolunu sunuyoruz.'
    },
    menu: {
      title: 'Menülerimiz',
      loading: 'Menü yükleniyor...',
      load_error: 'Menü yüklenirken hata oluştu. Lütfen tekrar deneyin.',
      retry: 'Tekrar Dene',
      no_results: 'Hiçbir şey bulunamadı',
      all: 'Hepsi',
      other: 'Diğer',
      price: 'Fiyat',
      no_image: 'Resim yok',
      add: 'Ekle',
      order: 'Sipariş ver'
    },
    footer: {
      company_name: 'Beyoglu Karshi',
      description: "Türk mutfağı, fast food ve kahvaltı seçenekleri sunuyoruz. Kaliteli ve lezzetli yemeklerle hizmet veriyoruz.",
      contact_heading: 'İletişim',
      address_line1: 'Karshi şehri,',
      address_line2: 'Amir Temur caddesi 7/9',
      address_note: 'Referans: Karshi Devlet Üniversitesi',
      phones: ['+998 20 005-10-11', '+998 20 005-50-11'],
      email: "info{'@'}beyouglikarshi.uz",
      hours_heading: 'Çalışma saatleri',
      everyday: 'Her gün:',
      copyright: '© 2025 Beyoglu Karshi. Tüm hakları saklıdır.'
    }
    ,
    about: {
      overline: 'Hakkımızda',
      title_prefix: 'Gerçek',
      title_highlight: ' Türk Lezzeti',
      title_suffix: ' ve Misafirperverlik',
      paragraph1: "Beyoglu Karshi, sadece bir restoran değil — Karshi'ye Türkiye'nin zengin mutfak kültürünü getiren bir mekan. Her yemeği özenle ve kaliteli malzemelerle hazırlıyoruz.",
      paragraph2: "Burada sadece lezzetli kebaplar ve pideleri değil, aynı zamanda özel tariflerle hazırlanan tatlıları ve gerçek Türk çayını da tadabilirsiniz. Amacımız, her konuğumuzu İstanbul'da gibi hissettirmektir.",
      features: ['Helal Malzemeler','Profesyonel Aşçılar','Hızlı Teslimat','Sıcak Ortam'],
      view_menu: 'Menüyü Gör'
    },
    tables: {
      title: 'Restoran Salonu',
      subtitle: 'Sipariş vermek için masa seçin',
      table: 'Masa',
      orders_title: 'Siparişler',
      no_orders: 'Sipariş bulunamadı',
      total: 'Toplam',
      free: 'Boşalt',
      close: 'Kapat',
      no_image: 'Görsel yok'
    },
    error_page: {
      badge: 'Hata!',
      not_found: 'Sayfa bulunamadı',
      server_error: 'Sunucu hatası',
      unknown: 'Bilinmeyen hata',
      description: 'Üzgünüz, aradığınız sayfa bulunamadı veya taşınmış olabilir.',
      home: 'Ana sayfa',
      back: 'Geri dön'
    },
    meal: {
      details: 'Yemek detayları',
      no_description: 'Açıklama yok',
      price: 'Fiyat',
      total_price: 'Toplam fiyat',
      delivery_available: 'Teslimat hizmeti mevcut',
      back: 'Geri dön',
      not_found: 'Yemek bulunamadı',
      bad_format: 'Geçersiz veri formatı',
      load_error: 'Yemek detayları yüklenemedi.',
      loading: 'Yükleniyor...'
    }
  }
}

const savedLocale =
  typeof window !== 'undefined' ? localStorage.getItem('user-locale') : null

const i18n = createI18n({
  legacy: false,
  locale: savedLocale || 'uz',
  fallbackLocale: 'en',
  messages
})

export default i18n
