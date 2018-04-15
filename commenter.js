console.log('it works');

const $title = document.querySelector('#title');
const $article = document.querySelector('#articleBody');

// Load article from newsAPI
fetch('https://newsapi.org/v2/everything?q=javascript&apiKey=e82d6427ef8949058f4ef4d050daa662')
  .then(response => response.json())
  .then((articles) => {
    $title.textContent = articles.articles[0].title;
    $article.textContent = articles.articles[0].description;
  });

const comments = [
  {
    author: 'Michael J Szymanski',
    comment: 'Interesting article',
  },
  {
    author: 'Cory J Harris',
    comment: 'yes',
  },
];
const $commentContainer = document.querySelector('#commentContainer');
const buildComments = () => {
  let commentHTML = '';
  comments.forEach((comment) => {
    commentHTML += `
      <li>
        <h3>${comment.author}</h3>
        <p>${comment.comment}</p>
      </li>
    `;
  })
  $commentContainer.innerHTML = commentHTML;
};

buildComments();
