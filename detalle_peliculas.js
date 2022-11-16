window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    let pelicula = query2.get(".title")

    let section = document.querySelector(".detallepelis")
    let entrar = document.querySelector(".foto-home")
    entrar.addEventListener("click", function(){
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1&include_adult=false&query=${pelicula}`)
        .then(function(response){
	        return response.json();
        })
	    .then(function(data){
            console.log(data);
            let contenedor = document.querySelector(".infoPelisTitulos")
            contenedor.innerHTML += `<p>Rating:<span class="infoPelisDetalles">${data.results.vote_average} </span></p>
            <p>Genero: <br><a href="./detalle-generos.html">${data.results.genre_ids}</a></p>
            <p>Año de estreno:<span class="infoPelisDetalles">${data.results.release_date}</span></p>
            <p>Reparto:<span class="infoPelisDetalles"></span></p>
            <p>Duracion:<span class="infoPelisDetalles"></span></p>
            <p>Sinopsis:<span class="infoPelisDetalles">${data.results.overview}</span></p>
            <p><a class = "botonFavoritos" href="./favoritos.html">Agregar a favoritos</a></p>`
        })
        .catch(function(error){
	        console.log('El error es: ' + error);
        })
    })
})
