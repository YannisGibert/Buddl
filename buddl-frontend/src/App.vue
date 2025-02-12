<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">BuddI Analytics</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/ventes" class="nav-link">Ventes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/produits" class="nav-link">Produits</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container my-5">
      <router-view></router-view>
    </main>

    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2023 BuddI. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
}
</style>