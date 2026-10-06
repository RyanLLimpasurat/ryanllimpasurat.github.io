(() => {
 const player=document.querySelector('#bear-player'); if(!player)return;
 document.querySelectorAll('[data-drive-id]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-drive-id]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  player.src=`https://drive.google.com/file/d/${button.dataset.driveId}/preview`;
  player.title=`BEAR: ${button.textContent}`;
  document.querySelector('#bear-video-title').textContent=button.textContent;
  document.querySelector('#bear-video-open').href=`https://drive.google.com/file/d/${button.dataset.driveId}/view`;
 }));
})();
