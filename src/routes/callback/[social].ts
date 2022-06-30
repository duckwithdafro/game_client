import type { URL } from 'url'

export async function get(params: { social: string }, url: URL) {
  console.log(params, url)
  const { social } = params
  const code = url.searchParams.get('code')
  
  return {
    redirect: ""
  }
}
