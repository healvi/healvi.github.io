    let base_url = "https://api.football-data.org/v2/";
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
    const getTeamId = () => {
        return new Promise(function(resolve, reject) {
        // Ambil nilai query parameter (?id=)
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");
        if ("caches" in window) {
        caches.match(base_url + "teams/" + idParam).then(function(response) {
            if (response) {
            response.json().then(function(data) {
                let TeamHTML = "";
                TeamHTML += `
                <div id="informasi">
                <div class="row">
                <div class="col s12">
                    <div class="col s12">
                    <div class="card-panel grey lighten-5">
                        <div class="row valign-wrapper">
                            <div class="col s4">
                                <img src="${data.crestUrl}" alt="" class="circle responsive-img"> 
                                </div>
                        <div class="col s8">
                            <span class="black-text">        
                            <p>Name    : ${data.name}</p>
                            <p>Website : ${data.website}</p>
                            <p>Adress  : ${data.address}</p>
                            <p>Staidum   : ${data.venue}</p>
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
                        resolve(data)
            });
            }
        });
        // return
        }
    
        fetch(base_url + "teams/" + idParam,{
        method: 'GET',
        headers: {
            'X-Auth-Token': '5ba090ebe19144019ac6084d8d9d8ccd'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        })
        .then(status)
        .then(json)
        .then(function(data) {
            let TeamHTML = "";
            TeamHTML += `
            <div id="informasi">
            <div class="row">
            <div class="col s12">
                <div class="col s12">
                <div class="card-panel grey lighten-5">
                    <div class="row valign-wrapper">
                        <div class="col s4">
                            <img src="${data.crestUrl}" alt="" class="circle responsive-img"> 
                            </div>
                    <div class="col s8">
                        <span class="black-text">        
                        <p>Name    : ${data.name}</p>
                        <p>Website : ${data.website}</p>
                        <p>Adress  : ${data.address}</p>
                        <p>Staidum   : ${data.venue}</p>
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
                resolve(data)
        })
        .catch(error);
        }
        )}