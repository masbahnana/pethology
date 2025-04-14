function loadMarkdown(file) {
    fetch(`./content/${file}`)
      .then(res => res.text())
      .then(text => {
        document.getElementById('markdown-content').innerHTML = marked.parse(text);
  
        // Destaca o botão clicado
        document.querySelectorAll('.module-nav button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = Array.from(document.querySelectorAll('.module-nav button'))
          .find(btn => btn.getAttribute('onclick')?.includes(file));
        if (activeBtn) activeBtn.classList.add('active');
      })
      .catch(err => {
        document.getElementById('markdown-content').innerHTML = '<p>Sorry, content not found.</p>';
      });
  }