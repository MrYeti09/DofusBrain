
var request = require('request');
const cheerio = require('cheerio')
const download = require('image-downloader')
/*request('https://www.dofus.com/pt/mmorpg/enciclopedia/equipamentos', function (error, response, body) {
  var $ = cheerio.load(body)
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.
  var childs = $(".ak-table.ak-responsivetable > tbody").html()
  var $2 = cheerio.load(childs)
  var sh = $2('tr')
  var last_item = ""
  console.log(sh.html())
  for(var i=0;i<sh.length;i++)
  {
    //if(last_item != sh[i].attribs.href)
    {
    console.log(sh[i])
    //last_item = sh[i].attribs.href
    }
  }
});*/

var urlsd = require("url");
var path = require("path");
var fs = require('fs');  
async function downloadIMG(options) {
    try {
      const { filename, image } = await download.image(options)
      console.log("Finished",filename) // => /path/to/dest/image.jpg 
      id += 1
      get_f()
    } catch (e) {
      console.error(e)
    }
  }

var id = 0
var va = null
function get_f()
{
    if(va[id] != null)
    {
    //console.log(va[id])
    var fold = './public/equipments/'+va[id]._id
    var url = va[id].imgUrl
    mkdirp(fold, function(err) { 
        var opt = {
            url: url,
            dest: fold+"/img.png"
        }
        var parsed = urlsd.parse(va[id].imgUrl)
        //console.log()
       // console.log(fold)
        fs.exists(fold+"/img.png", function(exists) { 
            if(exists)
            {
                console.log("File exists",path.basename(parsed.pathname)) // => /path/to/dest/image.jpg 
                console.log(va[id])
                console.log(fold)
                fs.truncate(fold+"/info.json", 0, function(){
                    console.log('done')
                    fs.writeFile(fold+"/info.json", JSON.stringify(va[id]), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                    }); 
                })
                
                id += 1
                get_f()
                
            } else
            {
                fs.writeFile(fold+"/info.json", JSON.stringify(va[id]), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                }); 
                downloadIMG(opt)
            }
        })
        
        });
        // path exists unless there was an error
    }
}
  

var mkdirp = require('mkdirp');
request('https://dofapi2.herokuapp.com/equipments', function (error, response, body) {
    var res = JSON.parse(body)
    va = res
    id = 0
    get_f()
});


        /*for(var i =0;i<res.length;i++)
    {
        //console.log()
        var url = res[i]
        var fold = './equipments/'+res[i].type+"/"+res[i]._id
        mkdirp(fold, function(err) { 
            var opt = {
                url: url,
                dest: fold
            }
            console.log(url.imgUrl)
            //downloadIMG(opt)
            });
            // path exists unless there was an error
        }*/