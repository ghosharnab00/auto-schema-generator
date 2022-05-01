const express = require('express');
const request = require('request');
const app = express();
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// function to get the raw data
const getRawData = (URL) => { 
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

const URL = "https://www.hiration.com/blog/p/aef3562a-4dd1-4e47-ad48-a8b58e3ee6ea/";

// start of the program

const hirationblogdata = async () => {
   const hirationblogdata = await getRawData(URL);
    const $ = cheerio.load(hirationblogdata);
  let title = $('title');
  console.log(title.text());
  let description = $('meta[property="og:description"]').attr("content");
  console.log(description);

  //find the publish date
  let datepub = $('.post-full-meta-date').text();
  console.log(datepub);
  
//find the hero image
try {
    let bgimg = $('.post-full-image').attr("style").replace("background-image: url(","").replace(")","").split('?')[0];
    console.log(bgimg);} catch(err){
        console.log("You did not add an header image")
    }


  // find the image urls
  try {
    let imob = $('img.img-hook')
  console.log(imob.length)
  $('img.img-hook').each((i,url)=>{
      const imgurl = $(url).attr("data-src");
      console.log(imgurl)
  })
  } catch (e) {
    console.log(e) // handle error
  }
  

        
};

hirationblogdata();
// invoking the main function


// const xml = "https://www.hiration.com/sitemap.xml";

// const hirationxml = async () => {
//     const hirationxml = await getRawData(xml);
//     const $ = cheerio.load(hirationxml);
//     const datepub = $('url ')
//     console.log(datepub);

// }
// hirationxml();





//express App
const port = 3000;

app.get('/', (req, res, ) => {
  res.send('Hello World')
})


app.listen(port, () => console.log(`listening on ${port}`));