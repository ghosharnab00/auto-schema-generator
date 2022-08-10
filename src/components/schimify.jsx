import React, { useState, useRef, useEffect } from 'react'
import { Grid, Container, Typography, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import './schimify.css'
import { fontSize, maxWidth } from '@mui/system'
import { hover } from '@testing-library/user-event/dist/hover'

export default function Schimify() {
  //usestates Setting
  let [inputValue, setInputValue] = useState('')
  let [clicked, setClicked] = useState(null)
  let [title, setTitle] = useState('')
  let [desc, setDesc] = useState('')
  let [pubdate, setPubdate] = useState('')
  let [slug, setslug] = useState('')
  let [kw, setkw] = useState('')
  let [imgList, setImgList] = useState('')
  let [count, setCount] = useState('')
  let [copySuccess, setCopySuccess] = useState('');

  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    console.log(textAreaRef.current.select())
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  let counterincreament = () => {
    fetch('https://api.countapi.xyz/update/schimify/arnab?amount=1').then(res=>res.json()).then(data=>console.log(data))
      
  }

  useEffect(()=>{
    fetch("https://api.countapi.xyz/get/schimify/arnab/").then(res => res.json())
    .then(res => {
      setCount(res.value)
    })
  },[])
  clicked = true;
  // Handle Input It takes the URL from the frontend and creates the API 
  let inputchangeHandler = (event) => {
    inputValue = event.target.value;
    setInputValue(inputValue)
    //let api =`/.netlify/functions/parser?url=${inputValue}`
    //console.log(api)
    event.preventDefault();
  }

  let slugHandler = (event) => {
    slug = event.target.value;
    setslug(slug)
  }
  let kwHandler = (event) => {
    kw = event.target.value;
    setkw(kw)
  }

  //It handles the submit function of the webpage

  let clickHandler = (event) => {
    clicked = event.target.value;
    //console.log(event.target.value);
    setClicked(true);
    getResponse(inputValue);
    counterincreament();
    event.preventDefault();

  }

  let getResponse = async (value) => {
    await axios.get(`/.netlify/functions/parser?url=${value}`)
      .then(function (response) {
        setTitle(response.data.Title);
        setDesc(response.data.desc);
        let imgg = response.data.img;
        setPubdate(response.data.pubdate)
        //console.log(imgg);
        let imgitter = [`"${response.data.imgbg}"`];
        console.log(imgitter);
        setImgList(imgitter);
        for (var i = 0; i < imgg.length; ++i) {
          imgitter.push(`"${imgg[i].url}"`);
          setImgList(imgitter);
        }

      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });

  }

  let html = `<script type="application/ld+json">`

  let context = `{ "@context": "https://schema.org",`;
  let blogtype = `"@type": "BlogPosting",`;
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
  let listitem = `"@type": "ListItem",`
  let position1 = `"position": "1",`
  let nameHome = `"name": "Home",`
  let item = `"item": "https://www.hiration.com"`
  let brackets = `}, {`
  //let blogtype =   `"@type": "ListItem",
  let position2 = `"position": "2",`
  let nameBlog = ` "name": "blog",`
  let blogItem = ` "item": "https://www.hiration.com/blog"`
  //let blogtype = }, {
  //let blogtype =  ` "@type": "ListItem",
  let position3 = ` "position": "3",`
  let nameSlug = ` "name": "${slug}",`
  let itemURL = `"item": "https://www.hiration.com/blog/${slug}/"}]}`

  let typewebsite = `"@type": "WebSite",`
  let nameHiration = `"name": "hiration.com",`
  let urlHiration = `"url": "https://hiration.com",`
  let potentialAction = `"potentialAction": {`
  let SearchAction = `  "@type": "SearchAction",`
  let target = `  "target": "https://hiration.com/search?q={search_term_string}",`
  let query = ` "query-input": "required name=search_term_string"} }`
  //let htmlend = `</script>`





  return (
    <Container maxWidth={"lg"} sx={{ display: 'flex', flexDirection: "column", textAlign: "center" }}  >

      <Container sx={{ margin: "30px 0", textAlign: "center" }} item><Typography component={"h1"} variant={"h3"} fontWeight={800}>Hiration <span>Schimify</span></Typography>
      <Typography component={"subtitle"} variant={"subtitle"} color="darkgray">Only for Hiration's Content Team</Typography>
      </Container>

      <Grid spacing={3} sx={{ display: 'flex', flexDirection: "row" }} >
        <Box
          component="form"
          sx={{
            width: "25ch",
            '& .MuiTextField-root': { m: .5, width: '25ch' },
            display: "flex",
            flexDirection: "column",
            bgcolor: "transparent",
            margin: "0px 20px"

          }}
          action="/.netlify/functions/parser"
          autoComplete="off"

        >
          <TextField size="small" variant="outlined" type="url" name="url" id="url" placeholder='Paste the URL' value={inputValue} onChange={inputchangeHandler} required="true" />
          <TextField size="small" variant="outlined" type="text" name="slug" id="slug" placeholder='Paste the slug' value={slug} onChange={slugHandler} required="true" />
          <TextField size="small" variant="outlined" type="text" name="keyword" id="keyword" placeholder='Paste the keyword' value={kw} onChange={kwHandler} required="true" />
          <div style={{ display: "flex", justifyContent: "flex-end" }}><Button id="submit" variant="outlined" value={clicked} onClick={clickHandler} sx={{ width: '25ch', backgroundColor: "#ff7600", color: "black" }}> Create the Schema </Button></div>

          <Typography variant="caption" display="block" className='instructions'>⦿ Make sure to input the <span>Slug</span> and the <span>Keywords</span></Typography>
          <Typography variant="caption" display="block" className='instructions'>⦿ Make sure to have a <span>hero image</span> in the blog. else it will give error</Typography>

        </Box>


        <Grid

          sx={{
            width: "100ch",
            '& .MuiTextField-root': { m: .5, width: '100ch' },
            display: "flex",
            flexDirection: "column",
            margin: "0px 20px"

          }}>
          <textarea
            className="wrapped"
            ref={textAreaRef}
            value={html + context + blogtype + mainentity + webtype + id + heading + description + keyword + img + author + authorurl + publisher + publisherlogo + publisherurl + datePublished + htmlend + html + context + breadtype + itemlist + listitem + position1 + nameHome + item + brackets + listitem + position2 + nameBlog + blogItem + brackets + listitem + position3 + nameSlug + itemURL + htmlend + html + context + typewebsite + nameHiration + urlHiration + potentialAction + SearchAction + target + query + htmlend}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3} justifyContent="space-around">
              <Grid item xs={3}>
                <Button onClick={copyToClipboard} variant="outlined" sx={{ backgroundColor: "#ff7600", color: "black" }}>Copy</Button>
              </Grid>
              <Typography>{copySuccess}</Typography>
              <Grid item xs={3}>
                <Button href='https://search.google.com/test/rich-results' target="_blank" variant="outlined" sx={{ backgroundColor: "black", color: "#ff7600" }}>Test</Button>
              </Grid>
              
            </Grid>
          </Box>


          



        </Grid>
      </Grid>

      <Typography fontWeight={600}> App Used: <span>{count}</span> times</Typography>
      <Typography >Made by <a href='https://github.com/ghosharnab00/auto-schema-generator' className='footer-name'>Arnab Ghosh</a ></Typography>
    </Container>
  )

}
