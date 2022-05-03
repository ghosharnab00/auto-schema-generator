import React, {useEffect,useState} from 'react'
import axios from 'axios'
import './schimify.css'


export default function Try() {

  //usestates Setting
let [inputValue, setInputValue] = useState('')
let [clicked, setClicked] = useState(false)
let [title, setTitle] = useState('')
let [desc, setDesc] = useState('')
let [pubdate, setPubdate] = useState('')
let [slug, setslug] = useState('')
let [kw, setkw] = useState('')
let [imgList,setImgList] = useState ('')

// Handle Input It takes the URL from the frontend and creates the API 
  let inputchangeHandler= (event) =>{
    inputValue = event.target.value;
    setInputValue(inputValue)
    //let api =`/.netlify/functions/parser?url=${inputValue}`
    //console.log(api)
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
      let imgitter = [];
    for (var i=0; i < imgg.length ; ++i){
      imgitter.push(`"${response.data.imgbg}"`)
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
  let id = `"@id": "${inputValue}"},`;
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
    <div>
      <form className="form-example">
  <label>What’s your name? <input name="url" type="text" value= {inputValue} onChange={inputchangeHandler} /></label>
  <button className="button" type="" value= {false} onClick = {clickHandler}>Say hello!</button>
  <p> Here is your title: {title}</p>
 </form>
 <pre>
 <p>{html}</p>
 <p>{context}</p>
 <p>{blogtype}</p>
 <p>{mainentity}</p>
 <p>{webtype}</p>
 <p>{id}</p>
 <p>{heading}</p>
 <p>{description}</p>
 <p>{keyword}</p>
 <p>{img}</p>
 <p>{author}</p>
 <p>{authorurl}</p>
 <p>{publisher}</p>
 <p>{publisherlogo}</p>
 <p>{publisherurl}</p>
 <p>{datePublished}</p>
 <p>{htmlend}</p>

 <p>{html}</p>
 <p>{context}</p>
 
 <p>{breadtype}</p>
 <p>{itemlist}</p>
 <p>{listitem}</p>
 <p>{position1}</p>
 <p>{nameHome}</p>
 <p>{item}</p>
 <p>{brackets}</p>
 <p>{listitem}</p>
 <p>{position2}</p>
 <p>{nameBlog}</p>
 <p>{blogItem}</p>
 <p>{brackets}</p>
 <p>{listitem}</p>
 <p>{position3}</p>
 <p>{nameSlug}</p>
 <p>{itemURL}</p>
 <p>{htmlend}</p>

 <p>{html}</p>
 <p>{context}</p>
 
 <p>{typewebsite}</p>
 <p>{nameHiration}</p>
 <p>{urlHiration}</p>
 <p>{potentialAction}</p>
 <p>{SearchAction}</p>
 <p>{target}</p>
 <p>{query}</p>
 <p>{htmlend}</p>
 </pre>
    </div>
  )
}
