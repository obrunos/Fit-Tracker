const CACHE='fit-tracker-v04';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest'];
const EMPTY_CONFIG='window.FIT_CONFIG = { SUPABASE_URL: "", SUPABASE_ANON_KEY: "" };';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
function guardar(req,res){if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res}
self.addEventListener('fetch',e=>{
 const req=e.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 const mesmaOrigem=url.origin===location.origin;
 // config.js: rede primeiro; guarda a última cópia boa; sem rede usa a cópia guardada
 if(mesmaOrigem&&url.pathname.endsWith('/config.js')){
  e.respondWith(fetch(req,{cache:'no-store'}).then(res=>guardar(req,res)).catch(()=>caches.match(req).then(c=>c||new Response(EMPTY_CONFIG,{headers:{'Content-Type':'application/javascript'}}))));
  return;
 }
 // arquivos do app: abre rápido pelo cache e atualiza em segundo plano (evita ficar preso em versão antiga)
 if(mesmaOrigem){
  e.respondWith(caches.match(req).then(cached=>{
   const rede=fetch(req).then(res=>guardar(req,res)).catch(()=>cached);
   return cached||rede;
  }));
  return;
 }
 // scripts de outras origens (ex.: biblioteca do Supabase): guarda para o app abrir sem internet
 if(req.destination==='script'){
  e.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{if(res.ok||res.type==='opaque'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res})));
 }
});
