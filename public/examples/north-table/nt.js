(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

function loadPh(el){
  el.classList.remove('has-img');el.style.backgroundImage='';
  var img=new Image();img.onload=function(){if(el.dataset.n===img.dataset.n){el.style.backgroundImage='url('+img.src+')';el.classList.add('has-img')}};
  img.dataset.n=el.dataset.n;img.src='assets/img/'+el.dataset.n+'.jpg';
}
$$('.ph[data-n]').forEach(loadPh);

/* mobile menu */
var burger=$('.burger'),mnav=$('.mnav');
function setMenu(o){burger.setAttribute('aria-expanded',String(o));mnav.classList.toggle('on',o);document.body.style.overflow=o?'hidden':''}
burger&&burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
$$('.mnav a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});

/* rail: current section */
var links=$$('.rail nav a');
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-35% 0px -55% 0px'});
  $$('main section[id]').forEach(function(s){io.observe(s)});
}

/* kitchen accordion with changing plate */
var plate=$('#kit-ph'),btns=$$('.acc-b');
function openAcc(b){
  btns.forEach(function(x){var o=x===b;x.setAttribute('aria-expanded',String(o))});
  if(plate){plate.dataset.t=b.dataset.t;plate.dataset.n=b.dataset.n;var c=$('i',plate);if(c)c.textContent=b.dataset.cap;plate.setAttribute('aria-label',b.dataset.cap);loadPh(plate)}
}
btns.forEach(function(b){b.addEventListener('click',function(){if(b.getAttribute('aria-expanded')==='true')return;openAcc(b)})});

/* validation */
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
    form.hidden=true;box.classList.add('on');
    if(!form.closest('.modal'))box.scrollIntoView({behavior:'smooth',block:'center'});
  });
});
$$('[data-again]').forEach(function(b){b.addEventListener('click',function(){var box=b.closest('.confirm');box.classList.remove('on');var f=box.parentNode.querySelector('form');f.hidden=false;f.reset()})});

/* private dining modal */
var modal=$('.modal'),lastFocus=null;
function openModal(){lastFocus=document.activeElement;modal.classList.add('on');document.body.style.overflow='hidden';var f=$('input',modal);f&&f.focus()}
function closeModal(){modal.classList.remove('on');document.body.style.overflow='';lastFocus&&lastFocus.focus()}
$$('[data-open-modal]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();openModal()})});
$$('[data-close-modal]').forEach(function(b){b.addEventListener('click',closeModal)});
modal&&modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal&&modal.classList.contains('on'))closeModal()});

/* preselect event type from cards */
$$('[data-event]').forEach(function(b){b.addEventListener('click',function(){var s=$('#e-type');if(s)s.value=b.dataset.event})});
})();
