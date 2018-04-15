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

// Build comment list
const comments = [
  {
    author: 'Michael J Szymanski',
    comment: 'Interesting article',
    votes: 0,
  },
  {
    author: 'Cory J Harris',
    comment: 'yes',
    votes: 0,
  },
];
const $commentContainer = document.querySelector('#commentContainer');
const buildComments = () => {
  let commentHTML = '';
  comments.forEach((comment, index) => {
    commentHTML += `
      <li>
        <h3>${comment.author}</h3>
        <p>${comment.comment}</p>
        <button data-action="up" data-id="${index}">+</button>
        <button data-action="down" data-id="${index}">-</button>
        <p>${comment.votes}</p>
      </li>
    `;
  })
  $commentContainer.innerHTML = commentHTML;
};

buildComments();

// Add new comment
const $submit = document.querySelector('#submit');
const $author = document.querySelector('#author');
const $comment = document.querySelector('#comment');
$submit.addEventListener('click', () => {
  comments.unshift({
    author: $author.value,
    comment: $comment.value,
  })
  $author.value = '';
  $comment.value = '';
  buildComments();
});

// Upvote / downvote
$commentContainer.addEventListener('click', (e) => {
  const action = e.target.dataset.action;
  const commentID = e.target.dataset.id;
  if (action === 'up') {
    comments[commentID].votes++;
  } else if (action === 'down') {
    comments[commentID].votes--;
  }
  buildComments();
});