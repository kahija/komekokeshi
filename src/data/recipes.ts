export type RecipeStep = {
  id: string;
  instruction: string;
  action: "cut" | "mix" | "pour" | "cook" | "cool" | "wait" | "serve";
  durationSeconds?: number;
};

export type RecipeIngredient = {
  id: string;
  name: string;
  quantity: string;
  group: string;
};

export type Recipe = {
  id: string;
  title: string;
  country: string;
  description: string;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
};

export const ramenRecipe: Recipe = {
  id: "chicken-shoyu-ramen",
  title: "Ramen maison au poulet",
  country: "Japon",
  description:
    "Une adaptation du shōyu ramen avec bouillon maison, poulet braisé et œufs mollets marinés, sans porc ni ingrédients alcoolisés. À commencer la veille : prévois 3 à 4 heures de cuisson pour le bouillon et 8 à 12 heures de marinade au réfrigérateur. Utilise une sauce soja sans alcool.",
  servings: 2,

  ingredients: [
    {
      id: "eggs",
      name: "Gros œufs",
      quantity: "2",
      group: "Œufs marinés — la veille",
    },
    {
      id: "egg-soy-sauce",
      name: "Sauce soja sans alcool",
      quantity: "30 ml",
      group: "Œufs marinés — la veille",
    },
    {
      id: "egg-water",
      name: "Eau pour la marinade",
      quantity: "60 ml",
      group: "Œufs marinés — la veille",
    },
    {
      id: "egg-sugar",
      name: "Sucre",
      quantity: "1 c. à café",
      group: "Œufs marinés — la veille",
    },
    {
      id: "egg-ice",
      name: "Eau froide et glaçons",
      quantity: "Un grand bol",
      group: "Œufs marinés — la veille",
    },

    {
      id: "stock-chicken",
      name: "Carcasses et cous de poulet",
      quantity: "750 g",
      group: "Bouillon maison — la veille",
    },
    {
      id: "stock-water",
      name: "Eau",
      quantity: "2 litres, à compléter si nécessaire",
      group: "Bouillon maison — la veille",
    },
    {
      id: "stock-ginger",
      name: "Gingembre frais",
      quantity: "15 g",
      group: "Bouillon maison — la veille",
    },
    {
      id: "stock-spring-onions",
      name: "Oignons nouveaux",
      quantity: "2",
      group: "Bouillon maison — la veille",
    },
    {
      id: "stock-garlic",
      name: "Ail",
      quantity: "1 petite gousse",
      group: "Bouillon maison — la veille",
    },

    {
      id: "chicken-thighs",
      name: "Hauts de cuisse de poulet désossés, avec peau",
      quantity: "2, environ 350 à 400 g au total",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-oil",
      name: "Huile neutre",
      quantity: "1 c. à café",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-soy-sauce",
      name: "Sauce soja sans alcool",
      quantity: "40 ml",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-water",
      name: "Eau",
      quantity: "200 ml",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-sugar",
      name: "Sucre",
      quantity: "2 c. à café",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-ginger",
      name: "Gingembre frais",
      quantity: "10 g",
      group: "Poulet braisé — la veille",
    },
    {
      id: "chicken-spring-onion",
      name: "Oignon nouveau",
      quantity: "1",
      group: "Poulet braisé — la veille",
    },

    {
      id: "tare-soy-sauce",
      name: "Sauce soja sans alcool",
      quantity: "40 ml, à doser selon le goût",
      group: "Assaisonnement — le jour du repas",
    },
    {
      id: "tare-water",
      name: "Eau",
      quantity: "20 ml",
      group: "Assaisonnement — le jour du repas",
    },
    {
      id: "tare-sugar",
      name: "Sucre",
      quantity: "½ c. à café",
      group: "Assaisonnement — le jour du repas",
    },

    {
      id: "aromatic-oil",
      name: "Huile neutre",
      quantity: "1 c. à soupe",
      group: "Huile aromatique",
    },
    {
      id: "oil-spring-onion",
      name: "Oignon nouveau",
      quantity: "1 tronçon de 5 cm",
      group: "Huile aromatique",
    },
    {
      id: "oil-ginger",
      name: "Gingembre frais",
      quantity: "2 fines tranches",
      group: "Huile aromatique",
    },

    {
      id: "noodles",
      name: "Nouilles pour ramen sans ingrédients alcoolisés",
      quantity: "2 portions selon l’emballage",
      group: "Nouilles et dressage",
    },
    {
      id: "topping-spring-onion",
      name: "Oignon nouveau",
      quantity: "1",
      group: "Nouilles et dressage",
    },
    {
      id: "nori",
      name: "Algue nori nature",
      quantity: "2 petits rectangles",
      group: "Nouilles et dressage",
    },
  ],

  steps: [
    {
      id: "plan-preparation",
      instruction:
        "La veille — Prépare une marmite pour le bouillon, une petite casserole pour les œufs, une casserole pour le poulet et un thermomètre de cuisine. Les marinades et le bouillon se préparent à l’avance. Vérifie que ta sauce soja et tes nouilles ne contiennent pas d’alcool.",
      action: "wait",
    },
    {
      id: "prepare-stock-aromatics",
      instruction:
        "Coupe les 15 g de gingembre du bouillon en tranches et les 2 oignons nouveaux en grands morceaux. Écrase légèrement la gousse d’ail.",
      action: "cut",
    },
    {
      id: "start-stock",
      instruction:
        "Place les carcasses et cous de poulet dans une marmite avec 2 litres d’eau. Porte doucement à frémissement. Retire la mousse en surface, puis ajoute les aromates du bouillon. Ne sale pas encore.",
      action: "cook",
    },
    {
      id: "simmer-stock",
      instruction:
        "Laisse frémir doucement pendant 3 à 4 heures sous surveillance, en ajoutant un peu d’eau chaude si nécessaire pour garder les morceaux immergés. Pendant ce temps, passe aux œufs et au poulet. Utilise un minuteur séparé pour le bouillon : celui de l’application s’arrête quand tu changes d’étape.",
      action: "cook",
    },
    {
      id: "prepare-egg-marinade",
      instruction:
        "Mélange 30 ml de sauce soja sans alcool, 60 ml d’eau et 1 cuillère à café de sucre dans une petite casserole. Chauffe en remuant jusqu’à dissolution du sucre. Verse dans un petit récipient propre et laisse refroidir complètement.",
      action: "mix",
    },
    {
      id: "cook-eggs",
      instruction:
        "Porte une casserole d’eau à ébullition. Plonge délicatement les 2 gros œufs sortant du réfrigérateur, puis démarre le minuteur. Maintiens une légère ébullition pendant 7 minutes pour obtenir un jaune crémeux. Le résultat varie avec le calibre des œufs.",
      action: "cook",
      durationSeconds: 420,
    },
    {
      id: "cool-eggs",
      instruction:
        "Transfère immédiatement les œufs dans le bol d’eau glacée. Laisse-les refroidir pendant 15 minutes, puis écale-les délicatement.",
      action: "cool",
      durationSeconds: 900,
    },
    {
      id: "marinate-eggs",
      instruction:
        "Place les œufs dans leur marinade complètement froide, dans un récipient suffisamment étroit pour bien les entourer. Couvre et laisse mariner 8 à 12 heures au réfrigérateur. Retourne-les si une partie reste découverte. Poursuis maintenant avec le poulet.",
      action: "wait",
    },
    {
      id: "prepare-chicken",
      instruction:
        "Coupe les 10 g de gingembre du poulet en tranches et son oignon nouveau en tronçons. Déplie les hauts de cuisse désossés pour une cuisson régulière, sans les rouler. Après manipulation du poulet cru, lave tes mains et nettoie les ustensiles et le plan de travail.",
      action: "cut",
    },
    {
      id: "brown-chicken",
      instruction:
        "Chauffe 1 cuillère à café d’huile dans une petite casserole ou sauteuse. Dépose le poulet côté peau et fais dorer environ 5 minutes à feu moyen, puis retourne et fais dorer l’autre face environ 2 minutes.",
      action: "cook",
    },
    {
      id: "braise-chicken",
      instruction:
        "Ajoute 40 ml de sauce soja sans alcool, 200 ml d’eau, 2 cuillères à café de sucre, le gingembre et l’oignon préparés. Fais mijoter à couvert pendant environ 15 à 20 minutes en retournant à mi-cuisson. Vérifie au thermomètre que la partie la plus épaisse atteint 74 °C ; prolonge si nécessaire. Ajoute un peu d’eau si la sauce réduit trop.",
      action: "cook",
    },
    {
      id: "cool-chicken",
      instruction:
        "Place le poulet cuit avec son jus dans un récipient peu profond. Refroidis rapidement, au besoin dans un bain d’eau glacée, puis réfrigère dans les deux heures suivant la cuisson. Garde-le au froid jusqu’au lendemain. Ne mélange pas ce jus à la marinade des œufs.",
      action: "cool",
    },
    {
      id: "strain-stock",
      instruction:
        "Après les 3 à 4 heures de cuisson, filtre le bouillon avec une passoire fine. Réserve 800 ml pour les deux bols. S’il est trop léger, fais-le réduire avant de mesurer ; s’il en manque, complète avec un peu d’eau chaude. Refroidis rapidement dans des récipients peu profonds et réfrigère dans les deux heures suivant la fin de cuisson.",
      action: "pour",
    },
    {
      id: "resume-next-day",
      instruction:
        "Le lendemain — Les œufs doivent avoir mariné au moins 8 heures. Sors les préparations uniquement lorsque tu es prêt à les utiliser. Prépare deux grands bols et une casserole d’eau pour les nouilles.",
      action: "wait",
    },
    {
      id: "prepare-tare",
      instruction:
        "Pour le tare, mélange les 40 ml de sauce soja sans alcool, les 20 ml d’eau et la demi-cuillère à café de sucre du groupe Assaisonnement. Chauffe doucement pour dissoudre le sucre, puis réserve.",
      action: "mix",
    },
    {
      id: "prepare-aromatic-oil",
      instruction:
        "Dans une petite casserole, chauffe à feu doux la cuillère à soupe d’huile avec le tronçon d’oignon et les 2 tranches de gingembre du groupe Huile aromatique. Lorsque les aromates commencent à dorer et à parfumer l’huile, retire du feu et filtre.",
      action: "cook",
    },
    {
      id: "prepare-toppings",
      instruction:
        "Émince l’oignon nouveau du dressage. Retire les œufs de leur marinade et coupe-les en deux. Tranche le poulet avec des ustensiles propres et prépare les rectangles de nori.",
      action: "cut",
    },
    {
      id: "reheat-preparations",
      instruction:
        "Porte les 800 ml de bouillon à ébullition puis garde-les chauds. Dans une autre casserole, réchauffe les tranches de poulet avec un peu de leur jus jusqu’à atteindre 74 °C à cœur. Garde les œufs à part pour préserver leur texture.",
      action: "cook",
    },
    {
      id: "cook-noodles",
      instruction:
        "Réchauffe les bols avec de l’eau chaude puis vide-les. Fais cuire les nouilles dans une casserole d’eau bouillante séparée, selon la durée indiquée sur leur emballage. Égoutte-les dès qu’elles sont prêtes.",
      action: "cook",
    },
    {
      id: "season-bowls",
      instruction:
        "Verse 1 cuillère à soupe de tare et la moitié de l’huile aromatique dans chaque bol. Ajoute 400 ml de bouillon et mélange. Goûte et ajoute progressivement du tare si nécessaire : sa quantité dépend de la salinité de ta sauce soja.",
      action: "pour",
    },
    {
      id: "serve-ramen",
      instruction:
        "Répartis immédiatement les nouilles dans les bols. Ajoute le poulet, les deux moitiés d’un œuf par personne, l’oignon nouveau et le nori. Sers sans attendre.",
      action: "serve",
    },
  ],
};
