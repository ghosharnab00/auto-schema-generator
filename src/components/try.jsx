import React, {useEffect,useState} from 'react'
import axios from 'axios'


export default function Try() {
let [inputValue, setInputValue] = useState('')
  let inputchangeHandler= (event) =>{
    inputValue = event.target.value;
    //console.log(event.target.value);
    setInputValue(inputValue)
    let api =`/.netlify/functions/parser?url=${inputValue}`
    console.log(api)
  }

  let [clicked, setClicked] = useState(false)
  let clickHandler = (event)=>{
      clicked = event.target.value;
      console.log(event.target.value);
      setClicked = true;
      getResponse(inputValue);
    
      event.preventDefault();
  }

  let getResponse = async(value) =>{
    await axios.get(`/.netlify/functions/parser?url=${value}`)
    .then(function (response) {
      return title = response.data.Title;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
    
  }


useEffect(()=>{
  //clickHandler()
}, [clicked] )
  
  return (
    <div>
      <form className="form-example">
  <label>What’s your name? <input name="url" type="text" value= {inputValue} onChange={inputchangeHandler} /></label>
  <button className="button" type="" value= {false} onClick = {clickHandler}>Say hello!</button>
  <p> Here is your title: {title}</p>
 </form>
    </div>
  )
}
