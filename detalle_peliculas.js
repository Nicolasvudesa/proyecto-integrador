window.addEventListener("load", function () {
    let query1 = location.search;
    let query2 = new URLSearchParams(query1);
    let id = query2.get("movie_id");

    let loader = document.querySelector(".giphy-embed")
    loader.style.display = "none"
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("data", data);
        let path = data.poster_path;
        let contenedor_pelicula = document.querySelector(".detallepelis");
        let img = `https://image.tmdb.org/t/p/w500/${path}`;
        let contenedor = document.querySelector(".infoPelisTitulos");
        contenedor_pelicula.innerHTML += `<img src="${img}" alt="${data.original_title}" class="fotoDetalle"/>`;
        contenedor_pelicula.innerHTML += ` <article class="infoPelisTitulos"> <p>Rating: <span class="infoPelisDetalles">${data.vote_average} </span></p>
              <p class = "generos_nombre">Genero:</p>
              <p>Año de estreno:  <span class="infoPelisDetalles">${data.release_date}</span></p>
              <p>Duracion:  <span class="infoPelisDetalles">${data.runtime} min</span></p>
              <p class="sinopsis">Sinopsis:</p>
              <span class="infoPelisDetalles">${data.overview}</span>
              <div class="proveedores"> <p>Donde mirar:</p></div>
              <a href="#recomendaciones"><p class="boton_favs boton_recomendaciones">Ver recomendaciones</p></a>
              <p class="boton_favs boton_favoritos">Agregar a favoritos</p>
              </article>`;
              let contenedor_generos = document.querySelector(".generos_nombre");
        for (let i = 0; i < data.genres.length; i++) {
          let genre_id = data.genres[i].id;
          let genre_name = data.genres[i].name;
          contenedor_generos.innerHTML += `<a class="nomb_gen" href="./detalle-generos.html?genre_id=${genre_id}&genre_name=${genre_name}&type=pelicula"><span class="infoPelisDetalles">${genre_name}</span></a>`;
        }

        let favoritos_boton = document.querySelector(".boton_favoritos")
        let local_storage = localStorage.getItem("favorita")
        if (local_storage.includes(id)){
          favoritos_boton.innerText = "Eliminar de favoritos";
        }

        favoritos_boton.addEventListener("click", function(){
          let local_storage = localStorage.getItem("favorita")
          if (local_storage.includes(id)){
            let favoritas_string = localStorage.getItem("favorita");
            let favoritas = favoritas_string.split(",");
              let array_nuevo_favoritas = [];
              for (let i = 0; i < favoritas.length; i++) {
                if (Number(favoritas[i]) !== data.id) {
                  array_nuevo_favoritas.push(favoritas[i]);
                } else {
                }
              }
              localStorage.setItem("favorita", array_nuevo_favoritas.toString());
              favoritos_boton.innerText = "Agregar a favoritos"
          }
          else{
              let valueLocalStorage = localStorage.getItem("favorita");
              let newValue = id;
              let newLocalStorage = valueLocalStorage + "," + newValue;
              if (valueLocalStorage !== null) {
                localStorage.setItem("favorita", newLocalStorage);
              } else {
                localStorage.setItem("favorita", newValue);
              } 
              favoritos_boton.innerText = "Eliminar de favoritos"

          }
        })

      })
      .then(function (data) {
        let container_recomendaciones = document.querySelector(
          ".boton_recomendaciones"
        );
        container_recomendaciones.addEventListener("click", function () {
          let mostrar = document.querySelector(".mostrar_recomendaciones");
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&page=1`
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data);
              for (let i = 0; i < 5; i++) {
                let path = data.results[i].poster_path;
                let id = data.results[i].id
                let img = `https://image.tmdb.org/t/p/w500/${path}`;
                mostrar.innerHTML += `<article class="container">
                <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.results[i].title}" class="foto-home"></a>
                <p> ${data.results[i].title} </p>
            </article>`;
              }
            });
        });
      })
      .catch(function (error) {
        console.log("El error es: " + error);
      });
    fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=2a3601e42fea0b8cec36fb4c1999c023`)
      .then(function(response){
          return response.json();
      })
      .then(function(data){
        console.log(data)
          let proveedor = document.querySelector(".proveedores");
          let dataProvs = data.results
          let keys = Object.keys(dataProvs)
          if((keys.includes("US"))){
          let keys_pais = Object.keys(data.results.US)
          if(keys_pais.includes("flatrate")){
            for(let i = 0; i < data.results.US.flatrate.length; i++){
              let logo_path = data.results.US.flatrate[i].logo_path; 
              let img = `https://image.tmdb.org/t/p/w500/${logo_path}`
              proveedor.innerHTML +=  `<img class="logo_prov" src="${img}" alt='${data.results.US.flatrate[i].provider_name}'/>`
        }
          }
          else{
            proveedor.innerHTML += `<span class="infoPelisDetalles">¡Lo sentimos! La pelicula no tiene provedores en tu pais</span>`

          }
          }
          else{
            proveedor.innerHTML += `<span class="infoPelisDetalles">¡Lo sentimos! La pelicula no tiene provedores en tu pais</span>`

          }
          })
      .catch(function(error){
          console.log('El error es: ' + error);
  })
  });
  let query1 = location.search;
  let query2 = new URLSearchParams(query1);
  let id = query2.get("movie_id");

  let urlVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`
  fetch(urlVideo)
    .then(function (response) {
      return response.json();
    })
    .then(function (datavideo) {
let trailer = datavideo.results;
    let contenedorTrailer = document.querySelector(".trailer");
      for (let i = 0; i < datavideo.results.length; i++) {
        if(trailer[i].type == "Trailer"){
        contenedorTrailer.innerHTML =  `<iframe class="video_trailer" width="560" height="315" src="https://www.youtube.com/embed/${datavideo.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      }
    }
    })


   




