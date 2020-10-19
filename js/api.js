let base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
const status = (response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json
const getLiga = () => {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/standings").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let LigaHTML = "";
          LigaHTML += `
            <div class="col s12">
            <div class="card-panel grey lighten-5">
              <div class="row valign-wrapper">
                <div class="col s6">
                    <span class="black-text">
                      <p>${data.competition.name}</p>
                      <p>Area : ${data.competition.area.name}</p>
                    </span>
                  
                </div>
                <div class="col s6">
                  <span class="black-text">        
                    <p>Start : ${data.season.startDate}</p>
                    <p>End :  ${data.season.endDate}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
                `;
                document.getElementById("klasemen").innerHTML = LigaHTML;
                let klasemenHTML = "";
                data.standings[0].table.forEach(function(klasemen) {
                  klasemenHTML += `
                  <tr>
                  <td>${klasemen.position}</td>
                  <td> 
                  <a href="./team.html?id=${klasemen.team.id}">
                  <img class="responsive-img" src="${klasemen.team.crestUrl}">
                  <span>
                  <p>${klasemen.team.name}</p>
                  </span> 
                  </a>
                  </td>
                  <td>${klasemen.playedGames}</td>
                  <td>${klasemen.won}</td>
                  <td>${klasemen.draw}</td>
                  <td>${klasemen.lost}</td>
                  <td>${klasemen.points}</td>
                  </tr>
                      `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("klasemen2").innerHTML = klasemenHTML;
        });
      }
    });
    // return
  }

  fetch(base_url + "competitions/2021/standings",{
    method: 'GET',
    headers: {
      'X-Auth-Token': '5ba090ebe19144019ac6084d8d9d8ccd'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
      let LigaHTML = "";
      LigaHTML += `
        <div class="col s12">
        <div class="card-panel grey lighten-5">
          <div class="row valign-wrapper">
            <div class="col s6">
                <span class="black-text">
                  <p>${data.competition.name}</p>
                  <p>Area : ${data.competition.area.name}</p>
                </span>
              
            </div>
            <div class="col s6">
              <span class="black-text">        
                <p>Start : ${data.season.startDate}</p>
                <p>End :  ${data.season.endDate}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
            `;
            document.getElementById("klasemen").innerHTML = LigaHTML;
            let klasemenHTML = "";
            data.standings[0].table.forEach(function(klasemen) {
              klasemenHTML += `
              <tr>
              <td>${klasemen.position}</td>
              <td> 
              <a href="./team.html?id=${klasemen.team.id}">
              <img class="responsive-img" src="${klasemen.team.crestUrl}">
              <span>
              <p>${klasemen.team.name}</p>
              </span> 
              </a>
              </td>
              <td>${klasemen.playedGames}</td>
              <td>${klasemen.won}</td>
              <td>${klasemen.draw}</td>
              <td>${klasemen.lost}</td>
              <td>${klasemen.points}</td>
              </tr>
                  `;
                });
                  // Sisipkan komponen card ke dalam elemen dengan id #content
                  document.getElementById("klasemen2").innerHTML = klasemenHTML;
    })
    .catch(error);
}

const getMatches = () => {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2021/matches").then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let mathesHtml = "";
      mathesHtml += `
      <div class="col s12">
      <div class="row">
        <div class="col s12">
          <div class="col s12">
            <div class="card-panel grey lighten-5">
              <div class="row valign-wrapper">
    
                <div class="col s8">
                  <span class="black-text">        
                    <p>Name    : ${data.competition.name}</p>
                    <p>Country : ${data.competition.area.name}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
         
                  `;
                  // Sisipkan komponen card ke dalam elemen dengan id #content
                  document.getElementById("matches").innerHTML = mathesHtml;
                  let resultMatchesHTML = "";
                  data.matches.slice(0,50).forEach(function(resultMatches) {
                
                    if (resultMatches.score.fullTime.homeTeam == null | resultMatches.score.fullTime.awayTeam == null) {
                      resultMatches.score.fullTime.homeTeam = 0
                      resultMatches.score.fullTime.awayTeam = 0
                    }
                    resultMatchesHTML += `
                    <tr>
                    <td>${resultMatches.homeTeam.name}</td>
                    <td>
                      <span>${resultMatches.score.fullTime.homeTeam}</span>
                      <span>VS</span>
                      <span>${resultMatches.score.fullTime.awayTeam}</span>
                      <br>
                      <span>${moment(resultMatches.utcDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </td>
                    <td>${resultMatches.awayTeam.name}</td>
                    </tr>
                        `;
                      });
                      // Sisipkan komponen card ke dalam elemen dengan id #content
                      document.getElementById("matches2").innerHTML = resultMatchesHTML;
        });
      }
    });
    // return
  }

  fetch(base_url + "competitions/2021/matches",{
    method: 'GET',
    headers: {
      'X-Auth-Token': '5ba090ebe19144019ac6084d8d9d8ccd'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(status)
    .then(json)
    .then(function(data) {
   
      let mathesHtml = "";
      mathesHtml += `
      <div class="col s12">
      <div class="row">
        <div class="col s12">
          <div class="col s12">
            <div class="card-panel grey lighten-5">
              <div class="row valign-wrapper">
                <div class="col s8">
                  <span class="black-text">        
                    <p>Name    : ${data.competition.name}</p>
                    <p>Country : ${data.competition.area.name}</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
    </div>
         
                  `;
                  // Sisipkan komponen card ke dalam elemen dengan id #content
                  document.getElementById("matches").innerHTML = mathesHtml;
                  let resultMatchesHTML = "";
                  data.matches.slice(0,50).forEach(function(resultMatches) {
                
                    if (resultMatches.score.fullTime.homeTeam == null | resultMatches.score.fullTime.awayTeam == null) {
                      resultMatches.score.fullTime.homeTeam = 0
                      resultMatches.score.fullTime.awayTeam = 0
                    }
                    resultMatchesHTML += `
                    <tr>
                    <td>${resultMatches.homeTeam.name}</td>
                    <td>
                      <span>${resultMatches.score.fullTime.homeTeam}</span>
                      <span>VS</span>
                      <span>${resultMatches.score.fullTime.awayTeam}</span>
                      <br>
                      <span>${moment(resultMatches.utcDate).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </td>
                    <td>${resultMatches.awayTeam.name}</td>
                    </tr>
                        `;
                      });
                      // Sisipkan komponen card ke dalam elemen dengan id #content
                      document.getElementById("matches2").innerHTML = resultMatchesHTML;
    })
    .catch(error);
}
function getSavedTeam() {
  getAll().then(function(data) {
    let TeamHTML = "";
    data.forEach(function(list) {

    TeamHTML += `
    <div id="informasi">
    <div class="row">
    <div class="col s12">
        <div class="col s12">
        <a  href="./team.html?id=${list.id}&saved=true">
        <div class="card-panel grey lighten-5">
            <div class="row valign-wrapper">
                <div class="col s4">
                    <img src="${list.crestUrl}" alt="" class="circle responsive-img"> 
                    </div>
            <div class="col s8">
                <span class="black-text">        
                <p>Name    : ${list.name}</p>
                <p>Website : ${list.website}</p>
                <p>Adress  : ${list.address}</p>
                <p>Staidum   : ${list.venue}</p>
                </span>
            </div>
            </div>
        </div>
        </a>
        </div>
    </div>
        </div>
    </div>
        `;

  });
        document.getElementById("body-content").innerHTML = TeamHTML;
  });
}
function getSavedTeamById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  getById(idParam).then(function(team) {
    let TeamHTML = "";
    TeamHTML += `
    <div id="informasi">
    <div class="row">
    <div class="col s12">
        <div class="col s12">
        <div class="card-panel grey lighten-5">
            <div class="row valign-wrapper">
                <div class="col s4">
                    <img src="${team.crestUrl}" alt="" class="circle responsive-img"> 
                    </div>
            <div class="col s8">
                <span class="black-text">        
                <p>Name    : ${team.name}</p>
                <p>Website : ${team.website}</p>
                <p>Adress  : ${team.address}</p>
                <p>Staidum   : ${team.venue}</p>
                </span>
            </div>
            </div>
        </div>
        </div>
    </div>
        </div>
    </div>
        `;
        document.getElementById("body-content").innerHTML = TeamHTML;
      });
    }
export {getLiga,getMatches,getSavedTeam,getSavedTeamById};

