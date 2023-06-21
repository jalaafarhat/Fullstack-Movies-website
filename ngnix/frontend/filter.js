
//search filter
search_input.addEventListener('keyup', () => {
    let filter = search_input.value.toUpperCase();
    let a = search.getElementsByTagName('a');
    for (let index = 0; index < a.length; index++) {
        let b = a[index].getElementsByClassName('cont')[0];
        let textValue = b.textContent || b.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            a[index].style.display = "flex";
            search.style.visibility = "visible";
            search.style.opacity = 1;
        } else {
            a[index].style.display = "none";
        }
        if (search_input.value == 0) {
            search.style.visibility = "hidden";
            search.style.opacity = 1;
        }
    }
})

//filter series
let series = document.getElementById('series');
series.addEventListener('click', (event) => {
    event.preventDefault()
    cards.innerHTML = ``;
    let series_array = global_data.filter(ele => {
        return ele.type === "series";
    });
    series_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
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
            </div>`
        cards.appendChild(card);
    });
})
//filter movies
let movies = document.getElementById('movies');
movies.addEventListener('click', (event) => {
    event.preventDefault()
    cards.innerHTML = ``;
    let movie_array = global_data.filter(ele => {
        return ele.type === "movie";
    });
    movie_array.forEach((ele, i) => {
        let { name, imdb, date, sposter, bposter, genre, url } = ele;
        let card = document.createElement('a');
        card.classList.add('card');
        card.href = url;
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
            </div>`
        cards.appendChild(card);
    });
})