const fs = require("fs");
const path = require("path");

const locales = [
  "ar",
  "am",
  "bg",
  "bn",
  "ca",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "en_AU",
  "en_GB",
  "en_US",
  "es",
  "es_419",
  "et",
  "fa",
  "fi",
  "fil",
  "fr",
  "gu",
  "he",
  "hi",
  "hr",
  "hu",
  "id",
  "it",
  "ja",
  "kn",
  "ko",
  "lt",
  "lv",
  "ml",
  "mr",
  "ms",
  "nl",
  "no",
  "pl",
  "pt_BR",
  "pt_PT",
  "ro",
  "ru",
  "sk",
  "sl",
  "sr",
  "sv",
  "sw",
  "ta",
  "te",
  "th",
  "tr",
  "uk",
  "vi",
  "zh_CN",
  "zh_TW",
];

// Translations for all locales
const localeTranslations = {
  ar: {
    extensionName: { message: "Wallpaper Alchemy – علامة تبويب جديدة" },
    extensionDescription: {
      message:
        "صفحة علامة تبويب جديدة جميلة وقابلة للتخصيص مع خلفيات وعناصر واجهة مستخدم.",
    },
  },
  am: {
    extensionName: { message: "Wallpaper Alchemy – አዲስ ትር" },
    extensionDescription: {
      message: "ከበስተጀርባ እና ከመሳሪያዎች ጋር ቆንጆ፣ ብጁ የሚደረግ አዲስ ትር ገጽ።",
    },
  },
  bg: {
    extensionName: { message: "Wallpaper Alchemy – Нов раздел" },
    extensionDescription: {
      message:
        "Красива, персонализирана страница за нов раздел с фонове и джаджи.",
    },
  },
  bn: {
    extensionName: { message: "Wallpaper Alchemy – নতুন ট্যাব" },
    extensionDescription: {
      message:
        "ব্যাকগ্রাউন্ড এবং উইজেট সহ একটি সুন্দর, কাস্টমাইজযোগ্য নতুন ট্যাব পৃষ্ঠা।",
    },
  },
  ca: {
    extensionName: { message: "Wallpaper Alchemy – Pestanya nova" },
    extensionDescription: {
      message:
        "Una pàgina de pestanya nova bonica i personalitzable amb fons i ginys.",
    },
  },
  cs: {
    extensionName: { message: "Wallpaper Alchemy – Nová karta" },
    extensionDescription: {
      message:
        "Krásná, přizpůsobitelná stránka nové karty s pozadím a widgety.",
    },
  },
  da: {
    extensionName: { message: "Wallpaper Alchemy – Nyt faneblad" },
    extensionDescription: {
      message:
        "En smuk, tilpasselig side til nyt faneblad med baggrunde og widgets.",
    },
  },
  de: {
    extensionName: { message: "Wallpaper Alchemy – Neuer Tab" },
    extensionDescription: {
      message:
        "Eine wunderschöne, anpassbare Seite für neue Tabs mit Hintergründen und Widgets.",
    },
  },
  el: {
    extensionName: { message: "Wallpaper Alchemy – Νέα καρτέλα" },
    extensionDescription: {
      message:
        "Μια όμορφη, προσαρμόσιμη σελίδα νέας καρτέλας με φόντα και γραφικά στοιχεία.",
    },
  },
  en: {
    extensionName: { message: "Wallpaper Alchemy – New Tab" },
    extensionDescription: {
      message:
        "A beautiful, customizable New Tab page with backgrounds and widgets.",
    },
  },
  en_AU: {
    extensionName: { message: "Wallpaper Alchemy – New Tab" },
    extensionDescription: {
      message:
        "A beautiful, customisable New Tab page with backgrounds and widgets.",
    },
  },
  en_GB: {
    extensionName: { message: "Wallpaper Alchemy – New Tab" },
    extensionDescription: {
      message:
        "A beautiful, customisable New Tab page with backgrounds and widgets.",
    },
  },
  en_US: {
    extensionName: { message: "Wallpaper Alchemy – New Tab" },
    extensionDescription: {
      message:
        "A beautiful, customizable New Tab page with backgrounds and widgets.",
    },
  },
  es: {
    extensionName: { message: "Wallpaper Alchemy – Nueva pestaña" },
    extensionDescription: {
      message:
        "Una hermosa página de nueva pestaña personalizable con fondos y widgets.",
    },
  },
  es_419: {
    extensionName: { message: "Wallpaper Alchemy – Pestaña nueva" },
    extensionDescription: {
      message:
        "Una hermosa página de pestaña nueva personalizable con fondos y widgets.",
    },
  },
  et: {
    extensionName: { message: "Wallpaper Alchemy – Uus vahekaart" },
    extensionDescription: {
      message: "Ilus, kohandatav uue vahekaardi leht taustade ja vidinate.",
    },
  },
  fa: {
    extensionName: { message: "Wallpaper Alchemy – برگه جدید" },
    extensionDescription: {
      message:
        "یک صفحه برگه جدید زیبا و قابل سفارشی‌سازی با پس‌زمینه‌ها و ابزارک‌ها.",
    },
  },
  fi: {
    extensionName: { message: "Wallpaper Alchemy – Uusi välilehti" },
    extensionDescription: {
      message:
        "Kaunis, muokattava uusi välilehti -sivu taustakuvilla ja widgeteillä.",
    },
  },
  fil: {
    extensionName: { message: "Wallpaper Alchemy – Bagong Tab" },
    extensionDescription: {
      message:
        "Isang magandang, nako-customize na pahina ng Bagong Tab na may mga background at widget.",
    },
  },
  fr: {
    extensionName: { message: "Wallpaper Alchemy – Nouvel onglet" },
    extensionDescription: {
      message:
        "Une belle page de nouvel onglet personnalisable avec des arrière-plans et des widgets.",
    },
  },
  gu: {
    extensionName: { message: "Wallpaper Alchemy – નવું ટૅબ" },
    extensionDescription: {
      message:
        "બેકગ્રાઉન્ડ્સ અને વિજેટ્સ સાથેનું એક સુંદર, કસ્ટમાઇઝ કરી શકાય તેવું નવું ટૅબ પેજ.",
    },
  },
  he: {
    extensionName: { message: "Wallpaper Alchemy – כרטיסייה חדשה" },
    extensionDescription: {
      message: "דף כרטיסייה חדשה יפה וניתן להתאמה אישית עם רקעים ווידג'טים.",
    },
  },
  hi: {
    extensionName: { message: "Wallpaper Alchemy – नया टैब" },
    extensionDescription: {
      message:
        "बैकग्राउंड और विजेट के साथ एक सुंदर, अनुकूलन योग्य नया टैब पेज।",
    },
  },
  hr: {
    extensionName: { message: "Wallpaper Alchemy – Nova kartica" },
    extensionDescription: {
      message:
        "Prekrasna, prilagodljiva stranica nove kartice s pozadinama i widgetima.",
    },
  },
  hu: {
    extensionName: { message: "Wallpaper Alchemy – Új lap" },
    extensionDescription: {
      message:
        "Egy gyönyörű, testreszabható új lap oldal háttérképekkel és widgetekkel.",
    },
  },
  id: {
    extensionName: { message: "Wallpaper Alchemy – Tab Baru" },
    extensionDescription: {
      message:
        "Halaman Tab Baru yang indah dan dapat disesuaikan dengan latar belakang dan widget.",
    },
  },
  it: {
    extensionName: { message: "Wallpaper Alchemy – Nuova scheda" },
    extensionDescription: {
      message:
        "Una bellissima pagina di nuova scheda personalizzabile con sfondi e widget.",
    },
  },
  ja: {
    extensionName: { message: "Wallpaper Alchemy – 新しいタブ" },
    extensionDescription: {
      message:
        "背景とウィジェットを備えた美しくカスタマイズ可能な新しいタブページ。",
    },
  },
  kn: {
    extensionName: { message: "Wallpaper Alchemy – ಹೊಸ ಟ್ಯಾಬ್" },
    extensionDescription: {
      message:
        "ಹಿನ್ನೆಲೆಗಳು ಮತ್ತು ವಿಜೆಟ್‌ಗಳೊಂದಿಗೆ ಸುಂದರವಾದ, ಕಸ್ಟಮೈಸ್ ಮಾಡಬಹುದಾದ ಹೊಸ ಟ್ಯಾಬ್ ಪುಟ.",
    },
  },
  ko: {
    extensionName: { message: "Wallpaper Alchemy – 새 탭" },
    extensionDescription: {
      message: "배경과 위젯이 있는 아름답고 맞춤 설정 가능한 새 탭 페이지.",
    },
  },
  lt: {
    extensionName: { message: "Wallpaper Alchemy – Naujas skirtukas" },
    extensionDescription: {
      message:
        "Gražus, pritaikomas naujo skirtuko puslapis su fonais ir valdikliais.",
    },
  },
  lv: {
    extensionName: { message: "Wallpaper Alchemy – Jauna cilne" },
    extensionDescription: {
      message:
        "Skaista, pielāgojama jaunas cilnes lapa ar foniem un sīkrīkiem.",
    },
  },
  ml: {
    extensionName: { message: "Wallpaper Alchemy – പുതിയ ടാബ്" },
    extensionDescription: {
      message:
        "പശ്ചാത്തലങ്ങളും വിജറ്റുകളുമുള്ള മനോഹരവും ഇഷ്‌ടാനുസൃതമാക്കാവുന്നതുമായ പുതിയ ടാബ് പേജ്.",
    },
  },
  mr: {
    extensionName: { message: "Wallpaper Alchemy – नवीन टॅब" },
    extensionDescription: {
      message:
        "पार्श्वभूमी आणि विजेट्ससह एक सुंदर, सानुकूल करण्यायोग्य नवीन टॅब पृष्ठ.",
    },
  },
  ms: {
    extensionName: { message: "Wallpaper Alchemy – Tab Baharu" },
    extensionDescription: {
      message:
        "Halaman Tab Baharu yang cantik dan boleh disesuaikan dengan latar belakang dan widget.",
    },
  },
  nl: {
    extensionName: { message: "Wallpaper Alchemy – Nieuw tabblad" },
    extensionDescription: {
      message:
        "Een mooie, aanpasbare pagina voor nieuw tabblad met achtergronden en widgets.",
    },
  },
  no: {
    extensionName: { message: "Wallpaper Alchemy – Ny fane" },
    extensionDescription: {
      message:
        "En vakker, tilpassbar side for ny fane med bakgrunner og moduler.",
    },
  },
  pl: {
    extensionName: { message: "Wallpaper Alchemy – Nowa karta" },
    extensionDescription: {
      message: "Piękna, konfigurowalna strona nowej karty z tłami i widżetami.",
    },
  },
  pt_BR: {
    extensionName: { message: "Wallpaper Alchemy – Nova guia" },
    extensionDescription: {
      message:
        "Uma linda página de nova guia personalizável com planos de fundo e widgets.",
    },
  },
  pt_PT: {
    extensionName: { message: "Wallpaper Alchemy – Novo separador" },
    extensionDescription: {
      message:
        "Uma bela página de novo separador personalizável com fundos e widgets.",
    },
  },
  ro: {
    extensionName: { message: "Wallpaper Alchemy – Filă nouă" },
    extensionDescription: {
      message:
        "O pagină frumoasă și personalizabilă de filă nouă cu fundaluri și widget-uri.",
    },
  },
  ru: {
    extensionName: { message: "Wallpaper Alchemy – Новая вкладка" },
    extensionDescription: {
      message:
        "Красивая настраиваемая страница новой вкладки с фонами и виджетами.",
    },
  },
  sk: {
    extensionName: { message: "Wallpaper Alchemy – Nová karta" },
    extensionDescription: {
      message:
        "Krásna, prispôsobiteľná stránka novej karty s pozadím a widgetmi.",
    },
  },
  sl: {
    extensionName: { message: "Wallpaper Alchemy – Nov zavihek" },
    extensionDescription: {
      message:
        "Lepa, prilagodljiva stran novega zavihka z ozadji in pripomočki.",
    },
  },
  sr: {
    extensionName: { message: "Wallpaper Alchemy – Нова картица" },
    extensionDescription: {
      message:
        "Прелепа, прилагодљива страница нове картице са позадинама и виџетима.",
    },
  },
  sv: {
    extensionName: { message: "Wallpaper Alchemy – Ny flik" },
    extensionDescription: {
      message:
        "En vacker, anpassningsbar sida för ny flik med bakgrunder och widgets.",
    },
  },
  sw: {
    extensionName: { message: "Wallpaper Alchemy – Kichupo Kipya" },
    extensionDescription: {
      message:
        "Ukurasa mzuri, unaowezesha ubadilishaji wa Kichupo Kipya wenye mandhari na wijeti.",
    },
  },
  ta: {
    extensionName: { message: "Wallpaper Alchemy – புதிய தாவல்" },
    extensionDescription: {
      message:
        "பின்னணிகள் மற்றும் விட்ஜெட்களுடன் அழகான, தனிப்பயனாக்கக்கூடிய புதிய தாவல் பக்கம்.",
    },
  },
  te: {
    extensionName: { message: "Wallpaper Alchemy – కొత్త ట్యాబ్" },
    extensionDescription: {
      message:
        "నేపథ్యాలు మరియు విడ్జెట్‌లతో అందమైన, అనుకూలీకరించదగిన కొత్త ట్యాబ్ పేజీ.",
    },
  },
  th: {
    extensionName: { message: "Wallpaper Alchemy – แท็บใหม่" },
    extensionDescription: {
      message: "หน้าแท็บใหม่ที่สวยงามและปรับแต่งได้พร้อมพื้นหลังและวิดเจ็ต",
    },
  },
  tr: {
    extensionName: { message: "Wallpaper Alchemy – Yeni Sekme" },
    extensionDescription: {
      message:
        "Arka planlar ve widget'lar içeren güzel, özelleştirilebilir bir Yeni Sekme sayfası.",
    },
  },
  uk: {
    extensionName: { message: "Wallpaper Alchemy – Нова вкладка" },
    extensionDescription: {
      message:
        "Гарна настроювана сторінка нової вкладки з фонами та віджетами.",
    },
  },
  vi: {
    extensionName: { message: "Wallpaper Alchemy – Tab mới" },
    extensionDescription: {
      message:
        "Trang Tab mới đẹp mắt, có thể tùy chỉnh với hình nền và tiện ích.",
    },
  },
  zh_CN: {
    extensionName: { message: "Wallpaper Alchemy – 新标签页" },
    extensionDescription: {
      message: "具有背景和小部件的精美、可自定义的新标签页。",
    },
  },
  zh_TW: {
    extensionName: { message: "Wallpaper Alchemy – 新分頁" },
    extensionDescription: {
      message: "具有背景和小工具的精美、可自訂的新分頁。",
    },
  },
};

const generateLocaleFiles = (targetDir) => {
  const localesDir = path.join(targetDir, "_locales");

  // Create _locales directory if it doesn't exist
  if (!fs.existsSync(localesDir)) {
    fs.mkdirSync(localesDir, { recursive: true });
  }

  locales.forEach((locale) => {
    const localeDir = path.join(localesDir, locale);

    // Create locale directory
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }

    // Get translations for this locale
    const messages = localeTranslations[locale];

    if (!messages) {
      console.warn(`Warning: No translations found for ${locale}`);
      return;
    }

    // Write messages.json
    const messagesPath = path.join(localeDir, "messages.json");
    fs.writeFileSync(messagesPath, JSON.stringify(messages, null, 2) + "\n");
  });
};

// Generate for both Chromium and Firefox
const targets = ["chromium", "firefox"];

targets.forEach((target) => {
  const targetDir = path.join(__dirname, "..", "target", target);

  if (fs.existsSync(targetDir)) {
    generateLocaleFiles(targetDir);
  } else {
    console.log(`\nSkipping ${target} (directory not found)`);
  }
});
