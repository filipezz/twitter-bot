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
  var n = d.getDay(); // dia da semana(0-6)



authorize((authClient) => {

  const sheets = google.sheets({version: 'v4', authClient});
  
  sheets.spreadsheets.values.get({
    spreadsheetId: '1YvCqBrNw5l4EFNplmpRBFrFJpjl4EALlVNDk3pwp_dQ',
    range: dias[n],
    auth: authClient
  }, (err, res) => { if (err)return console.log('The API returned an error: ' + err);

  var response = String(res.data.values).split(',');
 
  
  const diaSemana = [
    'Domingo', 
     'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
     'Sábado', 
      ]

  var today = new Date();
  var date = today.getDate()+'/0'+(today.getMonth()+1)

  
  var almoço = 'Almoço de '+diaSemana[n]+''+date+'\n\nEntrada: '+response[0]+'\n\nPrincipal: '+response[1]+'\n\nVeg: '+response[2]+'\n\nGuarnição: '+response[3]+'\n\nAcompanhamento: '+response[4]+'\n\nSobremesa: '+response[5]+'\n\nRefresco: '+response[6]
  var janta = 'Janta de '+diaSemana[n]+''+date+'\n\nEntrada: '+response[8]+'\n\nPrincipal: '+response[9]+'\n\nVeg: '+response[10]+'\n\nGuarnição: '+response[11]+'\n\nAcompanhamento: '+response[12]+'\n\nSobremesa: '+response[13]+'\n\nRefresco: '+response[14]


  const Twit = require('twit')


 var T = new Twit({
   
   consumer_key:         process.env.TWITTER_CONSUMER_KEY,
   consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
   access_token:         process.env.TWITTER_ACCESS_TOKEN,
   access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET,
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
 
 
  var cron = require('node-cron');
 
 cron.schedule('45 01 * * *', function(){
   
   tweetaCardapio(almoço)

});

 cron.schedule('0 16 * * *', function(){

  tweetaCardapio(janta)
  
  });
 
  });
})


 function authorize(callback) {
  
  var authClient =  new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    process.env.PRIVATE_KEY,
    ['https://www.googleapis.com/auth/drive.readonly']
      
  );

  
  if (authClient == null) {
    console.log('authentication failed');
    return;
  }
  callback(authClient);
  }
 