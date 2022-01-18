var movieData;

async function openModal(index){ 

    try {
    const imdbId = movieData.Search[index].imdbID;
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=cf9173e9`;
    var response = await fetch(url);
    var data = await response.json();
    document.getElementById("poster").src = data.Poster;
    document.getElementById("movie-title").innerHTML = data.Title;
    document.getElementById("movie-details").innerHTML = `<b>Year :</b> ${data.Year}<br><b>Rated :</b> ${data.Rated}<br><b>Released :</b> ${data.Released}`+
    `<br><b>Runtime :</b> ${data.Runtime}<br><b>Genre :</b> ${data.Genre}<br><b>Director :</b> ${data.Director}<br><b>Writer:</b> ${data.Writer}`;
    document.getElementById("other-info").innerHTML = 
    `<b>IMDb Ratings: </b>${data.Ratings[0].Value} (${data.imdbVotes} Votes)<br>`+
    `<b>Actors: </b>${data.Actors}<br><b>Plot: </b>${data.Plot}<br><b>Language: </b>${data.Language}<br><b>Country: </b>${data.Country}<br>`+
    `<b>Awards: </b>${data.Awards}<br><b>Box Office: </b>${data.BoxOffice}<br>`;
    $("#exampleModalCenter").modal('toggle');
    }
    catch ({error}) {
        console.log(error);
    }
}
    
function showMovie(imgUrl,movieTitle,i) {
    var card = document.createElement("div");
    card.className = "card align-items-center shadow-lg p-3 mb-5 bg-white rounded";
    card.style.width = "18rem";
    card.style.height = "480px";
    card.style.marginLeft = "25px";
    var image = document.createElement('img');
    image.className = "card-img-top mt-3";
    image.src = imgUrl;
    image.style.height = "300px";
    image.style.width = "250px";
    var card_body = document.createElement("div");
    card_body.className = "card-body text-center";
    var para = document.createElement("p");
    para.innerHTML = movieTitle;
    para.className = "text-center"
    para.style.fontWeight = "bold";
    var link = document.createElement("button");
    link.type = "button";
    link.className = "btn btn-dark details";
    link.innerHTML = "See Details";
    link.id = `${i}`;
    link.onclick = function() {openModal(this.id)};
    card.appendChild(image);
    card_body.appendChild(para);
    card_body.appendChild(link);
    card.appendChild(card_body);
    var col = document.createElement("div");
    col.className = "grid col-lg-4 col-md-6 mb-4";
    col.appendChild(card);
    document.getElementById("row1").appendChild(col);
}           

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function getMovie()
{
    removeAllChildNodes(document.getElementById("row1"));
    const movieName = document.getElementById("search").value;
    const url = `http://www.omdbapi.com/?s=${movieName}&apikey=cf9173e9`;
    var response = await fetch(url);
    var data = await response.json();
    const arr = data.Search;

    const result = document.getElementById("result");
    var flag = 0;

    if(data.Response=="True")
    {
        if(flag)
        container.remove();
        result.innerHTML = `Search results for "${movieName}" :`;
        var i;
        const size = arr.length;
        for(i=0; i<size; i++)
        showMovie(arr[i].Poster,arr[i].Title,i);
    }
    else
    {
        flag = 1;
        result.innerHTML = "";
        var errorImage = document.createElement("img");
        errorImage.src = "./images/error.jpg";
        errorImage.className = "img-fluid";
        errorImage.style.width = "60%";
        var container = document.createElement("div");
        container.className = "col text-center";
        container.appendChild(errorImage);
        document.getElementById("row1").appendChild(container);
    }

    movieData = data;
}