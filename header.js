window.addEventListener("load", function(){
    let busqueda = document.querySelector(".iBusqueda")
    let buscar = document.querySelector(".search")
    busqueda.addEventListener("submit", function(e){
        e.preventDefault(e);
        if(buscar.value == ""){
            alert("Ingresa un termino para buscar")
        }
        else if(buscar.value.length<3){
            alert("La busqueda debe contener al menos 3 caracteres")
            }
        else{
            this.submit()
        }
    })

    busqueda.addEventListener("focus", function(e){
        alerta.style.display = 'none'
    })
})

