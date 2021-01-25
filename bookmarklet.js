const curl = require("curl");
const jsdom = require("jsdom");
const url = "https://www.gophercon.com/page/1475128/speakers";

curl.get(url, null, (err,resp,body)=>{
	if(resp.statusCode == 200){
		parseData(body);//runs only if request is successful
	}
	else{
		//some error handling
		console.log("error while fetching url");
	}
});








//function to extract relevant data

function parseData(html){
	const {JSDOM} = jsdom;
	const dom = new JSDOM(html);
   	const $ = (require('jquery'))(dom.window);

   	//let's start extracting the data
    var items = $(".element-1207469");
    //console.log(items.length);
    const ans=[]
	for(var i = 0; i < items.length; i++){
        var names= $(items[i]).children('.atom-fullname').text();//retrieving name
        var profile=$(items[i]).parent().find('a').attr('href');//retrieving profile info
        var headshot=$(items[i]).parent().find('object').attr('data');
        

        var title=$(items[i]).children('.atom-text1').text();
        var title=String(title);
        //condition for title info
        if (title.includes('CEO') || title.includes('ceo') || title.includes('Engineer') || title.includes('engineer') || title.includes('Manager') || title.includes('manager'))
        {
            var obj={'name':names,
            'title':title,

                'profile':'https://www.gophercon.com' + profile,
                'headshot_data_uri':headshot
            };
            ans.push(obj);
        }
		
    }  
    ans.sort((a, b) => a.name.localeCompare(b.name))
    var num_results=ans.length;
    console.log({
        'num_results':num_results,
        'results':ans}
        );
       	
}