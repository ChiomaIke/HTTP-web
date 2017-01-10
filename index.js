
"use strict";
//require all dependencies
var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
 
var Twitter = require('twitter');
var params = {screen_name: 'nodejs'};

var client = new Twitter({
  consumer_key: 'Mo94pyhnqO33JppwZHPS3YEX7',
  consumer_secret: 'Cqf9tqlGiJCnUcNJLuewwP9ULoYjqoMm3Nh2ngcsemmUuHUYxd',
  access_token_key: '260330127-YvL0MOWTACuyOHtNV4SBHjYUr6TgVlib8rgqfbQR',
  access_token_secret: 'yD7jOVOnzu4ipOGXDZFbCmscjuJZwJeXROGNuNGZuhpvv'
});
 
 clear();
console.log(
  chalk.yellow(
    figlet.textSync('CLI Twitter', { horizontalLayout: 'full' })
  )
);


function getTweetMessage(callback) {
  var questions = [
    {
      name: 'message',
      type: 'input',
      message: 'Enter a tweet to be posted (as @Genny021):',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your tweet to be posted';
        }
      }
    },
    
  ];

  inquirer.prompt(questions).then(callback);
 }
getTweetMessage(function(){
  var new_message = arguments[0].message;
  client.post('statuses/update', {status: new_message},  function(error, tweet, response) {
  if(error) throw error;
  console.log("Tweet successful"); 
}); 
});
  

