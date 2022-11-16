window.addEventListener("load", function(){
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`)
        .then(function(response){
            return response.json();
            })
        .then(function(data){
            console.log(data);
            let container = document.querySelector(".cointener_padre");
            for(let i = 0; i < data.results.length; i++){
                let path = data.results[i].poster_path
                let img = `https://image.tmdb.org/t/p/w500/${path}`
                let id = data.results[i].id
                console.log(id)
                container.innerHTML += `<article class = "container">
                <a href="./detalle-pelis.html"> <img src="${img}" alt="Foto${data.results[i].original_title}" class="foto-home"></a>
                </article>`
            }
            })
        .catch(function(error){
            console.log('El error es: ' + error);
            })
        })