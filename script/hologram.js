window.onload = () => {
    getData()
}
function getData() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    console.log(params);

    fetch(`https://full-project-api.onrender.com/topstuk?id=1`)
        .then(response => {
            return response.json();
        })
        .then((e) => {

            console.log(e)

            let html = ''

            html += `

        <div class="loadVideo">
            <video autoplay loop>
                <source src="/dist/videos/${e.hologram}" type="video/mp4">
            </video>
        </div>



            `;

            document.getElementById('hologram-video').innerHTML = html;
        });

}
