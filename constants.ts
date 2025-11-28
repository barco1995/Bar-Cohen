

import { Concept, ConceptCategory, ConceptLevel, SimulationScenario, CommunityPost, PostType, UserRank } from './types';

export const CONCEPTS: Concept[] = [
  // --- BEGINNER (יסודות) ---
  {
    id: 'c1',
    title: 'משחק פנימי (Inner Game)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'המצב הפסיכולוגי הפנימי, הערכה עצמית ואמונות מגבילות.',
    details: 'משחק פנימי הוא היסוד להכל. הוא מתייחס לתפיסה העצמית שלך ולמערכת האמונות שלך. עיקרון מפתח הוא ש"המציאות ניתנת למשא ומתן". אם אתה מאמין שאתה בעל ערך גבוה, אחרים בסופו של דבר יקבלו את המסגרת הזו. זה כרוך בהסרת "התניות חברתיות" וכניסה למצב טבעי של שפע וביטחון.',
    videoId: 'Ks-_Mh1QhMc'
  },
  {
    id: 'c3',
    title: 'סטייט ואנרגיה (State & Vibe)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'העברה רגשית ו"הדבקה רגשית".',
    details: 'סטייט (State) הוא הרטט הרגשי הנוכחי שלך. עיקרון ה"העברה" אומר שמה שאתה מרגיש, גם הם ירגישו. אם אתה חרד, הם ירגישו מבוכה. אם אתה נהנה (שעשוע עצמי), הם ימשכו אליך. עליך ללמוד לייצר את הסטייט מבפנים (אישור פנימי) ולא להגיב לסביבה.',
    videoId: 'M7E-Y0d1yUE'
  },
  {
    id: 'c6',
    title: 'הפתיחה (The Open)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'ייזום אינטראקציה כדי לשבור את מחסום האלמוניות.',
    details: 'בין אם זו פתיחה ישירה ("את נראית חמודה, הייתי חייב להגיד היי") או עקיפה ("תגידי, לדעתך איות חשוב בהודעות טקסט?"), המטרה היא להתחיל. המילים חשובות פחות מהתקשורת התת-מילולית: הקרנה קולית חזקה, שפת גוף יציבה ו"חיתוך" ההיסוס.',
    videoId: 'W3KiU6t4rMI'
  },
  {
    id: 'c11',
    title: 'אי-תלות בתוצאה (Outcome Independence)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'היכולת לפעול ללא פחד מדחייה או צורך באישור.',
    details: 'זהו סימן ההיכר האולטימטיבי של ביטחון עצמי. כשאתה ניגש למישהי, אתה עושה זאת כי אתה רוצה להכיר אותה, לא כי אתה *צריך* תגובה טובה כדי להרגיש טוב עם עצמך. הגישה היא: "אני אציע ערך, אם היא תיקח - מצוין, אם לא - ההפסד שלה". זה משדר כוח ושפע.',
    videoId: 'ryCFi1BDhkk'
  },
  {
    id: 'c12',
    title: 'שעשוע עצמי (Self-Amusement)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'המקור לאנרגיה חברתית בלתי נגמרת.',
    details: 'רוב הגברים מנסים להצחיק את הבחורה כדי לקבל אישור. מאסטר בדינמיקה חברתית מצחיק את *עצמו*. כשאתה נהנה באמת, העיניים שלך בורקות והאנרגיה שלך מדבקת. אל תהיה בדרן עבור אחרים, תהיה המסיבה של עצמך ואחרים ירצו להצטרף.',
    videoId: 'B9XGUpQZY38'
  },
  {
    id: 'c13',
    title: 'קשר עין "דביק" (Sticky Eyes)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.BEGINNER,
    description: 'טכניקה להפגנת דומיננטיות וביטחון.',
    details: 'כשאתה מדבר עם מישהי, אל תשבור קשר עין ראשון. כשאתה מסיים משפט, השאר את המבט עליה לשבריר שנייה נוסף לפני שאתה מביט הצידה. זה משדר שאתה בנוח עם מתח ולא מנסה לברוח מהסיטואציה.',
    videoId: null
  },

  // --- INTERMEDIATE (בניית יכולת) ---
  {
    id: 'c2',
    title: 'שליטה במסגרת (Frame Control)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.INTERMEDIATE,
    description: 'ההקשר הסמוי או "המציאות" של האינטראקציה.',
    details: 'ה"מסגרת" (Frame) היא הפרשנות של המציאות. בכל אינטראקציה, האדם עם המסגרת החזקה יותר הוא זה שמוביל. מסגרות נפוצות כוללות את "מסגרת הפרס" (אני הפרס שצריך לזכות בו) לעומת "מסגרת המחפש" (אני צריך את האישור שלך). שליטה במסגרת פירושה לשמור על המציאות שלך גם כשאתה מאותגר על ידי "מבחני התאמה" (Shit Tests).',
    videoId: '7Xp_eJEc6vU'
  },
  {
    id: 'c7',
    title: 'נקודת ה"הוק" (Hook Point)',
    category: ConceptCategory.SOCIAL_INTELLIGENCE,
    level: ConceptLevel.INTERMEDIATE,
    description: 'הרגע הקריטי שבו האינטראקציה הופכת להדדית.',
    details: 'נקודת ה-Hook מושגת כשהם מפסיקים רק להיות מנומסים ומתחילים להשקיע באופן פעיל בשיחה. אתה מגיע לזה על ידי מתן ערך (בידור, אנרגיה טובה, סקרנות) עד שהם מחליטים שהם רוצים שתשאר. לאחר מכן, עליך לעבור מ"בדרן" ל"מקשר".',
    videoId: null
  },
  {
    id: 'c9',
    title: 'הסמכה (Qualification)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.INTERMEDIATE,
    description: 'היפוך התסריט כך שהם ירדפו אחרי האישור שלך.',
    details: 'במקום לנסות להרשים אותם, אתה "מסמיך" אותם. אתה מציב סטנדרטים ובודק אם הם עומדים בהם. "את הרפתקנית או משעממת?", "את יודעת לבשל?". זה משדר שאתה אדם עם אופציות וסטנדרטים, ומאלץ אותם לעבוד עבור האישור שלך.',
    videoId: null
  },
  {
    id: 'c5',
    title: 'כיול חברתי (Calibration)',
    category: ConceptCategory.SOCIAL_INTELLIGENCE,
    level: ConceptLevel.INTERMEDIATE,
    description: 'קריאת משוב חברתי כדי להתאים את ההתנהגות.',
    details: 'כיול הוא ההבדל בין להיות כריזמטי לבין להיות "מטריד". זה דורש קריאה של הבעות פנים ורמות אנרגיה. אם האנרגיה שלהם נמוכה, אתה נכנס מעט גבוה יותר, אך לא בצורה מוגזמת. אם הם נסוגים (Push), אתה נסוג. זהו כוונון מתמיד של "גז וברקס".',
    videoId: 'dwK448f8fKs'
  },
  {
    id: 'c14',
    title: 'קריאה קרה (Cold Reading)',
    category: ConceptCategory.SOCIAL_INTELLIGENCE,
    level: ConceptLevel.INTERMEDIATE,
    description: 'יצירת עניין על ידי הצהרות במקום שאלות.',
    details: 'לשאול "מאיפה את?" זה משעמם. להגיד "את נראית כמו מישהי שגדלה במושב, יש לך וייב רגוע כזה" זה מעניין. קריאה קרה יוצרת חיבור מהיר יותר. גם אם טעית, היא תתקן אותך והשיחה תזרום. זה מראה שאתה שם לב לפרטים ושיש לך אינטואיציה חברתית.',
    videoId: null
  },
  {
    id: 'c15',
    title: 'שתיקה רועמת (Pregnant Pause)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.INTERMEDIATE,
    description: 'שימוש בשתיקה ליצירת מתח מיני וציפייה.',
    details: 'רוב האנשים מפחדים משתיקה וממלאים אותה בדיבור סרק. אל תעשה את זה. כשנוצרת שתיקה, הבט לה בעיניים וחייך חיוך קטן. השתיקה יוצרת מתח שחייב להשתחרר, ולרוב הוא משתחרר כמשיכה או צחוק מבוכה חיובי. זהו רגע של ביטחון עצמי טהור.',
    videoId: null
  },

  // --- ADVANCED (מאסטרי) ---
  {
    id: 'c8',
    title: 'דחיפה-משיכה (Push-Pull)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.ADVANCED,
    description: 'יצירת מתח רגשי באמצעות איתותים מעורבים.',
    details: 'כדי לבנות משיכה, צריך מתח. Push-Pull כרוך במעבר בין עניין (משיכה) לבין פסילה/ריחוק (דחיפה). דוגמה: "את דווקא ממש חמודה (משיכה), חבל שאת צרות צרורות (דחיפה)." זה מונע מהאינטראקציה להיות שטוחה או אפלטונית. דורש כיול עדין כדי לא לפגוע.',
    videoId: '3a0t8jRkgiA'
  },
  {
    id: 'c4',
    title: 'הוכחה חברתית (Social Proof)',
    category: ConceptCategory.SOCIAL_INTELLIGENCE,
    level: ConceptLevel.ADVANCED,
    description: 'הטריגר הפסיכולוגי שבו אנשים מחקים את העדר.',
    details: 'אנשים מסתכלים על אחרים כדי לקבוע ערך. אם רואים אותך מתקשר בצורה חיובית עם אנשים אחרים בעלי ערך גבוה או נשים מושכות (Pre-Selection), הערך שלך עולה אוטומטית. זה כלי מתקדם כי הוא דורש ניהול של מספר אנשים בו זמנית.',
    videoId: 'UeafDxK693k'
  },
  {
    id: 'c10',
    title: 'השקעה (Investment)',
    category: ConceptCategory.LOGISTICS,
    level: ConceptLevel.ADVANCED,
    description: 'ככל שהם משקיעים יותר, כך הם מעריכים אותך יותר.',
    details: 'השקעה יכולה להיות רגשית, זמן, או פיזית. אתה רוצה להגדיל לאט את ההשקעה שלהם (סולם ההענות). לבקש מהם להחזיק את המשקה שלך, לעבור למקום אחר במועדון, או לשתף סוד. ככל שהם משקיעים יותר מאמץ, כך פוחת הסיכוי שהם יעלמו (Sunk Cost).',
    videoId: 'z2YkE9GmkF0'
  },
  {
    id: 'c16',
    title: 'סאב-תקשורת (Sub-communication)',
    category: ConceptCategory.SOCIAL_INTELLIGENCE,
    level: ConceptLevel.ADVANCED,
    description: 'המסר הסמוי שעובר מתחת למילים.',
    details: 'המילים שלך אומרות "נעים להכיר", אבל הסאב-טקסט (טון הדיבור, קצב, מבט) יכול להגיד "אני רוצה אותך" או "אני נואש לאישור". מאסטרים מתקשרים בשני רבדים במקביל. הם יכולים לדבר על מזג האוויר, אבל לשדר מיניות ודומיננטיות דרך הניואנסים הקוליים.',
    videoId: null
  },
  {
    id: 'c17',
    title: 'מסגור מחדש (Reframing)',
    category: ConceptCategory.INNER_GAME,
    level: ConceptLevel.ADVANCED,
    description: 'היכולת לקחת שלילי ולהפוך אותו לחיובי בזמן אמת.',
    details: 'אם היא אומרת "אתה אומר את זה לכל הבנות", גבר חלש יתגונן ("לא נכון!"). גבר חזק יבצע Reframing: "רק ליפות, ולצערי את לא עומדת בקריטריונים... סתם, את בסדר". זה הופך את ה"התקפה" שלה להזדמנות לפלרטוט ולהפגנת שנינות.',
    videoId: null
  },
  {
    id: 'c18',
    title: 'אסקלציה פיזית (Kino Escalation)',
    category: ConceptCategory.OUTER_GAME,
    level: ConceptLevel.ADVANCED,
    description: 'בניית מגע בצורה מדורגת וטבעית.',
    details: 'מגע הוא קריטי ליציאה מה-Friendzone. זה מתחיל במגע חברתי אגבי (מרפק, כתף) בזמן דגש בשיחה, ועובר למגע אישי יותר (יד, גב תחתון) ככל שהנוחות עולה. הסוד הוא: שני צעדים קדימה, צעד אחורה. גע ותנתק מגע. אל תהיה "דביק".',
    videoId: null
  }
];

// Reordered SCENARIOS: Beginner -> Intermediate -> Advanced
export const SCENARIOS: SimulationScenario[] = [
  // --- BEGINNER ---
  {
    id: 's1',
    title: 'בית הקפה',
    description: 'תרחיש יום (Daygame). אנרגיה נמוכה, חשיפה גבוהה.',
    difficulty: 'מתחיל',
    initialPrompt: 'אתה בריסטה בבית קפה מיוחד. יום שלישי שקט אחר הצהריים. לקוח (המשתמש) ניגש לדלפק. אתה ידידותי אך עסוק. המשתמש צריך לפתוח בשיחה ולעבור לנושא אישי בלי לעכב את התור. תגיב בעברית בתור הבריסטה.'
  },
  {
    id: 's10',
    title: 'המתנה בתור',
    description: 'סיטואציוני לחלוטין. ניצול זמן מת לשיחה.',
    difficulty: 'מתחיל',
    initialPrompt: 'אנחנו עומדים בתור ארוך ומעצבן (סופר/דואר/ביטוח לאומי). המשתמש מעיר הערה על המצב. אתה משועמם ושמח לבידור. תגיב בעברית.'
  },
  {
    id: 's8',
    title: 'מסיבת בית',
    description: 'אווירה חמה, חברים משותפים, אנרגיה בינונית-גבוהה.',
    difficulty: 'מתחיל',
    initialPrompt: 'אתה במסיבת בית של חבר משותף, יושב על הספה עם משקה. המשתמש מתיישב לידך. זה מצב "חם" (Warm approach). הציפייה היא להיות חברותי וקליל. תגיב בעברית.'
  },
  {
    id: 's7',
    title: 'דייט ראשון (הבר)',
    description: 'שלב הנוחות והמשיכה. בניית כימיה בישיבה.',
    difficulty: 'מתחיל',
    initialPrompt: 'אנחנו בדייט ראשון בבר שקט. כבר נפגשנו, עכשיו יושבים. המשתמש צריך ליצור עניין מעבר לראיון עבודה ("מה את עושה בחיים?"). אם הוא שואל שאלות רגשיות/מעניינות, תתחבר. אם משעמם, תהיה קרה. תגיב בעברית.'
  },

  // --- INTERMEDIATE ---
  {
    id: 's6',
    title: 'חדר כושר',
    description: 'סביבה עדינה. יש להימנע מלהיות "המוזר" שמפריע לאימון.',
    difficulty: 'בינוני',
    initialPrompt: "אתה מתאמן בחדר כושר, נח בין סטים ליד הברזייה. המשתמש ניגש. זהו מצב עדין. אם הוא פותח ב'הערה מצחיקה על האימון' זה טוב. אם הוא מחמיא על הגוף מיד, זה קרינג'י. תגיב בהתאם בעברית."
  },
  {
    id: 's9',
    title: 'חנות ספרים',
    description: 'גישה שקטה, אינטלקטואלית, מבוססת תחומי עניין.',
    difficulty: 'בינוני',
    initialPrompt: 'אתה מעיין בספר במדור הפסיכולוגיה/פילוסופיה. המשתמש ניגש. כאן צריך להיות שקטים ומנומסים אבל מסקרנים. פתיחה על הספר היא קלאסית. תגיב בעברית.'
  },
  {
    id: 's2',
    title: 'אירוע נטוורקינג',
    description: 'משחק מעגל חברתי. הקשר מקצועי אך פלרטטני.',
    difficulty: 'בינוני',
    initialPrompt: 'אתה נמצא באירוע מיקסר של סטארטאפים, עומד ליד המשקאות. אתה קצת משועמם. המשתמש ניגש. זהו תרחיש "מעגל חברתי" שבו כיול חברתי הוא המפתח. אתה פתוח לשיחה אך נזהר מאנשים מוזרים. תגיב בעברית בתור המשתתף באירוע.'
  },

  // --- ADVANCED ---
  {
    id: 's5',
    title: 'הרחוב הראשי (Daygame)',
    description: 'עצירה של מישהי שהולכת ברחוב. דורש ביטחון וישירות.',
    difficulty: 'מתקדם',
    initialPrompt: 'אתה הולך ברחוב סואן (דיזנגוף/רוטשילד). המשתמש עוצר אותך בצורה ישירה ("היי, שנייה..."). אתה ממהר קצת אבל מוחמא. אם הוא מהסס, תמשיך ללכת. אם הוא חזק, תעצור. תגיב בעברית.'
  },
  {
    id: 's4',
    title: 'קבוצה מעורבת (AMOG)',
    description: 'גישה לקבוצה עם גבר מגן נוכח.',
    difficulty: 'מתקדם',
    initialPrompt: 'את חלק מקבוצה של 3 אנשים (2 נשים, גבר אחד) בבר. הגבר (שנקרא AMOG) הוא מגן ורעשן. המשתמש ניגש לקבוצה. את אחת הנשים. אם המשתמש מתעלם מהגבר, הקבוצה תחסום אותו. אם הוא מתחבר לגבר וזוכה בקבוצה, תהיי פתוחה לשיחה. תגיבי בעברית.'
  },
  {
    id: 's3',
    title: 'מועדון לילה (High Energy)',
    description: 'סביבה רועשת, הסחות דעת, מיקוד לא מילולי.',
    difficulty: 'מתקדם',
    initialPrompt: 'אתה במועדון לילה רועש רוקד עם חברים. כאוס מסביב. המשתמש ניגש. אתה לא שומע טוב, אז אתה מסתמך על שפת הגוף שלו, קשר העין וה"וייב". אם הם מהססים, תתעלם מהם. אם הם כייפים, תשתף פעולה. תגיב בעברית (קצר וקולע) בתור הבליין.'
  },
];

export const COACH_SUGGESTIONS = [
    "תן לי משימה חברתית להיום",
    "איך להתגבר על פחד גישה?",
    "מה עושים כשהשיחה נתקעת?",
    "איך להתמודד עם דחייה?",
    "מה זה 'שיט טסט' ותן דוגמה",
    "איך לגשת לקבוצה של בנות?",
    "נתח לי סיטואציה שקרתה לי",
    "איך ליצור מתח מיני?",
    "מה זה אומר להיות 'הפרס'?"
];

export const GAME_SPOTS: Record<string, { day: string[], night: string[] }> = {
    'תל אביב': {
        day: ['שדרות רוטשילד (ספסלים)', 'קניון עזריאלי', 'נמל תל אביב (טיילת)', 'שוק הכרמל', 'חוף גורדון', 'מתחם שרונה', 'סנטר דיזנגוף'],
        night: ['פלורנטין - רחוב ויטל', 'התדר (בית רומנו)', 'כיכר דיזנגוף', 'רחוב אלנבי (ברים)', 'מתחם הבימה', 'רחוב נחלת בנימין']
    },
    'ירושלים': {
        day: ['מדרחוב בן יהודה', 'שדרות אלרוב (ממילא)', 'התחנה הראשונה', 'שוק מחנה יהודה (שישי)', 'קניון מלחה'],
        night: ['שוק מחנה יהודה (ברים)', 'מתחם התחנה', 'רחוב הלל', 'כיכר ציון']
    },
    'חיפה': {
        day: ['גרנד קניון', 'מרכז הכרמל', 'טיילת חוף דדו', 'המושבה הגרמנית'],
        night: ['העיר התחתית - רחוב הנמל', 'מוריה (ברים)', 'חוף הסטודנטים (מסיבות)']
    },
    'ראשון לציון': {
        day: ['קניון הזהב', 'סינמה סיטי מתחם G', 'חוף ראשון', 'פארק האגם'],
        night: ['אזור התעשייה הישן (הרובע)', 'ברים בחוף הים', 'מתחם היס פלאנט']
    },
    'הרצליה': {
        day: ['קניון שבעת הכוכבים', 'חוף אכדיה', 'פארק הרצליה'],
        night: ['מרינה הרצליה', 'אזור תעשייה הרצליה פיתוח']
    },
    'באר שבע': {
        day: ['גרנד קניון ב"ש', 'אוניברסיטת בן גוריון'],
        night: ['מרכז המורים (ברים סטודנטים)', 'רחוב רינגלבלום']
    },
    'נתניה': {
        day: ['כיכר העצמאות', 'קניון עיר ימים', 'טיילת המצוק'],
        night: ['אזור תעשייה פולג (ברים)', 'כיכר העצמאות']
    },
    'אילת': {
        day: ['קניון מול הים', 'טיילת צפונית', 'חוף מוש'],
        night: ['מרכז התיירות (ברים)', 'הטיילת', 'קניון האייס מול']
    }
};

// Fallback for cities not in the list
export const GENERIC_GAME_SPOTS = {
    day: ['קניון מרכזי', 'רחוב ראשי', 'פארק עירוני', 'בית קפה שכונתי'],
    night: ['בר מקומי', 'פאב שכונתי', 'מסעדה פופולרית', 'רחבת העירייה']
};

// Keeping this for backward compatibility if needed, but primarily using GAME_SPOTS now
export const CITY_HOTSPOTS: Record<string, string[]> = {
    'תל אביב': ['שדרות רוטשילד', 'כיכר דיזנגוף', 'מתחם שרונה', 'נמל תל אביב', 'שוק הכרמל (יום)', 'פלורנטין - רחוב ויטל'],
    'ירושלים': ['שוק מחנה יהודה (בערב)', 'התחנה הראשונה', 'מרכז העיר - מדרחוב בן יהודה', 'ממילא'],
    'חיפה': ['העיר התחתית - רחוב הנמל', 'מרכז הכרמל', 'חוף דדו'],
    'ראשון לציון': ['אזור התעשייה הישן (ברים)', 'סינמה סיטי מתחם G'],
    'באר שבע': ['מרכז המורים / האוניברסיטה', 'רחוב רינגלבלום'],
    'הרצליה': ['מרינה הרצליה', 'אזור התעשייה (ברים)'],
    'נתניה': ['כיכר העצמאות', 'חוף פולג'],
    'אילת': ['הטיילת הצפונית', 'קניון האייס מול']
};

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'אלון ש.',
    rank: UserRank.MASTER,
    type: PostType.FIELD_REPORT,
    location: 'תל אביב (שדרות רוטשילד)',
    content: 'דוח שטח מאמש ברוטשילד: הייתי חייב לשתף. פתחתי סט של שתי בחורות שישבו על ספסל (מצב נייח). התחלתי עם דעה עקיפה על "בנים ששמים פילטרים בטינדר". אחת צחקה מיד, השניה הייתה סקפטית. השתמשתי ב-Frame Control כדי לא להתנצל על ההפרעה. תוך 5 דקות הן הזמינו אותי לשבת. הלקח: תמיד תבואו עם אנרגיה קצת יותר גבוהה מהן, אבל לא יותר מדי.',
    timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
    likes: 24
  },
  {
    id: 'p2',
    author: 'דניאל',
    rank: UserRank.PLAYER,
    type: PostType.WINGMAN_REQUEST,
    location: 'הרצליה (מרינה הרצליה)',
    content: 'יוצא היום בערב לאזור המרינה בהרצליה. מחפש שותף שיודע את העבודה, לא מפחד לגשת, ויודע לעשות "בידוד" (Isolation). אני בדרגה בינונית, אבל יש לי אנרגיה טובה. מי בעניין? 🍻',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    likes: 5
  },
  {
    id: 'p3',
    author: 'גלעד המאמן',
    rank: UserRank.MASTER,
    type: PostType.GENERAL,
    location: 'כל הארץ',
    content: "טיפ יומי: ראיתי הרבה חבר'ה בפורום שואלים על \"מה להגיד\". חברים, זה לא המה, זה האיך. תעבדו על הקשר עין שלכם. נסו היום להחזיק קשר עין עם הקופאית בסופר עד שהיא משפילה מבט ומחייכת. זה תרגיל פשוט שבונה ביטחון מטורף.",
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    likes: 112
  },
  {
    id: 'p4',
    author: 'יוסי',
    rank: UserRank.NOVICE,
    type: PostType.WINGMAN_REQUEST,
    location: 'ירושלים (שוק מחנה יהודה)',
    content: 'חדש בתחום, מחפש מישהו שייצא איתי לשוק מחנה יהודה ביום חמישי בערב. אני צריך מישהו שידחוף אותי לעשות את הצעד הראשון. מבטיח בירות עלי למי שעוזר!',
    timestamp: Date.now() - 1000 * 60 * 60 * 5, 
    likes: 8
  }
];