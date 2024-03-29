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
    var month = today.getMonth()+1
    
    var date = function checkMonth(){   //data dd/mm
    if (month<9){
       return date = today.getDate()+'/0'+month
    }else{
      return  date = today.getDate()+'/'+month
    }}()
    
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
 
  var almoço = `Almoço ${date}\n\nGuar1: ${response[0]}\n\nGuar2: ${response[1]}\n\nPP: ${response[2]}\n\nAcomp: ${response[3]}\n\nSobr: ${response[5]}}`
  var jantar = `Jantar ${date}\n\nGuar1: ${response[8]}\n\nGuar2: ${response[9]}\n\nPP: ${response[10]}\n\nAcomp: ${response[11]}\n\nSobr: ${response[13]}}`



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
