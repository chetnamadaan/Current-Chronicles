const API_KEY = "62ab0aef458b47ebad09b01b15b70b41";
const url = "https://newsapi.org/v2/everything?q=";
const startDate = "2024-08-01"; 
const endDate = "2024-08-31";   

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${encodeURIComponent(query)}&from=${startDate}&to=${endDate}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        console.log(data); 
        bindData(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;
    
    cardClone.querySelector('.card').addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    if (curSelectedNav) {
        curSelectedNav.classList.remove('active');
    }
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value.trim(); 
    if (!query) return;
    fetchNews(query);

    if (curSelectedNav) {
        curSelectedNav.classList.remove("active");
    }
    curSelectedNav = null;
});
