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
            contenedor_pelicula.innerHTML += `<img src="${img}" alt="${data.original_title}" class="fotoDetalle"/>`
            contenedor_pelicula.innerHTML += ` <article class="infoPelisTitulos"> <p>Rating: <span class="infoPelisDetalles">${data.vote_average} </span></p>
            <p class = "generos_nombre">Genero:</p>
            <p>Año de estreno:  <span class="infoPelisDetalles">${data.release_date}</span></p>
            <p>Duracion:  <span class="infoPelisDetalles">${data.runtime} min</span></p>
            <p>Sinopsis: <span class="infoPelisDetalles">${data.overview}</span></p>
            <p><a class = "botonFavoritos" href="./favoritos.html">Agregar a favoritos</a></p></article>
            <p class="proveedores"><span class="infoPelisDetalles"> Donde mirar: </span></p>`
            let contenedor_generos = document.querySelector(".generos_nombre")
            for (let i = 0; i < data.genres.length; i++){
                let genre_id = data.genres[i].id
                let genre_name = data.genres[i].name
                contenedor_generos.innerHTML +=`<a href="./detalle-generos.html?genre_id=${genre_id}"><span class="infoPelisDetalles">${genre_name}</span></a>`
            }
            fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=2a3601e42fea0b8cec36fb4c1999c023`)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    let proveedor = document.querySelector(".proveedores");
                    console.log(data);
                    if(data.results.length == 0){
                        proveedor.innerHTML += `La pelicula no tiene provedores`
                    }
                    else{
                        for(let i = 0; i < 4; i++){
                            proveedor.innerHTML += `${data.results[0].flatrate[i].provider_name}`
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
