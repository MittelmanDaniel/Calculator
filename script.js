//MATH PART

function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}

function operate(a,operator,b){
    if(operator=='+'){
        return add(a,b);
    }
    else if(operator=='-'){
        return subtract(a,b);
    }
    else if(operator=='*'){
        return multiply(a,b);
    }
    else if(operator=="/"){
        return divide(a,b);
    }
}



//DISPLAY CONTROL

let currDisplay=document.querySelector('#curr');
let prevDisplay=document.querySelector('#prev');

let lastResultDisplayed=false;

function onClick(btn){
    if(btn.textContent=='='){
        prevDisplay.textContent=currDisplay.textContent;
        currDisplay.textContent=evalExpr(currDisplay.textContent);
        lastResultDisplayed=true;
    }
    else if(!isOperator(btn.textContent) && lastResultDisplayed){
        prevDisplay.textContent=currDisplay.textContent;
        currDisplay.textContent=btn.textContent;
        lastResultDisplayed=false;
    }
    else{
        currDisplay.textContent+=btn.textContent;
        lastResultDisplayed=false;
    }
}


//check If car is operator

function isOperator(char){
    if(char=='+'||char=='-'||char=='*'||char=='/'){
        return true
    }
    else{
        return false;
    }
}


//evaluate an expression

function evalExpr(expression){
let num1="";
let num2="";
let operator;

let toggle=false;

for(let i=0;i<expression.length;i++){
    if(!isOperator(expression[i])){
        if(toggle){
            num2+=expression[i];
        }
        else{
            num1+=expression[i];
        }
    }
    else if(isOperator(expression[i])){
        toggle = true;
        
        if(num1&&num2&&operator){
            num1=parseFloat(num1);
            num2=parseFloat(num2);
            
            num1=operate(num1,operator,num2);
            num2="";
            operator=undefined
        }

        operator=expression[i];
    }

    if(i==expression.length-1){
        num1=parseFloat(num1);
        num2=parseFloat(num2);
            
        num1=operate(num1,operator,num2);
        num2="";
    }

    
}

let strCheck=num1.toString();

if(strCheck.includes('.')){
    return num1.toFixed(3)
}
else{
return num1;
}
}


let buttons = document.querySelectorAll('.btn');

for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click',event=>onClick(event.target));
}

let clearBtn=document.querySelector('#clear');

clearBtn.addEventListener('click',()=>{
    currDisplay.textContent='';
    prevDisplay.textContent='';
});

let backBtn=document.querySelector('#backSpace');

backBtn.addEventListener('click',()=>{
    currDisplay.textContent=currDisplay.textContent.slice(0,-1)
});