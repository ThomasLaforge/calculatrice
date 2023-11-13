import React, { useCallback, useMemo, useState } from 'react';
import './App.css';

let calculatriceNumbers: number[] = []
for (let i = 0; i < 10; i++) {
  calculatriceNumbers.push(i)
}

interface IOperator {
  symbol: string, 
  handler: (a: number, b: number) => number
}

const OPERATORS: IOperator[] = [
  {
    symbol: "X",
    handler: (a, b) => a * b
  },
  {
    symbol: "+",
    handler: (a, b) => a + b
  },
  {
    symbol: "-",
    handler: (a, b) => a - b
  },
  {
    symbol: "/",
    handler: (a, b) => a / b
  }
]

function App() {
  const [numA, setNumA] = useState<number>(0)
  const [numB, setNumB] = useState<number>(0)
  const [operator, setOperator] = useState("")

  const handleNumberClick = useCallback(
    (num: number) => {
      if(operator !== ""){
        setNumB(numB * 10 + num)
      }
      else {
        setNumA(numA * 10 + num)
      }
    },
    [numA, numB, operator],
  )

  const handleOperatorClick = useCallback(
    (op: string) => {
      if((numA || numA === 0) && (numB || numB === 0) && operator !== ""){
        let result = 0
        if(operator === "+"){
          result = numA + numB
        }
        else if(operator === "-"){
          result = numA - numB
        }

        setNumA(result)
        setNumB(0)
      }
      setOperator(op)
    },
    [operator, numA, numB]
  )

  const handleEqual = useCallback(
    () => {
      if((numA || numA === 0) && (numB || numB === 0) && operator !== ""){
        let result = 0
        if(operator === "+"){
          result = numA + numB
        }
        else if(operator === "-"){
          result = numA - numB
        }

        setNumA(result)
        setNumB(0)
        setOperator("")
      }
    }, [numA, numB, operator]
  )

  return (
    <div className="App">
      <h1>Calculatrice</h1>
      <div className="container">
        <div className="screen">
          {numA} {operator} {numB === 0 ? "" : numB}
        </div>
        <div className="buttons">
          <div className="numbers">
            {calculatriceNumbers.map( (num, index) => 
              <button 
                key={index}
                className="button-number"
                onClick={() => handleNumberClick(num)}
              >
                {num}
              </button>  
            )}
            <button 
                className="button-equal" 
                onClick={handleEqual}
              >
                =
              </button>
          </div>
          <div className="operators">
              <button
                className="button-operator"
                onClick={() => handleOperatorClick("+")}
              >
                +
              </button>
              <button
                className="button-operator"
                onClick={() => handleOperatorClick("-")}
              >
                -
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
