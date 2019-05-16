# Vue.js praktikum 08. aprill

## Project startup

Download Vue CLI
```
npm install -g @vue/cli
```

Create new Vue project
```
vue create [projectname]
```
Manual setup:
- Babel
- Router
- CSS Pre-processors
- Linter / Formatter

History mode: No \
CSS pre-processor: Sass/SCSS (with node-sass) \
Linter: ESLint + Standard, lint on save \
Config files: dedicated \

For http requests we use the Vue-Resource plugin, install it with:
```
npm run serve to run 
npm install vue-resource --save
```

## Ülesanne

Teha lihtne veebirakendus, mis kuvaks apist https://api.fuud.ituk.ee/daily tulevaid andmeid eraldi komponentidena.\
Lisaks lisada võimalus vahetada rakenduse keelt - inglise ja eesti


