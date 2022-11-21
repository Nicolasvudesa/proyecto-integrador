window.addEventListener("load", function () {
  let query1 = location.search;
  let query2 = new URLSearchParams(query1);
  console.log(query2);
  let id_serie = query2.get("serie_id");
  console.log(id_serie)
  fetch(
    `https://api.themoviedb.org/3/tv/${id_serie}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let path = data.poster_path;
      let contenedor_serie = document.querySelector(".detalleserie");
      let img = `https://image.tmdb.org/t/p/w500/${path}`;
      console.log(data.runtime);
      contenedor_serie.innerHTML += `<img src="${img}" alt = "${data.original_title}" class="fotoDetalle"/>`;
      contenedor_serie.innerHTML += `<article class="infoPelisTitulos">
            <p>Rating: <span class="infoPelisDetalles">  ${data.vote_average} </span></p>
            <p class="generos">Genero: </p>
            <p>Año de estreno:  <span class="infoPelisDetalles">  ${data.first_air_date}</span></p>
            <p>Temporadas:<span class="infoPelisDetalles">${data.number_of_seasons} </span></p>
            <p>Sinopsis: <span class="infoPelisDetalles">${data.overview}</span></p>
            <p class="boton_recomendaciones">Ver recomendaciones</p>
            <p class="boton_favoritos_serie">Agregar a favoritos</p>
            <button class="borrar_serie">Borrar</button></article>`;
      let contenedor_generos = document.querySelector(".generos");
      for (let i = 0; i < data.genres.length; i++) {
        let genre_id = data.genres[i].id;
        let genre_name = data.genres[i].name;
        console.log(genre_id);
        console.log(genre_name);
        contenedor_generos.innerHTML += `<a href="./detalle-generos.html?genre_id=${genre_id}"><span class="infoPelisDetalles">${genre_name}</span></a>`;
      }

      let agregar_favorito = document.querySelector(".boton_favoritos_serie");
      agregar_favorito.addEventListener("click", function () {
        console.log("click");
        let valueLocalStorage = localStorage.getItem("favoritas_series");
        let newValue = id_serie;
        let newLocalStorage = valueLocalStorage + "," + newValue;
        if (valueLocalStorage !== null) {
          localStorage.setItem("favoritas_series", newLocalStorage);
        } else {
          localStorage.setItem("favoritas_series", newValue);
        }
      });
      let borrar_fav_serie = document.querySelector(".borrar_serie");
      let favoritas_string_series = localStorage.getItem("favoritas_series");
      console.log(favoritas_string_series)
      let favoritas_serie = favoritas_string_series.split(",");
      borrar_fav_serie.addEventListener("click", function () {
        console.log("test");
        let array_nuevo_favoritas_serie = [];
        for (let i = 0; i < favoritas_serie.length; i++) {
          console.log(data.id)
          if (Number(favoritas_serie[i]) !== data.id) {
            array_nuevo_favoritas_serie.push(favoritas_serie[i]);
          } else {
          }
        }
        console.log(array_nuevo_favoritas_serie);
        localStorage.setItem("favoritas_series", array_nuevo_favoritas_serie.toString());
      });
    })
    .then(function (data) {
      let container_recomendaciones = document.querySelector(
        ".boton_recomendaciones"
      );
      console.log(container_recomendaciones);
      container_recomendaciones.addEventListener("click", function () {
        console.log("click");
        let mostrar = document.querySelector(".mostrar_recomendaciones_series");
        fetch(
          `https://api.themoviedb.org/3/tv/${id_serie}/recommendations?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            for (let i = 0; i < 5; i++) {
              let path = data.results[i].poster_path;
              let id = data.results[i].id;
              let img = `https://image.tmdb.org/t/p/w500/${path}`;
              mostrar.innerHTML += `<article class="container">
                    <a href="./detalle-series.html?serie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].original_name}" class="foto-home"></a>
                    <p> ${data.results[i].original_name} </p>
                </article>`;
            }
          });
      });
    })
    .catch(function (error) {
      console.log("El error es: " + error);
    });
});

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
