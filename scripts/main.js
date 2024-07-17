const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

let active = false;
let typing_status = false;
let input_element = null;
let typingInterval = null;

window.onload = () => {
    console.log('run');

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.shiftKey) {
            e.preventDefault();

            active = !active;
            console.log("Status : ", active);


            if (!active) {
                console.log('Deactivated auto typing for element', input_element);

                resetFunction();                
            } else {
                activePopUp()

                console.log('Activated auto typing');

                document.onmouseover = (e) => {
                    if (!typing_status) {
                        e.target.addEventListener('click', typingFunction, true);
                    }
                }
            }
        }
    });    
};

const typingFunction = (el) => {
    if ((el.target.tagName === "INPUT" || el.target.tagName === 'TEXTAREA') && input_element === null && active) {
        input_element = el.target;
        
        console.log('Active for element : ', input_element)
        console.log('Typing function : ', typing_status);
        
        if (!typing_status) {
            typing_status = true;

            typingInterval = setInterval(() => {
                const random_index = Math.floor(Math.random() * alphabet.length);
                input_element.value += alphabet[random_index];
            }, 100);
        }
    } else {
        el.target.removeEventListener('click', typingFunction, true);
    }

    if ((el.target.tagName !== "INPUT" && el.target.tagName !== 'TEXTAREA')) {
        console.error('HTML TAG NOT SUPPORTED !!!');
        error();
    }
}

const resetFunction = () => {
    typing_status = false;

    clearInterval(typingInterval);

    if (input_element != null) {
        input_element.value = '';
        input_element = null;
    }
    
    const pop_up = document.querySelector('#auto-typing');
    pop_up.remove();

    document.onmouseover = null;
}

const activePopUpDrag = () => {
    const popup_element = document.querySelector('#auto-typing');

    popup_element.onmousedown = dragMouseDown

    function dragMouseDown(e) {
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        popup_element.style.top = (popup_element.offsetTop - pos2) + "px";
        popup_element.style.left = (popup_element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const activePopUp = () => {
    console.log('run pop up');

    const html = `
        <div class="box"> 
            Auto Typing Active
        </div>

        <style>
            #auto-typing {
                position: absolute;
                top: 10px;
                left: 10px;
                cursor: move;
            }

            #auto-typing .box {
                padding: 5px 10px;
                background-color: #4bbf00;
                width: fit-content;
                color: #fff;
                font-weight: bold;
                border-radius: 10px;
                position: relative;
                z-index: 9999999999999999;
            }
        </style>
    `

    const element_wrapper = document.createElement('div');

    element_wrapper.setAttribute('id', 'auto-typing');
    element_wrapper.innerHTML = html;

    document.body.appendChild(element_wrapper);

    activePopUpDrag();
}

const error = () => {
    const html = `
        <div class="error-box"> 
            HTML TAG IS NOT SUPPORTED !!!
        </div>

        <style>
            #auto-typing-error {
                position: absolute;
                left: 0;
                right: 0;
                top: 20px;
                margin-left: auto;
                margin-right: auto;
                width: fit-content;
                transform: translateY(0px);
                opacity: 1;
                transition: 0.8s ease-in-out;
            }

            #auto-typing-error .error-box {
                padding: 5px 10px;
                background-color: #ff666e;
                width: fit-content;
                color: #fff;
                font-weight: bold;
                border-radius: 10px;
                position: relative;
                z-index: 9999999999999999;
            }
        </style>
    `

    const element_wrapper = document.createElement('div');

    element_wrapper.setAttribute('id', 'auto-typing-error');
    element_wrapper.innerHTML = html;

    document.body.appendChild(element_wrapper);

    setTimeout(() => {
        element_wrapper.style.transform = 'translateY(-50px)';
        element_wrapper.style.opacity = 0;
        
        setTimeout(() => {
            element_wrapper.remove();
        }, 800)
    }, 600);
}
