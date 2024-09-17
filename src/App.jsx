import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
const [length, setLength] = useState(8);
const [number, setNumber] = useState(false);
const [char, setChar] = useState(false);
const [password, setPassword] = useState("");

const passwordRef = useRef(null)
 
const copyPass = useCallback(() => {
  window.navigator.clipboard.writeText(password);
  passwordRef.current?.select();
  alert(`${password} copied`)
}, [password])

const passwordGenerator = useCallback(() => {
  let pass = "";
  let str = "ABCDEFGHIJKLMNOOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  ;
  
  if (number) str += "1234567890";
  if (char) str += "!@#$%^&*_=+~`";

  for(let i = 1; i<= length; i++){
     let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
    
    }

  setPassword(pass)

}, [length, number, char, setPassword])

useEffect(() => {passwordGenerator()}, [length, number, char, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-4 my-10 text-orange-500 bg-gray-600' >
        <h1 className='text-white text-center mb-5 text-xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="password"
          readOnly
          ref={passwordRef} />
          <button 
          onClick={copyPass} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer'
            onChange ={(e) =>{setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">       
            <input 
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }} />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={char}
            id="characterInput"
            onChange={() => {
              setChar((prev) => !prev);
            }} />
            <label>Characters</label>
          </div>
        </div>
      </div>
        
    </>
  )
}

export default App
