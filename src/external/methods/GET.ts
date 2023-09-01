const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie?: string
	url: string
}
async function GET({ cookie, url }: IClient) {
	console.log("url", url, "und  ", cookie)
	if (cookie) {
		return await fetch(url, {
			method: "GET",
			headers: {
				Cookie: `wow-trade-session=${cookie}`
			}
		}).then((res) => res?.json())
	}
	return await fetch(url, {
		method: "GET"
	}).then((res) => res?.json())
}

export default GET
