<script lang="ts">
  import Chat from '$lib/Chat.svelte'
  import SuperTokens from "supertokens-website"
  import axios from "axios"
  SuperTokens.addAxiosInterceptors(axios)
  
  SuperTokens.init({
    apiDomain: "http://localhost:9000",
    apiBasePath: "/api"
  })
  
  async function login(social) {
    // console.log(axios.interceptors)
    try {
          let res = await axios.get("http://localhost:9000/api/authorisationurl?thirdPartyId=" + social)
          console.log(res.data)
    }
    
    catch (e) {
      console.log(e.response.data.message)
    }
    
    // window.location.href = res.data.url
  }
  
  async function signInUp(social) {
    let res = await axios.get("http://localhost:9000/api/authorisationurl?thirdPartyId=" + social, ) // todo setup routing with svelte
    
    res = await axios.post("http://localhost:9000/api/signinup", {
      headers: {
        "rid": "thirdpartyemailpassword",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        code,
        redirectURI: "http://localhost:3000",
        thirdPartyId: social
      })
    })
  }
</script>

<main>
<!--  <img src={logo} alt="Svelte Logo" />-->
  <button on:click={() => login('discord')}>Login with discord</button>
  <button on:click={() => login('github')}>Login with github</button>
<!--  <Chat/>-->
</main>
