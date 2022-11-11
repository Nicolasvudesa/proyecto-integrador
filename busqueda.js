window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    let busqueda = query2.get("busqueda")

    let resultado = this.document.querySelector(".resultados")
    resultado.innerHTML += `Resultados para: ${busqueda}`

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1&include_adult=false&query=${busqueda}`)
	    .then(function(response){
	        return response.json();
        })
	    .then(function(data){
            console.log(data);
            let resultadoBusqueda = document.querySelector(".resultados");
            let container = document.querySelector('.container_busqueda');
            if(data.results.length == 0){
                resultadoBusqueda.innerHTML += `La búsqueda ${busqueda} no dio ningún resultado`
            }
            else{
                for(let i = 0; i < data.results.length; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    container.innerHTML += `<article class = "pelicula_buscada">
                    <a href=".//detalle-pelis.html"> <img src="${img}" alt="Foto${data.results[i].original_title} " class="foto-home"></a>
                    <p>${data.results[i].original_title}</p>
                    <p>${data.results[i].release_date}</p>
                </article>`
                }
            }
        })
	    .catch(function(error){
	        console.log('El error es: ' + error);
        })

        fetch(`https://api.themoviedb.org/3/movie/&query=${busqueda}/similar?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                let container_otras = document.querySelector('.container_busqueda_otras');
                if(data.length > 0){
                    for(let i = 0; i < data.results.length; i++){
                        container_otras.innerHTML += `<article class = "pelicula_recomendada">
                        <p>${data.results[i].original_title}</p>
                        <p>${data.results[i].release_date}</p>
                    </article>`
                            }
                }
                })
            .catch(function(error){
                console.log(error)
            })
})