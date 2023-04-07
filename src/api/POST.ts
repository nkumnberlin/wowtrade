import { ICreateListing } from "../interfaces/ICreateListing"

const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie: string
	url: string
	data: any
}
async function POST({ cookie, url, data }: IClient) {
	console.log("url", url)
	console.log("data ", JSON.stringify(data))
	return await fetch(url, {
		method: "POST",
		headers: {
			Cookie: `wow-trade-session=${cookie}`,
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then((res) => res?.json())
}

export default POST
