const api = import.meta.env.API_ENDPOINT
interface IClient {
	cookie: string
	url: string
}
async function DELETE({ cookie, url }: IClient) {
	console.log("url", url)
	return await fetch(url, {
		method: "DELETE",
		headers: {
			Cookie: `wow-trade-session=${cookie}`
		}
	}).then((res) => res?.json())
}

export default DELETE
