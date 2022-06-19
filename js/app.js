//GAME FINDER 

let page = 1;
let number = 1;
let games = '';

let lastCard;
let pc = "https://i.ibb.co/mrppqGg/Group.png";
let playstation= "https://i.ibb.co/YjNp7C3/Group-2.png";
let xbox= "https://i.ibb.co/7jYhrvz/Group-10.png";
let switchh = "https://i.ibb.co/mrppqGg/Group.png";
const body = document.body;

let observer = new IntersectionObserver((cards)=> {
    cards.forEach(card => {
        if(card.isIntersecting){
            page++;
            fetchData();
        }
    });
}, {
    rootMargin: '0px 0px 200px 0px',
    threshold: 1.0
});

const fetchData = async() => {
	try {
		const res = await fetch(`https://api.rawg.io/api/games?key=455a12d11cd1428aa4233ceb7ddb317f&page=${page}`);

			const data = await res.json();
			data.results.forEach(game => {

                let genres = [];
                for (let i=0; i<game.genres.length; i++){
                    genres.push(game.genres[i].name);
                };
                genres = genres.join(", ");
                
            
				games += `
                <article class="card">
          
                <div class="cardPicture">
                    <img src="${game.background_image}" alt="Game's front image" class="gamePicture">
                </div>
     
                <p class="title">${game.name}</p>
                <p class="number">#${number}</p>
                    
                <p class="releaseDate">Release date:</p>
                <p class="releaseData">${game.released}</p>
                
                <div class="platforms" id="platforms">
                    <img class="platformIcon" src="https://via.placeholder.com/20x20"></img>
                    <img class="platformIcon" src="https://via.placeholder.com/20x20"></img>
                    <img class="platformIcon" src="https://via.placeholder.com/20x20"></img>
                    <img class="platformIcon" src="https://via.placeholder.com/20x20"></img>
                </div>
        
                <p class="genre">Genre:</p>
                <p class="genreData">${genres}</p>
        
            </article>`
                number++;

                let platformDiv = document.getElementsByClassName('platforms');

                for (let j=0; j<game.parent_platforms.length; j++){
                    let platforms = [];
                    platforms.push(game.parent_platforms[j].platform.name)
                }
                  
                
                
			});

			document.querySelector('.flex').innerHTML = games;
        if (lastCard){
            observer.unobserve(lastCard);
        }
            const cardsInScreen = document.getElementsByTagName("article");
            lastCard = cardsInScreen[cardsInScreen.length - 1];
            observer.observe(lastCard);

	} catch(error){
		console.log(error);
	}

}

fetchData();