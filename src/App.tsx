import { useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button"



const App = () => {
  const [value, setValue] = useState(0)

  const handleValueDec = () => {
    setValue(prevVal => prevVal - 1)
  }

  const handleValueInc = () => {
    setValue(prevVal => prevVal + 1)
  }


  return (
    <>
      <div className='container flex justify-center h-full align-middle'>
        <div className='mt-8'>
          <h1 className='mb-3 text-5xl text-center'>This is Ecommerce Website XD lol</h1>
          <h1 className='mb-3 text-5xl text-center'>{value}</h1>
          <div className="flex justify-center gap-2">
            <Button onClick={handleValueDec}>-</Button>
            <Button onClick={handleValueInc}>+</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
