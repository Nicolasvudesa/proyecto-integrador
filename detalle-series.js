window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    console.log(query2)
    let id_serie = query2.get("serie_id")
    fetch(`https://api.themoviedb.org/3/tv/${id_serie}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`)
        .then(function(response){
	        return response.json();
        })
	    .then(function(data){
            console.log(data);
            let path = data.poster_path
            let contenedor_serie = document.querySelector(".detalleserie")
            let img = `https://image.tmdb.org/t/p/w500/${path}`
            console.log(data.runtime)
            contenedor_serie.innerHTML += `<img src="${img}" alt = "${data.original_title}" class="fotoDetalle"/>`
            contenedor_serie.innerHTML += `<article class="infoPelisTitulos">
            <p>Rating: <span class="infoPelisDetalles">  ${data.vote_average} </span></p>
            <p class="generos">Genero: </p>
            <p>Año de estreno:  <span class="infoPelisDetalles">  ${data.first_air_date}</span></p>
            <p>Temporadas:<span class="infoPelisDetalles">${data.number_of_seasons} </span></p>
            <p>Sinopsis: <span class="infoPelisDetalles">${data.overview}</span></p>
            <p><a class = "botonFavoritos" href="./favoritos.html">Agregar a favoritos</a></p></article>`
            let contenedor_generos = document.querySelector(".generos")
            for (let i = 0; i < data.genres.length; i++){
                let genre_id = data.genres[i].id
                let genre_name = data.genres[i].name
                console.log(genre_id)
                console.log(genre_name)
                contenedor_generos.innerHTML +=`<a href="./detalle-generos.html?genre_id=${genre_id}"><span class="infoPelisDetalles">${genre_name}</span></a>`
            }
        })
        .catch(function(error){
	        console.log('El error es: ' + error);
        })
        // fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=2a3601e42fea0b8cec36fb4c1999c023`)
        //     .then(function(response){
        //         return response.json();
        //     })
        //     .then(function(data){
        //         console.log(data);
        //         if(data.results.length == 0){
        //             resultadoBusqueda.innerHTML += `La pelicula no tiene provedores`
        //         }
        //         else{
        //             for(let i = 0; i < 5; i++){
        //             let contenedor = document.querySelector(".infoPelisTitulos")
        //             contenedor.innerHTML += `<p>Donde mirar:<span class="infoPelisDetalles">${data.results[i].provider_name}</span></p>`
        //         }
        //         }
        //         })
        //     .catch(function(error){
        //         console.log('El error es: ' + error);
        // })
})