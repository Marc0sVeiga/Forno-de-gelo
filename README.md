Este é um projeto que vai ser criado para a pessoa mais importante da minha vida que é minha mãe;

# 🧊 Forno de Gelo — O que aprendi refatorando o Footer

## 📌 Contexto

Durante o desenvolvimento do site **Forno de Gelo**, refatorei o componente de rodapé para seguir a estrutura e organização do footer da **Agência XPTO**, adaptando a identidade visual do projeto.

---

## 🔄 1. Adaptar estrutura HTML de um projeto para outro

Aprendi a identificar o **padrão de estrutura** de um componente e replicá-lo em outro projeto, mantendo o conteúdo original mas adotando a organização do projeto de referência.

- Substituí uma estrutura complexa com múltiplas `<div>` aninhadas por uma estrutura enxuta com `<nav>` + `.logo` + `.redes-sociais`
- Mantive links, ícones e textos do projeto original dentro da nova estrutura

---

## 🎨 2. Reutilizar CSS de outro projeto com adaptações

Aprendi a **reaproveitar classes CSS** de um projeto existente em um novo, fazendo apenas os ajustes necessários de identidade visual:

- Apliquei o gradiente azul do Forno de Gelo no `.rodape` que antes estava no `.footer`
- Adaptei cores de borda e ícones para `#ffffff` por conta do fundo escuro
- Mantive a lógica de hover e transições do projeto de referência

---

## 📐 3. Corrigir problema de layout com padding

O nome "Forno de Gelo" estava sendo cortado pela borda da tela. A causa era a ausência de `padding` lateral na `.navegacao`.

**Correção:**

```css
.rodape .navegacao {
  padding: 0 40px; /* evita que o conteúdo cole na borda */
}
```

---

## 🐛 4. Identificar typo em valor CSS

Havia um erro de digitação no `border-color` que quebrava a cor silenciosamente:

```css
/* ❌ Errado */
border-color: ##9e4223;

/* ✅ Correto */
border-color: #9e4223;
```

---

## 🖱️ 5. Remover o highlight azul de hover em links dentro do footer

O browser aplica um estilo padrão em elementos `<a>` ao passar o mouse (outline, box-shadow, highlight). Para remover sem usar `!important`:

**Solução mais limpa — substituir `<a>` por `<div>`:**

```html
<!-- ❌ Antes: causava highlight azul no hover -->
<a href="#" class="gif-capivara">...</a>

<!-- ✅ Depois: div não tem comportamento de link -->
<div class="gif-capivara">...</div>
```

```css
.rodape .navegacao .gif-capivara {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  cursor: default; /* remove o cursor de ponteiro */
}
```

> 💡 **Aprendizado:** Quando um elemento é puramente visual/decorativo e não precisa de navegação, usar `<div>` é mais semântico e evita comportamentos indesejados de links.

---

## ✅ Boas práticas reforçadas

| Situação                        | Solução aprendida                                                   |
| ------------------------------- | ------------------------------------------------------------------- |
| Conteúdo colando na borda       | Adicionar `padding` horizontal no container                         |
| Typo em cor CSS                 | Sempre conferir o `#` — dois `##` quebram silenciosamente           |
| Hover indesejado em link        | Trocar `<a>` por `<div>` quando não há navegação                    |
| CSS conflitante entre arquivos  | Identificar a origem da regra antes de usar `!important`            |
| Adaptar footer de outro projeto | Copiar estrutura HTML + classes CSS e ajustar apenas cores/conteúdo |

---
# 📱 Header Mobile — O que aprendi

## 🧠 Conceitos de CSS aprendidos

### `display: none` vs visibilidade
`display: none` remove o elemento completamente da tela **e** do fluxo do layout — como se ele não existisse. Diferente de `opacity: 0` que deixa o elemento invisível mas ainda ocupando espaço.

### Media queries — o coração do responsivo
```css
/* vale para todo mundo — estado base */
.fab-menu,
.dropdown-mobile {
  display: none;
}

/* só vale quando a tela tiver 768px ou menos */
@media (max-width: 768px) {
  .navegacao-desktop { display: none; }
  .fab-menu          { display: flex;  }
  .dropdown-mobile   { display: block; }
}
```
A media query **sobrescreve** o estado base por cascata — a regra que vem depois no CSS ganha. No desktop o `display: none` inicial prevalece. No mobile a media query inverte quem aparece.

### Breakpoints comuns
| Tamanho | Breakpoint |
|---|---|
| Smartphones | `max-width: 768px` |
| Tablets | `max-width: 1024px` |
| Desktop | acima de `1024px` |

> Não existe breakpoint "certo" — você escolhe baseado em **onde o layout começa a quebrar**.

---

## 🔁 Checkbox hack vs JavaScript

### Checkbox hack (CSS puro)
Usa um `<input type="checkbox">` invisível + `<label>` para simular clique sem JS. Funciona, mas tem limitações:

```css
/* abre o menu quando o checkbox está marcado */
.menu-toggle:checked ~ .navegacao {
  display: flex;
}
```

| Limitação |
|---|
| Não fecha ao clicar fora |
| Sem animação suave |
| Difícil de manter |
| Sem acessibilidade (`aria-expanded`) |

### Abordagem profissional com JavaScript
```javascript
const fabMenu = document.querySelector('.fab-menu');
const dropdownMobile = document.querySelector('.dropdown-mobile');

fabMenu.addEventListener('click', () => {
  dropdownMobile.classList.toggle('aberto');
});

// fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (!fabMenu.contains(e.target) && !dropdownMobile.contains(e.target)) {
    dropdownMobile.classList.remove('aberto');
  }
});
```
O JS só adiciona/remove uma classe — todo o visual de abrir e fechar fica no CSS:
```css
.dropdown-mobile {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.dropdown-mobile.aberto {
  opacity: 1;
  pointer-events: all;
}
```

> 💡 Separação de responsabilidades: **JS controla o estado, CSS controla o visual.**

---

## 🎯 FAB — Floating Action Button

Padrão de design criado pelo Google (Material Design). Botão circular que "flutua" sobre o conteúdo — muito usado em mobile.

```css
.fab-menu {
  width: 90px;
  height: 90px;
  border-radius: 50%;      /* vira círculo */
  padding: 6px;            /* o padding vira a "borda" em volta do logo */
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: transform 0.2s ease;
}

.fab-menu:hover {
  transform: scale(1.05);  /* cresce levemente no hover */
}
```

> 💡 **Truque do padding como borda:** `padding` com `background-color` branco cria uma borda visual sem usar `border`. Controle a espessura só mudando o valor do padding.

---

## 🏷️ Convenção de nomenclatura de classes CSS

A lógica usada pelos devs:
```
.o-que-é + -onde-fica-ou-quando-aparece
```

| Classe | Leitura |
|---|---|
| `.fab-menu` | botão flutuante + menu |
| `.dropdown-mobile` | menu que cai + só no mobile |
| `.navegacao-desktop` | navegação + só no desktop |

### Inglês técnico vs português no projeto
- **Termos técnicos** → manter em inglês (`dropdown`, `fab`, `toggle`, `card`) — reconhecidos por qualquer dev no mundo
- **Termos do negócio** → traduzir (`produtos`, `navegacao`, `rodape`, `cabecalho`) — fazem mais sentido no idioma do projeto

> O mais importante é ser **consistente** dentro do mesmo projeto.

---

## 🌐 GitHub Pages suporta JavaScript?

**Sim!** O GitHub Pages entrega arquivos estáticos para o navegador. Quem executa o JS é o **navegador do visitante**, não o servidor.

| Não funciona no GitHub Pages | Funciona normalmente |
|---|---|
| PHP, Python, Node.js no servidor | JavaScript no navegador |
| Banco de dados | HTML, CSS, JS estáticos |
| APIs próprias com backend | Links do WhatsApp |
| Login com sessão no servidor | Font Awesome, Google Fonts via CDN |

---

## ✅ `<label>` como botão — sem `<button>`

Qualquer elemento pode virar um controle clicável se for um `<label>` apontando para um `<input>`:

```html
<input type="checkbox" id="menu-toggle" />
<label for="menu-toggle" class="logo-label">
  <img src="./logo.png" alt="Menu" />
</label>
```

Clicar no `<label>` marca/desmarca o checkbox — sem JavaScript, sem `<button>`.

---

## 🔍 Como testar responsivo no DevTools

1. `F12` → abre o DevTools
2. Ícone de celular no topo (ou `Ctrl + Shift + M`) → ativa modo mobile
3. Dropdown de dispositivos → escolha `iPhone SE`, `Galaxy S8` ou largura manual
4. `Ctrl + Shift + R` → força recarregamento com media queries aplicadas

> O modo mobile simula o **tamanho da tela** — o browser continua o mesmo, então `target="_blank"` abre normalmente em nova aba.

---
_Documentado durante o desenvolvimento do site Forno de Gelo 🧊_
