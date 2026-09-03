const form=document.getElementById("demoForm");const success=document.getElementById("success");
form.addEventListener("submit",e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));console.log("Demo submission:",data);form.hidden=true;success.hidden=false;window.scrollTo({top:document.getElementById("submit").offsetTop-30,behavior:"smooth"});});
