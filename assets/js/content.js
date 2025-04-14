function loadMarkdown(file) {
    fetch(`./content/${file}`)
      .then(res => res.text())
      .then(text => {
        document.getElementById('markdown-content').innerHTML = marked.parse(text);
      })
      .catch(err => {
        document.getElementById('markdown-content').innerHTML = '<p>Sorry, content not found.</p>';
      });
  }
  
  function toggleTopics(id, button) {
    const ul = document.getElementById(id);
    const isVisible = ul.style.display === 'flex' || ul.style.display === 'block';
  
    ul.style.display = isVisible ? 'none' : 'flex';
  
    // Troca o estilo do botão também
    document.querySelectorAll('.module-nav button').forEach(btn => btn.classList.remove('open'));
    if (!isVisible) {
      button.classList.add('open');
    }
  }