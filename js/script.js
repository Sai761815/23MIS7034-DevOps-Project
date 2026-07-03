(function(){
  // Internal navigation via JS
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(el.getAttribute('data-scroll'));
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
      const nl = document.getElementById('navLinks');
      if (nl) nl.classList.remove('open');
    });
  });

  // Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  }));

  // Season tracker (based on current month)
  const month = new Date().getMonth(); // 0=Jan
  let seasonLabel, seasonNote, routesOpen;
  if ([5,6,7,8].includes(month)) { // Jun-Sep
    seasonLabel = 'Monsoon'; seasonNote = 'Waterfalls at peak flow'; routesOpen = '6 of 9';
  } else if ([9,10,11,0,1].includes(month)) { // Oct-Feb
    seasonLabel = 'Winter'; seasonNote = 'Best visibility for fort treks'; routesOpen = '9 of 9';
  } else {
    seasonLabel = 'Summer'; seasonNote = 'Beach & backwater season'; routesOpen = '7 of 9';
  }
  document.getElementById('seasonBar').innerHTML = `
    <div class="season-item"><div class="num">${seasonLabel}</div><div class="lab">Current season</div></div>
    <div class="season-item"><div class="num">${routesOpen}</div><div class="lab">Hill routes open</div></div>
    <div class="season-item"><div class="num">${seasonNote}</div><div class="lab">What to expect</div></div>
  `;

  // Destination data
  const dests = [
    {name:'Amboli Falls', district:'Sindhudurg', season:'Jul – Sep', dist:'400 km', desc:'A monsoon waterfall town in the Ghats, known for endemic frogs that only appear after the first rains.', icon:'waterfall'},
    {name:'Raigad Fort', district:'Raigad', season:'Oct – Feb', dist:'165 km', desc:'Hilltop capital of the Maratha empire, reached by a cable car or a two-hour climb.', icon:'fort'},
    {name:'Tarkarli Backwaters', district:'Sindhudurg', season:'Nov – May', dist:'490 km', desc:'Turquoise backwaters and scuba reefs where the Karli river meets the Arabian Sea.', icon:'wave'},
    {name:'Radhanagari Sanctuary', district:'Kolhapur', season:'Dec – Mar', dist:'395 km', desc:'Gaur and leopard habitat inside a protected reserve, best explored on a dawn safari.', icon:'leaf'},
    {name:'Mahabaleshwar Viewpoints', district:'Satara', season:'Sep – Jun', dist:'265 km', desc:'Strawberry farms and valley viewpoints along a cool, forested plateau.', icon:'mountain'},
    {name:'Ganpatipule Beach', district:'Ratnagiri', season:'Oct – Mar', dist:'375 km', desc:'A quiet temple-town beach where the shrine sits directly on the sand.', icon:'temple'}
  ];

  const icons = {
    waterfall:'<path d="M14 4v16M22 4v10M30 4v20M38 4v14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M8 44h36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    fort:'<path d="M8 44V22h6v-6h4v6h6v-8h4v8h6v-6h4v6h6v22H8Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    wave:'<path d="M4 24c5 0 5-6 10-6s5 6 10 6 5-6 10-6 5 6 10 6 5-6 10-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M4 36c5 0 5-6 10-6s5 6 10 6 5-6 10-6 5 6 10 6 5-6 10-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>',
    leaf:'<path d="M10 42C10 20 26 8 42 8c0 20-14 34-32 34Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 40C22 30 30 22 40 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
    mountain:'<path d="M4 40L18 14l9 12 5-6 16 20H4Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>',
    temple:'<path d="M24 4l7 10H17l7-10Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><path d="M14 44V20h20v24M20 44V30h8v14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>'
  };

  const grid = document.getElementById('destGrid');
  grid.innerHTML = dests.map(d => `
    <div class="dest-card reveal">
      <svg class="dest-icon" viewBox="0 0 48 48" fill="none">${icons[d.icon]}</svg>
      <h3>${d.name}</h3>
      <div class="dest-district">${d.district} District</div>
      <p class="dest-desc">${d.desc}</p>
      <div class="dest-meta">
        <span>${d.dist} from Pune</span>
        <span class="season-chip">${d.season}</span>
      </div>
    </div>
  `).join('');

  // Stays
  const stays = [
    {name:'Amboli Ghat Homestay', dest:'Amboli Falls', place:'Near Amboli Falls', amen:'Home-cooked meals · Bonfire evenings', price:2200},
    {name:'Fort View Heritage Resort', dest:'Raigad Fort', place:'Raigad', amen:'Maratha-era architecture · Guided treks', price:5800},
    {name:'Tarkarli Blue Lagoon Resort', dest:'Tarkarli Backwaters', place:'Tarkarli', amen:'Beachfront cottages · Scuba desk', price:4200},
    {name:'Radhanagari Eco Lodge', dest:'Radhanagari Sanctuary', place:'Kolhapur', amen:'Solar-powered · Night safaris', price:3100},
    {name:'Valley Bloom Cottages', dest:'Mahabaleshwar', place:'Mahabaleshwar', amen:'Strawberry farm views · Bonfire deck', price:3600},
    {name:'Temple Sands Beach Resort', dest:'Ganpatipule Beach', place:'Ganpatipule', amen:'Beachfront rooms · Temple-facing balconies', price:3900}
  ];
  document.getElementById('stayList').innerHTML = stays.map(s => `
    <div class="stay-row">
      <div><div class="name">${s.name}</div><div class="place">${s.place}</div></div>
      <div class="amen">${s.amen.split(' · ')[0]}</div>
      <div class="amen">${s.amen.split(' · ')[1]}</div>
      <div class="price">₹${s.price.toLocaleString('en-IN')}<span>per night</span></div>
    </div>
  `).join('');

  // Itinerary
  const trail = [
    {day:1, title:'Pune → Mahabaleshwar', drive:'2.5h drive', desc:'Arrival, valley viewpoints, and an evening walk through the strawberry farms.'},
    {day:2, title:'Mahabaleshwar → Raigad Fort', drive:'3h drive', desc:'Fort trek or ropeway up, then sunset at Takmak Point overlooking the valley.'},
    {day:3, title:'Raigad → Tarkarli', drive:'4h drive', desc:'Coastal road, afternoon scuba session, and a backwater boat ride at dusk.'},
    {day:4, title:'Tarkarli → Amboli', drive:'2h drive', desc:'Waterfall trail by day, a naturalist-led night walk for endemic frogs after dark.'},
    {day:5, title:'Amboli → Radhanagari → Kolhapur', drive:'3h drive', desc:'Dawn wildlife safari, then on to Kolhapur for the evening departure.'}
  ];
  document.getElementById('trailStops').innerHTML = trail.map(t => `
    <div class="trail-stop reveal">
      <div class="trail-dot">${t.day}</div>
      <div class="trail-day"><h3>${t.title}</h3><span class="trail-drive">${t.drive}</span></div>
      <p class="trail-desc">${t.desc}</p>
    </div>
  `).join('');

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Booking / availability check
  const status = document.getElementById('bookingStatus');
  const checkBtn = document.getElementById('checkAvailBtn');

  function fmtDate(d){
    return d.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
  }

  checkBtn.addEventListener('click', () => {
    const dest = document.getElementById('destSelect').value;
    const startDays = Number(document.getElementById('startSelect').value);
    const nights = Number(document.getElementById('nightsSelect').value);
    const guests = Number(document.getElementById('guestsSelect').value);
    const resultsBox = document.getElementById('availabilityResults');

    const checkinDate = new Date();
    checkinDate.setDate(checkinDate.getDate() + startDays);
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkoutDate.getDate() + nights);

    const stay = stays.find(s => s.dest === dest) || stays[0];

    // Simple, transparent availability rule:
    // stays here cap out at 6 guests, and the 7-night option is tight
    // during the upcoming peak window (14 days out).
    const isAvailable = !(guests > 6 || (nights === 7 && startDays === 14));

    status.textContent = 'Checking availability…';
    resultsBox.innerHTML = '';
    checkBtn.disabled = true;

    setTimeout(() => {
      checkBtn.disabled = false;

      if (!isAvailable) {
        status.textContent = `No open rooms at ${stay.name} for ${guests} guests on that window.`;
        resultsBox.innerHTML = `
          <div class="result-card">
            <div class="result-info">
              <div class="avail-tag" style="background:rgba(154,75,52,0.25);color:#E39784;">Not available</div>
              <h3>${stay.name}</h3>
              <div class="r-place">${stay.place} · ${fmtDate(checkinDate)} → ${fmtDate(checkoutDate)}</div>
              <div class="r-amen">${guests > 6 ? 'This stay sleeps up to 6 guests — try splitting into two rooms or a smaller group.' : 'Fully booked for that window — try a different start date.'}</div>
            </div>
          </div>
        `;
        return;
      }

      const total = stay.price * nights;
      status.textContent = `${nights} night${nights > 1 ? 's' : ''} in ${dest}, ${guests} guest${guests > 1 ? 's' : ''} — one option open below.`;

      resultsBox.innerHTML = `
        <div class="result-card">
          <div class="result-info">
            <div class="avail-tag">Available</div>
            <h3>${stay.name}</h3>
            <div class="r-place">${stay.place} · ${fmtDate(checkinDate)} → ${fmtDate(checkoutDate)}</div>
            <div class="r-amen">${stay.amen}</div>
          </div>
          <div class="result-price">
            <div class="r-total">₹${total.toLocaleString('en-IN')}</div>
            <div class="r-sub">₹${stay.price.toLocaleString('en-IN')} × ${nights} night${nights > 1 ? 's' : ''}</div>
            <button type="button" class="btn btn-primary" id="reserveBtn">Reserve</button>
            <div class="reserved-msg" id="reservedMsg"></div>
          </div>
        </div>
      `;

      document.getElementById('reserveBtn').addEventListener('click', function() {
        document.getElementById('reservedMsg').textContent = `Held for ${guests} guest${guests > 1 ? 's' : ''} at ${stay.name}. Our team will confirm by email within 24 hours.`;
        this.disabled = true;
        this.style.opacity = '0.6';
      });
    }, 450);
  });
})();