window.addEventListener("load", function(){
    
    let lista_peliculas = document.querySelector(".generospeliculas")
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            for(let i = 0; i < data.genres.length; i++){
                let genre_id = data.genres[i].id
                console.log(genre_id)
                let genre_name = data.genres[i].name
                lista_peliculas.innerHTML += `<a href="./detalle-generos.html?genre_id=${genre_id}&genre_name=${genre_name}&type=pelicula"><div>${genre_name}</div></a>`
            }
            })

                let lista_series = document.querySelector(".generoseries")
                fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                        for(let i = 0; i < data.genres.length; i++){
                            let genre_id = data.genres[i].id
                            console.log(genre_id)
                            let genre_name = data.genres[i].name
                            lista_series.innerHTML += `<a href="./detalle-generos.html?genre_id=${genre_id}&genre_name=${genre_name}&type=series"><div>${genre_name}</div></a>`
                        }
                        })



})