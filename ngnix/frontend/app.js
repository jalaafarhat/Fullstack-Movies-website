let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let search_input = document.getElementById('search_input');

// handle play and pause
let video = document.getElementsByTagName('video')[0];
let play = document.getElementById('play');
play.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        play.innerHTML = `Stop <i class="bi bi-pause-fill"></i>`
    } else {
        video.pause();
        play.innerHTML = `Watch <i class="bi bi-play-fill"></i>`
    }
})


left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
})
right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
})

let json_url = "movie.json";
let global_data;

fetch(json_url).then(Response => Response.json()).then((data) => {
    global_data = data;

    handleData(data)
});

function handleData(data) {
    // clear old data
    cards.innerHTML = "";

    data.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, desc } = ele;
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <img src="${sposter}" alt="${name}" class="poster">
        <div class="rest_card">
            <img src="${bposter}" alt="">
            <div class="cont">
                <h4>${name}</h4>
                <div class="sub">
                    <p>${genre},${date}</p>
                    <h3><span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</h3>
                </div>
            </div>
        </div>`;
        cards.appendChild(card);

        card.addEventListener('click', () => {
            document.getElementById('title').innerText = global_data[i].name;
            document.getElementById('gen').innerText = global_data[i].genre;
            document.getElementById('date').innerText = global_data[i].date;
            document.getElementById('rate').innerHTML = `<span>IMDB</span> <i class="bi bi-star-fill"></i> ${global_data[i].imdb}`;
            document.getElementById('desc').innerText = global_data[i].desc;
            video.src = `Movie/video/${global_data[i].trailer}`
        })
    });

    //search data load
    data.forEach(element => {
        let { name, imdb, date, sposter, genre, url } = element;
        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
        card.innerHTML = `
        <img src="${sposter}" alt="">
        <div class="cont">
            <h3>${name}</h3>
            <p>${genre},${date} <span>IMDB</span> <i class="bi bi-star-fill"></i> ${imdb}</p>
            </p>
        </div>`
        search.appendChild(card);
    })
    
}




