const puppeteer = require('puppeteer');
var isBase64 = require('is-base64');
var fs = require('fs');
var cors = require('cors')
var base64ToImage = require('base64-to-image')
var page, dir, url, path;
var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors());
var imagePath = [];
var imageData=[];
app.use(express.static(__dirname + 'public'));
// app.use('/images', express.static(__dirname + '/Images'));

app.get('/search/:searchText', async (req, res) => {

    imagePath = [];
    var arr = [], str = "";
    console.log("Entering");
    console.log(req.params.searchText);
    var search = req.params.searchText;
    arr = search.split(' ');
    str += arr.splice(0, 1)[0]
    arr.forEach(search => {
        str += "+" + search
    });

    console.log(str)
    await (async () => {
        console.log("In Puppeteer")
        url = `https://www.google.co.in/search?hl=en&authuser=0&tbm=isch&source=hp&biw=1280&bih=610&ei=hhGzXLvXEeXaz7sPyJuOwAU&q=${str}&oq=${str}&gs_l=img.3..0l10.2801.5793..6178...0.0..0.145.1298.0j10......1....1..gws-wiz-img.....0.iJP8-giCt64`

        var params = new URLSearchParams(url)
        var q = params.get('q');
        dir = `images/${q}/`;
        console.log("Dir", dir)
        if (!fs.existsSync(dir)) {
            await fs.mkdirSync(dir);
        }

        const browser = await puppeteer.launch({
            headless: true, args: ['--enable-features=NetworkService', '--disable-infobars'],
            ignoreHTTPSErrors: true,
            executablePath: 'C://Program Files (x86)//Google//Chrome//Application//Chrome.exe'
        });

        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        page.on('response', trace)
        await page.goto(url);

    })();

    console.log(imagePath)
    var data=fs.readFileSync(imagePath[0])
    console.log(data)
    fs.writeFileSync('image.jpeg',data)
    res.json({ "path": imageData })
})


async function trace(request) {

    if (request._request._resourceType == 'image') {



        if (isBase64(request._request._url, { mime: true })) {
            var str = request._request._url;
            if (str.includes('/9j/')) {

                var base64Str = request._request._url;

                imageData.push(base64Str)
                path = dir;
                // console.log(path)
                var optionalObj = { 'fileName': `${Date.now()}`, 'type': 'jpeg' };

                var imageInfo = base64ToImage(base64Str, path, optionalObj);
                imagePath.push(path + optionalObj['fileName'] + "." + optionalObj['type'])
                console.log(imageData)
            }


        }
    }

}

app.post("/file",(req,res)=>{
    console.log("working here")
    console.log(req.body)


    res.json({"here":"data"})
})

app.listen(3000, () => {
    console.log("Listening")
})