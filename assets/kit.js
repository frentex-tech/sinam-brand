/* Sinam brand kit renderer — draws every application from a brand's tokens. */
(function () {
  const B = window.BRANDS;
  const strip = (s) => s.replace(/<\/?svg[^>]*>/g, '');
  const bg = (b, c = b.c) => `url('data:image/svg+xml;utf8,${encodeURIComponent(b.pattern(c))}')`;
  // nest a standalone SVG (keeps its own viewBox) at a position/size
  const place = (svgStr, x, y, w, h) => svgStr.replace(/^<svg /, `<svg x="${x}" y="${y}" width="${w}" height="${h}" `);
  const patDef = (b, id, scale = 1) => { const t = b.pattern(b.c), w = +t.match(/width="(\d+)"/)[1], h = +t.match(/height="(\d+)"/)[1];
    return `<defs><pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse" patternTransform="scale(${scale})">${strip(t)}</pattern></defs>`; };
  const ROUGH = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter></svg>`;

  /* ── icons (24 grid); stroke style comes from the brand ── */
  const ICONS = [
    ['توصيل في نفس اليوم', '<path d="M2 6.5h11v9.5H2z M13 10h4.2l3.3 3.3V16H13"/><circle cx="6" cy="17.6" r="1.8"/><circle cx="16.8" cy="17.6" r="1.8"/>'],
    ['مبرّد ٠–٤°م', '<path d="M12 2.5v19 M3.8 7.2l16.4 9.6 M3.8 16.8l16.4-9.6 M9.4 4 12 6.5 14.6 4 M9.4 20 12 17.5l2.6 2.5"/>'],
    ['ضمان الجودة', '<path d="M12 2.5 4.5 5.5v6c0 4.8 3.3 8.3 7.5 10 4.2-1.7 7.5-5.2 7.5-10v-6z M8.6 12l2.4 2.4 4.4-4.6"/>'],
    ['تقطيع حسب الطلب', '<path d="M3 4.5h11.5v8.5H5.5A2.5 2.5 0 0 1 3 10.5z M14.5 7.5h6.5 M3 17h18 M7 20.5h10"/><circle cx="6.5" cy="7.5" r="1"/>'],
    ['إشراف بيطري', '<circle cx="12" cy="12" r="9.2"/><path d="M12 7.5v9 M7.5 12h9"/>'],
    ['وزن صافٍ', '<path d="M12 3v18 M6 21h12 M4.5 7h15 M4.5 7 2 13.5h5z M19.5 7 17 13.5h5z"/>'],
  ];
  const icon = (b, i, color, size = 28) =>
    `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="${b.iconW}" stroke-linecap="${b.iconCap}" stroke-linejoin="${b.iconJoin}" ${b.rough ? 'filter="url(#rough)"' : ''}>${ICONS[i][1]}</svg>`;

  /* ── flat product illustrations ── */
  const MEAT = '#B9403A', FAT = '#F2DCCB', BONE = '#F4ECDF';
  const ILL = {
    sheep: (ink) => `<svg viewBox="0 0 120 90"><g fill="${FAT}"><circle cx="40" cy="42" r="16"/><circle cx="58" cy="34" r="17"/><circle cx="76" cy="42" r="16"/><circle cx="50" cy="52" r="15"/><circle cx="68" cy="53" r="15"/></g><ellipse cx="92" cy="40" rx="9" ry="12" fill="${ink}"/><path d="M84 34 l-6 -4" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><g stroke="${ink}" stroke-width="4.5" stroke-linecap="round"><path d="M44 64v14 M54 66v12 M66 66v12 M76 64v14"/></g></svg>`,
    chop: (ink) => `<svg viewBox="0 0 120 90"><path d="M28 64 C10 55 14 26 38 22 C60 18 80 32 74 52 C70 66 48 74 28 64z" fill="${MEAT}"/><path d="M30 58 C18 50 22 31 39 28" fill="none" stroke="${FAT}" stroke-width="5" stroke-linecap="round"/><path d="M70 50 L104 32" stroke="${BONE}" stroke-width="10" stroke-linecap="round"/><circle cx="106" cy="30" r="6" fill="${BONE}"/></svg>`,
    leg: (ink) => `<svg viewBox="0 0 120 90"><path d="M20 50 C18 28 44 16 64 26 C78 33 80 46 74 56 C66 70 36 74 20 50z" fill="${MEAT}"/><path d="M28 48 C28 34 44 26 58 30" fill="none" stroke="${FAT}" stroke-width="5" stroke-linecap="round"/><path d="M72 52 L102 64" stroke="${BONE}" stroke-width="9" stroke-linecap="round"/><circle cx="104" cy="60" r="5" fill="${BONE}"/><circle cx="106" cy="68" r="5" fill="${BONE}"/></svg>`,
    mince: (ink) => `<svg viewBox="0 0 120 90"><ellipse cx="60" cy="64" rx="44" ry="12" fill="${ink}" opacity=".18"/><path d="M24 60 C24 36 96 36 96 60z" fill="${MEAT}"/><g fill="${FAT}">${[30, 42, 54, 66, 78, 88, 36, 48, 60, 72, 84].map((x, i) => `<circle cx="${x}" cy="${i < 6 ? 54 : 46}" r="2.2"/>`).join('')}</g></svg>`,
    box: (ink, b) => `<svg viewBox="0 0 120 90"><path d="M22 34 L60 22 L98 34 L60 46z" fill="${b.c.a}"/><path d="M22 34 L60 46 V78 L22 66z" fill="${b.c.p}"/><path d="M98 34 L60 46 V78 L98 66z" fill="${ink}" opacity=".85"/></svg>`,
    camel: (ink) => `<svg viewBox="0 0 120 90"><path d="M18 62 C20 44 30 40 40 40 C46 24 58 24 62 40 C70 40 76 44 80 34 C84 24 92 22 96 28 L100 30 L96 34 C92 34 90 40 88 50 C86 58 80 62 72 62z" fill="${ink}"/><g stroke="${ink}" stroke-width="4.5" stroke-linecap="round"><path d="M28 60v18 M38 62v16 M66 62v16 M76 60v18"/></g></svg>`,
  };

  /* ── logo helper ── */
  const logo = (b, i, fg, ac, k) => b.logos[i].render({ fg, ac, k: k || `${b.id}${i}${fg.slice(1)}`, bgOn: b.c.paper });
  const lockup = (b, fg, ac) => logo(b, 2, fg, ac);

  /* ── packaging ── */
  function box(b, w = 360) {
    const W = 220, H = 150, D = 110, ang = 32 * Math.PI / 180, dx = D * Math.cos(ang), dy = D * Math.sin(ang), ox = 20, oy = 20 + dy;
    const c = b.c;
    return `<svg viewBox="0 0 ${W + dx + 40} ${H + dy + 40}" width="${w}">
      ${patDef(b, `pat-${b.id}`, b.id === 'wasm' ? .5 : 1)}
      <polygon points="${ox},${oy} ${ox + dx},${oy - dy} ${ox + W + dx},${oy - dy} ${ox + W},${oy}" fill="${shade(c.p, 18)}"/>
      <g transform="matrix(1,0,${-dx / D},${dy / D},${ox + dx},${oy - dy})"><rect x="0" y="${D / 2 - 9}" width="${W}" height="18" fill="${c.a}" opacity=".9"/></g>
      <rect x="${ox}" y="${oy}" width="${W}" height="${H}" fill="${c.p}"/>
      <g transform="translate(${ox + W / 2 - 80},${oy + H / 2 - 30}) "><svg width="160" height="54" viewBox="0 0 300 100">${strip(lockup(b, c.paper, c.a))}</svg></g>
      <g transform="matrix(${dx / D},${-dy / D},0,1,${ox + W},${oy})"><rect width="${D}" height="${H}" fill="${b.id === 'seen' ? c.soft : `url(#pat-${b.id})`}"/><rect width="${D}" height="${H}" fill="#000" opacity=".22"/></g>
      <text x="${ox + W / 2}" y="${oy + H - 14}" text-anchor="middle" font-family="${b.fonts.bodyName}" font-size="10" fill="${c.paper}" opacity=".75">يُحفظ مبرّدًا ٠–٤°م</text>
    </svg>`;
  }
  function tray(b, w = 300) {
    const c = b.c;
    return `<svg viewBox="0 0 300 200" width="${w}">
      <rect x="10" y="20" width="280" height="170" rx="22" fill="${shade(c.ink, -10)}" opacity=".12"/>
      <rect x="18" y="12" width="264" height="168" rx="20" fill="${b.id === 'wasm' ? '#3a3229' : '#2b2b2e'}"/>
      <path d="M50 120 C30 80 70 40 130 46 C200 52 250 80 240 120 C232 150 180 160 130 156 C80 152 60 140 50 120z" fill="${MEAT}"/>
      <path d="M62 112 C54 86 84 60 128 60" fill="none" stroke="${FAT}" stroke-width="7" stroke-linecap="round" opacity=".9"/>
      <rect x="18" y="12" width="264" height="168" rx="20" fill="#fff" opacity=".08"/>
      <g transform="translate(150,96)">
        <rect x="0" y="0" width="118" height="74" rx="${Math.min(b.radius, 10)}" fill="${c.paper}"/>
        <rect x="0" y="0" width="118" height="20" rx="${Math.min(b.radius, 10)}" fill="${c.p}"/><rect x="0" y="12" width="118" height="8" fill="${c.p}"/>
        ${place(b.mark(c.paper, c.a), 84, 3, 28, 14)}
        <text x="110" y="34" text-anchor="end" font-family="${b.fonts.bodyName}" font-size="9" font-weight="700" fill="${c.ink}">ريش نعيمي</text>
        <text x="110" y="48" text-anchor="end" font-family="${b.fonts.bodyName}" font-size="7.5" fill="${c.ink}" opacity=".75">الوزن الصافي ١٫٢ كجم</text>
        <text x="110" y="61" text-anchor="end" font-family="${b.fonts.bodyName}" font-size="7.5" fill="${c.ink}" opacity=".75">ذُبح اليوم ٠٦:٣٠ ص</text>
        <g>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="${8 + i * 3.2}" y="30" width="${i % 3 ? 1.2 : 2}" height="34" fill="${c.ink}"/>`).join('')}</g>
      </g>
    </svg>`;
  }
  function bag(b, w = 220) {
    const c = b.c, kraft = b.id === 'wasm';
    const body = kraft ? '#C9A57A' : c.paper;
    return `<svg viewBox="0 0 220 260" width="${w}">
      <path d="M78 60 C78 20 142 20 142 60" fill="none" stroke="${kraft ? c.ink : c.p}" stroke-width="7"/>
      <rect x="30" y="56" width="160" height="196" fill="${body}"/>
      <rect x="30" y="56" width="160" height="196" fill="url(#bagshade)"/>
      <defs><linearGradient id="bagshade" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".08"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>
      ${kraft ? `${place(logo(b, 1, c.a, c.a, 'bag'), 60, 96, 100, 100)}`
              : `<g transform="translate(45,100)"><svg width="130" height="44" viewBox="0 0 300 100">${strip(lockup(b, c.p, c.a))}</svg></g>`}
      ${b.id === 'sadu' ? `<rect x="30" y="214" width="160" height="22" fill="url(#pat-bag-${b.id})"/>${patDef(b, `pat-bag-${b.id}`, .55)}` : ''}
      ${b.id === 'seen' ? `<text x="110" y="226" text-anchor="middle" font-family="Alexandria" font-size="11" fill="${c.p}" opacity=".7">طازج… لحد باب البيت</text>` : ''}
      ${kraft ? `<text x="110" y="226" text-anchor="middle" font-family="Readex Pro" font-size="10" fill="${c.ink}" opacity=".8">لحوم بلدية موسومة</text>` : ''}
    </svg>`;
  }

  /* ── delivery & uniform ── */
  function van(b, w = 520) {
    const c = b.c;
    return `<svg viewBox="0 0 420 200" width="${w}">
      ${patDef(b, `vpat-${b.id}`, b.id === 'wasm' ? .3 : .6)}
      <ellipse cx="210" cy="182" rx="200" ry="8" fill="#000" opacity=".12"/>
      <path d="M292 62 H346 C360 62 368 70 376 86 L392 116 C396 124 398 130 398 140 V164 H292z" fill="${c.paper}" stroke="${shade(c.paper, -25)}" stroke-width="1.5"/>
      <path d="M304 74 H342 C350 74 356 80 362 92 L370 110 H304z" fill="${c.ink}" opacity=".85"/>
      <rect x="14" y="30" width="276" height="134" rx="${Math.min(b.radius, 8)}" fill="${c.p}"/>
      <rect x="14" y="140" width="276" height="24" fill="${b.id === 'seen' ? c.a : `url(#vpat-${b.id})`}"/>
      <g transform="translate(70,48)"><svg width="200" height="66" viewBox="0 0 300 100">${strip(lockup(b, c.paper, c.a))}</svg></g>
      <text x="268" y="130" text-anchor="end" font-family="${b.fonts.bodyName}" font-size="11" fill="${c.paper}" opacity=".85">توصيل مبرّد ٠–٤°م · ٩٢٠٠٠٠٠٠٠</text>
      ${[86, 334].map(x => `<circle cx="${x}" cy="164" r="22" fill="#222"/><circle cx="${x}" cy="164" r="10" fill="#9a9a9a"/>`).join('')}
      <rect x="388" y="126" width="12" height="8" rx="2" fill="${c.a}"/>
    </svg>`;
  }
  function shirt(b, w = 220) {
    const c = b.c;
    return `<svg viewBox="0 0 220 220" width="${w}">
      <path d="M70 20 L40 32 L8 70 L34 92 L52 74 V206 H168 V74 L186 92 L212 70 L180 32 L150 20 C144 36 128 44 110 44 C92 44 76 36 70 20z" fill="${c.ink}"/>
      <path d="M70 20 C76 36 92 44 110 44 C128 44 144 36 150 20" fill="none" stroke="${c.a}" stroke-width="4"/>
      ${place(b.mark(c.paper, c.a), 124, 66, 30, 30)}
      
    </svg>`;
  }
  function apron(b, w = 170) {
    const c = b.c;
    return `<svg viewBox="0 0 170 230" width="${w}">
      <path d="M58 10 C58 40 112 40 112 10" fill="none" stroke="${c.ink}" stroke-width="5"/>
      <path d="M55 24 H115 L120 78 L150 92 V222 H20 V92 L50 78z" fill="${b.id === 'seen' ? c.paper : c.p}" stroke="${shade(c.p, -20)}" stroke-width="1"/>
      ${b.id === 'sadu' ? `${patDef(b, 'apat', .5)}<rect x="20" y="200" width="130" height="22" fill="url(#apat)"/>` : ''}
      <g transform="translate(36,110)"><svg width="98" height="33" viewBox="0 0 300 100">${strip(lockup(b, b.id === 'seen' ? c.p : c.paper, c.a))}</svg></g>
      ${b.id === 'seen' ? `<rect x="20" y="214" width="130" height="8" fill="${c.a}"/>` : ''}
    </svg>`;
  }
  function cap(b, w = 170) {
    const c = b.c;
    return `<svg viewBox="0 0 170 120" width="${w}">
      <path d="M22 84 C22 30 60 14 90 14 C124 14 150 40 150 84z" fill="${c.p}"/>
      <path d="M150 84 C168 86 168 98 150 100 L60 100 C30 100 20 92 22 84z" fill="${shade(c.p, -18)}"/>
      <circle cx="86" cy="16" r="5" fill="${shade(c.p, -18)}"/>
      ${place(b.mark(c.paper, c.a), 66, 38, 40, 40)}
    </svg>`;
  }
  function riderBag(b, w = 190) {
    const c = b.c;
    return `<svg viewBox="0 0 190 190" width="${w}">
      <polygon points="20,52 110,30 170,52 80,76" fill="${shade(c.p, 15)}"/>
      <polygon points="20,52 80,76 80,176 20,152" fill="${c.p}"/>
      <polygon points="170,52 80,76 80,176 170,152" fill="${shade(c.p, -15)}"/>
      <g transform="matrix(1,-.27,0,1,92,90)">${place(b.mark(c.paper, c.a), 0, 0, 66, 66)}</g>
      <g transform="matrix(1,.4,0,1,26,74)"><text x="27" y="40" text-anchor="middle" font-family="${b.fonts.bodyName}" font-size="8.5" fill="${c.paper}">مبرّد</text></g>
    </svg>`;
  }

  /* ── stationery ── */
  function card(b) {
    const c = b.c;
    return `<div class="bcard" style="background:${c.p}"><div class="bc-front">${lockup(b, c.paper, c.a)}</div></div>
      <div class="bcard back" style="background:${c.paper};color:${c.ink}">
        <div class="bc-mark">${b.mark(c.p, c.a)}</div>
        <div class="bc-name">عبدالله الشمّري</div><div class="bc-role">مدير الفرع</div>
        <div class="bc-info">٩٢٠٠٠٠٠٠٠<br>@sinam.sa<br>الرياض — حي الملقا</div>
        <div class="bc-band" style="background:${b.id === 'seen' ? c.a : bg(b)}"></div>
      </div>`;
  }
  function stickers(b) {
    const c = b.c;
    const items = [['ذُبح اليوم', c.p, c.paper], ['مبرّد ٠–٤°م', c.ink, c.paper], ['حلال ١٠٠٪', c.a, b.id === 'sadu' ? c.ink : c.paper]];
    return items.map(([t, f, tx], i) => `<div class="sticker" style="background:${f};color:${tx};border-radius:${b.id === 'sadu' ? '4px' : '50%'}">
      <div class="st-mark">${b.mark(tx, tx)}</div><div>${t}</div></div>`).join('');
  }

  /* ── phone / app ── */
  const statusBar = (col) => `<div class="sb" style="color:${col}"><span>9:41</span><span>●●● ▮</span></div>`;
  const nav = (b, active) => {
    const c = b.c, items = ['الرئيسية', 'الأقسام', 'سهم الخير', 'طلباتي', 'نقاطي'], on = b.id === 'seen' ? c.a : c.p;
    return `<div class="tabbar" style="background:${b.id === 'seen' ? '#fff' : c.paper}">${items.map((t, i) => i === 2
      ? `<span class="tb-mid" style="color:${active === 2 ? on : c.ink}"><b style="background:${b.id === 'sadu' ? c.p : b.id === 'seen' ? c.ink : c.a};border-radius:${b.id === 'sadu' ? '6px' : '50%'}">${svgIcon(b, 6, c.paper, 18)}</b>${t}</span>`
      : `<span style="color:${i === active ? on : c.x}"><i style="background:${i === active ? on : 'transparent'};border-color:${i === active ? 'transparent' : c.x}"></i>${t}</span>`).join('')}</div>`;
  };
  const price = (b, v) => `<b class="price" style="color:${b.id === 'seen' ? b.c.a : b.c.p}">${v} <small>ر.س</small></b>`;
  const R = (b, n) => Math.min(b.radius, n);

  function screenHome(b) {
    const c = b.c, dark = b.id !== 'seen';
    const cats = [['ذبائح كاملة', 'sheep'], ['أنصاف وأرباع', 'leg'], ['بالكيلو', 'chop'], ['حاشي', 'camel'], ['مفروم', 'mince'], ['بوكسات الطبخ', 'box']];
    const head = dark ? c.p : '#fff';
    const htx = dark ? c.paper : c.ink;
    return `<div class="screen" style="background:${b.id === 'seen' ? c.paper : c.paper}">
      <div class="app-head" style="background:${head};color:${htx};${b.id === 'sadu' ? 'border-radius:0' : b.id === 'wasm' ? `border-radius:0 0 ${b.radius * 2}px ${b.radius * 2}px` : ''}">
        ${statusBar(htx)}
        <div class="ah-row"><div class="ah-logo"><span class="ah-mark">${b.mark(htx, c.a)}</span>${b.word(htx)}</div><div class="ah-right"><span class="ah-pts" style="background:${c.a};color:${b.id === 'sadu' ? c.ink : '#fff'}">${svgIcon(b, 7, b.id === 'sadu' ? c.ink : '#fff', 11)} 2,450</span><div class="ah-loc" style="border-color:${dark ? 'rgba(255,255,255,.25)' : c.soft}">الملقا ▾</div></div></div>
        <div class="ah-search" style="background:${dark ? 'rgba(255,255,255,.12)' : c.paper};color:${dark ? 'rgba(255,255,255,.7)' : c.x};border-radius:${R(b, 14)}px">ابحث: نعيمي، حري، حاشي…</div>
        <div class="ah-seg" style="background:${dark ? 'rgba(0,0,0,.18)' : c.soft};border-radius:${R(b, 14)}px"><span style="background:${c.a};color:${b.id === 'sadu' ? c.ink : '#fff'};border-radius:${R(b, 12)}px">توصيل</span><span>استلام من الفرع</span></div>
      </div>
      ${b.id === 'sadu' ? `<div class="sadu-strip" style="background-image:${bg(b)}"></div>` : ''}
      <div class="sc-body">
        <div class="sec-t" style="font-family:${b.fonts.display};color:${c.ink};margin-top:2px">قصص الاستلام</div>
        ${storyRow(b)}
        <div class="promo" style="background:${b.id === 'seen' ? c.ink : b.id === 'wasm' ? c.ink : c.ink};border-radius:${R(b, 16)}px;color:${c.paper}">
          <div><div class="pr-t" style="font-family:${b.fonts.display}">${b.id === 'seen' ? 'اطلب قبل ١٢ ظهرًا' : b.id === 'wasm' ? 'ذبيحة موسومة' : 'ذبيحة العزيمة'}</div>
          <div class="pr-s">${b.id === 'seen' ? 'وتوصلك اليوم مبرّدة' : b.id === 'wasm' ? 'مفحوصة ومعروف مرعاها' : 'تقطيع وتغليف مجاني'}</div>
          <span class="pr-b" style="background:${c.a};color:${b.id === 'sadu' ? c.ink : '#fff'};border-radius:${R(b, 12)}px">اطلب الآن</span></div>
          <div class="pr-ill">${ILL.sheep(c.ink === c.p ? '#0b1626' : c.p)}</div>
        </div>
        ${sadaqaCard(b)}
        <div class="sec-t" style="font-family:${b.fonts.display};color:${c.ink}">الأقسام</div>
        <div class="cats">${cats.map(([t, k]) => `<div class="cat" style="background:${b.id === 'seen' ? '#fff' : c.soft};border-radius:${R(b, 14)}px"><div class="cat-ill">${ILL[k](c.ink, b)}</div><span style="color:${c.ink}">${t}</span></div>`).join('')}</div>
        <div class="sec-t" style="font-family:${b.fonts.display};color:${c.ink}">الأكثر طلبًا</div>
        <div class="prods">${[['نعيمي بلدي', '1,450', 'sheep'], ['ريش غنم', '89', 'chop']].map(([n, p, k]) => `<div class="prod" style="background:#fff;border-radius:${R(b, 14)}px"><div class="pd-ill" style="background:${c.soft}">${ILL[k](c.ink)}</div><div class="pd-n" style="color:${c.ink}">${n}</div><div class="pd-r">${price(b, p)}<span class="plus" style="background:${b.id === 'seen' ? c.a : c.p};border-radius:${b.id === 'sadu' ? '3px' : '50%'}">+</span></div></div>`).join('')}</div>
      </div>
      ${nav(b, 0)}
    </div>`;
  }
  function screenProduct(b) {
    const c = b.c;
    const chip = (t, on) => `<span class="chip" style="border-radius:${R(b, 12)}px;${on ? `background:${b.id === 'seen' ? c.ink : c.p};color:${c.paper};border-color:transparent` : `color:${c.ink};border-color:${c.soft}`}">${t}</span>`;
    const group = (title, opts, on) => `<div class="og"><div class="og-t" style="color:${c.ink}">${title}</div><div class="chips">${opts.map((o, i) => chip(o, i === on)).join('')}</div></div>`;
    return `<div class="screen" style="background:#fff">
      <div class="pd-hero" style="background:${b.id === 'sadu' ? c.p : b.id === 'wasm' ? c.p : c.soft}">${statusBar(b.id === 'seen' ? c.ink : c.paper)}
        <div class="pd-big">${ILL.sheep(b.id === 'seen' ? c.ink : c.ink)}</div>
        ${b.id === 'wasm' ? `<div class="pd-seal">${logo(b, 1, c.paper, c.paper, 'pdseal')}</div>` : ''}
        ${b.id === 'seen' ? `<div class="pd-temp" style="background:${c.ink};color:#fff">٢°م</div>` : ''}
      </div>
      ${b.id === 'sadu' ? `<div class="sadu-strip" style="background-image:${bg(b)}"></div>` : ''}
      <div class="sc-body pd-body">
        <div class="pd-title" style="font-family:${b.fonts.display};color:${c.ink}">نعيمي بلدي — ذبيحة كاملة</div>
        <div class="pd-meta" style="color:${c.x}">جذع ٦–٨ أشهر · الوزن الصافي ١٤–١٧ كجم</div>
        ${group('التقطيع', ['ثلاجة', 'مفطّح', 'شوي', 'أنصاف'], 0)}
        ${group('التغليف', ['سحب هواء', 'أطباق', 'أكياس'], 0)}
        ${group('الرأس والمقادم', ['مع الذبيحة', 'بدون'], 0)}
        <div class="pd-trust" style="color:${c.ink}">${[4, 1, 0].map(i => `<span>${icon(b, i, b.id === 'seen' ? c.a : c.p, 16)} ${ICONS[i][0]}</span>`).join('')}</div>
      </div>
      <div class="cta-bar"><span class="cta" style="background:${b.id === 'seen' ? c.a : c.p};color:#fff;border-radius:${R(b, 14)}px">أضف للسلة — 1,450 ر.س</span></div>
    </div>`;
  }
  function screenCheckout(b) {
    const c = b.c;
    const row = (t, v, bold) => `<div class="ck-row" style="color:${c.ink};${bold ? 'font-weight:700' : ''}"><span>${t}</span><span>${v}</span></div>`;
    const pay = [['مدى', true], ['Apple Pay', false], ['تمارا — ٤ دفعات بدون فوائد', false]];
    return `<div class="screen" style="background:${c.paper}">${statusBar(c.ink)}
      <div class="sc-body">
        <div class="pg-title" style="font-family:${b.fonts.display};color:${c.ink}">إتمام الطلب</div>
        <div class="panel" style="border-radius:${R(b, 14)}px">
          <div class="ck-item"><div class="ck-ill" style="background:${c.soft}">${ILL.sheep(c.ink)}</div><div><b style="color:${c.ink}">نعيمي بلدي</b><br><small style="color:${c.x}">ثلاجة · سحب هواء</small></div>${price(b, '1,450')}</div>
          <div class="ck-item"><div class="ck-ill" style="background:${c.soft}">${ILL.chop(c.ink)}</div><div><b style="color:${c.ink}">ريش غنم ×٢</b><br><small style="color:${c.x}">شوي</small></div>${price(b, '178')}</div>
        </div>
        <div class="sub-t" style="color:${c.ink}">موعد التوصيل</div>
        <div class="slots">${['اليوم ٤–٦ م', 'اليوم ٦–٨ م', 'بكرة ١٠–١٢ ص'].map((s, i) => `<span style="border-radius:${R(b, 12)}px;${i === 0 ? `background:${b.id === 'seen' ? c.ink : c.p};color:${c.paper}` : `background:#fff;color:${c.ink}`}">${s}</span>`).join('')}</div>
        <div class="sub-t" style="color:${c.ink}">طريقة الدفع</div>
        <div class="panel" style="border-radius:${R(b, 14)}px">${pay.map(([t, on]) => `<div class="pay" style="color:${c.ink}"><i style="border-color:${on ? (b.id === 'seen' ? c.a : c.p) : c.soft};${on ? `box-shadow:inset 0 0 0 4px #fff;background:${b.id === 'seen' ? c.a : c.p}` : ''}"></i>${t}</div>`).join('')}</div>
        <div class="panel" style="border-radius:${R(b, 14)}px">${row('المجموع', '1,628 ر.س')}${row('التوصيل المبرّد', 'مجاني')}${row('الإجمالي شامل الضريبة', '1,628 ر.س', 1)}</div>
      </div>
      <div class="cta-bar" style="background:${c.paper}"><span class="cta" style="background:${b.id === 'seen' ? c.a : c.p};color:#fff;border-radius:${R(b, 14)}px">تأكيد الطلب</span></div>
    </div>`;
  }
  function screenTrack(b) {
    const c = b.c;
    const steps = [['ذُبحت الذبيحة', '٦:٣٠ ص · مسلخ معتمد', 1], ['التقطيع والتغليف', '٨:١٠ ص · ثلاجة، سحب هواء', 1], ['في الطريق إليك', 'الحرارة الآن ٢°م', 2], ['تم التسليم', '', 0]];
    const on = b.id === 'seen' ? c.a : c.p;
    return `<div class="screen" style="background:#fff">
      <div class="map" style="background:${c.soft}">${statusBar(c.ink)}
        <svg viewBox="0 0 300 220" preserveAspectRatio="none"><g stroke="#fff" stroke-width="10" fill="none" opacity=".8"><path d="M-10 60 H310 M-10 150 H310 M70 -10 V230 M200 -10 V230 M-10 230 L310 10"/></g>
        <path d="M70 190 V150 H200 V60 H250" stroke="${on}" stroke-width="5" fill="none" stroke-dasharray="${b.id === 'sadu' ? '8 5' : '0'}" stroke-linecap="${b.iconCap}"/>
        <circle cx="250" cy="60" r="9" fill="${c.ink}"/><circle cx="250" cy="60" r="4" fill="#fff"/>
        <rect x="186" y="132" width="28" height="22" rx="${R(b, 6)}" fill="${on}"/></svg></div>
      <div class="sc-body">
        <div class="pg-title" style="font-family:${b.fonts.display};color:${c.ink}">طلبك في الطريق</div>
        <div class="eta" style="color:${c.x}">يصلك خلال ٢٥ دقيقة · طلب رقم 48213</div>
        <div class="steps">${steps.map(([t, s, st]) => `<div class="step"><i style="background:${st ? on : '#fff'};border-color:${st ? on : c.soft};${st === 2 ? `box-shadow:0 0 0 5px ${hexA(on, .18)}` : ''};border-radius:${b.id === 'sadu' ? '2px' : '50%'}"></i><div><b style="color:${c.ink}">${t}</b><small style="color:${c.x}">${s}</small></div></div>`).join('')}</div>
        <div class="driver" style="background:${c.paper};border-radius:${R(b, 14)}px"><span class="dv-av" style="background:${c.p};border-radius:${b.id === 'sadu' ? '4px' : '50%'}">${b.mark(c.paper, c.a)}</span><div><b style="color:${c.ink}">فهد · مندوب سنام</b><br><small style="color:${c.x}">سيارة مبرّدة · ٤٥٢١ ر س أ</small></div><span class="call" style="background:${on};border-radius:${R(b, 12)}px">اتصال</span></div>
      </div>
    </div>`;
  }

  /* ── signature features: سهم الخير · قصص الاستلام · نقاط سنام ── */
  const EXTRA = [
    '<path d="M12 20.5s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.9c0 5.6-7.5 10-7.5 10z"/>',
    '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
  ];
  const svgIcon = (b, i, color, size) => i < 6 ? icon(b, i, color, size)
    : `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="${i === 7 ? color : 'none'}" stroke="${color}" stroke-width="${b.iconW}" stroke-linecap="${b.iconCap}" stroke-linejoin="${b.iconJoin}">${EXTRA[i - 6]}</svg>`;

  // 7-share ring: a camel/calf takes up to seven partners
  function shareRing(b, filled, ink, on, off) {
    const segs = 7, r = 84, cx = 100, cy = 100, gap = 7;
    let out = '';
    for (let i = 0; i < segs; i++) {
      const a0 = (-90 + i * 360 / segs + gap / 2) * Math.PI / 180, a1 = (-90 + (i + 1) * 360 / segs - gap / 2) * Math.PI / 180;
      out += `<path d="M${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}" fill="none" stroke="${i < filled ? on : off}" stroke-width="12" stroke-linecap="${b.iconCap === 'square' ? 'butt' : 'round'}"/>`;
    }
    return `<svg viewBox="0 0 200 200">${out}<g transform="translate(34,44) scale(1.1)">${strip(ILL.camel(ink))}</g></svg>`;
  }
  function illStory(b, ink, on) {
    return `<svg viewBox="0 0 200 200"><rect x="52" y="14" width="96" height="172" rx="${Math.min(b.radius * 1.4, 18)}" fill="none" stroke="${ink}" stroke-width="5"/>
      <g transform="translate(46,58) scale(.9)">${strip(ILL.box(ink, b))}</g>
      <circle cx="100" cy="150" r="13" fill="none" stroke="${on}" stroke-width="4"/><circle cx="100" cy="150" r="7" fill="${on}"/>
      <g fill="${on}"><rect x="62" y="24" width="22" height="4" rx="2"/><rect x="88" y="24" width="22" height="4" rx="2" opacity=".4"/><rect x="114" y="24" width="22" height="4" rx="2" opacity=".4"/></g>
      <g transform="translate(138,112)"><rect width="52" height="24" rx="12" fill="${on}"/><text x="26" y="17" text-anchor="middle" font-family="${b.fonts.bodyName}" font-size="13" font-weight="700" fill="#fff">+50</text></g></svg>`;
  }
  function illPoints(b, ink, on, paper) {
    const coin = (y, top) => `<ellipse cx="100" cy="${y + 10}" rx="58" ry="20" fill="${ink}"/><rect x="42" y="${y - 6}" width="116" height="16" fill="${ink}"/><ellipse cx="100" cy="${y - 6}" rx="58" ry="20" fill="${top ? on : ink}" stroke="${paper}" stroke-width="2"/>`;
    return `<svg viewBox="0 0 200 200">${coin(160, 0)}${coin(134, 0)}${coin(108, 1)}
      ${place(b.mark(paper, paper), 78, 88, 44, 30)}
      <g fill="${on}"><path d="M44 50l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z"/><path d="M156 34l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z"/></g></svg>`;
  }

  const ONBOARD = [
    ['سهم الخير', 'اذبح لوجه الله… ونحن نتكفّل بالباقي', 'ساهم بسهم في ذبيحة صدقة، ونتولّى الذبح والتقطيع والتوزيع على الأسر المستحقة عبر جمعية مرخّصة، ويصلك التوثيق بالصور.'],
    ['قصص الاستلام', 'شارك لحظة وصول طلبك', 'صوّر طلبك لحظة الاستلام وانشره في قصص سنام، واكسب ٥٠ نقطة مع كل قصة.'],
    ['نقاط سنام', 'كل طلب يقرّبك من هدية', 'نقطة مع كل ريال. استبدل نقاطك بخصومات، وتقطيع مجاني، وذبيحة على حسابنا.'],
  ];
  function screenOnboard(b, i) {
    const c = b.c, on = b.id === 'seen' ? c.a : c.p;
    const stage = b.id === 'seen' ? c.soft : b.id === 'sadu' ? c.p : c.p;
    const ink = b.id === 'seen' ? c.ink : c.paper;
    const ill = [shareRing(b, 5, ink, b.id === 'seen' ? c.a : c.a, b.id === 'seen' ? '#fff' : 'rgba(255,255,255,.22)'), illStory(b, ink, c.a), illPoints(b, ink, c.a, stage)][i];
    const [k, t, d] = ONBOARD[i];
    return `<div class="screen onb" style="background:${b.id === 'seen' ? '#fff' : c.paper}">
      <div class="onb-stage" style="background:${stage};${b.id === 'wasm' ? `border-radius:0 0 ${b.radius * 3}px ${b.radius * 3}px` : ''}">
        ${statusBar(ink)}<span class="onb-skip" style="color:${ink}">تخطَّ</span>
        <div class="onb-ill">${ill}</div>
      </div>
      ${b.id === 'sadu' ? `<div class="sadu-strip" style="background-image:${bg(b)}"></div>` : ''}
      <div class="onb-body">
        <span class="onb-k" style="color:${b.id === 'seen' ? c.a : c.p}">${k}</span>
        <div class="onb-t" style="font-family:${b.fonts.display};color:${c.ink}">${t}</div>
        <p style="color:${c.ink}">${d}</p>
      </div>
      <div class="onb-foot">
        <div class="dots">${[0, 1, 2].map(j => `<i style="background:${j === i ? on : c.soft};width:${j === i ? 18 : 6}px;border-radius:${b.id === 'sadu' ? '1px' : '4px'}"></i>`).join('')}</div>
        <span class="cta" style="background:${on};color:#fff;border-radius:${R(b, 14)}px">${i === 2 ? 'ابدأ التسوّق' : 'التالي'}</span>
      </div>
    </div>`;
  }

  function storyRow(b) {
    const c = b.c, ring = b.id === 'seen' ? c.a : b.id === 'sadu' ? c.a : c.a;
    const ppl = [['قصتك', 'add'], ['أم فهد', 'box'], ['سعد', 'sheep'], ['نورة', 'chop'], ['خالد', 'leg']];
    return `<div class="stories">${ppl.map(([n, k]) => `<span><i style="border-color:${k === 'add' ? c.soft : ring};border-radius:${b.id === 'sadu' ? '6px' : '50%'}"><em style="background:${b.id === 'seen' ? '#fff' : c.soft};border-radius:${b.id === 'sadu' ? '4px' : '50%'}">${k === 'add' ? `<b style="color:${c.ink}">+</b>` : ILL[k](c.ink, b)}</em></i><small style="color:${c.ink}">${n}</small></span>`).join('')}</div>`;
  }
  function sadaqaCard(b) {
    const c = b.c;
    const bgc = b.id === 'seen' ? '#fff' : c.soft;
    return `<div class="sq-card" style="background:${bgc};border-radius:${R(b, 14)}px;color:${c.ink}">
      <div class="sq-ring">${shareRing(b, 5, c.ink, b.id === 'seen' ? c.a : c.p, b.id === 'seen' ? c.soft : '#fff')}</div>
      <div><b style="font-family:${b.fonts.display}">سهم الخير</b><small>بقي سهمان في حاشي صدقة اليوم</small></div>
      <span class="sq-b" style="background:${b.id === 'seen' ? c.a : c.p};border-radius:${R(b, 10)}px">ساهم</span></div>`;
  }

  function screenSadaqa(b) {
    const c = b.c, on = b.id === 'seen' ? c.a : c.p;
    const opt = (t, s, p, sel) => `<div class="sq-opt" style="border-color:${sel ? on : c.soft};border-radius:${R(b, 12)}px;${sel ? `box-shadow:inset 0 0 0 1px ${on}` : ''}"><i style="border-color:${sel ? on : c.soft};${sel ? `background:${on};box-shadow:inset 0 0 0 3px #fff` : ''}"></i><div><b>${t}</b><small style="color:${c.x}">${s}</small></div>${price(b, p)}</div>`;
    const chip = (t, sel) => `<span class="chip" style="border-radius:${R(b, 12)}px;${sel ? `background:${b.id === 'seen' ? c.ink : c.p};color:${c.paper};border-color:transparent` : `color:${c.ink};border-color:${c.soft}`}">${t}</span>`;
    return `<div class="screen" style="background:#fff">
      <div class="sq-hero" style="background:${b.id === 'seen' ? c.ink : c.p};color:${c.paper}">${statusBar(c.paper)}
        <div class="sq-top"><div><div class="pg-title" style="font-family:${b.fonts.display};color:${c.paper};margin:0">سهم الخير</div><small>اذبح لوجه الله، ونتكفّل بالباقي</small></div>
        <div class="sq-big">${shareRing(b, 5, c.paper, c.a, 'rgba(255,255,255,.2)')}</div></div>
        <div class="sq-prog"><b>٥ من ٧ أسهم</b> · يُذبح الحاشي عند اكتمال الأسهم</div>
      </div>
      ${b.id === 'sadu' ? `<div class="sadu-strip" style="background-image:${bg(b)}"></div>` : ''}
      <div class="sc-body" style="color:${c.ink}">
        <div class="sub-t">نوع الصدقة</div>
        ${opt('سهم في حاشي', 'سُبع ذبيحة · ١ من ٧', '520', 1)}
        ${opt('ذبيحة كاملة', 'نعيمي بلدي · لك وحدك', '1,450', 0)}
        <div class="sub-t">النيّة</div>
        <div class="chips">${chip('عن نفسي', 0)}${chip('عن والديّ', 1)}${chip('عن متوفّى', 0)}</div>
        <div class="sq-note" style="background:${c.paper};border-radius:${R(b, 12)}px">${svgIcon(b, 6, on, 16)}<span>تُوزَّع عبر جمعية البر الخيرية (مرخّصة)، ويصلك فيديو الذبح وإشعار التوزيع.</span></div>
      </div>
      <div class="cta-bar"><span class="cta" style="background:${on};color:#fff;border-radius:${R(b, 14)}px">ساهم بسهم — 520 ر.س</span></div>
      ${nav(b, 2)}
    </div>`;
  }

  function screenStory(b) {
    const c = b.c;
    return `<div class="screen story-cam" style="background:#1b1916">
      <div class="sc-photo">
        <svg viewBox="0 0 300 600" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="wood-${b.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4a33"/><stop offset="1" stop-color="#3d2a1d"/></linearGradient></defs>
          <rect width="300" height="600" fill="#2a2420"/><rect y="330" width="300" height="270" fill="url(#wood-${b.id})"/>
          <g opacity=".25" stroke="#000" stroke-width="2">${[360, 400, 450, 510, 570].map(y => `<path d="M0 ${y} C100 ${y - 8} 200 ${y + 8} 300 ${y}"/>`).join('')}</g>
          <ellipse cx="150" cy="430" rx="120" ry="16" fill="#000" opacity=".35"/>
          ${place(box(b, 300).replace(/ width="\d+"/, ''), 0, 180, 300, 260)}</svg>
      </div>
      <div class="st-top abs"><span class="on"></span><span></span><span></span></div>
      <div class="cam-head"><span class="ch-av" style="background:${b.id === 'seen' ? c.ink : c.p}">${b.mark(c.paper, c.a)}</span><b>قصتك</b><span class="x">✕</span></div>
      <div class="sticker-a" style="background:${b.id === 'seen' ? '#fff' : c.paper};color:${c.ink};border-radius:${R(b, 14)}px;transform:rotate(${b.id === 'wasm' ? -5 : -3}deg)">
        <span class="sa-m">${b.id === 'wasm' ? logo(b, 1, c.a, c.a, 'stk') : b.mark(b.id === 'seen' ? c.ink : c.p, c.a)}</span><div><b style="font-family:${b.fonts.display}">وصلني من سنام</b><small>نعيمي بلدي · ٢°م عند الاستلام</small></div></div>
      <div class="cam-tools">${['Aa', '♪', '☺', '⌖'].map(t => `<span>${t}</span>`).join('')}</div>
      <div class="cam-foot">
        <span class="cta" style="background:${b.id === 'seen' ? c.a : c.p};color:#fff;border-radius:${R(b, 14)}px">انشر في قصص سنام · +50 نقطة</span>
        <small>أو شاركها على سناب شات وإنستقرام</small>
      </div>
    </div>`;
  }

  function screenLoyalty(b) {
    const c = b.c, on = b.id === 'seen' ? c.a : c.p, pts = 2450, goal = 3000;
    let meter;
    if (b.id === 'wasm') { // stamp card: every order leaves a وسم
      meter = `<div class="stamps">${Array.from({ length: 10 }, (_, i) => `<span style="border-color:${i < 7 ? c.paper : 'rgba(255,255,255,.3)'}">${i < 7 ? strip(b.mark(c.paper)).replace(/^/, '<svg viewBox="0 0 100 100">') + '</svg>' : `<small>${i + 1}</small>`}</span>`).join('')}</div><small class="ly-s">٧ وسوم من ١٠ · الطلب العاشر تقطيعه مجاني</small>`;
    } else if (b.id === 'sadu') { // woven bar fills row by row
      const cellsOn = Math.round(pts / goal * 24);
      meter = `<div class="weave">${Array.from({ length: 24 }, (_, i) => `<i style="background:${i < cellsOn ? c.a : 'rgba(255,255,255,.18)'}"></i>`).join('')}</div><small class="ly-s">بقي 550 نقطة على «ذبيحة العزيمة»</small>`;
    } else { // clean numeric ring
      const r = 52, L = 2 * Math.PI * r;
      meter = `<svg class="ring" viewBox="0 0 130 130"><circle cx="65" cy="65" r="${r}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="10"/><circle cx="65" cy="65" r="${r}" fill="none" stroke="${c.a}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${L * pts / goal} ${L}" transform="rotate(-90 65 65)"/><text x="65" y="64" text-anchor="middle" font-family="Alexandria" font-weight="800" font-size="24" fill="#fff">2,450</text><text x="65" y="82" text-anchor="middle" font-family="Alexandria" font-size="9" fill="#fff" opacity=".7">من 3,000 نقطة</text></svg><small class="ly-s">بقي 550 نقطة على المستوى الذهبي</small>`;
    }
    const earn = [['كل ريال تشتري به', '+1'], ['قصة استلام منشورة', '+50'], ['سهم في الخير', '+100'], ['دعوة صديق', '+200']];
    const rewards = [['خصم 25 ر.س', '1,000'], ['تقطيع مجاني', '1,500'], ['ربع ذبيحة', '6,000']];
    return `<div class="screen" style="background:${c.paper}">
      <div class="ly-hero" style="background:${b.id === 'seen' ? c.ink : c.p};color:#fff">${statusBar('#fff')}
        <div class="ly-h"><span>نقاط سنام</span>${b.id !== 'seen' ? `<b style="font-family:${b.fonts.display}">${pts.toLocaleString('en')} <small>نقطة</small></b>` : ''}</div>
        ${meter}
      </div>
      ${b.id === 'sadu' ? `<div class="sadu-strip" style="background-image:${bg(b)}"></div>` : ''}
      <div class="sc-body" style="color:${c.ink}">
        <div class="sub-t">استبدل نقاطك</div>
        <div class="rw">${rewards.map(([t, p], i) => `<span style="background:#fff;border-radius:${R(b, 12)}px;${i === 0 ? `outline:1.5px solid ${on}` : ''}"><b>${t}</b><small style="color:${on}">${p} نقطة</small></span>`).join('')}</div>
        <div class="sub-t">اكسب أكثر</div>
        <div class="panel" style="border-radius:${R(b, 14)}px">${earn.map(([t, v]) => `<div class="ck-row"><span>${t}</span><b style="color:${on}">${v}</b></div>`).join('')}</div>
      </div>
      ${nav(b, 4)}
    </div>`;
  }

  const phone = (inner, cls = '') => `<div class="phone ${cls}"><div class="notch"></div>${inner}</div>`;
  function appIcon(b) {
    const c = b.c;
    const inner = b.id === 'seen' ? strip(logo(b, 1, '#fff', c.a)) :
      `<rect width="100" height="100" fill="${c.p}"/>${place(b.mark(c.paper, c.a), 20, 20, 60, 60)}`;
    return `<div class="appicon" style="border-radius:22%;overflow:hidden">${`<svg viewBox="${b.id === 'seen' ? '6 6 88 88' : '0 0 100 100'}">${inner}</svg>`}</div>`;
  }
  function splash(b) {
    const c = b.c;
    return `<div class="screen splash" style="background:${b.id === 'seen' ? '#fff' : c.p};${b.id === 'wasm' ? '' : ''}">
      ${b.id === 'sadu' ? `<div class="splash-band" style="background-image:${bg(b)}"></div>` : ''}
      <div class="splash-logo">${b.id === 'wasm' ? logo(b, 1, c.paper, c.paper, 'spl') : b.mark(b.id === 'seen' ? c.ink : c.paper, c.a)}</div>
      ${b.word(b.id === 'seen' ? c.ink : c.paper)}
      <div class="splash-tag" style="color:${b.id === 'seen' ? c.x : c.paper};font-family:${b.fonts.body}">${b.tagline}</div>
    </div>`;
  }

  /* ── social ── */
  function social(b) {
    const c = b.c, D = b.fonts.display;
    const dark = b.id === 'seen' ? c.ink : c.p;
    const avatar = `<div class="ig-av" style="background:${dark}">${b.mark(c.paper, c.a)}</div>`;
    const posts = [
      `<div class="post" style="background:${dark};color:${c.paper}">
        <div class="po-ill">${ILL.sheep(b.id === 'seen' ? '#000' : c.ink)}</div>
        <div class="po-k" style="font-family:${D}">${b.id === 'wasm' ? 'ذبيحة موسومة' : 'نعيمي بلدي'}</div>
        <div class="po-p"><b style="font-family:${D}">1,450</b> ر.س<br><small>شامل التقطيع والتغليف والتوصيل المبرّد</small></div>
        <div class="po-logo">${b.mark(c.paper, c.a)}</div></div>`,
      `<div class="post" style="background:${b.id === 'sadu' ? c.paper : '#fff'};color:${c.ink}">
        <div class="po-k sm" style="font-family:${D}">ثلاجة ولا مفطّح؟</div>
        <ul class="po-list">${[['ثلاجة', 'قطع متوسطة للطبخ اليومي'], ['مفطّح', 'الذبيحة كاملة للعزايم'], ['شوي', 'ريش وأوصال للمشاوي']].map(([a, d]) => `<li><b style="color:${dark}">${a}</b><span>${d}</span></li>`).join('')}</ul>
        <div class="po-foot" style="border-color:${c.soft}">${icon(b, 3, dark, 18)} تقطيع حسب الطلب</div></div>`,
      `<div class="post pat" style="background-image:${bg(b)};color:${c.ink}">
        <div class="po-card" style="background:${b.id === 'seen' ? '#fff' : c.paper};border-radius:${R(b, 18)}px">
          <div class="po-k sm" style="font-family:${D};color:${dark}">حجز الأضاحي مفتوح</div>
          <small>اختر ذبيحتك الآن، ونذبح في يوم العيد</small>
          <span class="po-b" style="background:${c.a};color:${b.id === 'sadu' ? c.ink : '#fff'};border-radius:${R(b, 12)}px">احجز أضحيتك</span></div></div>`,
    ];
    const story = `<div class="story" style="background:${b.id === 'seen' ? c.paper : c.ink};color:${b.id === 'seen' ? c.ink : c.paper}">
      <div class="st-top"><span></span><span></span><span class="on"></span></div>
      <div class="st-icon">${icon(b, 1, b.id === 'seen' ? c.a : c.a, 64)}</div>
      <div class="st-big" style="font-family:${D}">٢°م</div>
      <div class="st-t">حرارة طلبك الآن<br>وهو في الطريق إليك</div>
      <div class="st-logo">${lockup(b, b.id === 'seen' ? c.ink : c.paper, c.a)}</div></div>`;
    return { avatar, posts, story };
  }

  /* ── page sections ── */
  const S = [
    ['strategy', 'الاستراتيجية والتموضع'], ['logos', 'الشعارات المقترحة'], ['color', 'الألوان والخطوط'], ['system', 'نظام الهوية'],
    ['pack', 'التغليف'], ['fleet', 'التوصيل والزي'], ['social', 'السوشيال ميديا'], ['app', 'هوية التطبيق'], ['mock', 'المشهد الكامل'],
  ];
  const sec = (i, inner, cls = '') => `<section id="${S[i][0]}" class="sec ${cls}"><header class="sec-h"><span class="sec-n">${String(i + 1).padStart(2, '0')}</span><h2>${S[i][1]}</h2></header>${inner}</section>`;

  function renderBrand(b) {
    const c = b.c, st = b.strategy, so = social(b);
    const others = window.BRAND_ORDER.filter(k => k !== b.id).map(k => B[k]);
    return `${ROUGH}
    <a class="skip" href="#strategy">تخطَّ إلى المحتوى</a>
    <nav class="topnav"><a href="../" class="tn-home">← كل الاتجاهات</a><div class="tn-links">${S.map(([id, t], i) => `<a href="#${id}">${t}</a>`).join('')}</div><a class="tn-cmp" href="../compare/">مقارنة</a></nav>

    <header class="hero">
      <div class="hero-pat" style="background-image:${bg(b)}"></div>
      <div class="hero-in">
        <div class="hero-tag">الاتجاه ${b.letter} · ${b.latin}</div>
        <div class="hero-logo">${lockup(b, b.id === 'seen' ? c.ink : c.paper, c.a)}</div>
        <p class="hero-sum">${b.summary}</p>
      </div>
    </header>

    <main>
    ${sec(0, `<p class="pos">${st.position}</p>
      <div class="grid3">
        <div><h3>لمن؟</h3><p>${st.audience}</p></div>
        <div><h3>الشخصية</h3><ul class="traits">${st.traits.map(t => `<li>${t}</li>`).join('')}</ul></div>
        <div><h3>نبرة الصوت</h3>${st.voice.map(v => `<p class="voice">${v}</p>`).join('')}</div>
      </div>
      <div class="diff"><h3>لماذا يختلف عن السوق؟</h3><p>${st.diff}</p></div>
      <div class="tagline-box"><span>الشعار اللفظي</span><strong>${b.tagline}</strong></div>`)}

    ${sec(1, b.logos.map((l, i) => `<article class="logo-card">
        <div class="lc-main">${logo(b, i, b.id === 'seen' ? c.ink : c.p, c.a, `m${i}`)}</div>
        <div class="lc-vars">
          <div style="background:${c.p}">${logo(b, i, c.paper, c.a, `v1${i}`)}</div>
          <div style="background:${c.ink}">${logo(b, i, c.paper, c.a, `v2${i}`)}</div>
          <div style="background:#fff">${logo(b, i, '#111', '#111', `v3${i}`)}</div>
        </div>
        <div class="lc-txt"><h3>${String.fromCharCode(1633 + i)} — ${l.name}</h3><p>${l.idea}</p></div>
      </article>`).join('') + `<p class="note">كل شعار معروض على الخلفية الأساسية، والأساسية الغامقة، وبلون واحد للختم والطباعة.</p>`)}

    ${sec(2, `<div class="swatches">${b.swatches.map(([n, h, u], i) => `<div class="sw ${i === 0 ? 'big' : ''}" style="background:${h};color:${lum(h) > .5 ? c.ink : '#fff'}"><b>${n}</b><span>${h}</span><small>${u}</small></div>`).join('')}</div>
      <div class="type">
        <div class="ty-a"><div class="ty-big" style="font-family:${b.fonts.display}">سنام</div><div class="ty-meta"><b>${b.fonts.displayName}</b> — العناوين والشعار</div><div class="ty-abc" style="font-family:${b.fonts.display}">أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي</div></div>
        <div class="ty-b"><p class="ty-body" style="font-family:${b.fonts.body}">ذبيحة نعيمي بلدي، جذع من ٦ إلى ٨ أشهر، تُذبح في مسلخ معتمد تحت إشراف بيطري، وتُقطّع حسب طلبك، وتصلك مبرّدة بين ٠ و٤ درجات مئوية.</p>
        <div class="ty-meta"><b>${b.fonts.bodyName}</b> — النصوص والتطبيق</div>
        <div class="ty-scale" style="font-family:${b.fonts.body}"><span style="font-size:32px">عنوان ٣٢</span><span style="font-size:22px">عنوان فرعي ٢٢</span><span style="font-size:16px">نص أساسي ١٦</span><span style="font-size:12px">ملاحظة ١٢</span></div></div>
      </div>`)}

    ${sec(3, `<div class="pat-band" style="background-image:${bg(b)}"></div>
      <div class="sys-grid">
        <div class="sys-icons"><h3>الأيقونات</h3><div class="icons">${ICONS.map((ic, i) => `<div>${icon(b, i, b.id === 'seen' ? c.ink : c.p, 34)}<span>${ic[0]}</span></div>`).join('')}</div></div>
        <div class="sys-stk"><h3>الملصقات</h3><div class="stks">${stickers(b)}</div></div>
      </div>
      <h3>بطاقة العمل</h3><div class="cards">${card(b)}</div>`)}

    ${sec(4, `<div class="stage" style="background:${c.soft}"><div class="pk-box">${box(b, 420)}</div><div class="pk-bag">${bag(b, 210)}</div></div>
      <div class="stage two" style="background:${c.paper}"><div>${tray(b, 360)}<p class="cap">طبق سحب هواء مع ملصق الوزن وتاريخ الذبح</p></div></div>`)}

    ${sec(5, `<div class="stage van" style="background:linear-gradient(${c.soft} 72%, ${shade(c.soft, -12)} 72%)">${van(b, 640)}</div>
      <div class="uniform">${[[shirt(b), 'تيشيرت المندوب'], [apron(b), 'مريلة الجزار'], [cap(b), 'الكاب'], [riderBag(b), 'حقيبة التوصيل المبرّدة']].map(([s, t]) => `<figure><div>${s}</div><figcaption>${t}</figcaption></figure>`).join('')}</div>`)}

    ${sec(6, `<div class="ig"><div class="ig-head">${so.avatar}<div><b>sinam.sa</b><span>${b.tagline} · الرياض</span></div></div>
      <div class="ig-wrap"><div class="ig-grid">${so.posts.join('')}</div><div class="ig-story">${so.story}</div></div></div>`)}

    ${sec(7, `<div class="app-top"><div class="ai-wrap">${appIcon(b)}<span>أيقونة التطبيق</span></div>${phone(splash(b), 'small')}</div>
      <h3 class="app-h">الشاشات التعريفية</h3><p class="app-p">أول ما يراه العميل بعد التحميل: ثلاث شاشات تعرّفه بما لا يجده في تطبيق آخر.</p>
      <div class="phones three">${[0, 1, 2].map(i => `<figure>${phone(screenOnboard(b, i))}<figcaption>${i + 1} — ${ONBOARD[i][0]}</figcaption></figure>`).join('')}</div>
      <h3 class="app-h">مزايا سنام داخل التطبيق</h3><p class="app-p">«سهم الخير» في منتصف الشريط السفلي، وقصص الاستلام أعلى الرئيسية، ورصيد النقاط ظاهر دائمًا في الترويسة.</p>
      <div class="phones three">${[[screenSadaqa, 'سهم الخير — المساهمة في ذبيحة صدقة'], [screenStory, 'قصة الاستلام — تُنشر في التطبيق'], [screenLoyalty, 'نقاط سنام — الرصيد والمكافآت']].map(([f, t]) => `<figure>${phone(f(b))}<figcaption>${t}</figcaption></figure>`).join('')}</div>
      <h3 class="app-h">رحلة الطلب</h3>
      <div class="phones">${[screenHome, screenProduct, screenCheckout, screenTrack].map((f, i) => `<figure>${phone(f(b))}<figcaption>${['الرئيسية', 'صفحة الذبيحة', 'إتمام الطلب', 'تتبّع الطلب'][i]}</figcaption></figure>`).join('')}</div>`)}

    ${sec(8, `<div class="scene" style="background-image:${bg(b)}">
        <div class="sc-box">${box(b, 380)}</div>
        <div class="sc-phone">${phone(screenHome(b))}</div>
        <div class="sc-bag">${bag(b, 190)}</div>
        <div class="sc-card"><div class="cards">${card(b)}</div></div>
      </div>`, 'last')}

    <section class="choose">
      <h2>هل هذا اتجاهك؟</h2>
      <p>شاهد الاتجاهين الآخرين قبل أن تقرر، أو قارن الثلاثة جنبًا إلى جنب.</p>
      <div class="ch-links">${others.map(o => `<a href="../${o.id}/" style="--oc:${o.c.p}">الاتجاه ${o.letter} · ${o.name}</a>`).join('')}<a href="../compare/" class="cmp">المقارنة</a></div>
    </section>
    </main>`;
  }

  /* ── colour utils ── */
  function shade(hex, pct) {
    const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v + (pct / 100) * (pct > 0 ? 255 - v : v))));
    return '#' + [n >> 16, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, '0')).join('');
  }
  function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }
  function lum(hex) { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; }

  window.Kit = { renderBrand, box, van, bag, tray, screenHome, screenOnboard, screenSadaqa, screenStory, screenLoyalty, phone, logo, lockup, bg, ROUGH, shade, appIcon };

  const id = document.body.dataset.brand;
  if (id && B[id]) {
    const b = B[id], c = b.c;
    const r = document.documentElement.style;
    Object.entries({ '--p': c.p, '--a': c.a, '--paper': c.paper, '--soft': c.soft, '--ink': c.ink, '--x': c.x, '--fd': b.fonts.display, '--fb': b.fonts.body, '--r': b.radius + 'px' }).forEach(([k, v]) => r.setProperty(k, v));
    document.body.classList.add('b-' + id);
    document.getElementById('app').innerHTML = renderBrand(b);
  }
})();
