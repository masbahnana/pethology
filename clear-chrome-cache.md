# Como Limpar Cache do Chrome Completamente

## Método 1: Hard Reset do Chrome (RECOMENDADO)

1. **Feche o Chrome COMPLETAMENTE** (Cmd+Q)
2. **Abra o Chrome**
3. **Vá em DevTools** (Cmd+Option+I)
4. **Clique com botão direito no botão de refresh** (ao lado da URL)
5. **Selecione "Empty Cache and Hard Reload"**

## Método 2: Clear Browsing Data

1. **Chrome > Settings** (ou Cmd+,)
2. **Privacy and Security > Clear browsing data**
3. **Selecione:**
   - ✅ Cached images and files
   - ✅ Hosted app data
4. **Time range: "All time"**
5. **Clear data**

## Método 3: Disable Cache in DevTools

1. **Abra DevTools** (Cmd+Option+I)
2. **Vá em Network tab**
3. **Marque "Disable cache"**
4. **Mantenha DevTools aberto e dê refresh** (Cmd+R)

## Método 4: Incognito Mode

1. **Cmd+Shift+N** (abre janela anônima)
2. **Vai em** https://pethology.netlify.app/teacher-dashboard.html
3. **Testa** (incognito não usa cache)

---

**Se NADA disso funcionar**, o problema é que o Chrome está cacheando o Firebase SDK do CDN (`firebasejs/10.7.1/`).

Nesse caso, vamos criar uma versão que usa Firebase localmente ao invés do CDN.
