const puppeteer = require('puppeteer');
var page;

(async () => {
   var url='https://www.google.co.in/search?hl=en&authuser=0&tbm=isch&source=hp&biw=1280&bih=610&ei=hhGzXLvXEeXaz7sPyJuOwAU&q=bill+gates&oq=bill+gates&gs_l=img.3..0l10.2801.5793..6178...0.0..0.145.1298.0j10......1....1..gws-wiz-img.....0.iJP8-giCt64' 
  
  const browser = await puppeteer.launch({headless:false,args: ['--enable-features=NetworkService'],
  ignoreHTTPSErrors: true});
  page = await browser.newPage();
//   await page.setRequestInterception(true);
page.on('response',trace)
  await page.goto(url);
//   await page.waitFor(1000);
  console.log("getting into")
//   await page.evaluate((response)=>{
//       console.log(response)
//     //   console.log(location.href)
//   })

    

 


//   await browser.close();
})();

function trace(request){
    console.log("REQUEST",request._request)
    // if(request._request._resourceType=='image'){
    //     console.log(request)
    // }

}