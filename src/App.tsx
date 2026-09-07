function App() {
  return (
    <main className="home">
      <header className="home-header">
        <p className="home-brand">KomeKokeshi</p>
        <h1>Cuisine le monde avec ta Kokeshi</h1>
        <p>
          Des recettes guidées pas à pas, avec une petite complice en cuisine.
        </p>
      </header>

      <section aria-labelledby="recipes-title">
        <h2 id="recipes-title">Ta première escale : le Japon</h2>

        <article className="recipe-card">
          <p className="recipe-country">Japon</p>
          <h3>Ramen japonais</h3>
          <p>Prépare un bol de ramen réconfortant, une étape à la fois.</p>
        </article>
      </section>
    </main>
  );
}

export default App;
