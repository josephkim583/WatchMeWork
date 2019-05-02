// printHelloWorld();

triggersearch();

let searchResponse;

// chrome.extension.getBackgroundPage().console.log(searchResponse);



document.addEventListener('DOMContentLoaded', function() {
    var searchButton = document.getElementById('run-google-search');
    // onClick's logic below:
    searchButton.addEventListener('click', function() {
        printHelloWorld();

        // let attacher = document.getElementsByClassName('branding-below');
        var newDiv = document.createElement("div");

        chrome.extension.getBackgroundPage().console.log(document.body.childNodes);

        chrome.storage.local.get(["response"], function(result) {
          chrome.extension.getBackgroundPage().console.log('Value has been set to a variable.');
          searchResponse = result;
          chrome.extension.getBackgroundPage().console.log(searchResponse);
          chrome.extension.getBackgroundPage().console.log(typeof(searchResponse));

          let aNode = document.createElement('a');
          let textNode = document.createTextNode("a");

          let testANode = document.createElement('a');
          let testtextNode = document.createTextNode("This is a test");
          testANode.appendChild(testtextNode);
          testANode.title = searchResponse["response"][0]["snippet"]
          testANode.href = searchResponse["response"][0]["link"];
          // aNode.appendChild(textNode);
          // aNode.title = response["items"][0]["snippet"]
          // aNode.href = response["items"][0]["link"];

          for (var i = 0; i < searchResponse["response"].length; i ++){
            chrome.extension.getBackgroundPage().console.log(searchResponse["response"][i]["title"]);

            tempNode = aNode.cloneNode();
            tempTextNode = textNode.cloneNode();
            tempTextNode.textContent = searchResponse["response"][i]["snippet"];
            tempNode.appendChild(tempTextNode);
            tempNode.title = searchResponse["response"][i]["snippet"]
            tempNode.href = searchResponse["response"][i]["link"];
            tempNode.style.zIndex = "10";

            chrome.extension.getBackgroundPage().console.log(tempNode);

            newDiv.appendChild(tempNode);
            document.body.appendChild(tempNode);
            document.body.appendChild(newDiv);
          }

          newDiv.style.border = "thick solid #0000FF"
          document.body.appendChild(newDiv);

          chrome.extension.getBackgroundPage().console.log(document.body.childNodes);
        });
    });
});

function printHelloWorld(){
  chrome.extension.getBackgroundPage().console.log("hello world!");
}

function getGoogleSearchResults(specificity_val) {
  //var text = getAllText();
  // var currText = getCurrParagraph();
  // var firstText = getFirstParagraph();
  // var entityKeyWords = extractPhrases(currText, "entity", specificity_val);
  // var phraseKeyWords = extractPhrases(firstText, "phrases", 3);
  // var keyWords = phraseKeyWords + entityKeyWords;
  // var result = googleCustomSearch(keyWords);
  var keyWords = "apple";
  var result = googleCustomSearch("apple");
  var queryTitles = [];
  var queryBodies = [];
  var queryURLs = [];

  for (var i = 0; i < result.length; i++) {
    queryTitles.push(result[i].title);
    queryBodies.push(result[i].snippet);
    queryURLs.push(result[i].link);
  }

  chrome.extension.getBackgroundPage().console.log(queryTitles);
  chrome.extension.getBackgroundPage().console.log(queryBodies);
  chrome.extension.getBackgroundPage().console.log(queryURLs);
  // return {
  //   result: [queryTitles, queryBodies, queryURLs],
  //   keyword: keyWords,
  // };
}

function hndlr(response) {
  // chrome.extension.getBackgroundPage().console.log(response);                 // a way to see your results
  // chrome.extension.getBackgroundPage().console.log(response["items"]);
  // chrome.extension.getBackgroundPage().console.log(response["items"][0]);

  // var aNode = document.createElement('a');
  // var textNode = document.createTextNode(response["items"][0]["snippet"]);
  // aNode.appendChild(textNode);
  // aNode.title = response["items"][0]["snippet"]
  // aNode.href = response["items"][0]["link"];
  //
  // document.body.appendChild(aNode);

  let aNode = document.createElement('a');
  let textNode = document.createTextNode("a");
  let brNode = document.createElement("br");

  // let testANode = document.createElement('a');
  // let testtextNode = document.createTextNode("This is a test");
  // testANode.appendChild(testtextNode);
  // testANode.title = searchResponse["response"][0]["snippet"]
  // testANode.href = searchResponse["response"][0]["link"];
  // aNode.appendChild(textNode);
  // aNode.title = response["items"][0]["snippet"]
  // aNode.href = response["items"][0]["link"];

  for (var i = 0; i < response["items"].length; i ++){
    // chrome.extension.getBackgroundPage().console.log(searchResponse["response"][i]["title"]);

    tempNode = aNode.cloneNode();
    tempTextNode = textNode.cloneNode();
    tempBR = brNode.cloneNode();
    tempBR2 = brNode.cloneNode();
    tempTextNode.textContent = response["items"][i]["snippet"];
    tempNode.appendChild(tempTextNode);
    // tempNode.title = response["items"][i]["snippet"]
    tempNode.href = response["items"][i]["link"];

    chrome.extension.getBackgroundPage().console.log(tempNode);

    // newDiv.appendChild(tempNode);
    // document.getElementById("branding-below").appendChild(tempBR);
    // document.getElementById("branding-below").appendChild(tempNode);
    // document.getElementById("branding-below").appendChild(tempBR2);
    document.body.appendChild(tempBR);
    document.body.appendChild(tempNode);
    document.body.appendChild(tempBR2);

  }

  chrome.storage.local.set({"response": response["items"]}, function() {
          chrome.extension.getBackgroundPage().console.log('Response has been set');
        });
}

function triggersearch(){
  let query = "apple";

  var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%&callback=hndlr";

  // Script-specific credentials & search engine
  var ApiKey = "******************";
  var searchEngineID = "************";
  // Build custom url
  var url = urlTemplate
    .replace("%KEY%", (ApiKey))
    .replace("%CX%", (searchEngineID))
    .replace("%Q%", (query));

  chrome.extension.getBackgroundPage().console.log(url);

  // testing code from https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file
  var JSElement = document.createElement('script');
  JSElement.src = url;
  document.getElementsByTagName('head')[0].appendChild(JSElement);
}

function secondSearch(){
  let query = "apple";

  // var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%&callback=hndlr";
  var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%";

  // Script-specific credentials & search engine
  var ApiKey = "AIzaSyDAErFBFTUP4PhEJpGhJlUTrhBDXSoCh9U";
  var searchEngineID = "016946273156636846852:8aa7ymixbca";
  // Build custom url
  var url = urlTemplate
    .replace("%KEY%", (ApiKey))
    .replace("%CX%", (searchEngineID))
    .replace("%Q%", (query));

  chrome.extension.getBackgroundPage().console.log(url);

  // testing code from https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file
  fetch(url)
  .then(function(response) {
    chrome.extension.getBackgroundPage().console.log(response);;
  });

  chrome.extension.getBackgroundPage().console.log("hello");
}

function thirdSearch(){
  let query = "apple";

  // var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%&callback=hndlr";
  var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%";

  // Script-specific credentials & search engine
  var ApiKey = "AIzaSyDAErFBFTUP4PhEJpGhJlUTrhBDXSoCh9U";
  var searchEngineID = "016946273156636846852:8aa7ymixbca";
  // Build custom url
  var url = urlTemplate
    .replace("%KEY%", (ApiKey))
    .replace("%CX%", (searchEngineID))
    .replace("%Q%", (query));

  chrome.extension.getBackgroundPage().console.log(url);

  // testing code from https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.responseType = 'json';
  xhr.onload = function(e) {
    chrome.extension.getBackgroundPage().console.log(this.response);
  };

  xhr.send();

  chrome.extension.getBackgroundPage().console.log(xhr);
  chrome.extension.getBackgroundPage().console.log("end hello");
}

/**
 * Use Google's customsearch API to perform a search query.
 * See https://developers.google.com/custom-search/json-api/v1/using_rest.
 *
 * @param {string} query   Search query to perform, e.g. "test"
 *
 * returns {object}        See response data structure at
 *                         https://developers.google.com/custom-search/json-api/v1/reference/cse/list#response
 */
function googleCustomSearch( query ) {
  var urlTemplate = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%";

  // Script-specific credentials & search engine
  var ApiKey = "AIzaSyDAErFBFTUP4PhEJpGhJlUTrhBDXSoCh9U";
  var searchEngineID = "016946273156636846852:8aa7ymixbca";
  // Build custom url
  var url = urlTemplate
    .replace("%KEY%", (ApiKey))
    .replace("%CX%", (searchEngineID))
    .replace("%Q%", (query));

  var params = {
    muteHttpExceptions: true
  };

  chrome.extension.getBackgroundPage().console.log(url);

  // testing code from https://stackoverflow.com/questions/16040889/google-custom-search-api-in-a-js-file
  var JSElement = document.createElement('script');
  JSElement.src = url;
  document.getElementsByTagName('head')[0].appendChild(JSElement);

  chrome.extension.getBackgroundPage().console.log(JSElement);

  try {

    var response = UrlFetchApp.fetch(url, params);
    var queryResults = [];

    chrome.extension.getBackgroundPage().console.log(response)
    // if (response.getResponseCode() == 200) {
    //
    //   var content = JSON.parse(response);
    //
    //
    //   // Did the search return any results?
    //   if (content.searchInformation.totalResults > 0) {
    //     var count = content.items.length;
    //
    //
    //     //for (var i = 0; i < count; i++) {
    //       //if (typeof content.items[i].pagemap != 'undefined' && typeof content.items[i].pagemap.article != 'undefined'){
    //         //queryResults.push(content.items[i].pagemap.article);
    //       //}
    //      //}
    //     queryResults = content.items;
    //     //Logger.log(queryResults);
    //     if (queryResults.length > 5){
    //       queryResults = queryResults.slice(0,5);
    //     };
    //     return queryResults;
    //   }
    // }
  } catch (f) {
    //TODO: throw exception
    chrome.extension.getBackgroundPage().console.log("Failed googleCustomSearch");
  }

}

// let config = {
//   apiKey: "AIzaSyBjJGzI3D2MCHe9HLWwc_bgFCsiHyFEw7s",
//   databaseURL: "https://chromeextension-4f2a6.firebaseio.com/",
// };
// const app = firebase.initializeApp(config);
// const appDb = app.database();
// let appDbRefSearches = appDb.ref("searches");
// let appDbRefMappings = appDb.ref("mappings");
//
// // printing tab url
// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
//
// });
//
// let retVal = null;
//
// let groupVal = '';
//
//
// chrome.storage.sync.get(['group'], function(result) {
//       // console.log(result);
//       // chrome.extension.getBackgroundPage().console.log('Value currently is ' + result['group']);
//       groupVal = result['group']
//   });
//
//
//
// appDbRefSearches.on("value", function(snapshot) {
//   retVal = snapshot.val();
//   chrome.extension.getBackgroundPage().console.log(snapshot.val());
// });
//
// appDbRefMappings.on("value", function(snapshot) {
//   retValMappings = snapshot.val();
//   chrome.extension.getBackgroundPage().console.log(snapshot.val());
// });
//
// // taken from https://gist.github.com/samjarman/a39e344539a521b428317ff5d2f9cf25
// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // Fetch the current tab
//   chrome.extension.getBackgroundPage().console.log('sending data');
//   chrome.tabs.sendMessage(tabs[0].id, {message: "preach", preachText: retVal});
//   chrome.extension.getBackgroundPage().console.log('data sent');
// });
//
// chrome.extension.getBackgroundPage().console.log('testing appDb');
// chrome.extension.getBackgroundPage().console.log(appDb);
//
// function initApp() {
//   // Listen for auth state changes.
//   firebase.auth().onAuthStateChanged(function(user) {
//     chrome.extension.getBackgroundPage().console.log('User state change detected from the Background script of the Chrome Extension:', user);
//   });
// }
//
// window.onload = function() {
//   initApp();
// };
//
// let addButtons = document.getElementById('addButtons');
// addButtons.style.backgroundColor = "green";
//
// //let captureSearch = document.getElementById('captureSearch');
//
// let buttonsAdded = false;
// let inputLog = false;
//
// let rows = [];
//
// // captureSearch.onclick = function(element) {
// // 	//chrome.extension.getBackgroundPage().console.log('input');
// //   	//const infoDisplay = getElementById('searchTerms');
// //   	//chrome.extension.getBackgroundPage().console.log('infoDisplay');
// //   	};
//
// addButtons.onclick = function(element) {
//   chrome.extension.getBackgroundPage().console.log('groupVal is: ' + groupVal);
//
//   if (!buttonsAdded){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       let onAdvanceLexis = false;
//
//       let currentURL = tabs[0].url;
//       let decidingChar =  currentURL[8];
//
//       // chrome.extension.getBackgroundPage().console.log(currentURL);
//       // chrome.extension.getBackgroundPage().console.log(decidingChar);
//
//       if (decidingChar == 'a'){
//         onAdvanceLexis = true;
//       }
//
//       // chrome.tabs.executeScript(
//       //     tabs[0].id,
//       //     {file: 'addButtons.js'});
//
//       var passingDataSearches = retVal;
//       var passingDataMappings = retValMappings;
//       // chrome.extension.getBackgroundPage().console.log(passingData);
//       if (onAdvanceLexis){
//         chrome.tabs.executeScript(tabs[0].id,
//           {code: 'let groupVal = ' + JSON.stringify(groupVal) +';'
//                + 'let passingDataSearches = ' + JSON.stringify(passingDataSearches) +';'
//                + 'let passingDataMappings = ' + JSON.stringify(passingDataMappings) +';'
//                + 'let config = ' + JSON.stringify(config) +';'}, function() {
//             chrome.tabs.executeScript(tabs[0].id, {file: 'addButtons.js'});
//         });
//       }
//       else{
//         chrome.tabs.executeScript(tabs[0].id,
//           {code: 'let groupVal = ' + JSON.stringify(groupVal) +';'
//                + 'let passingDataSearches = ' + JSON.stringify(passingDataSearches) +';'
//                + 'let passingDataMappings = ' + JSON.stringify(passingDataMappings) +';'
//                + 'let config = ' + JSON.stringify(config) +';'}, function() {
//             chrome.tabs.executeScript(tabs[0].id, {file: 'addWestLawButtons.js'});
//         });
//       }
//
//
//     });
//     buttonsAdded = true;
//   };
//   // if (!inputLog){
//   //   	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   //     	// chrome.tabs.executeScript(
//   //     	//     tabs[0].id,
//   //     	//     code: 'var rowsScore = ' + holderVal,
//   //     	chrome.tabs.executeScript(
//   //         	tabs[0].id,
//   //         	{file: 'content.js'});
//   //   	});
//   //   	inputLog = true;
//   // 	};
//
// };
