
window.addEventListener("load",()=>{
    const number = document.querySelector(".number");
    const buttons = [...document.querySelectorAll(".btn")];
    const clear = document.querySelector(".clear")
    const clearPermenantly = document.querySelector(".clear-permenantly")
    let decimal = false;
    let placeholderNum = NaN;
    let curOperation = ""

    let operation = (num) => {
        switch (curOperation) {
            case "add":
                placeholderNum += num
                break;
            case "subtract":
                placeholderNum -= num
                break;
            case "multiply":
                placeholderNum *= num
                break;
            case "divide":
                placeholderNum /= num
                break;
            case "square-root":
                placeholderNum += Math.sqrt(num)
        }
    }

    clear.addEventListener("click", ()=>{
        (number.innerText[number.innerText.length-1] === ".") ? decimal = false : decimal;
        number.innerText = number.innerText.slice(0,number.innerText.length-1);
    })

    clearPermenantly.addEventListener("click",()=>{
        placeholderNum = NaN
        number.innerText = ""
    })

    buttons.forEach((btn)=>{
        if (!Number.isNaN(+(btn.textContent))){
            btn.addEventListener("click",()=>{
                if(number.innerText.length < 8){
                    // (!decimal) ? number.innerText = btn.innerText + number.innerText : number.innerText += btn.innerText
                    number.innerText = number.innerText + btn.innerText
                }
            })
        } else if (btn.classList.contains("decimal")) {
            btn.addEventListener("click",()=>{
                if (number.innerText.length < 8){
                    if (!decimal){
                        number.innerText += btn.innerText
                    }
                    decimal = true;
                }
            })
        } else if(btn.classList.contains("add")) {
            btn.addEventListener("click",()=>{
                let num = +(number.innerText);
                if (Number.isNaN(placeholderNum)){
                    placeholderNum = num
                } else {
                    // console.log(curOperation + " " + num)
                    operation(num)
                }
                number.innerText = ""
                curOperation = "add"
            })
        } else if(btn.classList.contains("subtract")) {
            btn.addEventListener("click",()=>{
                let num = +(number.innerText);
                if (Number.isNaN(placeholderNum)){
                    placeholderNum = num
                } else {
                    operation(num)
                }
                number.innerText = ""
                curOperation = "subtract"
            })
        } else if(btn.classList.contains("multiply")) {
            btn.addEventListener("click",()=>{
                let num = +(number.innerText);
                if (Number.isNaN(placeholderNum)){
                    placeholderNum = num
                } else {
                    operation(num)
                }
                number.innerText = ""
                curOperation = "multiply"
            })
        } else if(btn.classList.contains("divide")) {
            btn.addEventListener("click",()=>{
                let num = +(number.innerText);
                if (Number.isNaN(placeholderNum)){
                    placeholderNum = num
                } else {
                    operation(num)
                }
                number.innerText = ""
                curOperation = "divide"
            })
        } else if(btn.classList.contains("square-root")) {
            btn.addEventListener("click",()=>{
                let num = +(number.innerText);
                if (Number.isNaN(placeholderNum)){
                    placeholderNum = num
                } else {
                    operation(num)
                }
                number.innerText = ""
                curOperation = "square-root"
            })
        } else if (btn.classList.contains("change-sign")){
            btn.addEventListener("click",()=>{
                // ! fix that it adds numbers in front even when its negative
                let num = +(number.innerText);
                number.innerText = `${-1*num}`
            })
        } else if(btn.classList.contains("equals")) {
            btn.addEventListener("click",()=>{
                console.log(
                    "inner text is "+number.innerText
                )
                let num = +(number.innerText);
                console.log("num: " +num)
                operation(num)
                curOperation = ""
                // console.log(placeholderNum)
                if ((new Number(placeholderNum)).toString().length > 8) {
                    let exp = (new Number(placeholderNum)).toExponential();
                    console.log(exp)
                    let [whole,rest] = (exp.includes(".")) ? exp.split(".") : [null, exp]
                    let [fractional,power] = rest.split("e")
                    fractional = fractional.slice(0,3)
                    let newExp = (exp.includes(".")) ? `${whole}.${fractional}${+(power)>0?"e${power}":""}` : `${exp}`

                    number.innerText = newExp
                    placeholderNum = NaN
                    // console.log(number.innerText)
                } else {
                    number.innerText = placeholderNum
                    placeholderNum = NaN
                }
            })
        } 
    })


})