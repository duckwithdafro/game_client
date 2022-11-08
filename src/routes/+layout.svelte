<script lang="ts">
  import "../app.css";
  import SuperTokens from "supertokens-web-js";
  import Session from "supertokens-web-js/recipe/session";
  import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
  // import Axios from "axios";

  /* when the page is loaded on the browser, to handle things differently */
  const isBrowser: boolean = typeof window.__TAURI_IPC__ === "undefined";

  SuperTokens.init({
    appInfo: {
      apiDomain: "http://localhost:9000",
      apiBasePath: "/api",
      appName: "game",
    },
    recipeList: [Session.init(), ThirdPartyEmailPassword.init()],
  });

  function logout() {

  }
</script>

<main>
  <div id="navbar">
    <ul>
      <li><a href="/signup">Sign up</a></li>
      <li><a href="/signin">Log in</a></li>
      <li><button on:click={logout}>Log out</button></li>
    </ul>
  </div>
  <slot />
</main>

<style>

</style>
