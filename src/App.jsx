import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-+={}`~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 32); /*For mobile devices*/
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator])


  return (

    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-5 my-8 text-orange-400 bg-gray-700">

        <h1 className="text-white text-center text-lg md:text-xl lg:text-2xl xl:text-3xl">Password Generator</h1>

        <div className="flex flex-col md:flex-row shadow rounded-lg overflow-hidden mt-2 mb-4">

          <input
            type="text"
            value={password}
            className="outline-none w-full  py-1 px-3 md:mb-0"
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPass}
            className="outline-none bg-blue-700 text-yellow-100 px-3 py-1 rounded hover:bg-blue-900 cursor-pointer transition duration-200 ease-in"
          >
            Copy
          </button>

        </div>

        <div className="flex flex-col md:flex-row text-sm gap-x-2 mt-2">

          <div className="flex items-center gap-x-1 mb-2 md:mb-0">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className=" md:inline">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1 mb-2 md:mb-0">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={(e) => { setNumAllowed((prev) => !prev); }}
            />
            <label htmlFor="numberInput" className="ml-1">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={(e) => { setCharAllowed((prev) => !prev); }}
            />
            <label htmlFor="characterInput" className="ml-1">Characters</label>
          </div>

        </div>

      </div>
    </>

  )
}

export default App
