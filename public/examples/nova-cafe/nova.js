(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var eur=function(n){return '€'+n.toFixed(2)};

/* photo plates: drop assets/img/<name>.jpg to replace any plate */
$$('.ph[data-n]').forEach(function(el){
  var img=new Image();img.onload=function(){el.style.backgroundImage='url('+img.src+')';el.classList.add('has-img')};
  img.src='assets/img/'+el.dataset.n+'.jpg';
});

/* mobile menu */
var burger=$('.burger'),mnav=$('.mnav');
if(burger){burger.addEventListener('click',function(){
  var o=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!o));mnav.classList.toggle('on',!o);document.body.style.overflow=o?'':'hidden';
});}

/* cart state (localStorage with in-memory fallback) */
var KEY='nova-demo-cart',mem=[];
function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return mem}}
function save(c){mem=c;try{localStorage.setItem(KEY,JSON.stringify(c))}catch(e){}}
var cart=load();
function total(){return cart.reduce(function(s,i){return s+i.price*i.qty},0)}
function count(){return cart.reduce(function(s,i){return s+i.qty},0)}
function add(p,q){var f=cart.filter(function(i){return i.id===p.id})[0];if(f)f.qty+=q;else cart.push({id:p.id,name:p.name,price:p.price,qty:q});save(cart);paint();}
function setQty(id,q){cart=cart.filter(function(i){if(i.id===id){i.qty=q;return q>0}return true});save(cart);paint();}

function lineHtml(i){
  return '<div class="cart-line"><b>'+i.qty+' × '+i.name+'</b><span>'+eur(i.price*i.qty)+'</span>'+
  '<div class="qty" role="group" aria-label="Quantity for '+i.name+'"><button type="button" data-dec="'+i.id+'" aria-label="Remove one">−</button><output>'+i.qty+'</output><button type="button" data-inc="'+i.id+'" aria-label="Add one">+</button></div>'+
  '<button type="button" class="rm" data-rm="'+i.id+'">Remove</button></div>';
}
function paint(){
  $$('[data-cart-count]').forEach(function(e){e.textContent=count()});
  $$('[data-cart-view]').forEach(function(box){
    if(!cart.length){box.innerHTML='<p class="cart-empty">Your order is empty. Add a coffee to begin.</p><button class="btn btn-solid" disabled>Checkout</button>';return;}
    box.innerHTML=cart.map(lineHtml).join('')+'<div class="cart-total"><span>Total</span><span>'+eur(total())+'</span></div><button class="btn btn-solid" data-checkout>Checkout</button><p class="cart-note">Pickup at Nova Café. Taxes included. Demo order, nothing is prepared.</p>';
  });
}
document.addEventListener('click',function(e){
  var t=e.target.closest('button,a');if(!t)return;
  if(t.dataset.inc){var i=cart.filter(function(x){return x.id===t.dataset.inc})[0];setQty(t.dataset.inc,i.qty+1)}
  else if(t.dataset.dec){var j=cart.filter(function(x){return x.id===t.dataset.dec})[0];setQty(t.dataset.dec,j.qty-1)}
  else if(t.dataset.rm){setQty(t.dataset.rm,0)}
  else if(t.hasAttribute('data-checkout')){closeDrawer();openCheckout()}
  else if(t.hasAttribute('data-open-cart')){openDrawer()}
  else if(t.hasAttribute('data-add')){var d=t.dataset,q=1;var st=t.closest('.prod');if(st){var o=$('output',st);q=parseInt(o.textContent,10)||1;o.textContent='1'}
    add({id:d.id,name:d.name,price:parseFloat(d.price)},q);t.textContent='Added ✓';setTimeout(function(){t.textContent=t.dataset.label||'Add to order'},1100);if(window.innerWidth>1024&&$('.cart-panel'))return;if(!st)openDrawer();}
  else if(t.hasAttribute('data-step')){var out=$('output',t.parentNode);var v=Math.max(1,Math.min(20,(parseInt(out.textContent,10)||1)+parseInt(t.dataset.step,10)));out.textContent=v}
  else if(t.hasAttribute('data-close')){closeAll()}
});

/* drawer */
var scrim=$('.scrim'),drawer=$('.drawer'),modal=$('.modal');
function openDrawer(){drawer.classList.add('on');scrim.classList.add('on');drawer.setAttribute('aria-hidden','false');var c=$('.x',drawer);c&&c.focus()}
function closeDrawer(){drawer.classList.remove('on');drawer.setAttribute('aria-hidden','true');if(!modal.classList.contains('on'))scrim.classList.remove('on')}
function closeAll(){closeDrawer();closeModal()}
scrim&&scrim.addEventListener('click',closeAll);
modal&&modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll()});

/* checkout modal */
function openCheckout(){
  if(!cart.length)return;
  var tot=total();
  $('#co-lines').innerHTML=cart.map(function(i){return '<div class="sum-line"><span>'+i.qty+' × '+i.name+'</span><span>'+eur(i.price*i.qty)+'</span></div>'}).join('')+'<div class="sum-line t"><span>Total</span><span>'+eur(tot)+'</span></div>';
  $('#co-pay').textContent='PAY '+eur(tot)+' — DEMO';
  $('#co-form').hidden=false;$('#co-done').hidden=true;$('#co-head').hidden=false;
  modal.classList.add('on');scrim.classList.add('on');document.body.style.overflow='hidden';
  var f=$('#co-name');f&&f.focus();
}
function closeModal(){modal.classList.remove('on');document.body.style.overflow='';if(!drawer.classList.contains('on'))scrim.classList.remove('on')}
function bad(f,v){f.classList.toggle('bad',v);return v}
function checkField(input){
  var f=input.closest('.field');if(!f)return false;var v=input.value.trim(),n=input.dataset.v,ok=true;
  if(n==='req')ok=v.length>1;
  if(n==='email')ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  if(n==='phone')ok=v.replace(/\D/g,'').length>=7;
  if(n==='card')ok=v.replace(/\s/g,'').length>=15;
  if(n==='exp')ok=/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(v);
  if(n==='cvc')ok=/^\d{3,4}$/.test(v);
  if(n==='sel')ok=v!=='';
  return !bad(f,!ok);
}
function validate(form){var ok=true;$$('[data-v]',form).forEach(function(i){if(!checkField(i))ok=false});if(!ok){var b=$('.bad input,.bad select',form);b&&b.focus()}return ok}
$$('[data-v]').forEach(function(i){i.addEventListener('blur',function(){if(i.value)checkField(i)})});
var cn=$('#co-card');cn&&cn.addEventListener('input',function(){var v=cn.value.replace(/\D/g,'').slice(0,16);cn.value=v.replace(/(.{4})/g,'$1 ').trim()});
var ce=$('#co-exp');ce&&ce.addEventListener('input',function(){var v=ce.value.replace(/\D/g,'').slice(0,4);ce.value=v.length>2?v.slice(0,2)+' / '+v.slice(2):v});
var coForm=$('#co-form');
coForm&&coForm.addEventListener('submit',function(e){
  e.preventDefault();if(!validate(coForm))return;
  var num='NOVA-'+Math.floor(1000+Math.random()*9000),when=$('#co-time').value;
  $('#co-ref').textContent=num+' · pickup '+when;
  coForm.hidden=true;$('#co-head').hidden=true;$('#co-done').hidden=false;
  cart=[];save(cart);paint();
});
$$('[data-fill-card]').forEach(function(b){b.addEventListener('click',function(){$('#co-card').value='4242 4242 4242 4242';$('#co-exp').value='12 / 29';$('#co-cvc').value='123';['#co-card','#co-exp','#co-cvc'].forEach(function(s){checkField($(s))})})});

/* tabs: Today at Nova */
$$('[data-tabs]').forEach(function(root){
  var tabs=$$('[role=tab]',root),panels=$$('.today-panel',root);
  function pick(i){tabs.forEach(function(t,k){t.setAttribute('aria-selected',String(k===i));t.tabIndex=k===i?0:-1});panels.forEach(function(p,k){p.classList.toggle('on',k===i)})}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){pick(i)});t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){pick((i+1)%tabs.length);tabs[(i+1)%tabs.length].focus()}if(e.key==='ArrowLeft'){var p=(i+tabs.length-1)%tabs.length;pick(p);tabs[p].focus()}})});
  pick(0);
});

/* order page category highlight */
var catLinks=$$('.cat-nav a');
if(catLinks.length&&'IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){catLinks.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
  $$('.ocat').forEach(function(s){io.observe(s)});
}

/* reservations */
var dt=$('#r-date');if(dt){var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());dt.min=d.toISOString().slice(0,10)}
$$('form[data-confirm]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();if(!validate(form))return;
    var box=$('#'+form.dataset.confirm);var fd=new FormData(form);
    var rows=[['Date',fd.get('date')],['Time',fd.get('time')],['Guests',fd.get('guests')],['Name',fd.get('name')],['Email',fd.get('email')]];
    $('dl',box).innerHTML=rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+String(r[1]).replace(/</g,'&lt;')+'</dd>'}).join('');
    form.hidden=true;box.classList.add('on');box.scrollIntoView({behavior:'smooth',block:'center'});
  });
});
$$('[data-again]').forEach(function(b){b.addEventListener('click',function(){var box=b.closest('.confirm');box.classList.remove('on');var f=box.previousElementSibling;f.hidden=false;f.reset()})});

paint();
})();
