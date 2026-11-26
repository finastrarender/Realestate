{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem('nst_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('nst_'+k,JSON.stringify(v))}catch(e){}}};
const now=()=>new Date().toLocaleString('en-GB',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});

/* ---------- drawn art ---------- */
let gid=0;
const tree=(x,y,s,c)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="-10" width="6" height="40" fill="#5b4632"/><ellipse cx="0" cy="-34" rx="26" ry="38" fill="${c}"/><ellipse cx="-8" cy="-44" rx="12" ry="18" fill="#ffffff" opacity=".12"/></g>`;
function house(x,y,s,w){const id='h'+(++gid);return `<g transform="translate(${x} ${y}) scale(${s})"><defs><pattern id="${id}" width="9" height="10" patternUnits="userSpaceOnUse"><rect width="9" height="10" fill="${w}"/><rect width="2" height="10" fill="#000" opacity=".18"/></pattern><linearGradient id="${id}g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4b57"/><stop offset="1" stop-color="#1c262d"/></linearGradient></defs>
<ellipse cx="0" cy="150" rx="170" ry="10" fill="#000" opacity=".12"/><path d="M0 -105 L150 15 L150 150 L-150 150 L-150 15 Z" fill="url(#${id})"/><path d="M0 -122 L172 22 L150 22 L0 -98 L-150 22 L-172 22 Z" fill="#2c2420"/><path d="M0 -88 L105 0 L105 6 L-105 6 L-105 0Z" fill="#000" opacity=".12"/>
<rect x="-110" y="40" width="220" height="110" fill="url(#${id}g)"/><g stroke="#cdbfa9" stroke-width="3"><path d="M-55 40v110M0 40v110M55 40v110M-110 95h220"/></g><rect x="-110" y="40" width="220" height="110" fill="none" stroke="#2c2420" stroke-width="5"/><path d="M-110 40 L-20 150 L-110 150Z" fill="#fff" opacity=".07"/><rect x="-120" y="146" width="240" height="8" fill="#9c9387"/><rect x="95" y="-60" width="14" height="40" fill="#a9a39a"/></g>`}
function room(id,h){return `<rect width="400" height="260" fill="hsl(${h},25%,92%)"/><rect y="190" width="400" height="70" fill="#c9a57e"/><rect x="200" y="30" width="170" height="160" fill="#7da36b"/><ellipse cx="260" cy="110" rx="60" ry="70" fill="#5e8c55"/><ellipse cx="345" cy="80" rx="40" ry="60" fill="#8db47a"/><path d="M200 30h170v160H200z" fill="none" stroke="#2c2420" stroke-width="6"/><path d="M285 30v160" stroke="#2c2420" stroke-width="4"/><rect x="40" y="70" width="44" height="58" fill="#e8d9b8" stroke="#8b6a4a" stroke-width="4"/><circle cx="62" cy="99" r="12" fill="hsl(${h},55%,55%)"/>
<rect x="30" y="160" width="160" height="40" rx="10" fill="#e6ded2"/><rect x="30" y="140" width="160" height="30" rx="10" fill="#efe8dc"/><rect x="40" y="150" width="34" height="26" rx="6" fill="hsl(${h},50%,58%)"/><rect x="34" y="200" width="6" height="12" fill="#6b5340"/><rect x="180" y="200" width="6" height="12" fill="#6b5340"/><ellipse cx="200" cy="228" rx="60" ry="10" fill="#a47a52"/><rect x="194" y="228" width="12" height="18" fill="#7a5a3c"/><path d="M150 60v80" stroke="#444" stroke-width="2"/><path d="M135 60h30l-6-18h-18z" fill="#d4b26a"/>`}
function art(kind,h,v=0){const id='a'+(++gid);const sky=`<defs><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="hsl(${h},48%,84%)"/><stop offset="1" stop-color="#fbf6ec"/></linearGradient></defs><rect width="400" height="260" fill="url(#${id}s)"/>`;
 if(v===1)return `<svg viewBox="0 0 400 260" role="img" aria-label="Interior">${room(id,h)}</svg>`;
 const vb=v===2?'90 40 220 143':'0 0 400 260';const g='<rect y="214" width="400" height="46" fill="hsl(95,18%,68%)"/>';let b='';
 if(kind==='house')b=house(200,62,.7,`hsl(${28+h%20},48%,${52+h%10}%)`)+tree(40,200,.9,'#5d7a4e')+tree(360,205,1,'#4f6b45');
 else if(kind==='flat'){for(let t=0;t<3;t++){const x=60+t*100,hh=120+((t*37+h)%60),y=214-hh;b+=`<rect x="${x}" y="${y}" width="84" height="${hh}" fill="hsl(${h+t*12},18%,${70-t*8}%)"/><rect x="${x}" y="${y}" width="84" height="8" fill="#2c2420" opacity=".7"/>`;for(let r=y+18;r<206;r+=22)for(let c=0;c<3;c++)b+=`<rect x="${x+10+c*25}" y="${r}" width="16" height="13" fill="#2f3d48"/><rect x="${x+8+c*25}" y="${r+13}" width="20" height="3" fill="#ddd"/>`}b+=tree(30,214,.7,'#5d7a4e')}
 else if(kind==='office'){b=`<rect x="120" y="30" width="160" height="184" fill="hsl(${h},30%,55%)"/>`;for(let r=38;r<206;r+=16)b+=`<rect x="126" y="${r}" width="148" height="11" fill="hsl(${h},40%,78%)" opacity=".75"/>`;b+=`<path d="M120 30l60 184h-60z" fill="#fff" opacity=".12"/><rect x="280" y="110" width="80" height="104" fill="hsl(${h},15%,72%)"/>`;for(let r=120;r<206;r+=18)b+=`<rect x="288" y="${r}" width="64" height="10" fill="#33424d"/>`;b+=tree(70,214,.9,'#4f6b45')}
 else if(kind==='retail'){b=`<rect x="70" y="80" width="260" height="134" fill="hsl(${h},35%,80%)"/><rect x="70" y="72" width="260" height="14" fill="#2c2420"/><g>${[0,1,2,3,4,5,6,7,8,9].map(i=>`<path d="M${70+i*26} 100h26l-4 26h-18z" fill="${i%2?'#fff':`hsl(${h},55%,45%)`}"/>`).join('')}</g><rect x="88" y="132" width="110" height="82" fill="#2f3d48"/><rect x="214" y="132" width="98" height="82" fill="#2f3d48"/><path d="M88 132l60 82h-60z" fill="#fff" opacity=".1"/><rect x="246" y="150" width="34" height="64" fill="#a47a52"/>`+tree(30,214,.7,'#5d7a4e')+tree(370,214,.8,'#4f6b45')}
 else if(kind==='warehouse'){b=`<path d="M30 214V110Q200 50 370 110V214z" fill="hsl(${h},12%,72%)"/><path d="M30 110Q200 50 370 110" fill="none" stroke="#2c2420" stroke-width="6"/>${[0,1,2].map(i=>`<rect x="${70+i*95}" y="140" width="70" height="74" fill="#55606a"/>${[0,1,2,3,4,5].map(j=>`<rect x="${70+i*95}" y="${144+j*12}" width="70" height="2" fill="#7c8791"/>`).join('')}`).join('')}<rect x="30" y="206" width="340" height="8" fill="#8a8a80"/>`}
 else {b=`<path d="M0 150Q100 120 200 140T400 130V214H0z" fill="hsl(${100+h%20},22%,62%)"/><path d="M0 214L400 214 400 170Q200 150 0 175z" fill="hsl(${90+h%20},30%,56%)"/>${[0,1,2,3,4,5,6,7,8,9,10].map(i=>`<rect x="${20+i*36}" y="${186-i*1.2}" width="4" height="24" fill="#6b5340"/>`).join('')}<path d="M20 192L380 180" stroke="#6b5340" stroke-width="2"/><g fill="${'#c03a38'}"><rect x="120" y="196" width="3" height="16"/><path d="M123 196l12 4-12 4z"/><rect x="280" y="194" width="3" height="16"/><path d="M283 194l12 4-12 4z"/></g>`+tree(330,150,.6,'#4f6b45')+tree(60,155,.5,'#5d7a4e')}
 return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${kind}">${sky}${g}${b}</svg>`}
//hero now a photo
0&&(`<rect y="380" width="1440" height="50" fill="hsl(95,16%,72%)"/>`+tree(40,380,2.2,'#5d7a4e')+tree(1390,385,2.4,'#4f6b45')+tree(500,382,1.4,'#3f5a3a')+tree(950,382,1.5,'#3f5a3a')+house(260,230,1,'#b98250')+house(720,215,1.12,'#c48c58')+house(1180,230,1,'#b4794a'));
$('#aboutpic2').innerHTML='<img src="img/about-page.jpg" alt="Low-rise apartment building with balconies and garden courtyard" loading="lazy">';
const PHOTOS=new Map([
 ['UK-10421','UK-10421.jpg'],['UK-10433','UK-10433.jpg'],['UK-10458','UK-10458.jpg'],
 ['UK-10462','UK-10462.jpg'],['UK-10477','UK-10477.jpg'],['UK-10480','UK-10480.jpg'],['UK-10491','about-page.jpg']
]);
const GALLERY_PHOTOS=new Map([['UK-10433',{
 1:{src:'UK-10433-living-room.png',alt:'Living room'},
 2:{src:'UK-10433-bedroom.png',alt:'Bedroom'},
 3:{src:'UK-10433-kitchen.png',alt:'Kitchen and dining area'},
 4:{src:'UK-10433-balcony.png',alt:'Balcony overlooking the canal'}
}]]);
const photo=(l,v=0)=>{
 const image=GALLERY_PHOTOS.get(l.ref)?.[v];
 if(image)return `<img src="img/${image.src}" alt="${image.alt} for ${esc(l.title)}" loading="lazy">`;
 return v===0&&PHOTOS.has(l.ref)?`<img src="img/${PHOTOS.get(l.ref)}" alt="${esc(l.title)}" loading="lazy">`:art(l.kind,l.hue,v)
};
const cityPhoto=l=>PHOTOS.has(l.ref)?photo(l):`<img src="img/${l.kind==='plot'?'about-home.jpg':'about-page.jpg'}" alt="" loading="lazy">`;

/* ---------- data (sample) ---------- */
const COS=[{id:'c1',name:'Harbourline Estates',cty:'UK',city:'Bristol',since:2011,verified:true,about:'Sales and lettings across Bristol and the South West.'},
{id:'c2',name:'Northgate Lettings',cty:'UK',city:'Manchester',since:2016,verified:true,about:'Residential and commercial lettings in Greater Manchester and Yorkshire.'}];
const A=['Garden','Parking','EV charging','Balcony','Lift','Gym','Security','Power backup','Swimming pool','Concierge','Air conditioning','Pet friendly'];
const L=[
['UK-10421','UK','Buy','Residential','House','Timber-clad family house','Bristol','Stoke Bishop','BS9 1AB','',685000,null,4,3,2150,'Unfurnished',true,['Garden','Parking','EV charging'],'Good','Available now','c1','house',30,1,[42,74],'2026-11-18'],
['UK-10433','UK','Rent','Residential','Flat/Apartment','Canal-side two-bed flat','Manchester','Ancoats','M4 6DE','',1650,'pcm',2,2,820,'Furnished',true,['Balcony','Lift','Gym','Concierge'],'Excellent','Available now','c2','flat',200,0,[52,52],'2026-11-20'],
['UK-10458','UK','Buy','Residential','Flat/Apartment','Mansion block apartment','London','Maida Vale','W9 1QD','',895000,null,2,1,940,'Unfurnished',false,['Lift','Concierge'],'Good','Available now',null,'flat',20,0,[66,80],'2026-11-10'],
['UK-10462','UK','Rent','Commercial','Office','Studio office with skylights','Leeds','City Centre','LS1 4AP','',2400,'pcm',0,2,1600,'Furnished',true,['Air conditioning','Parking'],'Excellent','From 1 Jan 2027','c2','office',210,1,[56,46],'2026-11-15'],
['UK-10477','UK','Buy','Commercial','Retail','Corner retail unit','Edinburgh','Old Town','EH1 1QS','',320000,null,0,1,1100,'Unfurnished',false,['Security'],'Needs updating','Available now',null,'retail',10,0,[48,18],'2026-11-02'],
['UK-10480','UK','Rent','Residential','House','Cottage with walled garden','York','Bishophill','YO1 6JE','',1250,'pcm',3,1,1050,'Part furnished',true,['Garden','Pet friendly','Parking'],'Good','Available now',null,'house',40,0,[60,40],'2026-11-21'],
['UK-10491','UK','Buy','Commercial','Warehouse','Logistics warehouse, three dock doors','Northampton','Brackmills','NN4 7PB','',1950000,null,0,2,12500,'Unfurnished',true,['Parking','Security'],'Good','Available now','c1','warehouse',220,0,[62,64],'2026-10-28'],
['UK-10502','UK','Buy','Residential','Plot/Land','Self-build plot with planning permission','Cotswolds','Bourton-on-the-Water','GL54 2AN','',240000,null,0,0,17400,'—',false,[],'—','Available now',null,'plot',10,0,[50,72],'2026-11-12'],
['UK-10510','UK','Buy','Residential','House','Suspended listing (never public)','Bath','Centre','BA1 1AA','',500000,null,3,2,1200,'Unfurnished',false,[],'Good','Available now',null,'house',10,0,[50,70],'2026-11-01','Suspended','Unpublished']
].map(r=>({ref:r[0],cty:r[1],purpose:r[2],seg:r[3],cat:r[4],title:r[5],city:r[6],area:r[7],code:r[8],price:r[10],freq:r[11],beds:r[12],baths:r[13],size:r[14],furn:r[15],parking:r[16],amen:r[17],cond:r[18],avail:r[19],co:r[20],kind:r[21],hue:r[22],featured:!!r[23],xy:r[24],added:r[25],ver:r[26]||'Approved',pub:r[27]||'Published',
 desc:`${r[5]} in ${r[7]}, ${r[6]}. ${r[4]==='Plot/Land'?'A level, well-drained site with road access and utilities close by.':r[3]==='Commercial'?'Well-connected premises suited to a growing business, with flexible layouts and good transport links.':'Light-filled rooms, a practical layout and easy access to schools, shops and transport.'} Viewings by appointment.`}));
const isPublic=l=>l.ver==='Approved'&&l.pub==='Published';
const CATS={Residential:['House','Flat/Apartment','Plot/Land'],Commercial:['Office','Retail','Warehouse','Plot/Land']};
const ALLCATS=['House','Flat/Apartment','Plot/Land','Office','Retail','Warehouse'];
const CAT_TILES={
 House:{image:'UK-10421.jpg',description:'Family homes and more'},
 'Flat/Apartment':{image:'UK-10458.jpg',description:'Apartments and city living'},
 'Plot/Land':{image:'about-home.jpg',description:'Space to build or invest'},
 Office:{image:'UK-10462.jpg',description:'Workspaces for business'},
 Retail:{image:'UK-10477.jpg',description:'Shops and storefronts'},
 Warehouse:{image:'about-page.jpg',description:'Storage and industrial spaces'}
};

/* ---------- state ---------- */
const S={cty:'UK',user:store.get('user',null),favs:new Set(store.get('favs',[])),cmp:new Set(),own:store.get('own',null),enq:store.get('enq',[]),notes:store.get('notes',null),pays:store.get('pays',[]),draft:store.get('draft',null),
 f:{purpose:'Buy',seg:'',cat:'',q:'',code:'',min:'',max:'',freq:'',beds:'',baths:'',size:'',furn:'',parking:false,amen:[],cond:'',avail:''},sort:'rel',mode:'list',page:1,consent:store.get('consent',[])};
S.favs=new Set([...S.favs].filter(ref=>L.some(l=>l.ref===ref)));
const save=()=>{store.set('cty',S.cty);store.set('user',S.user);store.set('favs',[...S.favs]);store.set('own',S.own);store.set('enq',S.enq);store.set('notes',S.notes);store.set('pays',S.pays);store.set('consent',S.consent)};
if(!S.notes)S.notes=[];
const cur=()=>'GBP';
const money=n=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n);
const per=l=>l.freq==='pcm'?'per month':l.freq==='pw'?'per week':l.freq==='month'?'per month':'';
const addr=l=>`${l.area}, ${l.city}, ${l.code}, United Kingdom`;
const ctyName=()=>'the UK';
const coName=id=>id?(COS.find(c=>c.id===id)||{}).name:'Private owner';
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2800)}
function modal(html){$('#mbox').innerHTML=html;$('#modal').classList.add('open');const f=$('#mbox').querySelector('input,select,textarea,button');f&&f.focus()}
const closeModal=()=>$('#modal').classList.remove('open');
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('[data-close]'))closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
function notify(t,b){S.notes.unshift({t,b,at:now(),read:false});save();chrome()}
const X='<button class="ico" data-close aria-label="Close" type="button"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2"/></svg></button>';

/* ---------- cards ---------- */
const heart='<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
function specs(l){const s=[];if(l.beds)s.push(`${l.beds} bed`);if(l.baths)s.push(`${l.baths} bath`);s.push(`${l.size.toLocaleString('en-GB')} sq ft`);s.push(l.cat);if(l.furn!=='—')s.push(l.furn);return s.map(x=>`<span>${esc(x)}</span>`).join('')}
function card(l){return `<article class="card"><div class="img" data-open="${l.ref}">${photo(l)}<span class="tag">${l.purpose==='Rent'?'To rent':'For sale'} · ${esc(l.seg)}</span>${l.featured?'<span class="tag r">Featured</span>':''}</div>
<button class="fav ${S.favs.has(l.ref)?'on':''}" data-fav="${l.ref}" aria-label="Save ${esc(l.title)}" aria-pressed="${S.favs.has(l.ref)}">${heart}</button>
<div class="t"><div><h3 data-open="${l.ref}">${esc(l.title)}</h3><p class="loc">${esc(l.area)}, ${esc(l.city)} · ${esc(l.code)}</p></div><div class="price"><b>${money(l.price,l.cty)}</b>${l.freq?`<small>${per(l)}</small>`:''}</div></div>
<div class="specs">${specs(l)}</div><label class="cmp"><input type="checkbox" data-cmp="${l.ref}" ${S.cmp.has(l.ref)?'checked':''}> Compare</label></article>`}
function homeCard(l){
 const summary=l.desc.replace(`${l.title} in ${l.area}, ${l.city}. `,'').replace(/ Viewings by appointment\.$/,'');
 return `<article class="card home-card"><div class="img" data-open="${l.ref}">${photo(l)}<span class="tag">${l.purpose==='Rent'?'For rent':'For sale'}</span>${l.featured?'<span class="tag r">Featured</span>':''}</div>
 <button class="home-card-save ${S.favs.has(l.ref)?'on':''}" type="button" data-fav="${l.ref}" aria-label="Save ${esc(l.title)}" aria-pressed="${S.favs.has(l.ref)}">${heart}</button>
 <div class="home-card-body"><div class="home-card-heading"><div class="home-card-name"><h3 class="home-card-title" data-open="${l.ref}">${esc(l.title)}</h3><p class="home-card-location">${esc(l.area)}, ${esc(l.city)} · ${esc(l.code)}</p></div><span class="home-card-price"><strong>${money(l.price,l.cty)}</strong>${l.freq?`<small>${per(l)}</small>`:''}</span></div>
 <p class="home-card-summary">${esc(summary)}</p>
 <div class="home-card-details">${l.beds?`<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18V8m0 7h18v3M5 15v-4h6a3 3 0 0 1 3 3v1m0 0v-4h4a3 3 0 0 1 3 3v1"/></svg>${l.beds} beds</span>`:''}${l.baths?`<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zm2 0V6a2 2 0 0 1 4 0v1"/></svg>${l.baths} baths</span>`:''}<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v10H4zM8 4v3m8-3v3M8 17v3m8-3v3"/></svg>${l.size.toLocaleString('en-GB')} sq ft</span></div>
 <button class="home-card-cta" type="button" data-open="${l.ref}">View property</button></div></article>`}
document.addEventListener('click',e=>{const o=e.target.closest('[data-open]');if(o){location.hash='property-'+o.dataset.open.toLowerCase();return}
 const f=e.target.closest('[data-fav]');if(f){const r=f.dataset.fav;if(S.favs.has(r)){S.favs.delete(r);toast('Removed from favourites')}else{S.favs.add(r);toast(S.user?'Saved to favourites':'Saved for this visit — sign in to keep favourites')}save();$$(`[data-fav="${r}"]`).forEach(b=>{b.classList.toggle('on',S.favs.has(r));b.setAttribute('aria-pressed',S.favs.has(r))});chrome();if(location.hash==='#favourites')renderFavs()}});
document.addEventListener('change',e=>{const c=e.target.closest('[data-cmp]');if(c){const r=c.dataset.cmp;if(c.checked){if(S.cmp.size>=4){c.checked=false;toast('Compare up to 4 properties');return}S.cmp.add(r)}else S.cmp.delete(r);chrome()}});

/* ---------- header ---------- */
function chrome(){const fn=S.favs.size,nn=S.notes.filter(n=>!n.read).length;$('#favn').hidden=!fn;$('#favn').textContent=fn;$('#notn').hidden=!nn;$('#notn').textContent=nn;
 const a=$('#authbtn');if(a){if(S.user){a.textContent=S.user.name.split(' ')[0];a.href='#profile'}else{a.textContent='Sign in / Register';a.href='#account'}}
 $('#cmpbar').classList.toggle('on',S.cmp.size>0);$('#cmpn').textContent=`${S.cmp.size} selected to compare`}
$('#burger').addEventListener('click',()=>{const o=$('#links').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)});

/* ---------- home ---------- */
let hp='Buy',cityEntries=[],cityIndex=0;
function priceOpts(purpose){const v=purpose==='Rent'?[750,1000,1500,2000,3000,5000]:[200000,300000,500000,750000,1000000,2000000];return '<option value="">No max price</option>'+v.map(x=>`<option value="${x}">Up to ${money(x)}</option>`).join('')}
function renderHome(){$('#h-max').innerHTML=priceOpts(hp==='Rent'?'Rent':'Buy');
 $('#h-cat').innerHTML='<option value="">Any type</option>'+(hp==='Commercial'?CATS.Commercial:CATS.Residential).map(c=>`<option>${c}</option>`).join('');
 const f=L.filter(l=>isPublic(l)&&l.cty===S.cty).sort((a,b)=>b.featured-a.featured||b.added.localeCompare(a.added)).slice(0,4);$('#featured').innerHTML=f.map(homeCard).join('');$('#fcty').textContent=ctyName(S.cty);
 $('#cats').innerHTML=ALLCATS.map(c=>{const tile=CAT_TILES[c];return `<button class="cat-card" type="button" data-cat="${esc(c)}" aria-label="Browse ${esc(c)} properties"><span class="cat-card-image"><img src="img/${tile.image}" alt="" loading="lazy"><span class="cat-card-action" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></span><span class="cat-card-content"><span class="cat-card-copy"><strong>${esc(c)}</strong><small>${esc(tile.description)}</small></span></span></button>`}).join('');
 const cities=new Map();L.filter(l=>isPublic(l)&&l.cty===S.cty).forEach(l=>{const city=cities.get(l.city);if(city)city.count++;else cities.set(l.city,{listing:l,count:1})});
 cityEntries=[...cities].sort((a,b)=>b[1].count-a[1].count||a[0].localeCompare(b[0]));cityIndex=cityEntries.length?cityIndex%cityEntries.length:0;renderCityShowcase();
}
function renderCityShowcase(animate=false){if(!cityEntries.length)return;const showcase=$('#city-showcase');showcase.classList.remove('is-changing');const [city,data]=cityEntries[cityIndex],total=cityEntries.length;
 $('#city-showcase-backdrop').innerHTML=cityPhoto(data.listing);$('#city-feature-title').textContent=city;
 $('#city-feature-description').textContent=`Explore ${data.count} live ${data.count===1?'listing':'listings'} in ${city}.`;
 $('#city-explore').dataset.city=city;$('#city-showcase-count').textContent=`${String(cityIndex+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
 const previewCount=Math.min(3,Math.max(1,total-1));
 $('#city-listings').innerHTML=Array.from({length:previewCount},(_,i)=>{const entryIndex=total===1?cityIndex:(cityIndex+i+1)%total,[name,entry]=cityEntries[entryIndex];
 return `<button class="city-showcase-card" type="button" data-city="${esc(name)}" aria-label="Browse properties in ${esc(name)}"><span class="city-showcase-card-heading"><strong>${esc(name)}</strong><small>${entry.count} ${entry.count===1?'available listing':'available listings'}</small></span><span class="city-showcase-card-image">${cityPhoto(entry.listing)}</span><span class="city-showcase-card-badge" aria-hidden="true">↗</span></button>`}).join('');
 if(animate){void showcase.offsetWidth;showcase.classList.add('is-changing')}
}
$('#hsearch .tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;hp=b.dataset.p;$$('#hsearch .tabs button').forEach(x=>x.classList.toggle('on',x===b));renderHome()});
$('#hsearch').addEventListener('submit',e=>{e.preventDefault();resetF();S.f.purpose=hp==='Rent'?'Rent':hp==='Commercial'?'':'Buy';S.f.seg=hp==='Commercial'?'Commercial':hp==='Buy'||hp==='Rent'?'':'';if(hp!=='Commercial')S.f.seg='Residential';S.f.q=$('#h-q').value.trim();S.f.cat=$('#h-cat').value;S.f.max=$('#h-max').value;location.hash='search'});
$('#cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;resetF();S.f.purpose='';S.f.cat=b.dataset.cat;location.hash='search'});
$('#city-showcase').addEventListener('click',e=>{const step=e.target.closest('[data-city-step]');if(step&&cityEntries.length){cityIndex=(cityIndex+Number(step.dataset.cityStep)+cityEntries.length)%cityEntries.length;renderCityShowcase(true);return}const b=e.target.closest('[data-city]');if(!b)return;resetF();S.f.q=b.dataset.city;location.hash='search'});
function resetF(){S.f={purpose:'',seg:'',cat:'',q:'',code:'',min:'',max:'',freq:'',beds:'',baths:'',size:'',furn:'',parking:false,amen:[],cond:'',avail:''};S.page=1}

/* ---------- search ---------- */
function filterForm(){const f=S.f,sel=(n,opts,v)=>`<select name="${n}">${opts.map(o=>{const[val,t]=Array.isArray(o)?o:[o,o];return `<option value="${val}" ${String(v)===String(val)?'selected':''}>${t}</option>`}).join('')}</select>`;
 const group=(title,content,open=false)=>`<details class="filter-group"${open?' open':''}><summary>${title}</summary><div class="filter-group-content">${content}</div></details>`;
 const radios=(name,opts,value)=>`<div class="filter-options" role="group" aria-label="${name}">${opts.map(([val,label])=>`<label class="filter-option"><input type="radio" name="${name}" value="${esc(val)}" ${String(value)===String(val)?'checked':''}><span>${esc(label)}</span></label>`).join('')}</div>`;
 $('#filters').innerHTML=`<div class="filter-head"><h4>Filters</h4><button class="btn g s" type="button" id="clear">Clear all</button></div>
 <label class="filter-search"><span class="sr">Search by keyword or location</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input type="search" name="q" value="${esc(f.q)}" placeholder="Search" aria-label="Search by keyword or location"></label>
 ${group('Looking to',radios('purpose',[['','Buy or rent'],['Buy','Buy'],['Rent','Rent']],f.purpose),true)}
 ${group('Sector',radios('seg',[['','Residential & commercial'],['Residential','Residential'],['Commercial','Commercial']],f.seg))}
 ${group('Property type',radios('cat',[['','Any category'],...ALLCATS.map(c=>[c,c])],f.cat),true)}
 ${group('Location',`<label class="f">Postcode<input name="code" value="${esc(f.code)}" placeholder="e.g. BS9 1AB"></label>`)}
 ${group('Price',`<div><span class="filter-label">Price (GBP)</span><div class="row"><input name="min" inputmode="numeric" placeholder="Min" value="${esc(f.min)}" aria-label="Minimum price"><input name="max" inputmode="numeric" placeholder="Max" value="${esc(f.max)}" aria-label="Maximum price"></div></div><label class="f">Rental frequency${sel('freq',[['','Any'],['month','Monthly'],['pw','Weekly']],f.freq)}</label>`)}
 ${group('Property details',`<div class="row"><label class="f">Bedrooms${sel('beds',[['','Any'],['1','1+'],['2','2+'],['3','3+'],['4','4+']],f.beds)}</label><label class="f">Bathrooms${sel('baths',[['','Any'],['1','1+'],['2','2+'],['3','3+']],f.baths)}</label></div><label class="f">Min floor / land area (sq ft)<input name="size" inputmode="numeric" value="${esc(f.size)}"></label>`)}
 ${group('More filters',`<label class="f">Furnishing${sel('furn',[['','Any'],'Furnished','Semi-furnished','Part furnished','Unfurnished'],f.furn)}</label><label class="f">Condition${sel('cond',[['','Any'],'Excellent','Good','Needs updating'],f.cond)}</label><label class="f">Availability${sel('avail',[['','Any'],['now','Available now / ready to move']],f.avail)}</label><label class="ck"><input type="checkbox" name="parking" ${f.parking?'checked':''}> Parking</label><details class="filter-amenities"><summary>Amenities</summary><div class="amen">${A.map(a=>`<label class="ck"><input type="checkbox" name="amen" value="${a}" ${f.amen.includes(a)?'checked':''}> ${a}</label>`).join('')}</div></details>`)}
 `;
 $('#clear').onclick=()=>{resetF();renderSearch()}}
$('#filters').addEventListener('input',e=>{const t=e.target,n=t.name;if(!n)return;if(n==='amen')S.f.amen=$$('#filters [name=amen]:checked').map(x=>x.value);else if(n==='parking')S.f.parking=t.checked;else S.f[n]=t.value;S.page=1;if(t.tagName==='SELECT'||t.type==='checkbox'||t.type==='radio')results();else{clearTimeout(S.t);S.t=setTimeout(results,250)}});
$('#ftog').onclick=()=>$('#filters').classList.toggle('closed');
$('#search-categories').addEventListener('click',e=>{const b=e.target.closest('[data-search-cat]');if(!b)return;S.f.cat=b.dataset.searchCat;S.page=1;filterForm();results()});
$('#sort').onchange=e=>{S.sort=e.target.value;results()};
$$('.seg button').forEach(b=>b.onclick=()=>{S.mode=b.dataset.m;$$('.seg button').forEach(x=>x.classList.toggle('on',x===b));results()});
function query(){const f=S.f,q=f.q.toLowerCase();let r=L.filter(l=>isPublic(l)&&l.cty===S.cty
 &&(!f.purpose||l.purpose===f.purpose)&&(!f.seg||l.seg===f.seg)&&(!f.cat||l.cat===f.cat)
 &&(!q||[l.title,l.city,l.area,l.desc,l.code,l.cat,...l.amen].join(' ').toLowerCase().includes(q))
 &&(!f.code||l.code.toLowerCase().replace(/\s/g,'').startsWith(f.code.toLowerCase().replace(/\s/g,'')))
 &&(!f.min||l.price>=+f.min)&&(!f.max||l.price<=+f.max)&&(!f.freq||(f.freq==='month'?['pcm','month'].includes(l.freq):l.freq===f.freq))
 &&(!f.beds||l.beds>=+f.beds)&&(!f.baths||l.baths>=+f.baths)&&(!f.size||l.size>=+f.size)&&(!f.furn||l.furn===f.furn)&&(!f.cond||l.cond===f.cond)
 &&(!f.avail||/now|ready/i.test(l.avail))&&(!f.parking||l.parking)&&f.amen.every(a=>l.amen.includes(a)));
 const s=S.sort;r.sort((a,b)=>s==='lo'?a.price-b.price:s==='hi'?b.price-a.price:s==='new'?b.added.localeCompare(a.added):(b.featured-a.featured)||b.added.localeCompare(a.added));return r}
function results(){const r=query(),f=S.f,per=6,pages=Math.max(1,Math.ceil(r.length/per));S.page=Math.min(S.page,pages);
 $$('#search-categories [data-search-cat]').forEach(b=>b.classList.toggle('is-active',b.dataset.searchCat===f.cat));
 $('#count').textContent=`${r.length} ${r.length===1?'property':'properties'}`;
 const act=[f.purpose,f.seg,f.cat,f.q&&`“${f.q}”`,f.code,f.min&&`From ${money(f.min,S.cty)}`,f.max&&`Up to ${money(f.max,S.cty)}`,f.beds&&`${f.beds}+ bed`,f.baths&&`${f.baths}+ bath`,f.size&&`${f.size}+ sq ft`,f.furn,f.cond,f.avail&&'Available now',f.parking&&'Parking',...f.amen].filter(Boolean);
 $('#active').innerHTML=act.map(a=>`<span>${esc(a)}</span>`).join('');
 if(!r.length){$('#results').innerHTML=`<div class="empty"><h3 style="color:var(--ink)">No properties match yet</h3><p style="margin:8px 0 18px">Try widening your price range or removing a filter.</p><button class="btn" type="button" id="clr2">Clear filters</button></div>`;$('#clr2').onclick=()=>{resetF();renderSearch()};$('#pager').innerHTML='';return}
 if(S.mode==='map'){$('#pager').innerHTML='';const base=`<svg class="base" viewBox="0 0 100 105" preserveAspectRatio="none">${[...Array(9)].map((_,i)=>`<path d="M0 ${i*12+6}Q50 ${i*12+(i%2?2:10)} 100 ${i*12+6}" stroke="currentColor" opacity=".08" fill="none" stroke-width=".6"/><path d="M${i*12+6} 0Q${i*12+(i%2?2:10)} 50 ${i*12+6} 105" stroke="currentColor" opacity=".08" fill="none" stroke-width=".6"/>`).join('')}<path d="M10 90Q40 70 60 80T95 60" stroke="#8fb0c9" stroke-width="3" fill="none" opacity=".6"/></svg>`;
  $('#results').innerHTML=`<div class="map">${base}<span class="lbl">United Kingdom · ${r.length} pins</span>${r.map(l=>`<button class="pin" style="left:${l.xy[1]}%;top:${l.xy[0]+6}%" data-open="${l.ref}" title="${esc(l.title)}">${money(l.price)}${l.freq?' /mo':''}</button>`).join('')}</div><p class="note" style="margin-top:10px">Map preview — pins are placed by city. A live map/geocoding provider plugs in here.</p>`;return}
 $('#results').innerHTML=`<div class="cards three search-results">${r.slice((S.page-1)*per,S.page*per).map(card).join('')}</div>`;
 $('#pager').innerHTML=pages>1?[...Array(pages)].map((_,i)=>`<button type="button" class="${i+1===S.page?'on':''}" data-pg="${i+1}" aria-label="Page ${i+1}">${i+1}</button>`).join(''):'';
 $$('#pager button').forEach(b=>b.onclick=()=>{S.page=+b.dataset.pg;results();window.scrollTo({top:0})})}
function renderSearch(){filterForm();$('#sort').value=S.sort;results()}

/* ---------- property ---------- */
const propertyIconPaths={
 Bedrooms:'M3 18V8m0 7h18v3M5 15v-4h6a3 3 0 0 1 3 3v1m0 0v-4h4a3 3 0 0 1 3 3v1',
 Bathrooms:'M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zm2 0V6a2 2 0 0 1 4 0v1',
 'Floor area':'M4 7h16v10H4zM8 4v3m8-3v3M8 17v3m8-3v3',
 Parking:'M5 17h14l1-5-2-5H6l-2 5 1 5zm0 0v2m14-2v2M4 12h16M7 15h.01M17 15h.01',
 Condition:'M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
 Balcony:'M4 20h16M6 20V4h12v16M6 14h12M9 9h.01M15 9h.01M9 17v3m6-3v3',
 Lift:'M6 3h12v18H6zM9 8l2-2 2 2m-2-2v5m4 5 2 2 2-2m-2 2v-5',
 Gym:'M6 6v12m12-12v12M3 9v6m18-6v6M6 12h12m-15-3h3m12 0h3m-18 6h3m12 0h3',
 Concierge:'M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0',
 Garden:'M12 21v-9m0 4c-7 0-9-7-4-9 2-4 8-2 8 2 5 1 4 7-4 7z',
 'EV charging':'M8 3h8v8H8zM10 11v3a2 2 0 0 0 4 0v-3m-2-7-2 3h2l-1 2',
 Security:'M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7zM8.5 12l2.2 2.2 4.8-5',
 'Power backup':'M7 5h10v15H7zM10 2h4v3m-2 3v4m-2-2 2 2 2-2',
 'Swimming pool':'M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0m-18 4c2-2 4-2 6 0s4 2 6 0 4-2 6 0M7 11V5a2 2 0 0 1 4 0',
 'Air conditioning':'M12 3v18m-7-14 14 10m0-10L5 17m3-8-3-3m3 13-3 3m11-13 3-3m-3 13 3 3',
 'Pet friendly':'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
 amenity:'M12 3l2.2 5.2L20 10l-5.8 1.8L12 17l-2.2-5.2L4 10l5.8-1.8z'
};
const propertyIcon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${Object.hasOwn(propertyIconPaths,name)?propertyIconPaths[name]:propertyIconPaths.amenity}"/></svg>`;
function renderProperty(ref){const l=L.find(x=>x.ref.toLowerCase()===ref)||(S.own||[]).find(x=>x.ref.toLowerCase()===ref&&false);
 if(!l||!isPublic(l)){$('#prop').innerHTML=`<div class="empty"><h2 style="color:var(--ink)">This listing isn't available</h2><p style="margin:10px 0 20px">It may have been sold, let, withdrawn or is not published.</p><a class="btn" href="#search">Back to search</a></div>`;return}
 const co=COS.find(c=>c.id===l.co);
 const others=L.filter(x=>x.ref!==l.ref&&isPublic(x));
 const similar=[...others.filter(x=>x.purpose===l.purpose&&x.seg===l.seg),...others.filter(x=>x.purpose!==l.purpose||x.seg!==l.seg)].slice(0,3);
 const facts=[['Bedrooms',l.beds||'—'],['Bathrooms',l.baths||'—'],['Floor area',`${l.size.toLocaleString('en-GB')} sq ft`],['Parking',l.parking?'Available':'No'],['Condition',l.cond]];
 const listedPrice=`${money(l.price)}${l.freq?` ${per(l)}`:''}`;
 const advertiser=coName(l.co)||'Private owner';
 $('#prop').innerHTML=`<div class="property-layout">
 <main class="property-main">
  <div class="property-toolbar"><a href="#search">← Back to properties</a><div class="property-actions"><button class="btn w s property-save" type="button" data-fav="${l.ref}" aria-label="Save ${esc(l.title)}" aria-pressed="${S.favs.has(l.ref)}"><span aria-hidden="true">${S.favs.has(l.ref)?'♥':'♡'}</span> ${S.favs.has(l.ref)?'Saved':'Save'}</button></div></div>
  <div class="property-gallery" id="gal" aria-label="Property photos">${[0,1,2,3,4].map((v,i)=>`<div class="property-photo property-photo-${i+1}">${photo(l,v)}</div>`).join('')}<span class="property-gallery-count">5 photos</span></div>
  <header class="property-heading"><div><span class="chip">${l.purpose==='Rent'?'To rent':'For sale'} · ${esc(l.seg)}</span><h1>${esc(l.title)}</h1><p>${esc(addr(l))}</p></div><span class="badge ok">Verified listing</span></header>
  <div class="property-facts">${facts.map(([label,value])=>`<div><small>${propertyIcon(label)}${label}</small><b>${esc(value)}</b></div>`).join('')}</div>
  <section class="property-section"><h2>About this property</h2><p>${esc(l.desc)}</p></section>
  ${l.amen.length?`<section class="property-section"><h2>Building amenities</h2><div class="property-amenities">${l.amen.map(a=>`<span>${propertyIcon(a)}${esc(a)}</span>`).join('')}</div></section>`:''}
  <section class="property-section"><h2>Location</h2><div class="map property-map"><svg class="base" viewBox="0 0 100 44" preserveAspectRatio="none"><path d="M0 22H100M50 0V44M0 8Q50 14 100 6M20 0Q24 22 18 44" stroke="currentColor" opacity=".1" fill="none"/></svg><span class="pin" style="left:50%;top:52%">${esc(l.area)}</span></div><p class="property-address">${esc(addr(l))}</p></section>
 </main>
 <aside class="property-sidebar">
  <div class="property-price-card"><span class="property-eyebrow">${l.purpose==='Rent'?'Rental price':'Asking price'}</span><div class="property-price">${money(l.price)}${l.freq?`<small>${per(l)}</small>`:''}</div><p class="property-reference">Reference ${esc(l.ref)}</p>
   <div class="property-breakdown"><h2>Price breakdown</h2><div><span>${l.purpose==='Rent'?'Listed rent':'Asking price'}</span><b>${esc(listedPrice)}</b></div><div><span>Availability</span><b>${esc(l.avail)}</b></div><div><span>Property type</span><b>${esc(l.cat)}</b></div></div>
   <div class="property-advertiser"><span class="note">Advertised by</span><div class="co"><div class="mk advertiser-mark">${co?`<img src="img/${PHOTOS.get(l.ref)||'about-page.jpg'}" alt="">`:esc(advertiser[0])}</div><div><b>${esc(advertiser)}</b>${co?`<a href="#company-${co.id}">View company profile</a>${co.verified?'<span class="badge ok">Verified company</span>':''}`:'<span class="note">Individual owner</span>'}</div></div></div>
   <div class="property-contact"><button class="btn w" type="button" id="enqb">Contact advertiser</button><button class="btn" type="button" id="viewb">Schedule a viewing</button></div>
   <p class="property-fineprint">Your contact details are only shared with the advertiser when you send a request.</p>
  </div>
  <div class="verified"><svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12l3 3 5-6" fill="none" stroke="currentColor" stroke-width="2"/></svg><span>Reviewed by Nestora before publishing. Always view in person and take independent advice.</span></div>
 </aside>
 </div>
 <section class="property-related"><div class="property-related-heading"><div><span class="chip">More to explore</span><h2>Properties you may like</h2></div><a href="#search">View all properties →</a></div><div class="cards three">${similar.map(homeCard).join('')}</div></section>`;
 const g=$('#gal'),step=d=>g.scrollBy({left:d*g.clientWidth,behavior:'smooth'});$('#gp')?.addEventListener('click',()=>step(-1));$('#gn')?.addEventListener('click',()=>step(1));g.tabIndex=0;g.onkeydown=e=>{if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)};
 $('#enqb').onclick=()=>enquiry(l,'enquiry');$('#viewb').onclick=()=>enquiry(l,'viewing');
}
function enquiry(l,type){const u=S.user||{};const tm=new Date(Date.now()+864e5*2).toISOString().slice(0,10);
 modal(`<div class="mtop"><div><p class="note">${l.ref}</p><h3>${type==='viewing'?'Request a viewing':'Send an enquiry'}</h3></div>${X}</div>
 <form id="eform" novalidate style="display:grid;gap:14px">
 <div class="g2"><label class="f">Name<input name="name" required value="${esc(u.name||'')}" autocomplete="name"></label><label class="f">Phone<input name="phone" required value="${esc(u.phone||'')}" autocomplete="tel"></label></div>
 <label class="f">Email<input name="email" type="email" required value="${esc(u.email||'')}" autocomplete="email"></label>
 ${type==='viewing'?`<div class="g2"><label class="f">Preferred date<input name="date" type="date" min="${tm}" required></label><label class="f">Time window<select name="win"><option>Morning (9–12)</option><option>Afternoon (12–4)</option><option>Evening (4–7)</option></select></label></div>`:''}
 <label class="f">Message ${type==='viewing'?'<small>Optional</small>':''}<textarea name="msg" ${type==='viewing'?'':'required'}>${type==='viewing'?'':`Hello, I'm interested in ${esc(l.title)} (${l.ref}). Is it still available?`}</textarea></label>
 <label class="ck"><input type="checkbox" name="consent" required> I agree to share my details with the advertiser for this ${type}.</label>
 <label class="ck"><input type="checkbox" name="human" required> I'm not a robot <span class="note">(anti-spam check placeholder)</span></label>
 <button class="btn" type="submit">${type==='viewing'?'Send viewing request':'Send enquiry'}</button></form>`);
 $('#eform').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;const d=Object.fromEntries(new FormData(e.target));
  S.enq.unshift({id:'E'+Date.now().toString().slice(-6),type,ref:l.ref,title:l.title,to:coName(l.co),at:now(),status:'Sent',when:type==='viewing'?`${d.date}, ${d.win}`:'',msg:d.msg,mine:!!S.user});
  notify(type==='viewing'?'Viewing request sent':'Enquiry sent',`${l.title} (${l.ref}) — the advertiser has been notified.`);save();closeModal();toast(S.user?'Sent. Track replies in your dashboard.':'Sent. Sign in to track replies.')}}
function validate(form){let ok=true;form.querySelectorAll('.emsg').forEach(x=>x.remove());form.querySelectorAll('.err').forEach(x=>x.classList.remove('err'));
 form.querySelectorAll('[required]').forEach(i=>{let bad=i.type==='checkbox'?!i.checked:!i.value.trim();if(!bad&&i.type==='email')bad=!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value);if(!bad&&i.dataset.re)bad=!new RegExp(i.dataset.re,'i').test(i.value.trim());
  if(bad){ok=false;const w=i.closest('label');w.classList.add('err');const m=document.createElement('span');m.className='emsg';m.textContent=i.dataset.msg||(i.type==='checkbox'?'Please tick to continue.':i.type==='email'?'Enter a valid email address.':'This field is required.');w.appendChild(m)}});
 if(!ok){const f=form.querySelector('.err input,.err select,.err textarea');f&&f.focus()}return ok}

/* ---------- auth ---------- */
let authMode='login',pending=null;
function renderAccount(){const a=$('#auth');const back=sessionStorage.getItem?.('nst_ret')||'';
 if(authMode==='otp'){a.innerHTML=`<h2 style="font-size:30px">Verify your ${pending.via}</h2><p style="color:var(--mut)">We sent a 6-digit code to <b>${esc(pending.via==='email'?pending.email:pending.phone)}</b>. It expires in 10 minutes and can be used once.</p>
  <p class="note" style="background:var(--sage);padding:10px 12px;border-radius:10px">Demo mode — your code is <b>${pending.code}</b></p>
  <form id="otpf" style="display:grid;gap:14px"><label class="f">Verification code<input name="code" inputmode="numeric" maxlength="6" required data-re="^\\d{6}$" data-msg="Enter the 6-digit code." style="font:300 24px var(--hd);letter-spacing:.3em;text-align:center"></label><button class="btn">Verify and continue</button></form>
  <button class="btn g s" id="resend" type="button">Resend code</button>`;
  $('#otpf').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;if(e.target.code.value!==pending.code){toast('That code is not correct');return}
   S.user={name:pending.name,email:pending.email,phone:pending.phone,verified:true,photo:'',prefs:{email:true,sms:false,marketing:pending.mkt}};
   S.consent.push({what:'Terms & privacy notice accepted',at:now()});if(pending.mkt)S.consent.push({what:'Marketing emails opted in',at:now()});
   seedOwner();notify('Welcome to Nestora','Your account is verified. You can now save favourites and list a property.');pending=null;authMode='login';save();chrome();location.hash=ret();};
  $('#resend').onclick=()=>{pending.code=String(Math.floor(1e5+Math.random()*9e5));toast('A new code was sent');renderAccount()};return}
 if(authMode==='reset'){a.innerHTML=`<h2 style="font-size:30px">Reset password</h2><p style="color:var(--mut)">Enter your email and we'll send a one-time reset link that expires in 30 minutes.</p><form id="rf" style="display:grid;gap:14px" novalidate><label class="f">Email<input name="email" type="email" required></label><button class="btn">Send reset link</button></form><button class="btn g s" type="button" id="bk">Back to sign in</button>`;
  $('#rf').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;toast('If an account exists, a reset link is on its way');authMode='login';renderAccount()};$('#bk').onclick=()=>{authMode='login';renderAccount()};return}
 const reg=authMode==='register';
 a.innerHTML=`<div class="seg" style="justify-self:start"><button type="button" class="${reg?'':'on'}" data-a="login">Sign in</button><button type="button" class="${reg?'on':''}" data-a="register">Register</button></div>
 <h2 style="font-size:30px">${reg?'Create your account':'Welcome back'}</h2>${sessionStorage.getItem?.('nst_msg')?`<p class="fb">${esc(sessionStorage.getItem('nst_msg'))}</p>`:''}
 <form id="af" style="display:grid;gap:14px" novalidate>
 ${reg?`<label class="f">Full name<input name="name" required autocomplete="name"></label><label class="f">Mobile number<input name="phone" type="tel" required autocomplete="tel" placeholder="+44" data-re="^\\+?[0-9 ]{10,15}$" data-msg="Enter a valid UK mobile number with country code."></label>`:''}
 <label class="f">Email<input name="email" type="email" required autocomplete="email"></label>
 <label class="f">Password ${reg?'<small>At least 8 characters with a number</small>':''}<input name="pw" type="password" required autocomplete="${reg?'new-password':'current-password'}" ${reg?'data-re="^(?=.*\\d).{8,}$" data-msg="Use 8+ characters including a number."':''}></label>
 ${reg?`<label class="f">Verify by<select name="via"><option value="email">Email code</option><option value="mobile">SMS code</option></select></label>
 <label class="ck"><input type="checkbox" name="terms" required> I accept the <a href="#terms">Terms</a> and have read the <a href="#privacy">Privacy notice</a>.</label>
 <label class="ck"><input type="checkbox" name="mkt"> Send me property tips and offers (optional).</label>`:''}
 <button class="btn">${reg?'Create account':'Sign in'}</button></form>
 ${reg?'':'<button class="btn g s" type="button" id="fg" style="justify-self:start">Forgot password?</button>'}`;
 $$('#auth [data-a]').forEach(b=>b.onclick=()=>{authMode=b.dataset.a;renderAccount()});$('#fg')&&($('#fg').onclick=()=>{authMode='reset';renderAccount()});
 $('#af').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;const d=Object.fromEntries(new FormData(e.target));
  if(reg){pending={name:d.name,email:d.email,phone:d.phone,via:d.via==='mobile'?'mobile':'email',mkt:!!d.mkt,code:String(Math.floor(1e5+Math.random()*9e5))};authMode='otp';renderAccount()}
  else{S.user=S.user&&S.user.email===d.email?S.user:{name:d.email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),email:d.email,phone:'',cty:S.cty,verified:true,prefs:{email:true,sms:false,marketing:false}};seedOwner();save();chrome();toast('Signed in');location.hash=ret()}}}
const ret=()=>{let r='dashboard';try{r=sessionStorage.getItem('nst_ret')||'dashboard';sessionStorage.removeItem('nst_ret');sessionStorage.removeItem('nst_msg')}catch(e){}return r};
function need(view,msg){if(S.user)return true;try{sessionStorage.setItem('nst_ret',view);sessionStorage.setItem('nst_msg',msg)}catch(e){}authMode='login';location.hash='account';return false}

/* ---------- owner listings ---------- */
function mk(ref,title,ver,pub,extra={}){return Object.assign({ref,title,cty:'UK',purpose:'Rent',seg:'Residential',cat:'Flat/Apartment',city:'Bristol',area:'Clifton',code:'BS8 1AA',price:1400,freq:'pcm',beds:2,baths:1,size:780,kind:'flat',hue:180,ver,pub,fb:'',hist:[{s:ver,at:'20 Nov 2026, 10:12',by:'You'}]},extra)}
function seedOwner(){const existing=Array.isArray(S.own)?S.own:[];if(existing.some(l=>l.cty==='UK'))return;S.own=[...existing,
 mk('UK-10399','Garden flat in Clifton','Approved','Published',{hist:[{s:'Submitted',at:'2 Nov 2026, 09:40',by:'You'},{s:'Approved',at:'4 Nov 2026, 15:05',by:'Reviewer'},{s:'Published',at:'4 Nov 2026, 15:20',by:'You'}]}),
 mk('UK-10512','Two-bed terrace, Bedminster','Changes Requested','Unpublished',{purpose:'Buy',cat:'House',kind:'house',hue:35,price:365000,freq:null,fb:'Please upload a clearer floor plan and proof of ownership (e.g. title register or council tax bill).',hist:[{s:'Submitted',at:'18 Nov 2026, 11:00',by:'You'},{s:'Changes Requested',at:'20 Nov 2026, 16:42',by:'Reviewer'}]}),
 mk('UK-D-0007','Studio near Temple Meads','Draft','Unpublished',{hist:[{s:'Draft',at:'22 Nov 2026, 19:30',by:'You'}]}),
 mk('UK-10388','Garage with storage','Rejected','Unpublished',{cat:'Warehouse',seg:'Commercial',kind:'warehouse',hue:210,price:180,fb:'Parking-only spaces are not accepted in this category.',hist:[{s:'Submitted',at:'1 Nov 2026, 08:00',by:'You'},{s:'Rejected',at:'3 Nov 2026, 12:30',by:'Reviewer'}]})];save()}
const GROUPS=[['all','All'],['Draft','Draft'],['Pending Review','Pending review'],['Changes Requested','Changes requested'],['Published','Approved / published'],['Rejected','Rejected'],['Suspended','Suspended'],['Archived','Archived'],['activity','My enquiries & viewings']];
let dtab='all';
const grp=l=>l.pub==='Archived'?'Archived':l.ver==='Approved'?'Published':['Submitted','Under Review'].includes(l.ver)?'Pending Review':l.ver;
const vb=v=>({Approved:'ok','Changes Requested':'wa','Pending Review':'in',Submitted:'in','Under Review':'in',Rejected:'no',Suspended:'no',Draft:''}[v]??'');
function renderDash(){const own=(S.own||[]).filter(l=>l.cty==='UK');
 $('#dtabs').innerHTML=GROUPS.map(([k,t])=>{const n=k==='all'?own.length:k==='activity'?S.enq.length:own.filter(l=>grp(l)===k).length;return `<button type="button" class="${dtab===k?'on':''}" data-t="${k}">${t} (${n})</button>`}).join('');
 $$('#dtabs button').forEach(b=>b.onclick=()=>{dtab=b.dataset.t;renderDash()});
 if(dtab==='activity'){$('#dlist').innerHTML=S.enq.length?`<div class="scroll"><table class="stack"><thead><tr><th>Ref</th><th>Type</th><th>Property</th><th>Advertiser</th><th>Sent</th><th>Status</th></tr></thead><tbody>${S.enq.map(q=>`<tr><td>${esc(q.id)}</td><td>${q.type==='viewing'?'Viewing — '+esc(q.when):'Enquiry'}</td><td><a href="#property-${esc(q.ref.toLowerCase())}">${esc(q.title)}</a></td><td>${esc(q.to)}</td><td>${esc(q.at)}</td><td><span class="badge in">${esc(q.status)}</span></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No enquiries or viewing requests yet. Open a property and tap “Send enquiry”.</div>';return}
 const list=dtab==='all'?own:own.filter(l=>grp(l)===dtab);
 $('#dlist').innerHTML=list.length?list.map(l=>{const g=grp(l),acts=[];
  if(['Draft','Changes Requested'].includes(l.ver))acts.push(['edit','Edit & '+(l.ver==='Draft'?'submit':'resubmit')]);
  if(g==='Published'&&l.pub==='Published')acts.push(['sold',l.purpose==='Rent'?'Mark let agreed':'Mark sold'],['withdraw','Withdraw'],['boost','Boost']);
  if(g==='Published'&&l.pub!=='Published'&&l.pub!=='Archived')acts.push(['renew','Request renewal']);
  if(l.pub!=='Archived')acts.push(['archive','Archive']);
  return `<div class="lrow"><div class="th">${art(l.kind,l.hue)}</div><div><b style="font:300 18px var(--hd)">${esc(l.title)}</b><p class="note">Ref ${esc(l.ref)} · ${esc(l.area)}, ${esc(l.city)} · ${money(l.price,l.cty)}${l.freq?' '+per(l):''}</p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><span class="badge ${vb(l.ver)}">Review: ${esc(l.ver)}</span><span class="badge ${l.pub==='Published'?'ok':''}">Visibility: ${esc(l.pub)}</span>${l.boost?'<span class="badge wa">Featured boost</span>':''}</div>
  ${l.fb?`<div class="fb"><b>Reviewer feedback:</b> ${esc(l.fb)}</div>`:''}
  <div class="hist">${l.hist.map(h=>`${esc(h.s)} · ${esc(h.at)} · ${esc(h.by)}`).join(' → ')}</div></div>
  <div class="acts">${acts.map(([k,t])=>`<button class="btn ${k==='edit'?'':'w'} s" type="button" data-act="${k}" data-ref="${esc(l.ref)}">${t}</button>`).join('')}</div></div>`}).join(''):'<div class="empty">Nothing in this group.</div>';
 $$('#dlist [data-act]').forEach(b=>b.onclick=()=>ownerAct(b.dataset.act,b.dataset.ref))}
function ownerAct(k,ref){const l=S.own.find(x=>x.ref===ref);const log=s=>l.hist.push({s,at:now(),by:'You'});
 if(k==='edit'){S.draft=Object.assign({},l,{editing:ref});store.set('draft',S.draft);wstep=0;location.hash='add-property';return}
 if(k==='boost'){location.hash='plans';return}
 const lab={sold:l.purpose==='Rent'?'Let Agreed':'Sold',withdraw:'Withdrawn',renew:'Renewal requested',archive:'Archived'}[k];
 modal(`<div class="mtop"><h3>${k==='renew'?'Request renewal?':`Mark as ${lab}?`}</h3>${X}</div><p style="color:var(--mut)">${k==='renew'?'We will send this listing for renewal under your current plan.':'This removes the listing from public search and the map straight away.'}</p><div style="display:flex;gap:8px"><button class="btn" type="button" id="ok">Confirm</button><button class="btn g" type="button" data-close>Cancel</button></div>`);
 $('#ok').onclick=()=>{if(k==='renew'){log('Renewal requested');notify('Renewal requested',`${l.title} (${l.ref})`)}else{l.pub=lab;log(lab)}save();closeModal();renderDash();toast('Status updated')}}

/* ---------- add property wizard ---------- */
const WS=['Purpose & category','Title & description','Price','Address','Specifications','Photos','Ownership & contact','Preview & submit'];
let wstep=0,files=[];
const blank=()=>({cty:'UK',purpose:'Buy',seg:'Residential',cat:'House',title:'',desc:'',price:'',freq:'',line1:'',city:'',area:'',code:'',beds:'',baths:'',size:'',furn:'Unfurnished',parking:false,cond:'Good',avail:'Available now',amen:[],doc:'',cname:S.user?.name||'',cphone:S.user?.phone||'',cemail:S.user?.email||'',show:'form',decl:false});
function renderWiz(){if(S.draft?.cty&&S.draft.cty!=='UK'){S.draft=null;store.set('draft',null);toast('Your saved draft was for another market. Start a new UK listing.')}if(!S.draft||!('line1' in S.draft))S.draft=Object.assign(blank(),S.draft||{});const d=S.draft;
 $('#wsteps').innerHTML=WS.map((t,i)=>`<li class="${i===wstep?'on':''} ${i<wstep?'done':''}" data-s="${i}"><i>${i<wstep?'✓':i+1}</i><span>${t}</span></li>`).join('');
 $$('#wsteps li').forEach(li=>li.onclick=()=>{if(+li.dataset.s<wstep){wstep=+li.dataset.s;renderWiz()}});
 const sel=(n,o,v)=>`<select name="${n}">${o.map(x=>{const[a,b]=Array.isArray(x)?x:[x,x];return `<option value="${a}" ${String(v)===String(a)?'selected':''}>${b}</option>`}).join('')}</select>`;
 const body=[
 ()=>`<div class="g2"><label class="f">Purpose ${sel('purpose',[['Buy','For sale'],['Rent','For rent']],d.purpose)}</label><label class="f">Sector ${sel('seg',['Residential','Commercial'],d.seg)}</label></div><label class="f">Category ${sel('cat',CATS[d.seg],d.cat)}</label>`,
 ()=>`<label class="f">Listing title<small>Max 70 characters</small><input name="title" required maxlength="70" value="${esc(d.title)}" placeholder="e.g. Bright two-bed flat with balcony"></label><label class="f">Description<small>At least 80 characters</small><textarea name="desc" required data-re="^[\\s\\S]{80,}$" data-msg="Please write at least 80 characters." style="min-height:170px">${esc(d.desc)}</textarea></label>`,
 ()=>`<div class="g2"><label class="f">${d.purpose==='Rent'?'Rent':'Asking price'} (GBP)<input name="price" inputmode="numeric" required data-re="^\\d{2,}$" data-msg="Enter a whole number, no symbols." value="${esc(d.price)}"></label>${d.purpose==='Rent'?`<label class="f">Rental frequency ${sel('freq',[['pcm','Per month'],['pw','Per week']],d.freq||'pcm')}</label>`:''}</div><p class="note">Prices are shown in GBP.</p>`,
 ()=>`<label class="f">Address line<input name="line1" required value="${esc(d.line1)}" autocomplete="address-line1"></label><div class="g2"><label class="f">Town / city<input name="city" required value="${esc(d.city)}"></label><label class="f">Area / district<input name="area" required value="${esc(d.area)}"></label></div>
  <label class="f">Postcode<input name="code" required value="${esc(d.code)}" data-re="^[A-Z]{1,2}\\d[A-Z\\d]? ?\\d[A-Z]{2}$" data-msg="Enter a valid UK postcode, e.g. BS9 1AB."></label>`,
 ()=>`<div class="g3"><label class="f">Bedrooms<input name="beds" type="number" min="0" value="${esc(d.beds)}"></label><label class="f">Bathrooms<input name="baths" type="number" min="0" value="${esc(d.baths)}"></label><label class="f">Area (sq ft)<input name="size" type="number" min="1" required value="${esc(d.size)}"></label></div>
  <div class="g3"><label class="f">Furnishing ${sel('furn',['Unfurnished','Part furnished','Semi-furnished','Furnished'],d.furn)}</label><label class="f">Condition ${sel('cond',['Excellent','Good','Needs updating'],d.cond)}</label><label class="f">Availability ${sel('avail',['Available now','Ready to move','Within 3 months','Under construction'],d.avail)}</label></div>
  <label class="ck"><input type="checkbox" name="parking" ${d.parking?'checked':''}> Parking available</label><p style="font:300 14px var(--hd)">Amenities</p><div class="g3">${A.map(a=>`<label class="ck"><input type="checkbox" name="amen" value="${a}" ${d.amen.includes(a)?'checked':''}> ${a}</label>`).join('')}</div>`,
 ()=>`<label class="f">Photos<small>JPG or PNG, up to 10 MB each, max 20 photos. At least one required.</small><input type="file" id="ph" accept="image/jpeg,image/png" multiple></label><div class="thumbs" id="thumbs"></div>`,
 ()=>`<label class="f">Proof of ownership or authority to advertise<small>e.g. title register, council tax bill or landlord authority letter — PDF/JPG/PNG up to 10 MB. Kept private: only you and reviewers can see it.</small><input type="file" id="doc" accept="application/pdf,image/jpeg,image/png"></label>${d.doc?`<p class="note">Uploaded: ${esc(d.doc)}</p>`:''}
  <div class="g2"><label class="f">Contact name<input name="cname" required value="${esc(d.cname)}"></label><label class="f">Contact phone<input name="cphone" required value="${esc(d.cphone)}"></label></div><label class="f">Contact email<input name="cemail" type="email" required value="${esc(d.cemail)}"></label>
  <label class="f">Show to enquirers ${sel('show',[['form','Enquiry form only (recommended)'],['phone','Form and phone number']],d.show)}</label>`,
 ()=>`<div class="lrow" style="grid-template-columns:180px 1fr;border:0;padding:0"><div class="th">${files[0]?`<img src="${files[0].url}" alt="" style="width:100%;height:100%;object-fit:cover">`:art(d.cat==='House'?'house':d.cat==='Plot/Land'?'plot':d.cat==='Flat/Apartment'?'flat':d.cat.toLowerCase(),30)}</div>
  <div><h3>${esc(d.title||'Untitled listing')}</h3><p class="note">${esc(d.line1)}, ${esc(d.area)}, ${esc(d.city)}, ${esc(d.code)}</p><p style="font:300 22px var(--hd);margin-top:6px">${d.price?money(d.price):'—'} ${d.purpose==='Rent'?(d.freq==='pw'?'per week':'per month'):''}</p><p class="note">${esc(d.purpose==='Rent'?'For rent':'For sale')} · ${esc(d.seg)} · ${esc(d.cat)} · ${d.beds||0} bed · ${d.baths||0} bath · ${esc(d.size)} sq ft · ${files.length} photo(s)</p></div></div>
  <p style="color:var(--mut)">${esc(d.desc)}</p>
  <label class="ck"><input type="checkbox" name="decl" required ${d.decl?'checked':''}> I declare that I own this property or am authorised by the owner to advertise it, and that the details are accurate.</label>
  <p class="note">Submitting creates a review request. Your listing stays private until an administrator approves it.</p>`][wstep]();
 $('#wform').innerHTML=`<div class="prog"><i style="width:${(wstep+1)/WS.length*100}%"></i></div><div><p class="note">Step ${wstep+1} of ${WS.length}${d.editing?` · editing ${esc(d.editing)}`:''}</p><h2 style="font-size:26px;margin-top:4px">${WS[wstep]}</h2></div>${body}
 <div class="wfoot"><div style="display:flex;gap:8px">${wstep?'<button class="btn g" type="button" id="wb">Back</button>':''}<button class="btn w" type="button" id="wd">Save draft</button></div><button class="btn" type="submit">${wstep===WS.length-1?'Submit for review':'Continue'}</button></div>`;
 if(wstep===5){drawThumbs();$('#ph').onchange=e=>{[...e.target.files].forEach(f=>{if(!/image\/(jpeg|png)/.test(f.type)||f.size>10e6){toast(`${f.name}: wrong type or over 10 MB`);return}if(files.length>=20)return;const o={name:f.name,url:URL.createObjectURL(f),p:0};files.push(o);const t=setInterval(()=>{o.p=Math.min(100,o.p+20+Math.random()*25);drawThumbs();if(o.p>=100)clearInterval(t)},180)});drawThumbs()}}
 if(wstep===6)$('#doc').onchange=e=>{const f=e.target.files[0];if(!f)return;if(f.size>10e6){toast('File is over 10 MB');e.target.value='';return}d.doc=f.name;toast('Document uploaded privately')};
 $('#wb')&&($('#wb').onclick=()=>{grab();wstep--;renderWiz()});
 $('#wd').onclick=()=>{grab();store.set('draft',S.draft);if(!d.editing){d.editing='UK-D-'+String(Date.now()).slice(-4);(S.own=S.own||[]).unshift(Object.assign(toListing(d,d.editing),{ver:'Draft',pub:'Unpublished',hist:[{s:'Draft',at:now(),by:'You'}]}))}else{const o=S.own.find(x=>x.ref===d.editing);o&&Object.assign(o,toListing(d,o.ref,o))}save();toast('Draft saved — resume any time')};
 $('#wform [name=seg]')?.addEventListener('change',()=>{grab();d.cat=CATS[d.seg][0];renderWiz()});$('#wform [name=purpose]')?.addEventListener('change',grab)}
function drawThumbs(){const t=$('#thumbs');if(!t)return;t.innerHTML=files.map((f,i)=>`<div>${f.p>=100?`<img src="${f.url}" alt="${esc(f.name)}">`:`<span style="position:absolute;inset:8px">${esc(f.name)}</span><div class="prog"><i style="width:${f.p}%"></i></div>`}${f.p>=100?`<button class="fav" type="button" data-rm="${i}" aria-label="Remove photo" style="width:30px;height:30px;top:6px;right:6px">×</button>`:''}</div>`).join('');$$('[data-rm]').forEach(b=>b.onclick=()=>{files.splice(+b.dataset.rm,1);drawThumbs()})}
function grab(){const d=S.draft,f=$('#wform');f.querySelectorAll('input[name],select[name],textarea[name]').forEach(i=>{if(i.name==='amen')return;if(i.type==='checkbox')d[i.name]=i.checked;else d[i.name]=i.name==='code'?i.value.toUpperCase().trim():i.value});if(f.querySelector('[name=amen]'))d.amen=$$('#wform [name=amen]:checked').map(x=>x.value)}
const toListing=(d,ref,o={})=>({ref,title:d.title||'Untitled listing',cty:'UK',purpose:d.purpose,seg:d.seg,cat:d.cat,city:d.city||'—',area:d.area||'—',code:d.code,price:+d.price||0,freq:d.purpose==='Rent'?(d.freq||'pcm'):null,beds:+d.beds||0,baths:+d.baths||0,size:+d.size||0,kind:d.cat==='House'?'house':d.cat==='Plot/Land'?'plot':d.cat==='Flat/Apartment'?'flat':d.cat.toLowerCase(),hue:o.hue||30,fb:'',hist:o.hist||[]});
$('#wform').addEventListener('submit',e=>{e.preventDefault();if(!validate(e.target))return;grab();const d=S.draft;
 if(wstep===5&&!files.some(f=>f.p>=100)){toast('Add at least one photo (wait for uploads to finish)');return}
 if(wstep===6&&!d.doc){toast('Upload proof of ownership or authority to continue');return}
 if(wstep<WS.length-1){wstep++;store.set('draft',d);renderWiz();window.scrollTo({top:0});return}
 const isNew=!d.editing||/-D-/.test(d.editing);const ref=isNew?'UK-'+(10600+Math.floor(Math.random()*400)):d.editing;
 S.own=S.own||[];let o=S.own.find(x=>x.ref===d.editing);if(o){Object.assign(o,toListing(d,ref,o))}else{o=toListing(d,ref);S.own.unshift(o)}
 o.ver='Pending Review';o.pub='Unpublished';o.fb='';o.hist.push({s:'Submitted',at:now(),by:'You'},{s:'Pending Review',at:now(),by:'System'});
 notify('Listing submitted for review',`${o.title} — reference ${ref}. We'll email you when the review is complete.`);
 S.draft=null;store.set('draft',null);files=[];wstep=0;save();
 modal(`<div class="mtop"><h3>Submitted for review</h3>${X}</div><p>Your property reference is <b>${ref}</b>, submitted ${now()}.</p><p style="color:var(--mut)">Status: <span class="badge in">Pending Review</span>. It will stay private until approved. We'll notify you if changes are needed.</p><a class="btn" href="#dashboard" data-close>Go to my dashboard</a>`)});

/* ---------- favourites & compare ---------- */
function renderFavs(){const fv=[...S.favs].map(r=>L.find(l=>l.ref===r)).filter(Boolean);
 $('#favs').innerHTML=fv.length?`<div class="cards three">${fv.map(l=>isPublic(l)?card(l):`<article class="card"><div class="img" style="opacity:.5">${photo(l)}</div><div class="t"><h3>${esc(l.title)}</h3></div><span class="badge no">No longer available</span><button class="btn g s" type="button" data-fav="${l.ref}" style="margin-top:10px">Remove</button></article>`).join('')}</div>`:'';
 const cl=[...S.cmp].map(r=>L.find(l=>l.ref===r)).filter(Boolean);
 $('#compare-heading').hidden=cl.length<1;
 if(cl.length<2){$('#cmptable').innerHTML=cl.length?`<div class="compare-empty"><span class="compare-empty-icon" aria-hidden="true">+</span><div><b>${cl.length} property selected</b><p>Select one more property to compare features side by side.</p></div></div>`:'';return}
 const rows=[['Price',l=>money(l.price,l.cty)+(l.freq?' '+per(l):'')],['Currency',l=>cur(l.cty)],['Purpose',l=>l.purpose==='Rent'?'Rent':'Sale'],['Category',l=>l.cat],['Location',l=>`${l.area}, ${l.city} ${l.code}`],['Size',l=>l.size.toLocaleString()+' sq ft'],['Bedrooms',l=>l.beds||'—'],['Bathrooms',l=>l.baths||'—'],['Furnishing',l=>l.furn],['Parking',l=>l.parking?'Yes':'No'],...['Garden','Lift','Gym','Security','Power backup'].map(a=>[a,l=>l.amen.includes(a)?'✓':'—']),['Status',l=>isPublic(l)?'Available':'Unavailable']];
 $('#cmptable').innerHTML=`<div class="scroll"><table><thead><tr><th></th>${cl.map(l=>`<th style="min-width:180px"><div style="aspect-ratio:16/10;overflow:hidden;border-radius:10px;margin-bottom:8px">${photo(l).replace('<img ','<img style="width:100%;height:100%;object-fit:cover" ')}</div><a href="#property-${l.ref.toLowerCase()}" style="font:300 16px var(--hd);color:var(--ink)">${esc(l.title)}</a><br><button class="btn g s" type="button" data-uncmp="${l.ref}" style="margin-top:8px">Remove</button></th>`).join('')}</tr></thead><tbody>${rows.map(([k,f])=>`<tr><th>${k}</th>${cl.map(l=>`<td>${esc(f(l))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 $$('[data-uncmp]').forEach(b=>b.onclick=()=>{S.cmp.delete(b.dataset.uncmp);chrome();renderFavs()})}

/* ---------- profile ---------- */
function renderProfile(){const u=S.user;
 $('#profile').innerHTML=`<form class="panel" id="pf" novalidate><h3>Personal details</h3>
 <div class="co"><div class="mk" id="av" style="overflow:hidden">${u.photo?`<img src="${u.photo}" alt="" style="width:100%;height:100%;object-fit:cover">`:esc(u.name[0])}</div><label class="btn w s" style="cursor:pointer">Change photo<input type="file" accept="image/*" id="avf" class="sr"></label></div>
 <label class="f">Full name<input name="name" required value="${esc(u.name)}"></label><label class="f">Email<small>Changing this needs your password</small><input name="email" type="email" required value="${esc(u.email)}"></label><label class="f">Phone<input name="phone" value="${esc(u.phone)}"></label>
 <button class="btn">Save changes</button></form>
 <div style="display:grid;gap:20px"><form class="panel" id="np"><h3>Notification preferences</h3><p class="note">Security, verification and payment messages are always sent.</p>
 <label class="ck"><input type="checkbox" name="email" ${u.prefs.email?'checked':''}> Email updates on enquiries and listings</label><label class="ck"><input type="checkbox" name="sms" ${u.prefs.sms?'checked':''}> SMS alerts for viewing requests</label><label class="ck"><input type="checkbox" name="marketing" ${u.prefs.marketing?'checked':''}> Property tips and offers</label><button class="btn w">Save preferences</button></form>
 <div class="panel"><h3>Consent &amp; privacy log</h3>${S.consent.length?S.consent.map(c=>`<p style="font-size:15px">${esc(c.what)} <span class="note">· ${esc(c.at)}</span></p>`).join(''):'<p class="note">No records yet.</p>'}</div>
 <div class="panel"><h3>Account</h3><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn d" type="button" id="lo">Log out</button><button class="btn g" type="button" id="del">Request deactivation or deletion</button></div></div></div>`;
 $('#avf').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{u.photo=r.result;save();renderProfile();toast('Photo updated')};r.readAsDataURL(f)};
 $('#pf').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;const d=Object.fromEntries(new FormData(e.target));const apply=()=>{Object.assign(u,d);save();chrome();toast('Profile saved')};
  if(d.email!==u.email){modal(`<div class="mtop"><h3>Confirm it's you</h3>${X}</div><form id="ra" style="display:grid;gap:12px" novalidate><label class="f">Current password<input type="password" required></label><button class="btn">Confirm</button></form>`);$('#ra').onsubmit=ev=>{ev.preventDefault();if(!validate(ev.target))return;apply();closeModal();notify('Email changed','Your account email was changed. If this wasn\'t you, contact support.')}}else apply()};
 $('#np').onsubmit=e=>{e.preventDefault();const f=e.target;['email','sms','marketing'].forEach(k=>{if(u.prefs[k]!==f[k].checked)S.consent.push({what:`${k==='marketing'?'Marketing':k.toUpperCase()} ${f[k].checked?'opted in':'opted out'}`,at:now()});u.prefs[k]=f[k].checked});save();renderProfile();toast('Preferences saved')};
 $('#lo').onclick=()=>{S.user=null;save();chrome();toast('Logged out');location.hash='home'};
 $('#del').onclick=()=>{modal(`<div class="mtop"><h3>Deactivate or delete account</h3>${X}</div><form id="dr" style="display:grid;gap:12px" novalidate><label class="f">What would you like?<select><option>Deactivate (hide my listings, keep data)</option><option>Delete my account and data</option></select></label><label class="f">Password<input type="password" required></label><p class="note">Our team will confirm by email. Records we must keep by law (e.g. invoices) are retained.</p><button class="btn">Send request</button></form>`);$('#dr').onsubmit=ev=>{ev.preventDefault();if(!validate(ev.target))return;closeModal();notify('Account request received','We will confirm your deactivation/deletion request by email.');toast('Request sent')}}}

/* ---------- notifications ---------- */
function renderNotes(){$('#nlist').innerHTML=S.notes.length?S.notes.map((n,i)=>`<div class="notif ${n.read?'read':''}"><i></i><div><b style="font:300 17px var(--hd)">${esc(n.t)}</b><p style="color:var(--mut);font-size:15px">${esc(n.b)}</p><p class="note">${esc(n.at)}</p></div></div>`).join(''):'<div class="empty">You are all caught up.</div>';S.notes.forEach(n=>n.read=true);save();chrome()}
$('#markall').onclick=()=>{S.notes.forEach(n=>n.read=true);save();renderNotes()};

/* ---------- plans ---------- */
const PLANS={UK:[{id:'free',n:'Free',p:0,per:'',lim:['1 active listing','Up to 10 photos','Live for 60 days','Standard placement'],note:'No payment needed.'},
 {id:'single',n:'Paid listing',p:29.99,per:'one-off, 90 days',lim:['1 additional listing','Up to 30 photos + floor plan','Live for 90 days','Listing statistics'],note:'Does not renew automatically. Refundable in full if cancelled before approval.',hl:1},
 {id:'boost',n:'Featured boost',p:14.99,per:'add-on, 14 days',lim:['Top of search results','“Featured” badge','Homepage featured slot (when available)','For an already approved listing'],note:'Does not renew automatically. Non-refundable once the boost starts.'}]};
function renderPlans(){const c=S.cty;
 $('#plans').innerHTML=PLANS[c].map(p=>`<div class="plan ${p.hl?'hl':''}"><h3>${p.n}</h3><div class="amt">${p.p?new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(p.p):money(0)}</div><p class="note">${p.per||'Always free'}</p><ul>${p.lim.map(x=>`<li>${x}</li>`).join('')}</ul><p class="note">${p.note}</p><button class="btn ${p.hl?'':'d'}" type="button" data-plan="${p.id}">${p.p?'Choose '+p.n.toLowerCase():'Start for free'}</button></div>`).join('')+'';
 $$('[data-plan]').forEach(b=>b.onclick=()=>checkout(PLANS[c].find(p=>p.id===b.dataset.plan),c));
 $('#payhist').innerHTML=S.pays.length?`<div class="scroll"><table class="stack"><thead><tr><th>Receipt</th><th>Item</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>${S.pays.map(p=>`<tr><td>${esc(p.id)}</td><td>${esc(p.n)}${p.ref?' · '+esc(p.ref):''}</td><td>${esc(p.amt)}</td><td>${esc(p.at)}</td><td><span class="badge ${p.st==='Paid'?'ok':'no'}">${esc(p.st)}</span></td></tr>`).join('')}</tbody></table></div>`:'<div class="empty">No payments yet.</div>';
 $('#plans').insertAdjacentHTML('afterend','')}
function checkout(p,c){if(!need('plans','Sign in to choose a plan.'))return;if(!p.p){toast('You are on the Free plan');location.hash='add-property';return}
 const pubs=(S.own||[]).filter(l=>l.ver==='Approved'&&l.pub==='Published'&&l.cty===c);const amt=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(p.p);
 modal(`<div class="mtop"><div><p class="note">Checkout · ${cur(c)}</p><h3>${p.n}</h3></div>${X}</div>
 <form id="co" style="display:grid;gap:14px" novalidate>${p.id==='boost'?`<label class="f">Listing to boost<select name="ref" required><option value="">Choose an approved listing</option>${pubs.map(l=>`<option value="${esc(l.ref)}">${esc(l.title)} (${esc(l.ref)})</option>`).join('')}</select></label>`:''}
 <table><tbody><tr><td>Price</td><td style="text-align:right"><b>${amt}</b></td></tr><tr><td>Billing</td><td style="text-align:right">${p.per}</td></tr><tr><td>Renewal</td><td style="text-align:right">None — one-off payment</td></tr><tr><td>Refunds</td><td style="text-align:right;max-width:260px">${p.note.replace('Does not renew automatically. ','')}</td></tr></tbody></table>
 <label class="ck"><input type="checkbox" required> I have read the price, duration, limits and refund terms above.</label>
 <button class="btn">Pay ${amt} securely</button><p class="note">You'll be taken to the payment provider. Features unlock only after the payment is confirmed by our server.</p></form>`);
 $('#co').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;const ref=e.target.ref?.value||'';const bt=e.target.querySelector('.btn');bt.disabled=true;bt.textContent='Waiting for payment confirmation…';
  setTimeout(()=>{const id='RC-'+String(Date.now()).slice(-6);S.pays.unshift({id,n:p.n,ref,amt,at:now(),st:'Paid'});if(ref){const l=S.own.find(x=>x.ref===ref);l.boost=true;l.hist.push({s:'Featured boost activated',at:now(),by:'System'})}
   notify('Payment confirmed',`${p.n} — ${amt}. Receipt ${id}.`);save();closeModal();renderPlans();toast('Payment confirmed — entitlement active')},1600)}}

/* ---------- companies ---------- */
function renderCompanies(){$('#comps').innerHTML=COS.map(c=>{const ls=L.filter(l=>l.co===c.id&&isPublic(l));const n=ls.length;const cover=ls.find(l=>PHOTOS.has(l.ref))||ls[0];const src=cover?(PHOTOS.get(cover.ref)||`${cover.ref}.jpg`):'about-page.jpg';return `<a class="company-card" href="#company-${c.id}"><img class="company-card-image" src="img/${src}" alt="${esc(cover?.title||c.name+' property listing')}" loading="lazy"><span class="company-card-shade"></span><span class="company-card-top"><span><b>${esc(c.name)}</b><small>${esc(c.city)}, UK · since ${c.since}</small></span></span><span class="company-card-bottom"><span class="company-card-summary">${esc(c.about)}</span><span class="company-card-stats"><span>${c.verified?'Verified':''}</span><span>${n} live ${n===1?'listing':'listings'}</span><span>${esc(c.city)}</span></span></span></a>`}).join('')}
function companyListingCard(l){return `<article class="company-listing-card"><div class="company-listing-image" data-open="${esc(l.ref)}">${photo(l)}<span class="company-listing-tags"><span>${l.purpose==='Rent'?'To rent':'For sale'}</span><span>${esc(l.seg)}</span></span><button class="fav ${S.favs.has(l.ref)?'on':''}" type="button" data-fav="${esc(l.ref)}" aria-label="Save ${esc(l.title)}" aria-pressed="${S.favs.has(l.ref)}">${heart}</button></div><div class="company-listing-content"><span class="company-listing-location">${esc(l.area)}, ${esc(l.city)} · ${esc(l.code)}</span><h3 data-open="${esc(l.ref)}">${esc(l.title)}</h3><div class="company-listing-facts">${l.beds?`<span>${l.beds} bed</span>`:''}${l.baths?`<span>${l.baths} bath</span>`:''}<span>${l.size.toLocaleString('en-GB')} sq ft</span></div><div class="company-listing-footer"><div><b>${money(l.price)}</b>${l.freq?`<small>${per(l)}</small>`:''}</div><button class="company-listing-open" type="button" data-open="${esc(l.ref)}" aria-label="View ${esc(l.title)}">↗</button></div></div></article>`}
function renderCompany(id){const c=COS.find(x=>x.id===id);if(!c){$('#company').innerHTML='<div class="empty">Company not found.</div>';return}const ls=L.filter(l=>l.co===c.id&&isPublic(l));const cover=ls.find(l=>PHOTOS.has(l.ref))||ls[0];const heroSrc=cover?(PHOTOS.get(cover.ref)||`${cover.ref}.jpg`):'about-page.jpg';
 $('#company').innerHTML=`<div class="company-detail"><section class="company-detail-hero"><img class="company-detail-hero-image" src="img/${heroSrc}" alt="${esc(cover?.title||c.name+' property')}" fetchpriority="high"><span class="company-detail-hero-shade" aria-hidden="true"></span><div class="company-detail-hero-copy"><a class="company-back" href="#companies">← All companies</a><div class="company-detail-hero-text"><h1>${esc(c.name)}</h1><p>${esc(c.about)}</p><span class="company-detail-location">${esc(c.city)}, United Kingdom · Established ${c.since}</span></div></div></section>
 <section class="company-about-brief"><div class="company-about-top"><img class="company-about-image" src="img/${heroSrc}" alt="Property represented by ${esc(c.name)}" loading="lazy"><div class="company-about-intro"><span class="company-about-label">About us</span><h2>${esc(c.name)} helps people find the right property in ${esc(c.city)}.</h2><p>${esc(c.about)} We bring local knowledge and careful property reviews to every listing.</p></div></div></section>
 <section class="company-portfolio-section" id="company-portfolio"><div class="company-section-heading"><div><span class="chip">Company listings</span><h2>Properties from ${esc(c.name)}</h2><p>Browse this company’s current properties.</p></div><span class="company-section-count">${ls.length} live ${ls.length===1?'listing':'listings'}</span></div><div class="company-property-cards">${ls.map(companyListingCard).join('')||'<div class="empty">No live listings right now.</div>'}</div></section></div>`}

/* ---------- static bits ---------- */
$('#faq').innerHTML=[['Is every listing checked?','Yes. Every property is reviewed by an administrator before it can appear in search, on the map or on company pages. A verified company still has each of its listings reviewed separately.'],
['How do I list my property?','Register and verify your email or mobile, then open Add Property. Complete the eight steps, upload photos and proof that you may advertise the property, and submit. You can save a draft at any point.'],
['How long does a review take?','Usually 1–2 working days. You can follow the status in your dashboard, and we will notify you if the reviewer needs changes.'],
['What currency are prices shown in?','All property and plan prices are shown in GBP. Rent listings show a monthly or weekly price where applicable.'],
['Can I save favourites without an account?','You can save during your visit, but to keep your shortlist across visits and devices you need to sign in.'],
['What happens when my property is sold or let?','Mark it as Sold, Let agreed or Withdrawn in your dashboard. It leaves public search and the map immediately.'],
['Are my documents public?','Never. Ownership and identity documents are stored privately and are only visible to you and authorised reviewers.']].map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
$('#cform').onsubmit=e=>{e.preventDefault();if(!validate(e.target))return;e.target.reset();toast('Thanks — your message has been sent to our support team')};

/* ---------- router ---------- */
const PROT={'add-property':'Sign in or register to list a property.',dashboard:'Sign in to see your listings.',favourites:'Sign in to view your saved list.',profile:'Sign in to manage your profile.',notifications:'Sign in to see your notifications.'};
function route(){let h=(location.hash||'#home').slice(1)||'home';if(h==='main')h='home';
 if(PROT[h]&&!need(h,PROT[h]))return;
 if(h==='account'&&S.user&&authMode!=='otp'){location.hash='profile';return}
 let v=h;if(h.startsWith('property-'))v='property';else if(h.startsWith('company-'))v='company';
 if(!$(`[data-view="${v}"]`))v=h='home';
 $$('[data-view]').forEach(s=>s.classList.toggle('on',s.dataset.view===v));
 $$('#links a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+h));$('#links').classList.remove('open');
 ({home:renderHome,search:renderSearch,property:()=>renderProperty(h.slice(9)),'add-property':renderWiz,dashboard:renderDash,favourites:renderFavs,account:renderAccount,profile:renderProfile,notifications:renderNotes,plans:renderPlans,companies:renderCompanies,company:()=>renderCompany(h.slice(8))}[v]||(()=>{}))();
 document.body.classList.toggle('over',v==='home');chrome();window.scrollTo({top:0});document.body.classList.remove('scrolled')}
const onScroll=()=>document.body.classList.toggle('scrolled',window.scrollY>40);window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('hashchange',route);route();
}
