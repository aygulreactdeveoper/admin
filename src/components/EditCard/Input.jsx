import React from 'react'

function Input({data, inputName, disable, long, setData, value}) {
  return (
        <div className={`w-full max-w-full px-3 shrink-0 md:flex-0 ${long ? ' md:w-full' : ' md:w-4/12' }`}>
            <div className="mb-4">
                <label 
                htmlFor={inputName} 
                className='inline-block mb-2 ml-1 font-bold text-xs text-slate-700 '>{inputName}</label>
                {disable ? (<input 
                type="text" 
                name={inputName}
                defaultValue={data || `Add Some ${inputName}` } 
                className={"cursor-not-allowed text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 focus:outline-none pointer-event-none disabled placeholder:text-gray-500"} disabled />) : (
                <input 
                type="text" 
                name={inputName}
                onChange={(e) => setData(e.target.value)}
                defaultValue={value || data || `Add Some ${inputName}` } 
                className={"focus:shadow-primary-outline text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"} />)}
            </div>
        </div>
  )
}

export default Input