window.addEventListener("load", function(){
    //Capturamos la querystring
    let query1 = location.search
    let query2 = new URLSearchParams(query1)//me convierte la cadena de texto a objeto literal
    let busqueda = query2.get("busqueda")

    let resultado = document.querySelector(".resultados")
    resultado.innerHTML += `Resultados para: ${busqueda}`
    let loader = document.querySelector(".giphy-embed")
    loader.style.display = "none"

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1&include_adult=false&query=${busqueda}`)
	    .then(function(response){
	        return response.json();     
        })
	    .then(function(data){
            console.log(data);
            let resultadoBusqueda = document.querySelector(".resultados");
            let container = document.querySelector('.container_busqueda');
            if(data.results.length == 0){
                resultadoBusqueda.innerText = `La búsqueda ${busqueda} no dio ningún resultado`
                let boton_busqueda = document.querySelector(".boton_busqueda")
                boton_busqueda.innerHTML = ""
                let boton_borrar = document.querySelector(".boton_busqueda")
                boton_borrar.remove()

            }

            else{
                for(let i = 0; i < 4; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    let id = data.results[i].id
                    container.innerHTML += `<article class = "pelicula_buscada">
                    <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_title} " class="foto-home"></a>
                    <p class = "title">${data.results[i].original_title}</p>
                    <p>${data.results[i].release_date}</p>
                </article>`
                }
            }
            let siguiente = document.querySelector(".siguiente")
            let nro_pagina = 1 
            siguiente.addEventListener("click", function(){
                nro_pagina += 1
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=${nro_pagina}&include_adult=false&query=${busqueda}`)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    if(data.results.length == 0){
                        resultadoBusqueda.innerText = `La búsqueda ${busqueda} no dio ningún resultado`
                    }
                    else{
                        container.innerHTML = ""
                        for(let i = 0; i < 4; i ++){
                            let path = data.results[i].poster_path
                            let img = `https://image.tmdb.org/t/p/w500/${path}`
                            let id = data.results[i].id
                            container.innerHTML += `<article class = "pelicula_buscada">
                            <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_title} " class="foto-home"></a>
                            <p class = "title">${data.results[i].original_title}</p>
                            <p>${data.results[i].release_date}</p>
                        </article>`   
                        }
                    }
            }
            )
        })
        })
	    .catch(function(error){
	        console.log('El error es: ' + error);
        })
        fetch(`https://api.themoviedb.org/3/search/tv?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1&include_adult=false&query=${busqueda}`)
	    .then(function(response){
	        return response.json();
        })
	    .then(function(data){
            console.log(data);
            let series = document.querySelector(".resultados_series")
            let container_series = document.querySelector('.container_busqueda_series');
            if(data.results.length == 0){
                series.innerHTML = ""
                let boton_borrar = document.querySelector(".boton_busqueda")
                boton_borrar.remove()
            }
            else{
                for(let i = 0; i < 4; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    let id = data.results[i].id
                    container_series.innerHTML += `<article class = "pelicula_buscada">
                    <a href="./detalle-series.html?serie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_name}" class="foto-home"></a>
                    <p class = "title">${data.results[i].original_name}</p>
                    <p>${data.results[i].first_air_date}</p>
                </article>`
                }
            }
            let nro_pagina_serie = 1 
            let siguiente_serie = document.querySelector(".siguiente_serie")
            siguiente_serie.addEventListener("click", function(){
                nro_pagina_serie += 1
                fetch(`https://api.themoviedb.org/3/search/tv?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=${nro_pagina_serie}&include_adult=false&query=${busqueda}`)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    console.log(data);
                    if(data.results.length == 0){
                        series.innerHTML = ""
                    }
                    else{
                        container_series.innerHTML = ""
                        for(let i = 0; i < 4; i ++){
                            let path = data.results[i].poster_path
                            let img = `https://image.tmdb.org/t/p/w500/${path}`
                            let id = data.results[i].id
                            container_series.innerHTML += `<article class = "pelicula_buscada">
                            <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_name} " class="foto-home"></a>
                            <p class = "title">${data.results[i].original_name}</p>
                            <p>${data.results[i].first_air_date}</p>
                        </article>`   
                        }
                    }
            }
            )
        })         
        })
	    .catch(function(error){
	        console.log('El error es: ' + error);
        })
    
})

