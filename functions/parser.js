const fetch = require('node-fetch');
const cheerio = require('cheerio');
exports.handler = async function(event, context){
    
    
const URL = "https://www.hiration.com/blog/recruiter-resume/";

// function to get the raw data
const getRawData = (URL) => { 
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};
// start of the program

const hirationblogdata = async () => {
   const hirationblogdata = await getRawData(URL);
    const $ = cheerio.load(hirationblogdata);
   let title = $('title');
   let description = $('meta[property="og:description"]').attr("content");
   let datepub = $('.post-full-meta-date').text();
   try {
    let bgimg = $('.post-full-image').attr("style").replace("background-image: url(","").replace(")","").split('?')[0];
    console.log(bgimg);} catch(err){
        console.log("You did not add an header image")
    }
    try {
      let imob = $('img.img-hook')
    console.log(imob.length)
    $('img.img-hook').each((i,url)=>{
        const imgurl = $(url).attr("data-src");
       // console.log(imgurl)
    })
    } catch (e) {
     // console.log(e) // handle error
    }
//     console.log(title.text());
//     console.log(description);
//     console.log(datepub);

  return ({ body:title.text() })
        
};

return{

    statusCode: 200,
    body: JSON.stringify(hirationblogdata())
  }

    

}