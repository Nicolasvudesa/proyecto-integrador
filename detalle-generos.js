window.addEventListener("load", function(){
    let query1 = location.search
    let query2 = new URLSearchParams(query1)
    console.log(query2)
    let genre_id = query2.get("genre_id") 
    console.log(genre_id)
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2a3601e42fea0b8cec36fb4c1999c023&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data)


        })







})
