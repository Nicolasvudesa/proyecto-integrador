window.addEventListener("load", function () {
  let favoritas_string = localStorage.getItem("favorita");
  let favoritas = favoritas_string.split(",");
  for (let i = 0; i < favoritas.length; i++) {
    let id = Number(favoritas[i]);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let contenedor_favoritos = document.querySelector(
          ".container_favoritos");
        if (data && favoritas[i] !== "") {
          let path = data.poster_path;
          let img = `https://image.tmdb.org/t/p/w500/${path}`;
          let id = data.id;
          contenedor_favoritos.innerHTML += `<article class="container">
                    <a href="./detalle-pelis.html?movie_id=${id}"> <img src="${img}" alt="Foto${data.original_title}" class="foto-home"></a>
                    <p> ${data.original_title} </p>
                </article>`;   
            }
        });
        }

  let favoritas_string_serie = localStorage.getItem("favoritas_series");
  let favoritas_serie = favoritas_string_serie.split(",");//["58", "89"]---->[58, 89]
  console.log(favoritas_serie)
  for (let i = 0; i < favoritas_serie.length; i++) {
    let id_serie = Number(favoritas_serie[i]);
    fetch(
      `https://api.themoviedb.org/3/tv/${id_serie}?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-U`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let contenedor_favoritos = document.querySelector(
          ".container_favoritos");
        if (data && favoritas_serie[i] !== "") {
          let path = data.poster_path;
          let img = `https://image.tmdb.org/t/p/w500/${path}`;
          let id = data.id;
          contenedor_favoritos.innerHTML += `<article class="container">
                    <a href="./detalle-series.html?serie_id=${id}"> <img src="${img}" alt="Foto${data.original_name}" class="foto-home"></a>
                    <p> ${data.original_name} </p>
                </article>`;   
            }
        });
        }
});

