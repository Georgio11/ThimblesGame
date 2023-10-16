let langBtn = document.querySelector(".curent");
let langList = document.querySelector(".lang_list");
let threeangle = document.querySelector(".curent span");
let listElems = document.querySelectorAll(".lang_list li");
let langBtnText = document.querySelector(".curent p");
let itemContainers = document.querySelectorAll(".item_container");
let items = document.querySelectorAll(".thimble");
let startBtn = document.querySelector(".btn button");
let ticket1 = document.querySelectorAll(".ticket:nth-child(1)");
let ticket2 = document.querySelectorAll(".ticket:nth-child(2)");
let modal = document.querySelector(".modal");
let wrapper = document.querySelector(".wrapper");
let text = document.querySelector('.text p');
let modalText1 = document.querySelector(".modal p:nth-child(1)");
let modalText2 = document.querySelector(".modal p:nth-child(2)");
let modalBtn = document.querySelector(".modal a");

langBtn.addEventListener('click', () => {
    langList.classList.toggle('active');
    threeangle.classList.toggle('active');
});

listElems.forEach(listElem => {
    listElem.addEventListener('click', (e) => {
        const value = e.target.textContent;
        langBtnText.innerHTML = value;
        
        if (value === 'ua') {
            text.innerHTML = 'крути наперстки<br><span>отримуй розвагу</span>';
            startBtn.innerHTML = 'почати';
            modalText1.innerHTML = 'Ви перемогли!!!';
            modalText2.innerHTML = 'Ви програли';
            modalBtn.innerHTML = 'Ще раз';
        } else {
            text.innerHTML = 'Twist thimbles<br><span>get fun</span>';
            startBtn.innerHTML = 'start now';
            modalText1.innerHTML = 'you win!!!';
            modalText2.innerHTML = 'you lost';
            modalBtn.innerHTML = 'Restart';
        }

        langList.classList.remove('active');
        threeangle.classList.remove('active');
    });
});

let random = Math.floor(Math.random() * 3);

items.forEach(item => {
    if(item.classList.contains(`thimble${random}`)) {
        item.classList.add('up');
        item.classList.add('current');
        let parentItem = item.parentElement;
        let bonus = parentItem.querySelector('.bonus');
        bonus.classList.add('active');
        ticket1.forEach((t)=> {
            t.classList.add('active');
        });
        ticket2.forEach((t)=> {
            t.classList.add('active');
        });
    };
})

function trackTranslateY() {
    itemContainers.forEach(function (container, index) {
        container.addEventListener('animationstart', function (event) {
            if (event.animationName === 'spinFirst' || event.animationName === 'spinSecond' || event.animationName === 'spinThird') {
                function track() {
                    let computedStyles = window.getComputedStyle(container);
                    let transformMatrix = computedStyles.getPropertyValue('transform');
                    let matrix = new DOMMatrix(transformMatrix);
                    let translateY = matrix.m42;
                    
                    let parentContainer = container.parentElement;

                    parentContainer.style.zIndex = Math.floor(translateY) ;

                    requestAnimationFrame(track);
                }
                requestAnimationFrame(track);
            }
        });
    });
}

let count = 0;

startBtn.addEventListener('click', ()=> {
    items.forEach(item => {
        if(item.classList.contains(`thimble${random}`)) {
            item.classList.remove('up');
            // item.classList.remove('current');
            let parentItem = item.parentElement;
            setTimeout(()=> {
                let bonus = parentItem.querySelector('.bonus');
                bonus.classList.remove('active');
                ticket1.forEach((t)=> {
                    t.classList.remove('active');
                });
                ticket2.forEach((t)=> {
                    t.classList.remove('active');
                });
            }, 500);
        };
    })

    setTimeout(() => {
        itemContainers.forEach(itemContainer => {
            itemContainer.classList.add('active');
        });
        
    }, 500);

    setTimeout(()=> {
        items.forEach((item) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e)=> {
                
                setTimeout(()=> {
                    if(item.classList.contains(`thimble${random}`)) {
                        let parentItem = item.parentElement;
                        let bonus = parentItem.querySelector('.bonus');
                        bonus.classList.add('active');
                        ticket1.forEach((t)=> {
                            t.classList.add('active');
                        });
                        ticket2.forEach((t)=> {
                            t.classList.add('active');
                        });
                    };
                }, 150)

                if(e.target.classList.contains('current')) {
                    modalText1.classList.add('active');
                } else {
                    modalText2.classList.add('active');
                }

                if (count == 0) {
                    e.target.classList.add('active');
                    setTimeout(()=> {
                        ticket1.forEach((t)=> {
                            t.classList.add('active');
                        });
                        ticket2.forEach((t)=> {
                            t.classList.add('active');
                        });
                        setTimeout(()=> {
                            modal.classList.add('active');
                            setTimeout(()=> {
                                modal.classList.add('opacity');
                            }, 500)
                        }, 700);
                    }, 200);
                } else {
                    item.disabled = true;
                }
                count++;
            })
        })
    }, 3000)

    trackTranslateY();
});

function adaptationElements() {
    const aspectRatio = window.innerWidth / window.innerHeight;
    const aspectClass = aspectRatio >= 1.9
        ? 'modificate1'
        : aspectRatio >= 1.6
            ? 'modificate2'
            : aspectRatio > 1
                ? 'modificate3'
                : 'modificate4';

    wrapper.className = `wrapper ${aspectClass}`;
}

adaptationElements();

window.addEventListener('resize', adaptationElements);

