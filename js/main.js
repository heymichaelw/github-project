(function(){
  'use strict';

  var headers = {};
  var userurl = 'https://api.github.com/users/heymichaelw';
  var repourl = 'https://api.github.com/users/heymichaelw/repos?sort=updated';
  var orgurl = 'https://api.github.com/user/orgs';
  var repoNode = document.querySelector('.repo-feed');
  try {
    headers['Authorization'] = 'token ' + GIT_TOKEN;
  } catch (e) {
    //ignore error
  }

  var userObject = {};
  fetch(userurl, {headers: headers}).then((resp) => resp.json())
  .then(function(data){
     userObject = data;
     makeUserDiv(userObject);
  });

  var repoObject = {};
  fetch(repourl, {headers: headers}).then((resp) => resp.json())
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      repoObject = data[i];
      makeRepoDiv(repoObject);
    }
  });

  var orgObject = {};
  var orgNode = document.querySelector('.organizations');
  fetch(orgurl, {headers: headers}).then((resp) => resp.json())
  .then(function(data){
    for (var i = 0; i < data.length; i++) {
      orgObject = data[i];
      var orgPic = document.createElement('img');
      orgPic.src = orgObject.avatar_url;
      orgNode.appendChild(orgPic);

    }
  });


  function makeRepoDiv(repoObject){
    console.log(repoObject.language);
    var repoDiv = document.createElement('div');
    repoDiv.className = 'repo-div';
    repoNode.appendChild(repoDiv);
    var repoLink = document.createElement('a');
    repoLink.className = 'repo-link';
    repoLink.href = repoObject.html_url;
    repoLink.textContent = repoObject.name;
    repoDiv.appendChild(repoLink);
    var repoInfo = document.createElement('div');
    repoDiv.appendChild(repoInfo);
    var languageSpan = document.createElement('span');
    if (repoObject.language !== null){
      languageSpan.textContent = repoObject.language + " ";
      repoInfo.appendChild(languageSpan);
     }
    var languageColor = document.createElement('div');
    languageColor.className = 'color';
     if (repoObject.language === 'HTML'){
       languageColor.style.background = 'red';
       repoInfo.prepend(languageColor);
     } else if (repoObject.language === 'JavaScript') {
       languageColor.style.background = 'yellow';
       repoInfo.prepend(languageColor);
     } else if (repoObject.language === 'CSS'){
       languageColor.style.background = 'purple';
       repoInfo.prepend(languageColor);
     }
    var updatedSpan = document.createElement('span');
    updatedSpan.textContent = 'Updated ' + moment(repoObject.updated_at).fromNow();
    repoInfo.appendChild(updatedSpan);
  }

  var userPicture = document.querySelector('.user-picture');
  var userName = document.querySelector('.user-name');
  var userLogin = document.querySelector('.user-login');
  var userLocation = document.querySelector('.location');
  function makeUserDiv(userObject){
    userPicture.src = userObject.avatar_url;
    userName.textContent = userObject.name;
    userLogin.textContent = userObject.login;
    userLocation.textContent = userObject.location;
  }







})();
