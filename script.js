
let shortBtn = document.querySelector(".url_s");
shortBtn.addEventListener('click', (e) => checkLink(e))

function checkLink(e){
    let shortIn = document.querySelector('.url');
    let shortErr = document.querySelector('.sh_err');
    let shortList = document.querySelector(".sh_urls")
    shortErr.style.opacity = "0"
    shortIn.value.length == 0 ? shortErr.style.opacity = "1" : 
    creatShort(shortErr,shortIn,shortList);
}
function creatShort(err,In,list){
    
    let link = new Promise((resolve) => {
        let waitDiv = createElementFnc("Create short link...","",false,list)
        resolve(waitDiv)
    })

    link.then((res) => {
        fetch(`https://api.shrtco.de/v2/shorten?url=${In.value}`)
            .then(result => result.json())
            .then(resolve => {
                list.removeChild(list.lastChild)
                    resolve.ok ? showShort(resolve,list,In) : showErr(resolve,err,list,In);
            })
            .then(resolve => {
                console.log("ccc")
                let copyBtns = document.querySelectorAll(".url_btn");
                copyBtns.forEach(c => {
                    c.addEventListener("click", (e) => {
                        let shr = e.target.previousElementSibling;
                        copyToClipboard(c,e,shr)
                    })
                })
            })
        }
    )
}
function showShort(r,l,i){
    createElementFnc(`${i.value}`,`${r.result.short_link}`,true,l)
}
function showErr(r,e,l,In){
    e.style.opacity = "1";
    createElementFnc(`${r.error.split(",")[0]} ==> ${In.value}`,"",false,l)
}
function createElementFnc(i,i2,v,l){
    if(v){
        let name = document.createElement("div")
            name.classList.add("url");
            name.innerHTML = `
            <p class="url_p">${i}</p>
            <a class="url_a" href="${i2}" value="${i2}">${i2}</a>
            <button class="url_btn">Copy</button>
            `
        l.appendChild(name);
    }else{
        let na = document.createElement("div")
            na.classList.add("url");
            na.innerHTML = `
            <p class="url_p" style="width:100%;">${i}</p>
            `
        l.appendChild(na);
    }
}
function copyToClipboard(c,e,t){
    var range = document.createRange();
    range.selectNode(t);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
}


//  nav

window.innerWidth < 750 ? navFunction() : null;
let open = false;

function navFunction(){
    let humb  = document.querySelector(".humb");
    
    humb.addEventListener("click", (e) => nav(e));
    humb.addEventListener("touch", (e) => nav(e))
}

function nav(e){
    let nav = document.querySelector(".nav")
    let nLeft = document.querySelector(".n-left")
    let leftP = document.querySelectorAll(".left_p")
    let rightP = document.querySelector(".right_p")
    let btnNav = document.querySelector(".click")
    
    !open ? open = navShow(e,open,nav,nLeft,leftP,rightP,btnNav) : open = navClose(e,open,nav,nLeft,leftP,rightP,btnNav);
}
function navShow(e,open,nav,l,p,rp,b){
    
    let top = 0;
    window.innerWidth < 280 ? top = "45vw" : window.innerWidth < 600 ? top = "30vw" : top = "9rem";

    e.path[0].src = "images/times-solid.svg"
    setTimeout(() => {
        nav.style.top = top;
        setTimeout(() => {
            nav.style.opacity = "1";

            setTimeout(() => {
               l.style.top = "0"; 
               
               p.forEach((x,b) => {
                   setTimeout(() => {
                       x.style.top = "0";
                       setTimeout(() => {
                           x.style.opacity = "1";
                       }, 30 * (b + 1));
                   }, 100 * (b + 1));
               })
               setTimeout(() => {
                   rp.style.top = "0";
                   setTimeout(() => {
                       rp.style.opacity = "1"
                       
                       b.style.top = "0"
                       setTimeout(() => {
                           b.style.opacity = "1"
                       }, 150);
                   }, 150);
               }, 400);
            }, 250);
        }, 300);
    }, 50);

    open  = true;
    return open ;
}
function navClose(e,open,nav,l,p,rp,b){
    e.path[0].src = "images/bars-solid.svg"
    setTimeout(() => {
        rp.style.top = "-30vh"
        rp.style.opacity = "0"
        setTimeout(() => {
            b.style.opacity = "0";
            b.style.top = "-30vh"

            p.forEach((x,b) => {
                setTimeout(() => {
                    x.style.opacity = "0";
                    setTimeout(() => {
                        x.style.top = "30vh";
                    }, 350 * (b + 1));
                }, 10 * (b + 1));
            })
            setTimeout(() => {
                l.style.top = "-30vw"; 
                nav.style.opacity = "0";
                setTimeout(() => {
                    nav.style.top = "-100rem";
                }, 200);
            }, 80);
        }, 150);
    }, 50);
    open  = false;
    return open ;
}