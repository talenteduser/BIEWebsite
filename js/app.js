import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
const S = window.SITE, $ = (q, e = document) => e.querySelector(q), sleep = ms => new Promise(r => setTimeout(r, ms));
let timer;


async function model3d() {            // spinning loader model: your .glb/.gltf, or a placeholder built in code
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); r.setPixelRatio(devicePixelRatio); r.setSize(260, 260); $('#l3d').append(r.domElement);
  const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, .1, 100); cam.position.set(0, .6, 4.5); cam.lookAt(0, 0, 0);
  sc.environment = new THREE.PMREMGenerator(r).fromScene(new RoomEnvironment(), .04).texture;   // so PBR materials aren't black
  const dl = new THREE.DirectionalLight(0xffffff, 200); dl.position.set(3, 4, 5); sc.add(dl, new THREE.AmbientLight(0xffffff, 100));
  let obj, mixer;
  try {
    if (!S.loader.model) throw 0;
    const [{ GLTFLoader }, { DRACOLoader }, { MeshoptDecoder }] = await Promise.all([import('three/addons/loaders/GLTFLoader.js'),
      import('three/addons/loaders/DRACOLoader.js'), import('three/addons/libs/meshopt_decoder.module.js')]);
    const gltf = await new GLTFLoader().setDRACOLoader(new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/'))
      .setMeshoptDecoder(MeshoptDecoder).loadAsync(S.loader.model);
    obj = gltf.scene;
    if (gltf.animations.length) { mixer = new THREE.AnimationMixer(obj); mixer.clipAction(gltf.animations[0]).play(); }
  } catch (e) {
    if (S.loader.model) { console.error('Loader model failed to load:', S.loader.model, e); $('#lt').textContent += ' (model failed, see console)'; }
  }
  const bb = new THREE.Box3().setFromObject(obj), c = bb.getCenter(new THREE.Vector3()), z = bb.getSize(new THREE.Vector3());
  obj.position.sub(c);                                    // centre the model on the origin
  const pivot = new THREE.Group(); pivot.add(obj); pivot.scale.setScalar(2.4 / (Math.max(z.x, z.y, z.z) || 1)); sc.add(pivot);   // auto-fit any size
  const clk = new THREE.Clock(); (function a() { mixer && mixer.update(clk.getDelta()); pivot.rotation.y += .014; r.render(sc, cam); requestAnimationFrame(a); })();
}

function fakeLoad() {                 // cosmetic progress bar + rotating tips
  return new Promise(res => {
    const t0 = performance.now(), T = S.loader.minMs; let i = 0, done = 0;
    const next = () => $('#tip').textContent = S.loader.tips[i++ % S.loader.tips.length]; next();
    const ti = setInterval(next, 900), fin = () => { if (!done) { done = 1; clearInterval(ti); res(); } };
    $('#skip').onclick = fin;
    (function f() { const p = Math.min(1, (performance.now() - t0) / T);
      $('#bar').style.width = p * 100 + '%'; $('#pct').textContent = Math.floor(p * 100) + '%';
      p < 1 && !done ? requestAnimationFrame(f) : fin(); })();
  });
}

function home() {
  $('#app').innerHTML = `<div class="car">${S.slides.map((s, i) =>
    `<div class="sl${i ? '' : ' on'}" style="background:url('${s.img}') center/cover,${s.color}"><div class="ov"><h1>${s.title}</h1></div>
     <div class="bt"><p>${s.text}</p><a class="btn" href="${s.link}">Learn more</a></div></div>`).join('')}
     <button class="nv p" aria-label="Previous">&lsaquo;</button><button class="nv n" aria-label="Next">&rsaquo;</button></div>`;
  const sl = [...document.querySelectorAll('.sl')]; let c = 0;
  const go = d => { sl[c].classList.remove('on'); c = (c + d + sl.length) % sl.length; sl[c].classList.add('on'); };
  $('.nv.p').onclick = () => go(-1); $('.nv.n').onclick = () => go(1); timer = setInterval(() => go(1), 6000);
}

async function page(k) {
  const p = S.pages[k] || { title: 'Not found', body: '<p>This page does not exist.</p>' };
  $('#app').innerHTML = `<article class="pg"><h1>${p.title}</h1><div id="pb">${p.body || ''}</div></article>`;
  if (p.file) try { const r = await fetch(p.file); if (!r.ok) throw 0; $('#pb').innerHTML = await r.text(); } catch { $('#pb').textContent = 'Could not load ' + p.file; }
}

function wanted() {
  $('#app').innerHTML = `<section class="w"><h1>MOST WANTED</h1><div id="map"></div><aside id="prof" hidden></aside></section>`;
  const W = 960, H = 500, svg = d3.select('#map').append('svg').attr('viewBox', `0 0 ${W} ${H}`), g = svg.append('g');
  const proj = d3.geoNaturalEarth1().fitSize([W, H], { type: 'Sphere' }), path = d3.geoPath(proj);
  g.append('path').attr('class', 'sph').attr('d', path({ type: 'Sphere' }));
  const cg = g.append('g'), pg = g.append('g');
  d3.json(S.map.topo).then(t => cg.selectAll('path').data(topojson.feature(t, t.objects.countries).features).join('path').attr('class', 'cty').attr('d', path))
    .catch(() => $('.gt').innerHTML += '<br>&gt;map data failed to load (check config.map.topo)');
  S.wanted.forEach(p => {
    const [x, y] = proj([p.lon, p.lat]), n = pg.append('g').attr('class', 'pin').attr('transform', `translate(${x},${y})`).attr('tabindex', 0).attr('role', 'button').attr('aria-label', p.name);
    n.append('circle').attr('class', 'r').attr('r', 4);
    n.append('circle').attr('class', 'c').attr('r', 4);
    if (p.icon) n.append('image').attr('href', p.icon).attr('x', -8).attr('y', -8).attr('width', 16).attr('height', 16);
    const open = () => { g.transition().duration(900).ease(d3.easeCubicInOut).attr('transform', `translate(${W / 2 - x * 4},${H / 2 - y * 4}) scale(4)`).on('end', () => profile(p, g, W, H)); };
    n.on('click', open).on('keydown', e => e.key === 'Enter' && open());
  });
}

function profile(p, g, W, H) {
  const el = $('#prof'); el.hidden = false;
  el.innerHTML = `<button id="x">[X] close</button><div class="ph" style="background-image:url('${p.photo}')"></div>
    <h2>${p.name}</h2><h3>a.k.a. ${p.alias}</h3>
    <div class="op">OPSEC<div class="ob"><i></i></div><b>${p.opsec}%</b></div>
    <dl>${Object.entries(p.info).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
    <h4>CHARGES</h4><ul>${p.charges.map(c => `<li>${c}</li>`).join('')}</ul><h4>DOSSIER</h4><p id="tw"></p>`;
  el.querySelectorAll('h2,h3,.op,dt,dd,li,h4').forEach((e, i) => { e.classList.add('in'); e.style.animationDelay = i * 80 + 'ms'; });
  requestAnimationFrame(() => requestAnimationFrame(() => $('.ob i', el).style.width = p.opsec + '%'));
  let i = 0; const tw = setInterval(() => { $('#tw').textContent = p.bio.slice(0, ++i); if (i >= p.bio.length) clearInterval(tw); }, 18);
  const close = () => { clearInterval(tw); el.hidden = true; document.onkeydown = null; g.transition().duration(800).attr('transform', 'translate(0,0) scale(1)'); };
  $('#x').onclick = close; document.onkeydown = e => e.key === 'Escape' && close();
}

function route() {
  clearInterval(timer); const [, k, id] = location.hash.split('/'); scrollTo(0, 0);
  k === 'wanted' ? wanted() : k === 'page' ? page(id) : home();
}

(async () => {
  document.title = S.name; $('.ban').textContent = S.banner; $('#lt').textContent = S.loader.title;
  $('header').innerHTML = `<a class="brand" href="#/"><img src="${S.logo}" alt="" onerror="this.remove()"><span>${S.name}</span></a><nav>${S.nav.map(n => `<a href="${n[1]}">${n[0]}</a>`).join('')}</nav>`;
  $('#foot').innerHTML = `<div class="soc">${S.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener"><img src="${s.icon}" alt="${s.name}" onerror="this.replaceWith(this.alt)"></a>`).join('')}</div><p>${S.footer}</p>`;
  if (sessionStorage.seen && !location.search.includes('loader')) $('#loader').remove();
  else { try { await model3d(); } catch (e) { console.warn('3D model failed', e); } await fakeLoad(); sessionStorage.seen = 1; $('#loader').classList.add('out'); await sleep(500); $('#loader').remove(); }
  $('#site').hidden = false; route(); addEventListener('hashchange', route);
})();
