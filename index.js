//A flag that prevents two decimals in one number
let haveDot = false;

function Calculator(){ 
    let [expression, setExpression] = React.useState("");
    let [answer, setAnswer] = React.useState("");

    function displayDigit(value){ 
        if(expression == "0"){
            setExpression(value);
        }
        //prevent leading zeros
        else if(expression.endsWith("0") && ("+-*/".indexOf(expression.charAt(expression.length-2)) != -1) && !isNaN(value)){
            setExpression(expression.substring(0, expression.length -1) + value);
        }
        //check if the last character is "="
        else if(expression.charAt(expression.length - 1) == "="){
            setExpression(value);            
        }    
        else{
            setExpression(expression + value);   
        } 
    }
    
    function displayOperator(operator){
        let lastCharacter = expression.charAt(expression.length - 1);
        let secondLastCharacter = expression.charAt(expression.length - 2);
        haveDot = false;
        
        if(expression == ""){
            setExpression("0" + operator);  
        }
        else if(lastCharacter == "="){
            setExpression(answer + operator);            
        }    
        // e.g. if current expression is 9*- and user types another operator such as +, then turn it into 9+
        else if(lastCharacter == "-" && isNaN(secondLastCharacter)){
            setExpression(expression.substring(0, expression.length -2) + operator);    
        }
        //prevent two operators (excluding "-") together and the second operator overrides the previous one
        else if(operator != "-" && isNaN(lastCharacter)){
            setExpression(expression.substring(0, expression.length -1) + operator);          
        }
        //if the last character is "." and operator is "-", get rid of "." (e.g. turn 5.- into 5-)
        else if(operator == "-" && lastCharacter == "." && !isNaN(secondLastCharacter)){
            setExpression(expression.substring(0, expression.length -1) + operator);     
        }   
        //prevent "+--" or "/--" or "*--"
        else if(operator == "-" && lastCharacter == "-" && isNaN(secondLastCharacter)){
            return;         
        }
        // prevent 3 "-"s together (e.g. 6- - -)
        else if(operator == "-" && lastCharacter == "-" && secondLastCharacter == " "){
            return;
        }
        //put a space between two minus signs
        else if(operator == "-" && lastCharacter == "-"){
            setExpression(expression + " " + operator);
        }            
        else{
            setExpression(expression + operator);
        } 
        
    }

    function displayDecimal(decimal){
        let lastCharacter = expression.charAt(expression.length - 1);
        //turn the decimal into 0. if it's after "+-*/"
        if("+-*/".indexOf(lastCharacter) != -1 && !haveDot){
            setExpression(expression + "0" + decimal);
            haveDot = true;
        }  
        else if(lastCharacter == "="){
            setExpression("0" + decimal); 
            haveDot = true;           
        }          
        else if(!haveDot){
            haveDot = true;
            setExpression(expression + decimal);   
        }
        else{
            return;
        }   
    }

    function calculate(){
        haveDot = false;
        //prevent "=" after an operator(e.g 5+= is not allowed)
        if("+-*/".indexOf(expression.charAt(expression.length - 1)) != -1){
            return;
        }  
        //prevent "=="
        if(expression.endsWith("=")){
            return;
        }    
        setExpression(expression + "=");   
        setAnswer(parseFloat(eval(expression).toFixed(14)));
    }

    function clear(){
        setExpression(expression.slice(0, -1));
    }

    function allClear(){
        setExpression("");
        setAnswer("");
        haveDot = false;
    }

    return(
        <div className="container">
            <div className="grid-container">
                <div id="display">
                    <input id="expression" type="text" value={expression}  disabled/>
                    <input id="answer" type="text" value={answer} className="text-warning" placeholder="0" disabled></input>    
                </div>

                <button id="allClear" onClick={allClear}>AC</button>
                <button id="clear" onClick={clear}>C</button>
                <button id="divide" onClick={()=>displayOperator("/")}>/</button>
                <button id="multiply" onClick={()=>displayOperator("*")}>X</button>

                <button id="seven" onClick={()=>displayDigit("7")}>7</button>
                <button id="eight" onClick={()=>displayDigit("8")}>8</button>
                <button id="nine" onClick={()=>displayDigit("9")}>9</button>
                <button id="subtract" onClick={()=>displayOperator("-")}>−</button>

                <button id="four" onClick={()=>displayDigit("4")}>4</button>
                <button id="five" onClick={()=>displayDigit("5")}>5</button>
                <button id="six" onClick={()=>displayDigit("6")}>6</button>
                <button id="add" onClick={()=>displayOperator("+")}>+</button>

                <button id="one" onClick={()=>displayDigit("1")}>1</button>
                <button id="two" onClick={()=>displayDigit("2")}>2</button>
                <button id="three" onClick={()=>displayDigit("3")}>3</button>

                <button id="equals" onClick={calculate}>=</button>
                <button id="zero" onClick={()=>displayDigit("0")}>0</button>
                <button id="decimal" onClick={()=>displayDecimal(".")}>.</button>
            </div>
        </div>
    )   
}

ReactDOM.render(<Calculator />, document.getElementById("root"));