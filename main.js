(() => {
    
    const actions = {
        birdFlies(key){
            if(key){
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            }else{
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key){
            if(key){
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, -${window.innerHeight * 0.7}px)`;
            }else{
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0]; // 현재 활성화된 (visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    // IntersectionObserver, observe => 브라우저창에 보이는 div만 체크
    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; // * 1 => 문자열을 숫자로 변경
        // console.log(entries)
    })

    for(let i=0; i < stepElems.length; i++){
        io.observe(stepElems[i]);
        // stepElems[i].setAttribute('data-index', i); // data-index 속성 넣기
        stepElems[i].dataset.index=i; // data-index 속성 넣기
        graphicElems[i].dataset.index=i; // data-index 속성 넣기
    }

    function activate(action){
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action){
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);
        }
    }


    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        let temp = 0;

        //for(let i=0; i<stepElems.length; i++){
        for(let i=ioIndex - 1; i<ioIndex + 2; i++){
            step = stepElems[i];
            if(!step) continue;
            // getBoundingClientRect => div의 top,bottom,x,y등 실시간 값 확인
            boundingRect = step.getBoundingClientRect(); // console.log(boundingRect.top);

            temp++;

            if(boundingRect.top > window.innerHeight *  0.1 &&
                boundingRect.top < window.innerHeight * 0.8){
                // console.log(step.dataset.index);

                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }

        // console.log(temp)
    })

    // 최초 동작시 최상위에서 시작
    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();

})();