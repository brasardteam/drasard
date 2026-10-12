(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

$$('.ph[data-n]').forEach(function(el){
  var img=new Image();img.onload=function(){el.style.backgroundImage='url('+img.src+')';el.classList.add('has-img')};
  img.src='assets/img/'+el.dataset.n+'.jpg';
});

/* header */
var hdr=$('.hdr');
function onScroll(){hdr.classList.toggle('solid',window.scrollY>40)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
var burger=$('.burger'),mnav=$('.mnav');
function setMenu(o){burger.setAttribute('aria-expanded',String(o));mnav.classList.toggle('on',o);document.body.style.overflow=o?'hidden':''}
burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
$$('.mnav a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});

/* current section + reveal */
if('IntersectionObserver' in window){
  var links=$$('.hdr nav a:not(.btn)');
  var so=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})})},{rootMargin:'-40% 0px -50% 0px'});
  $$('main section[id]').forEach(function(s){so.observe(s)});
  var ro=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');ro.unobserve(x.target)}})},{threshold:.12});
  $$('.rv').forEach(function(el){ro.observe(el)});
}else{$$('.rv').forEach(function(el){el.classList.add('in')})}

/* hero embers (canvas). Pauses off-screen, static when reduced motion */
var cv=$('#embers');
if(cv&&cv.getContext){
  var cx=cv.getContext('2d'),W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),P=[],run=true,raf=0;
  function size(){var r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
  function spawn(init){return {x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*1.7+.4,vy:-(Math.random()*.55+.18),vx:(Math.random()-.5)*.25,ph:Math.random()*6.28,life:Math.random()*.6+.4}}
  function init(){size();var n=Math.round(Math.min(90,W/14));P=[];for(var i=0;i<n;i++)P.push(spawn(true))}
  function frame(t){
    cx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var p=P[i];
      p.y+=p.vy;p.x+=p.vx+Math.sin(t/1400+p.ph)*.18;
      var h=p.y/H,a=Math.max(0,Math.min(1,h*1.1))*p.life*(.55+.45*Math.sin(t/260+p.ph));
      cx.beginPath();cx.fillStyle='rgba(226,'+Math.round(103+(1-h)*80)+',43,'+a.toFixed(3)+')';cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();
      if(p.y<-10)P[i]=spawn(false);
    }
    if(run&&!reduce)raf=requestAnimationFrame(frame);
  }
  init();
  if(reduce){frame(0)}else{raf=requestAnimationFrame(frame)}
  window.addEventListener('resize',function(){init();if(reduce)frame(0)});
  if('IntersectionObserver' in window&&!reduce){new IntersectionObserver(function(en){var v=en[0].isIntersecting;if(v&&!run){run=true;raf=requestAnimationFrame(frame)}else if(!v){run=false;cancelAnimationFrame(raf)}}).observe(cv)}
}

/* wine tabs */
var tabs=$$('.wtab'),panels=$$('.wp');
function pick(i){tabs.forEach(function(t,k){t.setAttribute('aria-selected',String(k===i));t.tabIndex=k===i?0:-1});panels.forEach(function(p,k){p.classList.toggle('on',k===i)})}
tabs.forEach(function(t,i){t.addEventListener('click',function(){pick(i)});t.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(n!==null){pick(n);tabs[n].focus()}})});
if(tabs.length)pick(0);

/* gallery arrows */
var strip=$('.strip');
$$('[data-dir]').forEach(function(b){b.addEventListener('click',function(){strip.scrollBy({left:parseInt(b.dataset.dir,10)*Math.min(520,strip.clientWidth*.8),behavior:reduce?'auto':'smooth'})})});

/* validation + forms */
function checkField(input){
  var f=input.closest('.field');if(!f)return true;var v=input.value.trim(),n=input.dataset.v,ok=true;
  if(n==='req')ok=v.length>1;
  if(n==='email')ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  if(n==='phone')ok=v.replace(/\D/g,'').length>=7;
  if(n==='sel')ok=v!=='';
  f.classList.toggle('bad',!ok);return ok;
}
function validate(form){var ok=true;$$('[data-v]',form).forEach(function(i){if(!checkField(i))ok=false});if(!ok){var b=$('.bad input,.bad select',form);b&&b.focus()}return ok}
$$('[data-v]').forEach(function(i){i.addEventListener('blur',function(){if(i.value)checkField(i)})});
var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
$$('input[type=date]').forEach(function(i){i.min=d.toISOString().slice(0,10)});
$$('form[data-confirm]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();if(!validate(form))return;
    var box=$('#'+form.dataset.confirm),fd=new FormData(form),rows=[];
    form.dataset.show.split(',').forEach(function(k){if(fd.get(k))rows.push([k.charAt(0).toUpperCase()+k.slice(1),fd.get(k)])});
    $('dl',box).innerHTML=rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+esc(r[1])+'</dd>'}).join('');
    form.hidden=true;box.classList.add('on');box.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
  });
});
$$('[data-again]').forEach(function(b){b.addEventListener('click',function(){var box=b.closest('.confirm');box.classList.remove('on');var f=box.parentNode.querySelector('form');f.hidden=false;f.reset()})});
})();
