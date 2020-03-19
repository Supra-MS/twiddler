/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};

function getTimeRem(postTime) {
  var postedTime = new Date();
  var formattedTime = '';
  var diffInSec = Math.floor((postedTime.getTime() - postTime.getTime()) / 1000);
  if (diffInSec < 60) {
      formattedTime = diffInSec + ' second(s) ago';
  } else if (diffInSec < 3600) {
      formattedTime = Math.floor(diffInSec / 60) + ' minute(s) ago';
  } else if (diffInSec < 86400) {
      formattedTime = Math.floor(diffInSec / 3600) + ' hour(s) ago';
  } else {
      formattedTime = Math.floor(diffInSec / 86400) + ' day(s) ago';
  }
  return formattedTime;
}

function loadTime() {
  var today = new Date();
  var date = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  var clock = date + '-' + month + '-' + year + '  ' + hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  return clock;
}

function visitorTweet() {
  var username = 'anonymous';
  var visitorTweet = {
      user: username,
      message: $('#newTweet').val(),
      created_at: loadTime()
  };

  streams.users[username] = streams.users[username] || [];
  addTweet(visitorTweet);
  console.log(visitorTweet);
}

function updateTweet() {
  var lastTweet = streams.home[streams.home.length - 1];
  var $atweetUser = $('<h5 class="tweetUser"></h5>');
  var $atweetMsg = $('<div class="tweetMsg"></div>');
  var $atweetDate = $('<span class="tweetDate"></span>');
  var $apostedTime = $('<span class="postedTime"></span>');

  $atweetUser.text('@' + lastTweet.user);
  $atweetMsg.text(lastTweet.message);
  $atweetDate.text(loadTime());
  
  $atweetDate.appendTo($atweetUser);
  $atweetMsg.prependTo($div);
  $atweetUser.prependTo($div);                    
}