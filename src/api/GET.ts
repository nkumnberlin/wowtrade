const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie: string
	url: string
}
async function GET({ cookie, url }: IClient) {
	console.log(`cookie`, cookie)
	return await fetch(`http://localhost:3000${url}`, {
		method: "GET",
		headers: {
			Cookie: `wow-trade-session=${cookie}`
		}
	}).then((res) => res.json())
}

export default GET
