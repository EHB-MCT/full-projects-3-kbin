window.onload = () => {
    getData()
}
function getData() {
    fetch(`https://full-project-api.onrender.com/topstuk?id=4`)
        .then(response => {
            return response.json();
        })
        .then((e) => {

            console.log(e)

            let html = ''

            html += `
 <div class="naam-topstuk">
        <h1>${e.topstuknaam}</h1>
    </div>

    <div class="foto-topstuk">
        <img src="https://www.linkpicture.com/q/skelet-icoon.png" alt="">
    </div>
<div class="flex-container">
    <div class="info-topstuk">
        <img src="https://www.linkpicture.com/q/skelet-icoon.png" alt="">

        <h2>${e.titel1}</h2>
        <p>${e.beschrijving1}</p>
    </div>

    <div class="info-topstuk">
        <img src="https://www.linkpicture.com/q/skelet-icoon.png" alt="">

        <h2>${e.titel2}</h2>
        <p>${e.beschrijving2}</p>
    </div>
</div>

<div class="flex-container">
       <div class="info-topstuk">
        <img src="https://www.linkpicture.com/q/skelet-icoon.png" alt="">

        <h2>${e.titel3}</h2>
        <p>${e.beschrijving3}</p>
    </div>
        <div class="info-topstuk">
        <img src="https://www.linkpicture.com/q/skelet-icoon.png" alt="">

        <h2>${e.titel4}</h2>
        <p>${e.beschrijving4}</p>
    </div>
</div>


            `;

            document.getElementById('one').innerHTML = html;
        });

}
