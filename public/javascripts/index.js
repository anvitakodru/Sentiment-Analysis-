const submitReview = (e) => {
  e.preventDefault();
  const review = document.getElementById('review').value;
  const options = {
    method: 'POST',
    body: JSON.stringify({ review }),
    headers: new Headers({ 'Content-Type': 'application/json' })
  }

  const emojiSection = document.getElementById('emojiSection');
  const title = document.getElementById('title');
  const outline = document.querySelector(':focus');

  fetch('/api/nlp/s-analyzer', options)
    .then(res => res.json())
    .then (({ analysis }) => {
      if (analysis < 0) {
        emojiSection.innerHTML = '<img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngitem.com%2Fmiddle%2FmhTmJ_angry-emoji-png-circle-transparent-png%2F&psig=AOvVaw28HiTIXmffIQpjyTi92-Ta&ust=1630866160104000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDxrYz45fICFQAAAAAdAAAAABAI"/>';
        title.style.color = 'red';
        outline.style.borderColor = 'red';
      };
      if (analysis === 0) {
        emojiSection.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
        title.style.color = '#00367c';
        outline.style.borderColor = '#00367c';
      }
      if (analysis > 0) {
        emojiSection.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
        title.style.color = 'green';
        outline.style.borderColor = 'green'
      }
    })
    .catch(err => {
      emojiSection.innerHTML = 'There was an error processing your request!'
    })
}

document.getElementById('review').addEventListener('keyup', submitReview);
document.getElementById('reviewForm').addEventListener('submit', submitReview);
