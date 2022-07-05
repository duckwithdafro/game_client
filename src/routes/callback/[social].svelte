<script lang="ts" context="module">
	import { browser } from '$app/env';
	import axios from 'axios';
	import SuperTokens from 'supertokens-website';
	SuperTokens.addAxiosInterceptors(axios);

	// export const  = async ({ params, url }) => {
	// 	const { social } = params;
	// 	const code = url.searchParams.get('code');
	// 	try {
	// 		console.log('before request')
	// 		let res = 0
	// 	} catch (e: any) {
	// 		console.log(e.response.data.message)
	// 		console.log(e.request)
	// 	}
	//
	// 	return { status: 301, headers: { location: '/' } };
	// };

	export const load = async ({ params, url }) => {
		if (browser) {
			const { social } = params;
			const code = url.searchParams.get('code');

			try {
				let res = await axios.post(
					`${url.origin}/api/signinup`,
					{
						code,
						redirectURI: `${url.origin}/callback/${social}`,
						thirdPartyId: social
					},
					{
						headers: { rid: 'thirdpartyemailpassword', 'Content-Type': 'application/json' }
					}
				);
				console.log('res', res);
			} catch (e) {
				console.log(e.response.data.message);
			}

			return { status: 301, headers: { location: '/' } };
		}
		return { status: 400 };
	};
</script>
