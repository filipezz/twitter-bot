

var {google} = require('googleapis');
const keys = require('./keys.json')







const dias = [
    'UFRJ!H4:H18', //domingo
     'UFRJ!B4:B18',
    'UFRJ!C4:C18',
    'UFRJ!D4:D18',
    'UFRJ!E4:E18',
    'UFRJ!F4:F18',
     'UFRJ!G4:G18', // sabado
     
    ]
   
  var d = new Date();
  var n = d.getDay();



authorize((authClient) => {

  
  


  const sheets = google.sheets({version: 'v4', authClient});
  
  sheets.spreadsheets.values.get({
    spreadsheetId: '1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ',
    range: dias[n],
    auth: authClient
  }, (err, res) => { if (err)return console.log('The API returned an error: ' + err);

  var response = String(res.data.values).split(',');
 
  


  var today = new Date();
  var date = today.getDate()+'/0'+(today.getMonth()+1)

  
  var almoço = 'Almoço '+date+'\n\nEntrada: '+response[0]+'\n\nPrincipal: '+response[1]+'\n\nVeg: '+response[2]+'\n\nGuarnição: '+response[3]+'\n\nAcompanhamento: '+response[4]+'\n\nSobremesa: '+response[5]+'\n\nRefresco: '+response[6]
  var janta = 'Janta '+date+'\n\nEntrada: '+response[8]+'\n\nPrincipal: '+response[9]+'\n\nVeg: '+response[10]+'\n\nGuarnição: '+response[11]+'\n\nAcompanhamento: '+response[12]+'\n\nSobremesa: '+response[13]+'\n\nRefresco: '+response[14]




  const Twit = require('twit')




 var T = new Twit({
   
   consumer_key:         keys.twitter_consumer_key,
   consumer_secret:      keys.twitter_consumer_secret,
   access_token:         keys.twitter_access_token,
   access_token_secret:  keys.twitter_access_token_secret,
   timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
   strictSSL:            true,     // optional - requires SSL certificates to be valid.
 })
 
 function tweetaCardapio(refeição){
 T.post('statuses/update', { status: refeição}, function(err, data, res) {
if(err){
  console.log(err)  
}
console.log('--------Twitando-------- ' + refeição+'\n----------------')

 })}
 


 
var schedule = require('node-schedule');

var horaAlmoço = schedule.scheduleJob('30 9 * * *', function(){

  tweetaCardapio(almoço)

});

var horaJanta = schedule.scheduleJob('0 16 * * *', function(){

  tweetaCardapio(janta)
  
  });










  
  });
})


 function authorize(callback) {
  
  var authClient =  new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/drive.readonly']
      
  );

  
  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
  callback(authClient);
  }
 
















/* global.fetch = require("node-fetch");

const bearer = 'Bearer' + '101295697652517477487'
//headers.append('Content-Type', 'text/json');

fetch( 'https://sheets.googleapis.com/v4/spreadsheets/1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ/values/UFRJ!C4%3AC18?key=adbf75254e3689ec4f60e7f4bcf050bbf74b5dd1' 
, {method:'GET',
        headers:{ 
        'Authorization': bearer,
        'Accept': 'application/json'
      }
        ,
        
       })
.then(response => response.json())
.then(json => console.log(json));
 */