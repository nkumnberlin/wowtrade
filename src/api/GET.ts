const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie: string
	url: string
}
async function GET({ cookie, url }: IClient) {
	console.log("url", url)
	return await fetch(url, {
		method: "GET",
		headers: {
			Cookie: `wow-trade-session=${cookie}`
		}
	}).then((res) => res.json())
}

export default GET
