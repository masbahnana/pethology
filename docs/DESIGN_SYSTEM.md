# 🎨 Pethology Design System - Notion-inspired

**Objetivo:** Design minimalista e profissional inspirado no Notion

---

## 📋 **REGRA DE OURO:**

### **Emojis:**
- ✅ **APENAS** no Achievement System (gamificação)
- ❌ **REMOVER** de botões, navegação, UI elements

### **Icons:**
- ✅ Usar **SVG icons** ou **icon fonts** (Lucide, Heroicons, Feather)
- ✅ Estilo minimalista, outline (não filled)
- ✅ Tamanho consistente (16px ou 20px)

---

## 🎯 **ONDE MUDAR:**

### **1. Teacher Dashboard**

#### **ANTES (com emojis):**
```html
<a href="index.html" class="btn btn-secondary">
  🏠 Home
</a>
<a href="import-students.html" class="btn btn-primary">
  👥 Import Students
</a>
<a href="teacher-content-manager.html" class="btn btn-secondary">
  ➕ Publish Content
</a>
<button onclick="logout()" class="btn btn-secondary">
  🚪 Logout
</button>
```

#### **DEPOIS (com icons):**
```html
<a href="index.html" class="btn btn-secondary">
  <svg class="icon">...</svg> Home
</a>
<a href="import-students.html" class="btn btn-primary">
  <svg class="icon">...</svg> Import Students
</a>
<a href="teacher-content-manager.html" class="btn btn-secondary">
  <svg class="icon">...</svg> Publish Content
</a>
<button onclick="logout()" class="btn btn-secondary">
  <svg class="icon">...</svg> Logout
</button>
```

---

### **2. Student Dashboard**

#### **Módulos (ANTES):**
```html
<div class="module-card">
  🧬 Biology
</div>
```

#### **Módulos (DEPOIS):**
```html
<div class="module-card">
  <svg class="module-icon">...</svg>
  <span>Biology</span>
</div>
```

---

### **3. Import Students Page**

#### **ANTES:**
```html
<h2>
  <span class="method-icon">📄</span>
  CSV Import
</h2>
```

#### **DEPOIS:**
```html
<h2>
  <svg class="method-icon">...</svg>
  CSV Import
</h2>
```

---

## 🎨 **NOTION BUTTON STYLES:**

### **Características dos botões Notion:**
1. **Sutis** - sem gradientes, cores sólidas
2. **Bordas arredondadas** - 6px a 8px
3. **Hover suave** - background muda levemente
4. **Sem sombras fortes** - hover: `box-shadow: 0 1px 2px rgba(0,0,0,0.05)`
5. **Padding generoso** - `8px 12px` ou `10px 16px`
6. **Font-weight** - 500 (medium), não bold
7. **Transições rápidas** - 150ms

### **CSS Notion-style:**

```css
/* Primary Button (azul suave) */
.btn-primary {
  background: #2383E2;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 150ms ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-primary:hover {
  background: #1a73d1;
}

/* Secondary Button (cinza suave) */
.btn-secondary {
  background: rgba(0, 0, 0, 0.03);
  color: #37352f;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 150ms ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.06);
}

/* Danger Button (vermelho suave) */
.btn-danger {
  background: rgba(235, 87, 87, 0.1);
  color: #eb5757;
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background 150ms ease;
}

.btn-danger:hover {
  background: rgba(235, 87, 87, 0.15);
}

/* Icon sizing */
.btn svg.icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}
```

---

## 📦 **ICON LIBRARY - Recomendação:**

### **Opção 1: Lucide Icons (RECOMENDADO)**
- Site: https://lucide.dev
- CDN: `<script src="https://unpkg.com/lucide@latest"></script>`
- Leve, moderno, outline style
- Uso: `<i data-lucide="home"></i>`

### **Opção 2: Heroicons (alternativa)**
- Site: https://heroicons.com
- Outline style, feito pela Tailwind
- Precisa copiar SVG manualmente

### **Opção 3: Feather Icons**
- Site: https://feathericons.com
- Muito leve, simples
- CDN: `<script src="https://unpkg.com/feather-icons"></script>`

---

## 🗺️ **MAPEAMENTO DE EMOJIS → ICONS:**

### **Navegação:**
| Emoji | Lucide Icon | Contexto |
|-------|-------------|----------|
| 🏠 | `home` | Home/Dashboard |
| 👥 | `users` | Import Students |
| ➕ | `plus-circle` | Publish Content |
| 🚪 | `log-out` | Logout |
| ⚙️ | `settings` | Settings |
| 📊 | `bar-chart-2` | Analytics |

### **Módulos (Quizzes):**
| Emoji | Lucide Icon | Módulo |
|-------|-------------|--------|
| 🧬 | `dna` | Biology |
| 🐾 | `heart` | Animal Welfare |
| ✂️ | `scissors` | Grooming |
| 💊 | `pill` | Vet Assistant |
| 🔬 | `microscope` | Parasitology |
| 🥗 | `salad` | Nutrition |
| 🐕 | `dog` | Small Animals |
| 💬 | `message-circle` | Communications |
| 📝 | `file-text` | Word Processing |

### **Actions:**
| Emoji | Lucide Icon | Contexto |
|-------|-------------|----------|
| 📢 | `megaphone` | Announcements |
| 📅 | `calendar` | Calendar |
| 📄 | `file` | CSV Import |
| ✏️ | `edit` | Manual Entry |
| 💾 | `save` | Save |
| 🗑️ | `trash-2` | Delete |
| ✓ | `check` | Confirm |
| ✕ | `x` | Close |

### **Quiz/Progress:**
| Emoji | Lucide Icon | Contexto |
|-------|-------------|----------|
| 🎯 | `target` | Quiz |
| 📊 | `trending-up` | Progress |
| ⏱️ | `clock` | Time |
| 🔥 | `flame` | Streak |
| ⭐ | `star` | Favorite |

---

## 📝 **IMPLEMENTAÇÃO - ORDEM SUGERIDA:**

### **Phase 1: Setup Icon Library (15 min)**
- [ ] Adicionar Lucide CDN no head de todas páginas
- [ ] Testar com 1-2 icons

### **Phase 2: Update Button Styles (30 min)**
- [ ] Criar novo CSS Notion-style
- [ ] Substituir gradientes por cores sólidas
- [ ] Ajustar padding, border-radius, transitions

### **Phase 3: Replace Icons - Teacher Dashboard (30 min)**
- [ ] Header buttons (Home, Import, Content, Logout)
- [ ] Stats cards
- [ ] Action buttons

### **Phase 4: Replace Icons - Student Dashboard (45 min)**
- [ ] Header/nav
- [ ] Module cards (11 módulos)
- [ ] Progress section
- [ ] Action buttons

### **Phase 5: Replace Icons - Import Students (20 min)**
- [ ] CSV icon
- [ ] Manual entry icon
- [ ] Save/Remove buttons

### **Phase 6: Replace Icons - Quiz Pages (20 min)**
- [ ] Navigation buttons
- [ ] Timer icon
- [ ] Back to menu

### **Phase 7: Global Components (30 min)**
- [ ] Alerts (success, error, warning)
- [ ] Badges
- [ ] Cards

**Total Time: ~3 horas**

---

## 🎨 **PALETA DE CORES NOTION-STYLE:**

```css
:root {
  /* Neutrals */
  --gray-50: #f7f6f3;
  --gray-100: #ebeae8;
  --gray-200: #dfddd9;
  --gray-300: #c0beba;
  --gray-400: #9b9a97;
  --gray-500: #787774;
  --gray-600: #5f5e5b;
  --gray-700: #37352f;  /* Text primary */

  /* Brand */
  --blue-primary: #2383E2;
  --blue-hover: #1a73d1;
  --blue-light: rgba(35, 131, 226, 0.1);

  /* Semantic */
  --success: #0f7b6c;
  --success-bg: rgba(15, 123, 108, 0.1);
  --error: #eb5757;
  --error-bg: rgba(235, 87, 87, 0.1);
  --warning: #f2994a;
  --warning-bg: rgba(242, 153, 74, 0.1);

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f7f6f3;
  --bg-hover: rgba(0, 0, 0, 0.03);
}
```

---

## 📐 **TYPOGRAPHY NOTION-STYLE:**

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
               Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--gray-700);
}

h1 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
}

/* Buttons, labels, etc */
.text-medium {
  font-weight: 500;
}
```

---

## ✅ **CHECKLIST - O QUE MANTER EMOJIS:**

### **SIM - Manter Emojis:**
- ✅ Achievement System (badges/cards)
- ✅ Achievement Toast notifications
- ✅ Achievement names/descriptions

### **NÃO - Remover Emojis:**
- ❌ Botões de navegação
- ❌ Module cards
- ❌ Action buttons
- ❌ Forms
- ❌ Headers
- ❌ Alerts

---

## 🚀 **QUICK START - Exemplo Prático:**

### **1. Adicionar Lucide ao HTML:**
```html
<head>
  <!-- Existing head content -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <!-- Your content -->

  <!-- Initialize Lucide at end of body -->
  <script>
    lucide.createIcons();
  </script>
</body>
```

### **2. Usar Icon:**
```html
<!-- Old -->
<button class="btn-primary">
  🏠 Home
</button>

<!-- New -->
<button class="btn-primary">
  <i data-lucide="home"></i>
  Home
</button>
```

### **3. Style Icon:**
```css
.btn i[data-lucide] {
  width: 16px;
  height: 16px;
  stroke-width: 2;
}
```

---

## 💡 **BENEFÍCIOS:**

1. **Profissional** - Parece menos "toy", mais enterprise
2. **Consistente** - Todos icons mesmo estilo
3. **Escalável** - SVG = qualquer tamanho sem perder qualidade
4. **Acessível** - Icons com aria-labels
5. **Performance** - Lucide é leve (~50kb)
6. **Customizável** - Cores, tamanhos via CSS

---

## 🤔 **PRÓXIMOS PASSOS:**

Quer que eu:
1. **A)** Comece implementando (Setup Lucide + Update Teacher Dashboard)
2. **B)** Faça um protótipo de 1 página primeiro para você aprovar
3. **C)** Documente mais antes de começar

O que prefere? 🎨
