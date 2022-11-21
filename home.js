window.addEventListener("load", function(){
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`)
        .then(function(response){
            return response.json();
            })
        .then(function(data){
            console.log(data);
            let contenedor_lanzamientos = document.querySelector(".lanzamientos");
            if(data){ 
                for(let i = 0; i < 5; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    let id = data.results[i].id
                    contenedor_lanzamientos.innerHTML += `<article class = "container">
                    <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_title}" class="foto-home"></a>
                    <p> ${ data.results[i].original_title} </p>
                </article>`
                }
            }
            })
        .catch(function(error){
            console.log('El error es: ' + error);
            })

    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`)
        .then(function(response){
            return response.json();
            })
        .then(function(data){
            console.log("data",data);
            let contenedor_populares = document.querySelector(".populares");
            if(data){ 
                for(let i = 0; i < 5; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    let id = data.results[i].id
                    contenedor_populares.innerHTML += `<article class="container">
                    <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_title}" class="foto-home"></a>
                    <p> ${ data.results[i].original_title} </p>
                </article>`
                }
            }
            })
        .catch(function(error){
            console.log('El error es: ' + error);
            })    

    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`)    
        .then(function(response){
            return response.json();
            })  
        .then(function(data){
            console.log(data);
            let contenedor_series = document.querySelector(".series");
            if(data){ // se puede sacar en este caso sirve
                for(let i = 0; i < 5; i++){
                    let path = data.results[i].poster_path
                    let img = `https://image.tmdb.org/t/p/w500/${path}`
                    let id = data.results[i].id
                    contenedor_series.innerHTML += `<article class = "container">
                    <a href="./detalle-series.html?serie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_name}" class="foto-home"></a>
                    <p> ${ data.results[i].original_name} </p>
                </article>`
                }
            }
        })
        .catch(function(error){
            console.log('El error es: ' + error);
        })
})

     
