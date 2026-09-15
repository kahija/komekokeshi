# Comprendre les changements visuels

## Les écrans et leurs fichiers

`src/App.tsx` choisit entre l’accueil et la préparation grâce à `isCooking`.
Le logo reste le composant `Brand` et utilise l’image originale avec la police
Leckerli One. Le titre reste sous le logo, sur toutes les largeurs.

`src/App.css` règle les dimensions, les marges et la carte de recette.
L’accueil passe à deux colonnes à partir de 960 pixels. En dessous, l’image
précède le texte : cela évite une colonne de texte trop étroite et un recadrage
excessif sur tablette. Sur ordinateur, `object-fit: cover` remplit le côté
illustré de la carte ; il peut donc recadrer les bords du décor.

## La préparation

`src/components/CookingSteps.tsx` conserve la progression et sélectionne
l’illustration. Trois cas existent :

- La recette terminée affiche `kokeshi-complete-w.webp`, avec la bouche ω.
- L’étape `prepare-toppings` affiche `kokeshi-cut.webp` : la découpe des oignons.
- Les autres étapes affichent l’illustration de cuisine originale et sa petite
  bouche ouverte.

Ces scènes sont des illustrations fixes. Les autres expressions de la maquette
ne sont pas encore déclinées ; la bouche ω n’est pas un remplacement global.
La Kokeshi garde sa frange et aucun œil visible.

Les ingrédients sont consultables sans quitter la préparation. Le composant
`IngredientList.tsx` affiche les groupes depuis les mêmes données sur les deux
écrans. Il évite de recopier la logique de regroupement dans chaque écran.

Sous l’image, une grille présente les ingrédients et le minuteur, ou un petit
mot quand l’étape n’a pas de durée. Les précisions existantes restent visibles
dans une carte distincte. La grille passe à deux colonnes sur grand écran.
Le minuteur conserve son calcul à partir de l’heure de fin et sa sauvegarde.

## Fin de recette et scintillement

La fin présente le bol de ramen, le message et le bouton Recommencer.
Le scintillement est un élément CSS posé sur l’image, à `left: 55%` et
`top: 47%`. Les pourcentages suivent les dimensions de l’image. Son opacité
varie doucement ; avec la préférence système de réduction des animations,
il reste fixe. Il ne dessine pas d’œil.

## Images et chargement

Les fichiers WebP sont des versions allégées des PNG, de mêmes dimensions.
Les PNG originaux sont conservés. Le poids cumulé des quatre images utilisées
passe d’environ 6,96 Mo à 0,74 Mo. La compression utilise une qualité de 90.

La scène de découpe a été réalisée avec l’outil intégré de génération d’images,
à partir de `kokeshi-kitchen.png`. Consigne : conserver personnage, frange,
kimono, cuisine, lumière et cadrage ; modifier les mains et ajouter une planche,
un couteau et les oignons découpés ; bouche ω, aucun œil, aucun texte.
Le résultat source est `src/assets/kokeshi-cut.png`.

## Vérifications réalisées

- ESLint et compilation TypeScript/Vite.
- Accueil sur ordinateur à 1440 pixels et préparation à 390 pixels.
- Absence de débordement horizontal à 320 et 390 pixels.
- Ouverture/fermeture des ingrédients à l’accueil et ouverture en préparation.
- Démarrage, décompte, pause, reprise de l’état après rechargement et remise à
  07:00 du minuteur des œufs.
- Navigation jusqu’à la dernière étape, fin de recette et redémarrage à l’étape 1.
- Aucun message d’erreur dans la console lors du parcours testé.

L’importation reste annoncée comme future. Aucune base de données, aucun compte
et aucun catalogue de pays n’ont été ajoutés. Ces vérifications ont été faites
dans le navigateur de test, pas sur un téléphone physique.
