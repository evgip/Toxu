import { createWidget } from 'discourse/widgets/widget';
import RawHtml from 'discourse/widgets/raw-html';

export default createWidget('sub-menu', {
  buildKey: (args) => 'user-profile',

  html(args, state) {
    const { currentUser } = this;
    let contents = []
    if (currentUser) {
    const trust_level = currentUser.get('trust_level');
    const username = currentUser.get('username');
    
 if (trust_level == 0) { var bw = 3;  }
 if (trust_level == 1) { var bw = 25; } 
 if (trust_level == 2) { var bw = 50; } 
 if (trust_level == 3) { var bw = 75; }
 if (trust_level == 4) { var bw = 100; } 
 
 
 
 
 $.ajax({
  url: "/u/"+ username +".json", 
  dataType: 'json',
  async: false,
  success: function(data) {
	
  const badge_count = data.user.badge_count;
  var badge_num = badge_count*2;   
  var profile_view_count = data.user.profile_view_count;
	  
//10минут = 600 сек, 1 часе = 3600 сек, 1 дне = 86400 сек 	  
//"time_read":85202,"recent_time_read":36457

//9100 секунд это 3 часа. 24 часа это 100 процентов, сколько будет 3 часа

var tim = data.user.time_read;
    
var t_m = tim/60;
var t_minut = t_m.toFixed();
var t_m_gr = (t_hour*100)/60; 
var t_mm_gr = t_m_gr.toFixed();    
    
var t_c =  tim/3600;
var t_hour = t_c.toFixed();
var t_h_gr = (t_hour*100)/24; 
var t_hh_gr = t_h_gr.toFixed();     

var t_d =  tim/86400;
var t_day = t_d.toFixed();


if (t_minut < 60) { var vrema = 'minute'; var vrema_t = t_minut; var grad = t_mm_gr; var t_op = 'мин.'; var t_ops = '30 минут';}
if (t_hour > 0) { var vrema = 'hour'; var vrema_t = t_hour; var grad = t_hh_gr; var t_op = 'ч.';  var t_ops = '12 часов';}
if (t_day > 0) { var vrema = 'day'; var vrema_t = t_day; var grad = t_day; var t_op = 'д.';  var t_ops = 'дней просмотра';}	  
	
 console.log(t_h_gr);   
 
if (trust_level === 0) { 

contents.push(
new RawHtml({ html: `<div>  

<div class="title">Мой профиль<span id="toxu">
<a class="link" title="Настройка аккаунта" target="_blank" href="https://toxu.ru/u/${username}/preferences/account"><i class="fa fa-cog" aria-hidden="true"></i></a></span></div>


<div class="mn"> <i class="fa fa-clock-o" aria-hidden="true"></i> <i>Общее время чтения</i> является важным показателем на сайте.</div>

<center>0<div class="progress-circle p${grad}">
   <span>${vrema_t} ${t_op}</span>
   <div class="left-half-clipper">
      <div class="first50-bar"></div>
      <div class="value-bar ${vrema}"></div>
   </div>
</div>${t_ops} </center><br>



<div class="mn"> Ваш уровень доверия - <a class="cvet" href="https://toxu.ru/stats"><i>посетитель</i>.</a></div>

Уровень доверия (из 4)<br>
<div class="all-bar"><a title="Уровень доверия" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-1" style="height:12px;width:${bw}%"></div></div> <div class="n-bar">${trust_level}</div></a></div>

<br>Количество наград (из 50)<br>
<div class="all-bar"><a title="Награды" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-2" style="height:12px;width:${badge_num}%"></div></div> <div class="n-bar">${badge_count}</div></a></div>
<br>

<div class="mn"> Посмотреть <a class="cvet" href="https://toxu.ru/u/${username}/badges">мои награды.</a></div>



<div class="mn">Мой профиль смотрели: <span class="pr-view">${profile_view_count}</span> раз</div>
 
<div class="mn"><i aria-hidden="true" class="fa fa-question-circle-o"></i> У вас возник вопрос о самом сайте? <a href="https://toxu.ru/c/toxu">Вопросы по сайту</a> - это место, где можно говорить о таких вещах.</div>
 
 
<a href="/tags" class="tag-факты discourse-tag bullet">все теги</a> <a href="/tags/факты" class="tag-факты discourse-tag bullet">факты</a>

</div>`}));

}
if (trust_level === 1) { 
contents.push(
new RawHtml({ html: `<div>  

<div class="title">Мой профиль<span id="toxu">
<a class="link" title="Настройка аккаунта" target="_blank" href="https://toxu.ru/u/${username}/preferences/account"><i class="fa fa-cog" aria-hidden="true"></i></a></span></div>


<div class="mn"> <i class="fa fa-clock-o" aria-hidden="true"></i> <i>Общее время чтения</i> является важным показателем на сайте.</div>

<center>0<div class="progress-circle p${grad}">
   <span>${vrema_t} ${t_op}</span>
   <div class="left-half-clipper">
      <div class="first50-bar"></div>
      <div class="value-bar ${vrema}"></div>
   </div>
</div>${t_ops} </center><br>



<div class="mn"> Ваш уровень доверия - <a class="cvet" href="https://toxu.ru/stats"><i>пользователь</i>.</a></div>

Уровень доверия (из 4)<br>
<div class="all-bar"><a title="Уровень доверия" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-1" style="height:12px;width:${bw}%"></div></div> <div class="n-bar">${trust_level}</div></a></div>

<br>Количество наград (из 50)<br>
<div class="all-bar"><a title="Награды" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-2" style="height:12px;width:${badge_num}%"></div></div> <div class="n-bar">${badge_count}</div></a></div>
<br>

<div class="mn"> Посмотреть <a class="cvet" href="https://toxu.ru/u/${username}/badges">мои награды.</a></div>



<div class="mn">Мой профиль смотрели: <span class="pr-view">${profile_view_count}</span> раз</div>
 
<div class="mn"><i aria-hidden="true" class="fa fa-question-circle-o"></i> У вас возник вопрос о самом сайте? <a href="https://toxu.ru/c/toxu">Вопросы по сайту</a> - это место, где можно говорить о таких вещах.</div>
 
 
<a href="/tags" class="tag-факты discourse-tag bullet">все теги</a> <a href="/tags/факты" class="tag-факты discourse-tag bullet">факты</a>

</div>`}));

}
if (trust_level === 2) { 

contents.push(
new RawHtml({ html: `<div>  

<div class="title">Мой профиль<span id="toxu">
<a class="link" title="Настройка аккаунта" target="_blank" href="https://toxu.ru/u/${username}/preferences/account"><i class="fa fa-cog" aria-hidden="true"></i></a></span></div>


<div class="mn"> <i class="fa fa-clock-o" aria-hidden="true"></i> <i>Общее время чтения</i> является важным показателем на сайте.</div>

<center>0<div class="progress-circle p${grad}">
   <span>${vrema_t} ${t_op}</span>
   <div class="left-half-clipper">
      <div class="first50-bar"></div>
      <div class="value-bar ${vrema}"></div>
   </div>
</div>${t_ops} </center><br>



<div class="mn"> Ваш уровень доверия - <a class="cvet" href="https://toxu.ru/stats"><i>участник</i>.</a></div>

Уровень доверия (из 4)<br>
<div class="all-bar"><a title="Уровень доверия" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-1" style="height:12px;width:${bw}%"></div></div> <div class="n-bar">${trust_level}</div></a></div>

<br>Количество наград (из 50)<br>
<div class="all-bar"><a title="Награды" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-2" style="height:12px;width:${badge_num}%"></div></div> <div class="n-bar">${badge_count}</div></a></div>
<br>

<div class="mn"> Посмотреть <a class="cvet" href="https://toxu.ru/u/${username}/badges">мои награды.</a></div>



<div class="mn">Мой профиль смотрели: <span class="pr-view">${profile_view_count}</span> раз</div>
 
<div class="mn"><i aria-hidden="true" class="fa fa-question-circle-o"></i> У вас возник вопрос о самом сайте? <a href="https://toxu.ru/c/toxu">Вопросы по сайту</a> - это место, где можно говорить о таких вещах.</div>
 
 
<a href="/tags" class="tag-факты discourse-tag bullet">все теги</a> <a href="/tags/факты" class="tag-факты discourse-tag bullet">факты</a>



</div>`}));

}
if (trust_level === 3) { 

contents.push(
new RawHtml({ html: `<div>  

<div class="title">Мой профиль<span id="toxu">
<a class="link" title="Настройка аккаунта" target="_blank" href="https://toxu.ru/u/${username}/preferences/account"><i class="fa fa-cog" aria-hidden="true"></i></a></span></div>


<div class="mn"> <i class="fa fa-clock-o" aria-hidden="true"></i> <i>Общее время чтения</i> является важным показателем на сайте.</div>

<center>0<div class="progress-circle p${grad}">
   <span>${vrema_t} ${t_op}</span>
   <div class="left-half-clipper">
      <div class="first50-bar"></div>
      <div class="value-bar ${vrema}"></div>
   </div>
</div>${t_ops} </center><br>



<div class="mn"> Ваш уровень доверия - <a class="cvet" href="https://toxu.ru/stats"><i>постоялец</i>.</a></div>

Уровень доверия (из 4)<br>
<div class="all-bar"><a title="Уровень доверия" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-1" style="height:12px;width:${bw}%"></div></div> <div class="n-bar">${trust_level}</div></a></div>

<br>Количество наград (из 50)<br>
<div class="all-bar"><a title="Награды" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-2" style="height:12px;width:${badge_num}%"></div></div> <div class="n-bar">${badge_count}</div></a></div>
<br>

<div class="mn"> Посмотреть <a class="cvet" href="https://toxu.ru/u/${username}/badges">мои награды.</a></div>



<div class="mn">Мой профиль смотрели: <span class="pr-view">${profile_view_count}</span> раз</div>
 
<div class="mn"><i aria-hidden="true" class="fa fa-question-circle-o"></i> У вас возник вопрос о самом сайте? <a href="https://toxu.ru/c/toxu">Вопросы по сайту</a> - это место, где можно говорить о таких вещах.</div>
 
 
<a href="/tags" class="tag-факты discourse-tag bullet">все теги</a> <a href="/tags/факты" class="tag-факты discourse-tag bullet">факты</a>

</div>`}));

}

if (trust_level === 4) { 
contents.push(
new RawHtml({ html: `<div>  


<div class="title">Мой профиль<span id="toxu">
<a class="link" title="Настройка аккаунта" target="_blank" href="https://toxu.ru/u/${username}/preferences/account"><i class="fa fa-cog" aria-hidden="true"></i></a></span></div>


<div class="mn"> <i class="fa fa-clock-o" aria-hidden="true"></i> <i>Общее время чтения</i> является важным показателем на сайте.</div>

<center>0<div class="progress-circle p${grad}">
   <span>${vrema_t} ${t_op}</span>
   <div class="left-half-clipper">
      <div class="first50-bar"></div>
      <div class="value-bar ${vrema}"></div>
   </div>
</div>${t_ops} </center><br>



<div class="mn"> Ваш уровень доверия - <a class="cvet" href="https://toxu.ru/stats"><i>лидер</i>.</a></div>

Уровень доверия (из 4)<br>
<div class="all-bar"><a title="Уровень доверия" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-1" style="height:12px;width:${bw}%"></div></div> <div class="n-bar">${trust_level}</div></a></div>

<br>Количество наград (из 50)<br>
<div class="all-bar"><a title="Награды" href="/qa/${username}"><div class="pgbar cv-1"><div class="bar-b pol-2" style="height:12px;width:${badge_num}%"></div></div> <div class="n-bar">${badge_count}</div></a></div>
<br>

<div class="mn"> Посмотреть <a class="cvet" href="https://toxu.ru/u/${username}/badges">мои награды.</a></div>



<div class="mn">Мой профиль смотрели: <span class="pr-view">${profile_view_count}</span> раз</div>
 
<div class="mn"><i aria-hidden="true" class="fa fa-question-circle-o"></i> Раздел <a href="https://toxu.ru/c/dev">dev</a> - для разработки...</div>
 
 
<a href="/tags" class="tag-факты discourse-tag bullet">все теги</a> <a href="/tags/факты" class="tag-факты discourse-tag bullet">факты</a>


</div>`}));
}   

 }
 });
   
} else {

contents.push(
new RawHtml({ html: `<div>
<div class="title">Другое<span id="toxu"></div>

<div class="mn"> <i aria-hidden="true" class="fa fa-trophy"></i> Про уровень доверия - <b>лидер</b>. Узнайте <a class="cvet" href="https://toxu.ru/t/uroven-doveriya-na-sajte-toxu-ru/61">больше.</a></div>
<div class="mn"> <i class="fa fa-star-o"></i> Посмотреть <a class="cvet" href="https://toxu.ru/help">раздел помощь.</a></div>
<div class="mn"> <i aria-hidden="true" class="fa fa-question-circle-o"></i> У вас есть предложения по сайту? <a href="https://toxu.ru/t/predlozheniya-pozhelaniya-po-sajtu-toxu-ru-obshhaya-tema/4544">Напишите</a> про них.</div>

</div>`}) );
  

}
return contents;
}});
