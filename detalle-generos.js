window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    console.log(query2)
    let genre_id = query2.get("genre_id")
    let genre_name = query2.get("genre_name") 
    console.log(genre_name)
    console.log(genre_id)
    container_genero = document.querySelector(".detail_generos")
    titulo_genero = document.querySelector(".titulo_genero")
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genre_id}`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)
            titulo_genero.innerHTML += genre_name
            for(let i = 0; i < 10; i++){
                let path = data.results[i].poster_path
                let img = `https://image.tmdb.org/t/p/w500/${path}`
                let id = data.results[i].id
                container_genero.innerHTML += `<article class = "container">
                <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_title}" class="foto-home"></a>
                <p> ${ data.results[i].original_title} </p>
            </article>`
            }
        })







})
