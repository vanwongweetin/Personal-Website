// js for toggling between tabs in Experience & Project pages
const tabs = document.querySelectorAll('.tabBtn');
const allText = document.querySelectorAll('.text');

tabs.forEach((tab, index)=>{
    tab.addEventListener('click', ()=>{
        tabs.forEach(tab=>{tab.classList.remove('active')});
        tab.classList.add('active');
        
        allText.forEach(text=>{text.classList.remove('active')});
        allText[index].classList.add('active');
        })
    })