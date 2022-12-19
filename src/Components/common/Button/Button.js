import React from 'react'
import './Style.css'

function Button1({text,icon,handleClick,type}) {
  return (
    <div>
         <button role="button" type={type} className="button-34" onClick={(e)=>{handleClick()}}>{icon}{text}</button>
    </div>
  )
}

export default Button1