import React, {useState,useRef , useEffect} from 'react'
import { Grid,Container,Typography, Box, Button } from '@mui/material'
import axios from 'axios'
import './schimify.css'

export default function Schimify() {
//usestates Setting
let [inputValue, setInputValue] = useState('')
let [clicked, setClicked] = useState(null)
let [title, setTitle] = useState('')
let [desc, setDesc] = useState('')
let [pubdate, setPubdate] = useState('')
let [slug, setslug] = useState('')
let [kw, setkw] = useState('')
let [imgList,setImgList] = useState ('')
let [count, setCount] = useState('')
let [copySuccess, setCopySuccess] = useState('');

const textAreaRef = useRef(null);

function copyToClipboard(e) {
  textAreaRef.current.select();
  document.execCommand('copy');
  // This is just personal preference.
  // I prefer to not show the whole text area selected.
  e.target.focus();
  setCopySuccess('Copied!');
};

let counter = ()=>{
  fetch('https://api.countapi.xyz/update/schimify/arnab?amount=1')
  .then(res=>res.json())
  .then(res =>{
    setCount(res.value)
  })
}

useEffect(()=>{counter();}, [])

clicked = true;
// Handle Input It takes the URL from the frontend and creates the API 
  let inputchangeHandler= (event) =>{
    inputValue = event.target.value;
    setInputValue(inputValue)
    //let api =`/.netlify/functions/parser?url=${inputValue}`
    //console.log(api)
    event.preventDefault();
  }

  let slugHandler= (event)=>{
    slug = event.target.value;
    setslug(slug)
  }
  let kwHandler= (event)=>{
    kw = event.target.value;
    setkw(kw)
  }

//It handles the submit function of the webpage

  let clickHandler = (event)=>{
      clicked = event.target.value;
      //console.log(event.target.value);
      setClicked(true);
      getResponse(inputValue);
      event.preventDefault();
      
  }

  let getResponse = async(value) =>{
    await axios.get(`/.netlify/functions/parser?url=${value}`)
    .then(function (response) {
      setTitle(response.data.Title);
      setDesc(response.data.desc);
      let imgg = response.data.img;
      setPubdate(response.data.pubdate)
      //console.log(imgg);
      let imgitter = [`"${response.data.imgbg}"`];
      console.log (imgitter);
      setImgList(imgitter);
    for (var i=0; i < imgg.length ; ++i){
      imgitter.push(`"${imgg[i].url}"`);
      setImgList(imgitter);}
        
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
    });
    
  }

  let html  = `<script type="application/ld+json">`

  let context = `{ "@context": "https://schema.org",`;
  let blogtype =   `"@type": "BlogPosting",`;
  let mainentity = ` "mainEntityOfPage": {`;
  let webtype = ` "@type": "WebPage",`;
  let id = `"@id": "https://www.hiration.com/blog/${slug}/"},`;
  let heading = `"headline": "${title}",`;
  let description = `"description": "${desc}",`;
  let keyword = `"keywords": "${kw}",`;
  let img = `"image": [${imgList}],`;
  let author = `"author": {"@type": "Organization","name": "Hiration, Inc.",`
  let authorurl = `"url": "https://www.hiration.com/blog/author/hiration/"},`
  let publisher = `"publisher": {"@type": "Organization","name": "Hiration, Inc.",`
  let publisherlogo = `"logo": {"@type": "ImageObject",`
  let publisherurl = `"url": "https://d31kzl7c7thvlu.cloudfront.net/bulkit_theme/img/logo/hiration_full_logo.png"}},`
  let datePublished = `"datePublished": "${pubdate}"}`
  let htmlend = `</script>`


  let breadtype = `"@type": "BreadcrumbList",`
  let itemlist = `"itemListElement": [{`
  let listitem =   `"@type": "ListItem",`
  let position1 =   `"position": "1",`
  let nameHome =   `"name": "Home",`
  let item =   `"item": "https://www.hiration.com"`
  let brackets = `}, {`
  //let blogtype =   `"@type": "ListItem",
  let position2 =   `"position": "2",`
  let nameBlog =  ` "name": "blog",`
  let blogItem =  ` "item": "https://www.hiration.com/blog"`
  //let blogtype = }, {
  //let blogtype =  ` "@type": "ListItem",
  let position3 =  ` "position": "3",`
  let nameSlug =  ` "name": "${slug}",`
  let itemURL =   `"item": "https://www.hiration.com/blog/${slug}/"}]}`

  let typewebsite =`"@type": "WebSite",`
  let nameHiration = `"name": "hiration.com",`
  let urlHiration = `"url": "https://hiration.com",`
  let potentialAction = `"potentialAction": {`
  let SearchAction = `  "@type": "SearchAction",`
  let target = `  "target": "https://hiration.com/search?q={search_term_string}",`
  let query = ` "query-input": "required name=search_term_string"} }`
  //let htmlend = `</script>`





return ( 
  <>
  <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
        <Typography > Hiration Schimify</Typography>
        </Grid>
        </Container>
        </>
)































//     return (
//         <div>
//             <div className="allwrap">
//                 <h1 className="schimify"> <span>Hiration</span> Schimify</h1>
//                 <div className="wrapper">
//                     <form className="left" action="/.netlify/functions/parser"> <input type="url" className='URL' name="url" id="url" placeholder='Paste the URL' value= {inputValue} onChange={inputchangeHandler}/>
//                         <input type="text" name="slug" id="slug" className='slug' placeholder='Paste the slug' value= {slug} onChange={slugHandler} required/>
//                         <input type="text" name="keyword" id="keyword" className='keyword' placeholder='Paste the keyword' value= {kw} onChange={kwHandler} required/>
//                         <button id="submit" className='sumbit' value= {clicked} onClick = {clickHandler}> Create the Schema </button>
                        
//                         <p className='instructions'>⦿ Make sure to input the <span>Slug</span> and the <span>Keywords</span></p>
//                         <p className='instructions'>⦿ Make sure to have a <span>hero image</span> in the blog. else it will give error</p>
//                     </form>
//                     <div className="right">
//                             <div className="schemawrapper">     
//  <div>
//         <textarea
//         className="wrapped"
//           ref={textAreaRef}
//           value={html  +  context  +  blogtype  + mainentity  +  webtype  +  id  +  heading  +  description  +  keyword  + img  +  author  +  authorurl  +  publisher  +  publisherlogo  +  publisherurl  +  datePublished  + htmlend  +  html  +  context  +  breadtype  +  itemlist  +  listitem  +  position1  +  nameHome  +  item  +  brackets  +  listitem  +  position2  +  nameBlog  +  blogItem  +  brackets  +  listitem  +  position3  +  nameSlug  +  itemURL  +  htmlend  +  html  + context  +  typewebsite  +  nameHiration  +  urlHiration  + potentialAction  +  SearchAction  +  target  + query  + htmlend}
//         />       
//        <div>
//          <button onClick={copyToClipboard} className='sumbit'>Copy</button> 
//          <p>{copySuccess}</p>
//        </div>
     
//     </div>
 
//                         </div>
//                     </div>
//                 </div>
//                 <p className='footer'> App Used: <span>{count}</span> times</p> 
//             <p className='footer'>Made by <a href='https://github.com/ghosharnab00/auto-schema-generator' className='footer-name'>Arnab Ghosh</a ></p>
//             </div>
            
//         </div>
//     )
}
