/* Sinam — final identity: golden ram in a shield, burgundy & gold. Plugs into kit.js like the A/B/C directions. */
(function () {
  const svg = (vb, body) => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  let uid = 0;

  // Emblem in a 200×190 box. fg: 'gold' (gradient) or a solid colour (mono); cut: colour of the facial cut-outs.
  function emblem(fg = 'gold', cut = '#3A0D10') {
    const k = 'r' + (++uid);
    const gold = fg === 'gold';
    const F = gold ? `url(#${k}g)` : fg, F2 = gold ? `url(#${k}d)` : fg;
    const defs = gold ? `<defs><linearGradient id="${k}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7E6BC"/><stop offset=".4" stop-color="#DDB46A"/><stop offset=".72" stop-color="#AE7C37"/><stop offset="1" stop-color="#EBCB8C"/></linearGradient><linearGradient id="${k}d" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C99A52"/><stop offset="1" stop-color="#8E6129"/></linearGradient></defs>` : '';
    const horn = `<path d="M110 60 C118 36 156 26 170 52 C182 76 168 100 146 98 C128 96 126 76 140 71 C150 68 156 78 149 84" fill="none" stroke="${F}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/><g fill="none" stroke="${cut}" stroke-width="1.5" stroke-linecap="round" opacity=".5"><path d="M128 39 l3 10"/><path d="M142 35 l1 11"/><path d="M156 39 l-3 10"/><path d="M166 50 l-9 6"/><path d="M169 66 l-11 1"/><path d="M164 82 l-9 -5"/></g>`;
    const ear = `<path d="M126 96 C136 92 152 94 162 104 C150 110 134 108 124 102 Z" fill="${F2}"/>`;
    const mirror = (x) => `${x}<g transform="translate(200 0) scale(-1 1)">${x}</g>`;
    return `${defs}<path d="M42 40 L100 30 L158 40 V104 C158 142 130 166 100 180 C70 166 42 142 42 104 Z" fill="none" stroke="${F}" stroke-width="5" stroke-linejoin="round"/>
      <path d="M50 47 L100 38.5 L150 47 V104 C150 136 126 156 100 169 C74 156 50 136 50 104 Z" fill="none" stroke="${F}" stroke-width="1.2" opacity=".75" stroke-linejoin="round"/>
      ${mirror(ear)}${mirror(horn)}
      <path d="M100 56 C117 56 129 66 129 82 C129 98 121 114 115 130 C111 142 107 154 100 156 C93 154 89 142 85 130 C79 114 71 98 71 82 C71 66 83 56 100 56 Z" fill="${F}"/>
      ${gold ? '<path d="M100 56 C83 56 71 66 71 82 C71 98 79 114 85 130 C89 142 93 154 100 156 Z" fill="#8E6129" opacity=".28"/>' : ''}
      <g fill="${cut}"><path d="M79 90 C85 85 93 86 96 93 C89 95 83 94 79 90 Z"/><path d="M121 90 C115 85 107 86 104 93 C111 95 117 94 121 90 Z"/><path d="M95 141 c-3 1 -5 4 -4 7 c2 -1 4 -3 4 -7z"/><path d="M105 141 c3 1 5 4 4 7 c-2 -1 -4 -3 -4 -7z"/></g>
      <g fill="none" stroke="${cut}" stroke-width="1.6" stroke-linecap="round" opacity=".55"><path d="M90 100 C95 112 97 124 97 136"/><path d="M110 100 C105 112 103 124 103 136"/><path d="M88 70 C94 74 106 74 112 70"/></g>`;
  }
  // text fill: gold gradient on dark, solid otherwise
  const C = { p: '#4A1014', a: '#C99A52', paper: '#F7F0E8', soft: '#EADBD0', ink: '#2A1215', x: '#8E7470' };
  const isMono = (fg) => fg === '#111' || fg === '#fff' || fg === '#ffffff';
  const textFill = (fg, k) => (fg === C.paper || fg === '#fff') && !isMono(fg) ? `url(#${k})` : fg;
  const goldText = (k) => `<defs><linearGradient id="${k}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F7E6BC"/><stop offset=".45" stop-color="#DDB46A"/><stop offset=".8" stop-color="#AE7C37"/><stop offset="1" stop-color="#EBCB8C"/></linearGradient></defs>`;
  const mk = (fg) => emblem(isMono(fg) ? fg : 'gold', fg === '#111' ? '#fff' : fg === '#fff' ? C.p : '#3A0D10');

  const ram = {
    id: 'final', letter: '', name: 'سنام', latin: 'Sinam', final: true,
    heroTag: 'الهوية البصرية · لحوم بلدية',
    appUrl: '../app/v2/', shots: 'img/',
    title: 'سنام · الهوية البصرية',
    summary: 'رأس خروف نعيمي بقرون ملفوفة داخل درع ذهبي: رمز للحلال البلدي والجودة، بألوان العنابي والذهب.',
    tagline: 'لحوم بلدية… تُذبح يوم طلبك',
    fonts: { display: "'El Messiri', serif", body: "'Readex Pro', sans-serif", displayName: 'El Messiri', bodyName: 'Readex Pro' },
    c: C,
    swatches: [
      ['عنابي سنام', '#4A1014', 'اللون الأساسي — الخلفيات والتغليف والشعار'],
      ['ذهب', '#C99A52', 'الشعار واللمسات الفاخرة — بحدود'],
      ['عاجي', '#F7F0E8', 'خلفية التطبيق والمطبوعات'],
      ['نبيذي', '#8E1F26', 'أزرار الطلب والأسعار'],
      ['حبر', '#2A1215', 'النصوص'],
    ],
    radius: 14, iconCap: 'round', iconJoin: 'round', iconW: 1.8,
    strategy: {
      position: 'سنام ملحمة بلدية فاخرة: تختار ذبيحتك من التطبيق، تُذبح يوم طلبك، وتُقطّع مثل ما تبي، وتصلك مبرّدة لين باب بيتك.',
      audience: 'العوايل في الرياض والخرج، وأصحاب العزايم والمناسبات، ومن يطلب اللحم أسبوعيًا ويبحث عن جودة ثابتة وتجربة طلب سهلة.',
      traits: ['فاخر', 'موثوق', 'كريم'],
      voice: ['«ذبيحتك تُذبح يوم طلبك، مو قبله»', '«قطّعها مثل ما تبي… وحنا علينا الباقي»', '«من المزرعة لبابك، مبرّدة من ٠ إلى ٤°م»'],
      diff: 'الرمز رأس خروف نعيمي بدل التاج والثور المنتشرين في السوق، والهوية تجمع فخامة الذهب مع وعد واضح: ذبح يوم الطلب، وتقطيع حسب الرغبة، وتوصيل مبرّد. وتضيف ثلاث مزايا للولاء: النقاط، وقصص الاستلام، وسهم الخير.',
    },
    logos: [
      { name: 'الشعار الرئيسي', idea: 'الرمز فوق الاسم، وتحته SINAM ثم «لحوم بلدية» بين خطين. للافتة المحل والكرتون والصفحة الأولى في التطبيق.',
        render: (c) => { const k = 'tg' + (++uid); const tf = textFill(c.fg, k); return svg('0 0 300 330', `${goldText(k)}<g transform="translate(70 0) scale(.8)">${mk(c.fg)}</g>
          <text x="150" y="236" text-anchor="middle" font-family="El Messiri" font-weight="700" font-size="76" fill="${tf}">سنام</text>
          <text x="150" y="270" text-anchor="middle" font-family="Cinzel" font-weight="700" font-size="20" letter-spacing="9" fill="${tf}">SINAM</text>
          <g stroke="${tf}" stroke-width="1.2" opacity=".8"><path d="M52 300H104"/><path d="M196 300H248"/></g>
          <text x="150" y="306" text-anchor="middle" font-family="El Messiri" font-weight="600" font-size="17" fill="${tf}">لحوم بلدية</text>`); } },
      { name: 'الرمز', idea: 'رأس الخروف داخل الدرع. يُستخدم وحده في أيقونة التطبيق وختم الأكياس وصورة الحسابات.',
        render: (c) => svg('0 0 200 190', mk(c.fg)) },
      { name: 'الشعار الأفقي', idea: 'الرمز بجانب الاسم. للهيدر في التطبيق والموقع، وجانب سيارات التوصيل.',
        render: (c) => { const k = 'th' + (++uid); const tf = textFill(c.fg, k); return svg('0 0 300 100', `${goldText(k)}<g transform="translate(206 4) scale(.48)">${mk(c.fg)}</g>
          <text x="198" y="64" text-anchor="end" font-family="El Messiri" font-weight="700" font-size="62" fill="${tf}">سنام</text>
          <text x="198" y="88" text-anchor="end" font-family="Cinzel" font-weight="700" font-size="13" letter-spacing="7" fill="${tf}">SINAM</text>`); } },
    ],
    mark: (fg) => svg('0 0 200 190', mk(fg === '#111' || fg === '#fff' ? fg : 'gold')),
    word: (fg) => `<span class="wm" style="font-family:'El Messiri';font-weight:700;color:${fg}">سنام</span>`,
    // gold lattice, like the shield's double rule
    pattern: (c) => svg('0 0 40 40', `<rect width="40" height="40" fill="${c.p}"/><path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke="${c.a}" stroke-width="1" opacity=".55"/><path d="M20 10 L30 20 L20 30 L10 20 Z" fill="none" stroke="${c.a}" stroke-width=".6" opacity=".35"/><circle cx="20" cy="20" r="1.6" fill="${c.a}" opacity=".7"/>`).replace('<svg ', '<svg width="40" height="40" '),
  };
  window.BRANDS = window.BRANDS || {};
  window.BRANDS.final = ram;
})();
