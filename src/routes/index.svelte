<script lang="ts">
	import SuperTokens from 'supertokens-website';
	import axios from 'axios';
	SuperTokens.addAxiosInterceptors(axios);

	SuperTokens.init({
		apiDomain: 'http://192.168.1.59',
		apiBasePath: '/api'
	});

	async function login(social) {
		// console.log(axios.interceptors)
		try {
			let res = await axios.get('/api/authorisationurl?thirdPartyId=' + social);
			let url = new URL(res.data.url);
			console.log(window.location + 'callback/' + social);
			url.searchParams.append('redirect_uri', window.location + 'callback/' + social);
			console.log(url);
			window.location.href = url.toString();
		} catch (e) {
			console.log(e.response.data.message);
		}

		// window.location.href = res.data.url
	}
</script>

<main>
	<button on:click={() => login('discord')}>Login with discord</button>
	<button on:click={() => login('github')}>Github</button>
</main>
