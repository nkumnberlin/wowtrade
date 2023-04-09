const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie: string
	url: string
	data: any
}
async function POST({ cookie, url, data }: IClient) {
	console.log("url", url)
	console.log(
		"fetch ",
		fetch(url, {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Cookie: `wow-trade-session=${cookie}`
			},
			body: JSON.stringify(data)
		})
	)
	return await fetch(url, {
		method: "post",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Cookie: `wow-trade-session=${cookie}`
		},
		body: JSON.stringify(data)
	})
}

export default POST
