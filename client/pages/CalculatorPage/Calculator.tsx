import React, {
  useState,
  // useContext,
  useEffect,
  useRef
}
  from 'react';
import Button from './components/Button/Button';
import ButtonBox from './components/ButtonBox/ButtonBox';
import Screen from './components/Screen/Screen';
import Wrapper from './components/Wrapper/Wrapper';
  
const removeSpaces = (num: any) => String(num).replace(/\s/g, "");
  
export const Calculator: React.FC = () => {

  // declare variable ===================================================================================================================
  const [ac, setAc] = useState("AC");
  // const [save, setSave] = useState(false);
  
  const btnValues = [
    [ac, "+/-", "%", "/"],
    [7, 8, 9, "x"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ",", "="],
  ];
    
  const [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0",
  });
    
  useEffect(() => {
    if(calc.num === "0" && calc.res === "0" && calc.sign === "")
      setAc("AC");
    else
      setAc("C");
  });
  

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: any) => {  
    e.preventDefault();
    const value = e.target.value;
    const operators = value.match(/[+-/x]/g);
    const lastOperator = operators[operators.length - 1];

    setCalc({
      ...calc,
      num: e.target.value,
      res: "",
      sign: lastOperator,
    });    
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    const value = e.target.value;
    const operators = value.match(/[+-/x]/g);
    const lastOperator = operators[operators.length - 1];

    setCalc({
      ...calc,
      num: removeSpaces(value),
      res: !calc.sign ? "0" : calc.res,
      sign: lastOperator
    });
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsEditing(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // functions =======================================================================================================================================
  function addToHistory(calculation: string) {
    const history = localStorage.getItem('history') || '[]';
    try {
      const historyArray = JSON.parse(history);
      historyArray.push(calculation);
      localStorage.setItem('history', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Error: ', error);
    }
  }  
  
  const numClickHandler = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    if (calc.num.toString().length < 16) {  
      let startNum = calc.num;
      if(calc.num === "0")
        startNum = "";
      setCalc({
        ...calc,
        num:
            calc.num === "0" && value === "0"
              ? "0"
              : Number(removeSpaces(calc.num)) % 1 === 0
                ? String(removeSpaces(startNum + value))
                : String(startNum + value),
        res: !calc.sign ? "0" : calc.res,
      });
    }
  };
  
  const commaClickHandler = (e: any) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(",") ? calc.num + value : calc.num,
    });
  };
  
  const signClickHandler = (e: any) => {
    const lastChar = calc.num.slice(-1);
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,  
      num: lastChar === "/" || lastChar === "-" || lastChar === "+" || lastChar === "x"
        ? calc.num
        : calc.num + value,
    });
  };
  
  const equalsClickHandler = () => {
    setIsEditing(false);
    const parts = calc.num.split(/[^0-9]/);
    const operators = calc.num.match(/[+-/x]/g);
    const lastNum = parts[parts.length - 1];
  
    if (calc.sign && lastNum) {
  
      const math = (a: any, b: any, sign: string) =>
        sign === "+"
          ? a + b
          : sign === "-"
            ? a - b
            : sign === "x"
              ? a * b
              : a / b;
  
      let finalResult = 0;
      let currentNum = 0;
  
      if (operators) {
        for (let i = 0; i < parts.length-1; i++) {
  
          const newParts = parts;
          const newOperators = operators;
  
          let j = 0;
          for(j; j < operators.length; j++) {
            if(operators[j] === "x" || operators[j] === "/"){
              const a = math(Number(parts[j]), Number(parts[j + 1]), operators[j]);
              newParts.splice(j, 2);
              newParts.splice(j, 0, String(a));
              newOperators.splice(j, 1);
              j = j - 1;
            }
          }
  
          if (!isNaN(Number(newParts))) {
            currentNum = Number(newParts);
          }
          if (newOperators[i]) {
            if(i === 0){
              currentNum = math(Number(newParts[i]), Number(newParts[i + 1]), newOperators[i]);
              finalResult += currentNum;
            } else {
              currentNum = math(finalResult, Number(newParts[i + 1]), newOperators[i]);
              finalResult = currentNum;
            }
            currentNum = 0;          
          }
  
          finalResult += currentNum;
        }}                
  
      setCalc({
        ...calc,
        res:
            lastNum === "0" && calc.sign === "/"
              ? "NaN"
              : String( finalResult ),
        sign: "",
        num:
            lastNum === "0" && calc.sign === "/"
              ? "NaN"
              : String( finalResult ),
      });
  
      addToHistory(`${calc.num} = ${finalResult}`);
    }
  };
  
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? String(Number(removeSpaces(calc.num)) * -1) : "0",
      res: calc.res ? String(Number(removeSpaces(calc.res)) * -1) : "0",
      sign: "",
    });
  };
  
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;
  
    setCalc({
      ...calc,
      num: String((num /= Math.pow(100, 1))),
      res: String((res /= Math.pow(100, 1))),
      sign: "",
    });
  };
  
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: "0",
      res: "0",
    });
  };  
    
  return (
    <Wrapper ref={wrapperRef}>
      {isEditing ? (
        <input
          type="text"
          value={calc.num ? calc.num : calc.res}
          onBlur={(e) => {
            handleSave(e);
            setIsEditing(false);
          }}
          className='screen input'
          onChange={(e) => handleInputChange(e)}
        />
      ) : (
        <Screen
          value={calc.num ? calc.num : calc.res}
          role="screen"
          onClick={() => {
            setIsEditing(true);
          }}
        />
      )}
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "=" 
                    ? "equals" 
                    : btn === 0
                      ? "zero"
                      : btn === "/" || btn === "x" || btn === "-" || btn === "+" || btn === "="
                        ? "orangeButton"
                        : btn === "C" || btn === "AC" || btn === "+/-" || btn === "%"
                          ? "greyButton"
                          : ""}
                value={btn}
                onClick={(e: any) => {
                  btn === "C" || btn === "AC"
                    ? resetClickHandler()
                    : btn === "+/-"
                      ? invertClickHandler()
                      : btn === "%"
                        ? percentClickHandler()
                        : btn === "="
                          ? equalsClickHandler()
                          : btn === "/" || btn === "x" || btn === "-" || btn === "+"
                            ? signClickHandler(e)
                            : btn === ","
                              ? commaClickHandler(e)
                              : numClickHandler(e);
                }}
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};
  
export default Calculator;