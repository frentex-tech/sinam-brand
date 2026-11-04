/* Sinam — three identity directions. Each brand = tokens + logo renderers + voice. */
(function () {
  const svg = (vb, body, extra = '') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" ${extra}>${body}</svg>`;

  // Grid-cell drawing (used by the Sadu direction: weaving = pixels)
  const cells = (rows, color) => {
    let out = '';
    rows.forEach((r, y) => [...r].forEach((ch, x) => {
      if (ch === '#') out += `<rect x="${x}" y="${y}" width="1.04" height="1.04" fill="${color}"/>`;
    }));
    return out;
  };

  /* ───────────── A · السدو ───────────── */
  const KUFI = [
    '....#........',
    '....#........',
    '....#.#......',
    '....#........',
    '###.#.#.#.#.#',
    '#.#.#.#.#.#.#',
    '###.#########',
    '#............',
    '#............',
  ];
  const HUMP = [
    '...#####...',
    '..###.###..',
    '.###.#.###.',
    '###.###.###',
    '####.#.####',
    '#####.#####',
    '###########',
  ];
  const FRINGE = ['#.#.#.#.#.#'];

  const sadu = {
    id: 'sadu', letter: 'A', name: 'سدو', latin: 'Sadu',
    title: 'سنام · السدو',
    summary: 'هوية نجدية أصيلة مستوحاة من نسيج السدو البدوي؛ كل عناصرها مرسومة على شبكة مربعات كغُرز النسيج.',
    tagline: 'لحم بلدي، بأصول أهلنا',
    fonts: { display: "'Reem Kufi', sans-serif", body: "'IBM Plex Sans Arabic', sans-serif",
      displayName: 'Reem Kufi', bodyName: 'IBM Plex Sans Arabic',
      link: 'family=Reem+Kufi:wght@400;500;700&family=IBM+Plex+Sans+Arabic:wght@400;500;700' },
    c: { p: '#8C2A1E', a: '#D9A13B', paper: '#F1E8D6', soft: '#E3D2B2', ink: '#1F2440', x: '#4A3428' },
    swatches: [
      ['أحمر الفُوّة', '#8C2A1E', 'اللون الأساسي — من صبغة الفوّة التي تُصبغ بها خيوط السدو'],
      ['نيلي السدو', '#1F2440', 'للنصوص والخلفيات الغامقة'],
      ['صوف', '#F1E8D6', 'الخلفية الأساسية'],
      ['زعفران', '#D9A13B', 'لمسات وأزرار — بحدود'],
      ['وبر', '#4A3428', 'لون مساعد للتغليف والطباعة'],
    ],
    radius: 3, iconCap: 'square', iconJoin: 'miter', iconW: 2,
    strategy: {
      position: 'سنام ملحمة الحي النجدية التي تعرف أصول الذبيحة والعزيمة: بلدي، كريم، وبلا بهرجة.',
      audience: 'العوايل، أصحاب العزايم والولائم، والهدايا في المواسم (رمضان، الأضحى، العقيقة).',
      traits: ['أصيل', 'كريم', 'دافئ'],
      voice: ['«ذبيحتك تتجهّز على أصولها»', '«عزيمتك علينا… أنت جهّز المجلس»', '«من الحلال للمِفطّح، كله بلدي»'],
      diff: 'بدل العنابي والذهبي والتاج المنتشرة في أغلب التطبيقات، تقوم هذه الهوية على السدو: تراث سعودي حقيقي مسجّل في اليونسكو، ولم يتبنّه أي منافس هويةً كاملة.',
    },
    logos: [
      { name: 'الكوفي المربع', idea: 'كلمة «سنام» بالخط الكوفي المربع على شبكة ١٣×٧، بمنطق غُرز السدو نفسه. تُطبع بوضوح على الأختام والتطريز والكرتون.',
        render: (c) => svg('-1 -1 15 11', cells(KUFI, c.fg), 'shape-rendering="crispEdges"') },
      { name: 'السنام المنسوج', idea: 'سنام مرسوم بالمربعات تتوسطه «عين السدو» وتحته شرّابة نسيج. يصلح أيقونةً للتطبيق وختمًا على التغليف.',
        render: (c) => svg('-1 -1 13 11', cells(HUMP, c.fg) + `<g transform="translate(0,8)">${cells(FRINGE, c.ac)}</g>`, 'shape-rendering="crispEdges"') },
      { name: 'الشعار الأفقي', idea: 'السنام المنسوج بجانب الاسم بخط ريم الكوفي، وهو الشعار الرئيسي للّافتة والسيارات والتطبيق.',
        render: (c) => svg('0 0 300 100',
          `<g transform="translate(220,12) scale(6.6)" shape-rendering="crispEdges">${cells(HUMP, c.fg)}<g transform="translate(0,8)">${cells(FRINGE, c.ac)}</g></g>
           <text x="204" y="62" text-anchor="end" font-family="Reem Kufi" font-weight="700" font-size="58" fill="${c.fg}">سنام</text>
           <text x="204" y="86" text-anchor="end" font-family="Reem Kufi" font-weight="500" font-size="14" letter-spacing="7" fill="${c.ac}">SINAM</text>`) },
    ],
    mark: (fg, ac) => svg('-1 -1 13 11', cells(HUMP, fg) + `<g transform="translate(0,8)">${cells(FRINGE, ac || fg)}</g>`, 'shape-rendering="crispEdges"'),
    word: (fg) => `<span class="wm" style="font-family:'Reem Kufi';font-weight:700;color:${fg}">سنام</span>`,
    pattern: (c) => {
      let t = '';
      for (let i = 0; i < 4; i++) {
        t += `<polygon points="${i * 10},10 ${i * 10 + 5},0 ${i * 10 + 10},10" fill="${c.a}"/>`;
        t += `<polygon points="${i * 10},30 ${i * 10 + 10},30 ${i * 10 + 5},40" fill="${c.a}"/>`;
      }
      [10, 30].forEach(x => {
        t += `<polygon points="${x},12 ${x + 8},20 ${x},28 ${x - 8},20" fill="${c.ink}"/><polygon points="${x},16 ${x + 4},20 ${x},24 ${x - 4},20" fill="${c.paper}"/>`;
      });
      return svg('0 0 40 40', `<rect width="40" height="40" fill="${c.p}"/>${t}`, 'width="40" height="40"');
    },
  };

  /* ───────────── B · سين ───────────── */
  const seenPath = 'M90 58 V52 a6 6 0 0 0 -12 0 a10 10 0 0 0 -20 0 a6 6 0 0 0 -12 0 V58 C46 82 10 82 10 58';
  const seenMark = (fg, dot, w = 7) => svg('0 0 100 100',
    `<g transform="translate(0,-4)"><path d="${seenPath}" fill="none" stroke="${fg}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="68" cy="30" r="5.5" fill="${dot}"/></g>`);

  const seen = {
    id: 'seen', letter: 'B', name: 'سين', latin: 'Seen',
    title: 'سنام · سين',
    summary: 'هوية عصرية نظيفة مبنية على حرف «س»: أسنانه الثلاث سنامات، وفوق أكبرها نقطة حمراء هي «الذروة». لغتها الدقة والتبريد.',
    tagline: 'طازج… لحد باب البيت',
    fonts: { display: "'Alexandria', sans-serif", body: "'Alexandria', sans-serif",
      displayName: 'Alexandria', bodyName: 'Alexandria',
      link: 'family=Alexandria:wght@300;400;500;700;800' },
    c: { p: '#14233A', a: '#D2412F', paper: '#F5F8F9', soft: '#DCE7EC', ink: '#14233A', x: '#7D8E9C' },
    swatches: [
      ['كحلي الليل', '#14233A', 'اللون الأساسي — للثقة والبرودة'],
      ['أحمر طازج', '#D2412F', 'نقطة الذروة، والسعر، والأزرار المهمة'],
      ['صقيع', '#F5F8F9', 'الخلفية الأساسية'],
      ['ثلج', '#DCE7EC', 'الكروت والمساحات الثانوية'],
      ['فولاذ', '#7D8E9C', 'النصوص الثانوية والأيقونات'],
    ],
    radius: 18, iconCap: 'round', iconJoin: 'round', iconW: 1.8,
    strategy: {
      position: 'سنام أدق ملحمة في المدينة: وزن صافٍ معلن، وتقطيع كما تطلب تمامًا، وتبريد بين ٠ و٤ درجات حتى باب البيت.',
      audience: 'الأسر الشابة في المدن التي تطلب أسبوعيًا بالكيلو، والمستخدم الذي يريد معرفة كل التفاصيل قبل الدفع.',
      traits: ['واضح', 'دقيق', 'طازج'],
      voice: ['«وزن صافي بعد التنظيف: ١٥٫٢ كجم»', '«طلبك في الطريق، والحرارة ٢°م»', '«ثلاجة، مفطّح، ولا شوي؟ اختر وحنا نقطّع»'],
      diff: 'المنافسون جميعًا يراهنون على الفخامة التقليدية. «سين» يراهن على الشفافية: أرقام حقيقية، وألوان باردة توحي بالنظافة والتبريد، وحرف واحد يُعرف من أول نظرة.',
    },
    logos: [
      { name: 'حرف السين', idea: 'حرف «س» واحد، أسنانه الثلاث سنامات أكبرها في الوسط، والنقطة الحمراء فوقه هي «ذروة السنام».',
        render: (c) => seenMark(c.fg, c.ac) },
      { name: 'أيقونة التطبيق', idea: 'السين داخل مربع أحمر بزوايا دائرية؛ أيقونة التطبيق، وملصق الكرتونة في الوقت نفسه.',
        render: (c) => svg('0 0 100 100', `<rect x="6" y="6" width="88" height="88" rx="22" fill="${c.ac}"/><g transform="translate(14,14) scale(.72)">${seenMark(c.bgOn || '#fff', c.bgOn || '#fff', 8).replace(/<\/?svg[^>]*>/g, '')}</g>`) },
      { name: 'الشعار الأفقي', idea: 'السين بجانب الاسم بخط Alexandria العريض؛ هادئ وواضح ومقروء حتى في الأحجام الصغيرة.',
        render: (c) => svg('0 0 300 100',
          `<g transform="translate(200,4) scale(.92)">${seenMark(c.fg, c.ac).replace(/<\/?svg[^>]*>/g, '')}</g>
           <text x="196" y="66" text-anchor="end" font-family="Alexandria" font-weight="800" font-size="54" fill="${c.fg}">سنام</text>
           <text x="196" y="88" text-anchor="end" font-family="Alexandria" font-weight="500" font-size="12" letter-spacing="6" fill="${c.fg}" opacity=".6">SINAM</text>`) },
    ],
    mark: (fg, ac) => seenMark(fg, ac || fg),
    word: (fg) => `<span class="wm" style="font-family:'Alexandria';font-weight:800;color:${fg}">سنام</span>`,
    pattern: (c) => svg('0 0 60 34',
      `<rect width="60" height="34" fill="${c.paper}"/><path d="M0 26 a6 6 0 0 1 12 0 a10 10 0 0 1 20 0 a6 6 0 0 1 12 0 H60" fill="none" stroke="${c.soft}" stroke-width="2" stroke-linecap="round"/>`,
      'width="60" height="34"'),
  };

  /* ───────────── C · وسم ───────────── */
  const wasmGlyph = (fg, w = 9) =>
    `<g filter="url(#rough)"><path d="M14 66 C30 66 33 24 50 24 C67 24 70 66 86 66" fill="none" stroke="${fg}" stroke-width="${w}" stroke-linecap="round"/><circle cx="50" cy="68" r="10" fill="none" stroke="${fg}" stroke-width="${w * .75}"/></g>`;
  const wasmMark = (fg) => svg('0 0 100 100', wasmGlyph(fg));

  const wasm = {
    id: 'wasm', letter: 'C', name: 'وسم', latin: 'Wasm',
    title: 'سنام · وسم',
    summary: 'هوية مستوحاة من «الوسم»، العلامة التي كان البدو يَسِمون بها إبلهم ليُعرف صاحبها. الشعار ختم، والختم ضمان.',
    tagline: 'وسمُنا ضمانك',
    fonts: { display: "'Aref Ruqaa', serif", body: "'Readex Pro', sans-serif",
      displayName: 'Aref Ruqaa', bodyName: 'Readex Pro',
      link: 'family=Aref+Ruqaa:wght@400;700&family=Readex+Pro:wght@300;400;500;700' },
    c: { p: '#2E3A2C', a: '#B5482A', paper: '#EEE2C9', soft: '#DCC69C', ink: '#2A2119', x: '#A8743F' },
    swatches: [
      ['أخضر النخل', '#2E3A2C', 'اللون الأساسي — الأرض والمرعى'],
      ['جمر', '#B5482A', 'لون الوسم والختم والأزرار'],
      ['رمل', '#EEE2C9', 'الخلفية الأساسية وورق الكرافت'],
      ['وبر', '#A8743F', 'لون مساعد للخطوط والرسومات'],
      ['تمر', '#2A2119', 'النصوص'],
    ],
    radius: 10, iconCap: 'round', iconJoin: 'round', iconW: 2.2, rough: true,
    strategy: {
      position: 'سنام يضمن مصدر كل ذبيحة من المرعى إلى المسلخ إلى بابك، وكل كرتونة تحمل وسمًا يشهد أنها فُحصت وعُرف مصدرها.',
      audience: 'عملاء يقدّمون الجودة على السعر: الهدايا، والضيافة الراقية، والمناسبات الكبيرة.',
      traits: ['واثق', 'صادق', 'فاخر من غير مبالغة'],
      voice: ['«كل ذبيحة موسومة… ومعروف مرعاها»', '«وسمُنا ضمانك، وإن ما رضيت نرجّع لك»', '«مفحوصة بيطريًا قبل الذبح وبعده»'],
      diff: 'المنافسون يعلنون «الضمان الذهبي» بتاج وشعارات. هنا الضمان هو الشعار نفسه: ختم يُطبع على الكرتونة والكيس وشهادة الفحص، فيصبح الوعد شيئًا تراه بعينك.',
    },
    logos: [
      { name: 'الوسم', idea: 'سنام فوق حلقة، والحلقة من أشهر أشكال الوسوم البدوية. الخط مرسوم كأنه أثر كيّ.',
        render: (c) => wasmMark(c.fg) },
      { name: 'ختم الضمان', idea: 'الوسم داخل ختم دائري يحيط به «سنام ◆ لحوم بلدية موسومة»؛ يُطبع على الكرتون والأكياس وشهادة الفحص.',
        render: (c) => svg('0 0 100 100',
          `<defs><path id="ring-${c.k}" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0"/></defs>
           <g filter="url(#rough)"><circle cx="50" cy="50" r="46" fill="none" stroke="${c.fg}" stroke-width="2.6"/><circle cx="50" cy="50" r="29" fill="none" stroke="${c.fg}" stroke-width="1.2"/>
           <text font-family="Readex Pro" font-size="7.4" font-weight="500" fill="${c.fg}" direction="rtl" textLength="228" lengthAdjust="spacing"><textPath href="#ring-${c.k}">سنام ◆ لحوم بلدية موسومة ◆ مفحوصة بيطريًا ◆</textPath></text></g>
           <g transform="translate(29,27) scale(.42)">${wasmGlyph(c.fg, 10)}</g>`) },
      { name: 'الشعار بالرقعة', idea: 'الاسم بخط الرقعة بجانب الوسم؛ للّافتة والهدايا والمطبوعات الفاخرة.',
        render: (c) => svg('0 0 300 100',
          `<g transform="translate(206,6) scale(.88)">${wasmGlyph(c.fg)}</g>
           <text x="198" y="70" text-anchor="end" font-family="Aref Ruqaa" font-weight="700" font-size="66" fill="${c.fg}">سنام</text>
           <text x="198" y="92" text-anchor="end" font-family="Readex Pro" font-weight="500" font-size="11" letter-spacing="5" fill="${c.ac}">وسمُنا ضمانك</text>`) },
    ],
    mark: (fg) => wasmMark(fg),
    word: (fg) => `<span class="wm" style="font-family:'Aref Ruqaa';font-weight:700;color:${fg}">سنام</span>`,
    pattern: (c) => svg('0 0 120 120',
      `<rect width="120" height="120" fill="${c.paper}"/><g fill="none" stroke="${c.soft}" stroke-width="3" stroke-linecap="round">
       <path d="M8 36 C16 36 18 14 27 14 C36 14 38 36 46 36"/><circle cx="27" cy="37" r="5"/>
       <path d="M80 20 a12 12 0 1 0 0 24 a9 9 0 1 1 0 -24"/>
       <path d="M70 80 V104 M78 80 V104 M86 80 V104"/>
       <circle cx="22" cy="92" r="9"/><path d="M22 74 V83"/></g>`, 'width="120" height="120"'),
  };

  window.BRANDS = { sadu, seen, wasm };
  window.BRAND_ORDER = ['sadu', 'seen', 'wasm'];
})();
