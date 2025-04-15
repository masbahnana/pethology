const params = new URLSearchParams(window.location.search);
const file = params.get('file');

if (file) {
  fetch(`content/${file}`)
    .then(res => {
      if (!res.ok) throw new Error("Post not found");
      return res.text();
    })
    .then(markdown => {
      const html = marked.parse(markdown);
      document.getElementById('post-container').innerHTML = html;
    })
    .catch(err => {
      document.getElementById('post-container').innerHTML = `<p>Sorry, the post could not be loaded.</p>`;
    });
} else {
  document.getElementById('post-container').innerHTML = `<p>No post specified.</p>`;
}