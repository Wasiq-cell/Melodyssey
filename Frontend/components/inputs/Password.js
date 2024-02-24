import React from 'react'

export default function Text({label, placeholder, value, setValue}) {
  return (
    <div className="textinput flex flex-col space-y-2 w-full">
    <label for={label} className="font-semibold">
        {label}
    </label>
    <input type="password" placeholder={placeholder} className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500" id={label} value={value} onChange={(e)=>{setValue(e.target.value);}}  />
    </div>
  )
}

