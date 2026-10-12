(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var eur=function(n){return '€'+n.toFixed(2).replace(/\.00$/,'')};
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

$$('.ph[data-n]').forEach(function(el){
  var img=new Image();img.onload=function(){el.style.backgroundImage='url('+img.src+')';el.classList.add('has-img')};
  img.src='assets/img/'+el.dataset.n+'.jpg';
});

var burger=$('.burger'),mnav=$('.mnav');
if(burger){burger.addEventListener('click',function(){var o=burger.getAttribute('aria-expanded')==='true';burger.setAttribute('aria-expanded',String(!o));mnav.classList.toggle('on',!o);document.body.style.overflow=o?'':'hidden'})}

/* validation */
function checkField(input){
  var f=input.closest('.field');if(!f)return true;var v=input.value.trim(),n=input.dataset.v,ok=true;
  if(n==='req')ok=v.length>1;
  if(n==='email')ok=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  if(n==='phone')ok=v.replace(/\D/g,'').length>=7;
  if(n==='card')ok=v.replace(/\s/g,'').length>=15;
  if(n==='exp')ok=/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(v);
  if(n==='cvc')ok=/^\d{3,4}$/.test(v);
  if(n==='sel')ok=v!=='';
  f.classList.toggle('bad',!ok);return ok;
}
function validate(form){var ok=true;$$('[data-v]',form).forEach(function(i){if(i.closest('[hidden]'))return;if(!checkField(i))ok=false});if(!ok){var b=$('.bad input,.bad select',form);b&&b.focus()}return ok}
$$('[data-v]').forEach(function(i){i.addEventListener('blur',function(){if(i.value)checkField(i)})});

/* min date */
var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());var today=d.toISOString().slice(0,10);
$$('input[type=date]').forEach(function(i){i.min=today});

/* generic confirm forms (reservations, contact) */
$$('form[data-confirm]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(form.dataset.needSlot&&!$('#r-time').value){var m=$('.slot-msg');m.textContent='Choose a date, check availability and pick a time first.';m.style.color='#8a2f1d';return}
    if(!validate(form))return;
    var box=$('#'+form.dataset.confirm),fd=new FormData(form),rows=[];
    (form.dataset.show||'name,email').split(',').forEach(function(k){if(fd.get(k))rows.push([k.charAt(0).toUpperCase()+k.slice(1),fd.get(k)])});
    $('dl',box).innerHTML=rows.map(function(r){return '<dt>'+r[0]+'</dt><dd>'+esc(r[1])+'</dd>'}).join('');
    form.hidden=true;box.classList.add('on');box.scrollIntoView({behavior:'smooth',block:'center'});
  });
});
$$('[data-again]').forEach(function(b){b.addEventListener('click',function(){var box=b.closest('.confirm');box.classList.remove('on');var f=box.parentNode.querySelector('form');f.hidden=false;f.reset();$$('.slots',f).forEach(function(s){s.innerHTML=''})})});

/* availability */
var avail=$('#check');
if(avail){
  var TIMES=['18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30'];
  avail.addEventListener('click',function(){
    var date=$('#r-date'),guests=$('#r-guests'),msg=$('.slot-msg'),box=$('.slots');
    var ok=checkField(date)&checkField(guests);if(!ok){msg.textContent='Choose a date and number of guests.';msg.style.color='#8a2f1d';return}
    var dow=new Date(date.value+'T12:00:00').getDay();
    if(dow===0||dow===1){box.innerHTML='';msg.style.color='';msg.textContent='Aurelia is closed on Sunday and Monday. Please choose Tuesday to Saturday.';return}
    var seed=0,s=date.value+guests.value;for(var i=0;i<s.length;i++)seed=(seed*31+s.charCodeAt(i))>>>0;
    box.innerHTML=TIMES.map(function(t,i){var off=((seed>>(i%7))&1)&&((seed>>(i+3))&1);return '<button type="button" aria-pressed="false"'+(off?' disabled':'')+'>'+t+'</button>'}).join('');
    msg.style.color='';msg.textContent='Struck-through times are fully booked. Select a time to continue.';
    $('#r-time').value='';
    $$('button',box).forEach(function(b){b.addEventListener('click',function(){$$('button',box).forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');$('#r-time').value=b.textContent;msg.textContent='Selected '+b.textContent+'. Add your details and request the reservation.'})});
  });
  ['r-date','r-guests'].forEach(function(id){$('#'+id).addEventListener('change',function(){$('.slots').innerHTML='';$('#r-time').value=''})});
}

/* experiences + demo checkout */
var exps=$$('.exp[data-exp]'),summary=$('.summary'),co=$('.co'),sel=null;
function select(el){
  exps.forEach(function(x){x.classList.toggle('sel',x===el)});
  var gift=el.dataset.exp==='gift',price=gift?parseInt($('.amounts [aria-pressed=true]',el).dataset.v,10):parseInt(el.dataset.price,10);
  sel={id:el.dataset.exp,name:el.dataset.name,price:price,gift:gift,guests:gift?'Digital voucher':'2 guests'};
  $('#sum-name').textContent=sel.name;$('#sum-meta').textContent=eur(sel.price)+' · '+sel.guests;summary.classList.add('on');
}
exps.forEach(function(el){
  var b=$('[data-select]',el);b.addEventListener('click',function(){select(el);b.textContent='Selected';exps.forEach(function(x){if(x!==el)$('[data-select]',x).textContent='Select experience'})});
  $$('.amounts button',el).forEach(function(a){a.addEventListener('click',function(){$$('.amounts button',el).forEach(function(x){x.setAttribute('aria-pressed','false')});a.setAttribute('aria-pressed','true');if(el.classList.contains('sel'))select(el)})});
});
var go=$('#continue');
function showCo(){
  $('#co-name-t').textContent=sel.name;
  $('#co-lines').innerHTML='<div class="sl"><span>'+esc(sel.name)+'</span><span>'+eur(sel.price)+'</span></div><div class="sl"><span>'+sel.guests+'</span><span></span></div><div class="sl t"><span>Total</span><span>'+eur(sel.price)+'</span></div>';
  $('#co-gift').hidden=!sel.gift;$('#co-visit').hidden=sel.gift;
  $('#co-main').hidden=false;$('#co-done').hidden=true;
  co.classList.add('on');document.body.style.overflow='hidden';co.scrollTop=0;
}
go&&go.addEventListener('click',function(){if(sel)showCo()});
$$('[data-close-co]').forEach(function(b){b.addEventListener('click',function(){co.classList.remove('on');document.body.style.overflow=''})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&co&&co.classList.contains('on')){co.classList.remove('on');document.body.style.overflow=''}});
var cn=$('#co-card');cn&&cn.addEventListener('input',function(){var v=cn.value.replace(/\D/g,'').slice(0,16);cn.value=v.replace(/(.{4})/g,'$1 ').trim()});
var ce=$('#co-exp');ce&&ce.addEventListener('input',function(){var v=ce.value.replace(/\D/g,'').slice(0,4);ce.value=v.length>2?v.slice(0,2)+' / '+v.slice(2):v});
var fill=$('[data-fill]');fill&&fill.addEventListener('click',function(){$('#co-card').value='4242 4242 4242 4242';$('#co-exp').value='12 / 29';$('#co-cvc').value='123';['#co-card','#co-exp','#co-cvc'].forEach(function(s){checkField($(s))})});
var cf=$('#co-form');
cf&&cf.addEventListener('submit',function(e){
  e.preventDefault();if(!validate(cf))return;
  $('#co-ref').textContent='AUR-'+Math.floor(10000+Math.random()*89999);
  $('#co-done-text').textContent=sel.gift?'Your fictional Aurelia gift certificate has been confirmed.':'Your fictional Aurelia booking has been confirmed.';
  $('#co-main').hidden=true;$('#co-done').hidden=false;co.scrollTop=0;
});
})();
