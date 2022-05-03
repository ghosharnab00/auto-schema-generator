const fetch = require('node-fetch');
const cheerio = require('cheerio');
exports.handler = async function(event, context){
    
    
const URL = event.queryStringParameters.url;

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
    //console.log(bgimg);
    let imob = $('img.img-hook')
    const img = [];
    imob.each((i,url)=>{
        const imgurl = $(url).attr("data-src");
       img.push( { id: i, url: imgurl})
    })
    return ({ Title:title.text(),
        desc:description ,
        pubdate: datepub, 
        imgbg:bgimg,
        img
    
    } )

} catch(err){
        console.log("You did not add an header image",)
        
//     console.log(title.text());
//     console.log(description);
//     console.log(datepub);

}
        
};

return{

    statusCode: 200,
    body: JSON.stringify(await hirationblogdata())
  }

    

}