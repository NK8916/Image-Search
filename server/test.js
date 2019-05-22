var request = require("request")

var url='https://www.google.co.in/search?hl=en&authuser=0&tbm=isch&source=hp&biw=1280&bih=610&ei=hhGzXLvXEeXaz7sPyJuOwAU&q=bill+gates&oq=bill+gates&gs_l=img.3..0l10.2801.5793..6178...0.0..0.145.1298.0j10......1....1..gws-wiz-img.....0.iJP8-giCt64' 

request.get(url,function(error,response,body){
    if (!error && response.statusCode == 200) {
        data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
        console.log(data);
    }
})

