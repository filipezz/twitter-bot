var {google} = require('googleapis');
const keys = require('./gcpconfig.json')
var cron = require('node-cron');

require('dotenv').config();

const dias = [
    'UFRJ!H4:H18', //domingo
     'UFRJ!B4:B18',
    'UFRJ!C4:C18',
    'UFRJ!D4:D18',
    'UFRJ!E4:E18',
    'UFRJ!F4:F18',
     'UFRJ!G4:G18', // sabado
     
    ]
   
    
    
    cron.schedule('30 10,16 * * *', function(){
      console.log('Iniciando...')

    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)  //data dd/mm
    var n = today.getDay(); // dia da semana(0-6)
    var hours = today.getHours(); // hora do dia

 authorize((authClient) => {

  const sheets = google.sheets({version: 'v4', authClient});
  
  sheets.spreadsheets.values.get({
    spreadsheetId: '1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ',
    range: dias[n],
    auth: authClient
  }, (err, res) => { if (err)return console.log('The API returned an error: ' + err);

  var response = res.data.values;
 
  var almoço = `Almoço ${date}\n\nEnt: ${response[0]}\n\nPP: ${response[1]}\n\nVeg: ${response[2]}\n\nGuar: ${response[3]}\n\nSobr: ${response[5]}\n\nRef: ${response[6]}`
  var jantar = `Jantar ${date}\n\nEnt: ${response[8]}\n\nPP: ${response[9]}\n\nVeg: ${response[10]}\n\nGuar: ${response[11]}\n\nSobr: ${response[13]}\n\nRef: ${response[14]}`



 if (hours== 10){

   console.log(hours)
   tweetaCardapio(almoço)
 }
 if(hours == 16){

  console.log(hours)
   tweetaCardapio(jantar)
 }


 
 
 
 function tweetaCardapio(refeição){

  const Twit = require('twit')
  var T = new Twit({
   
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
 })
  
 T.post('statuses/update', { status: refeição}, function(err, data, res) {
if(err){
  
  return console.log(err)
}
console.log('--------Twitando--------\n ' + refeição+'\n----------------')

 })}
 
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
 }
)
