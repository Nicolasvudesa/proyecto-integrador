window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    let busqueda = query2.get(".search")

    let resultado = this.document.querySelector(".resultados")
    resultado.innerHTML += `Resultados para: ${busqueda}`

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=032a1cc5e170bb64ead032809385412a&language=en-US&query=${busqueda}&page=1`)
	    .then(function(response){
	    return response.json();
})
	    .then(function(data){
	    console.log(data);

        let resultadoBusqueda = document.querySelector(".resultados")
        if(data.results.length == 0){
            resultadoBusqueda.innerHTML += `La búsqueda ${busqueda} no dio ningún resultado`
        }
        // else{
        //     for(let i = 0, )
        // }


})
	    .catch(function(error){
	    console.log('El error es: ' + error);
})
})