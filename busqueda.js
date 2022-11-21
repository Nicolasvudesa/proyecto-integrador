window.addEventListener("load", function(){
    //Capturamos la querystring
    let query1 = location.search
    let query2 = new URLSearchParams(query1)//me convierte la cadena de texto a objeto literal
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
                resultadoBusqueda.innerText = `La búsqueda ${busqueda} no dio ningún resultado`
            }
            else{
                for(let i = 0; i < data.results.length; i++){
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
            let resultadoBusqueda = document.querySelector(".resultados");
            let series = document.querySelector(".resultados_series")
            let container_series = document.querySelector('.container_busqueda_series');
            if(data.results.length == 0){
                series.innerHTML = ""
            }
            else{
                for(let i = 0; i < 8; i++){
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
        })
	    .catch(function(error){
	        console.log('El error es: ' + error);
        })
})










