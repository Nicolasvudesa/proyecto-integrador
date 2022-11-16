window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    console.log(query2)
    let id = query2.get("movie_id")
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`)
        .then(function(response){
	        return response.json();
        })
	    .then(function(data){
            console.log(data);
            let path = data.poster_path
            let contenedor_pelicula = document.querySelector(".detallepelis")
            let img = `https://image.tmdb.org/t/p/w500/${path}`
            let contenedor = document.querySelector(".infoPelisTitulos")
            contenedor_pelicula.innerHTML += `<img src="${img}" class="fotoDetalle"/>`
            contenedor_pelicula.innerHTML += ` <article class="infoPelisTitulos"> <p>Rating: <span class="infoPelisDetalles">  ${data.vote_average} </span></p>
            <p>Genero: <br> <a href="./detalle-generos.html">  ${data.genre_ids}</a></p>
            <p>Año de estreno:  <span class="infoPelisDetalles">  ${data.release_date}</span></p>
            <p>Duracion:  <span class="infoPelisDetalles">${data.runtime} min</span></p>
            <p>Sinopsis: <span class="infoPelisDetalles">${data.overview}</span></p>
            <p><a class = "botonFavoritos" href="./favoritos.html">Agregar a favoritos</a></p></article>`

            fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=2a3601e42fea0b8cec36fb4c1999c023`)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                if(data.results.length == 0){
                    contenedor.innerHTML += `La pelicula no tiene provedores`
                }
                else{
                    for(let i = 0; i < 5; i++){
                    let contenedor = document.querySelector(".infoPelisTitulos")
                    contenedor.innerHTML += `<p>Donde mirar:<span class="infoPelisDetalles">${data.results[i].provider_name}</span></p>`
                }
                }
                })
            .catch(function(error){
                console.log('El error es: ' + error);
        }) 
        })
        .catch(function(error){
	        console.log('El error es: ' + error);
        })

})
