window.onload = () => {
    getData()
}
function getData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(params);
    fetch(`https://full-project-api.onrender.com/topstuk?id=${params.id}`)
        .then(response => {
            return response.json();
        })
        .then((e) => {

            console.log(e)

            let html = ''

            html += `


                  <button type="submit">
             <a href="/dist/aarde.html">
                <img width="50px" src="/dist/photos/aarde1.png"  />
             </a>
        </button>


        <div  class="background-info">
            <img src="/dist/photos/stars.png" alt="">
        </div>




        <div class="naam-topstuk">
            <h1>${e.topstuknaam}</h1>
        </div>
        <div class="foto-topstuk">
            <img src="/dist/photos/${e.fototopstuk}" alt="onbreekt">
        </div>



        <div class="flex-ontdekken">
            <div class="item">
                <img src="/dist/photos/glass.png" alt="onbreekt">
            </div>
            <div class="item">
                <h2>ontdekken</h2>
                <p>${e.beschrijving1}</p>
            </div>
        </div>




        <div class="flex-container">
            <div class="info-topstuk">
                <img src="/dist/photos/${e.foto2}" alt="onbreekt">

                <h2>${e.titel2}</h2>
                <p>${e.beschrijving2}</p>
            </div>
            <div class="info-topstuk">--
                <img src="/dist/photos/${e.foto3}" alt="onbreekt">

                <h2>${e.titel3}</h2>
                <p>${e.beschrijving3}</p>
            </div>
            <div class="info-topstuk">
                <img src="/dist/photos/${e.foto4}" alt="onbreekt">

                <h2>${e.titel4}</h2>
                <p>${e.beschrijving4}</p>
            </div>
        </div>



            `;

            document.getElementById('one').innerHTML = html;
        });

}




















/*


      <button type="submit">
             <a href="/dist/aarde.html">
                <img width="50px" src="https://i.ibb.co/CW5Wvry/buttonpng.png"  />
             </a>
        </button>


        <div  class="background-info">
            <img src="/dist/photos/stars.png" alt="">
        </div>




        <div class="naam-topstuk">
            <h1>de mammoet van lier</h1>
        </div>
        <div class="foto-topstuk">
            <img src="/dist/photos/Mammoet.png" alt="onbreekt">
        </div>



        <div class="flex-ontdekken">
            <div class="item">
                <img src="/dist/photos/glass.png" alt="onbreekt">
            </div>
            <div class="item">
                <h2>ontdekken</h2>
                <p>Ontdekking: in 1860 tijdens het graven van een Afleidingsvaart van de Nete te Lier.</p>
            </div>
        </div>




        <div class="flex-container">
            <div class="info-topstuk">
                <img src="/dist/photos/Image 58.png" alt="onbreekt">

                <h2>lichaam</h2>
                <p>Wolharig, Groot, beenderen van twee volwassen mammoeten en een jonge mammoet. Meeste beenderen van
                    Lier een mannelijke dier. Schothoogte van 3.6m}</p>
            </div>
            <div class="info-topstuk">--
                <img src="/dist/photos/Image 58.png" alt="onbreekt">

                <h2>skelet</h2>
                <p>Zijn skelet werd gemonteerd op een speciale smeedijzeren systeem in 1869 door Louise De Pauw</p>
            </div>
            <div class="info-topstuk">
                <img src="/dist/photos/Image 58.png" alt="onbreekt">

                <h2>gestorven</h2>
                <p>Hij stierf tussen de leeftijd van 30 en 35 jaar. Afgeleid uit de afslijting van zijn tanden.</p>
            </div>
        </div>





*/