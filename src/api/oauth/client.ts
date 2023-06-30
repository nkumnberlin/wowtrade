import { ClientCredentials, AccessToken } from "simple-oauth2"
import { env } from "../utils/env"

const credentials = {
	client: {
		id: env.OAUTH_CLIENT_ID,
		secret: env.OAUTH_CLIENT_SECRET
	},
	auth: {
		tokenHost: "https://eu.battle.net"
	}
}

class OAuthClient {
	token: AccessToken | null

	client: any

	constructor() {
		this.client = new ClientCredentials(credentials)
		this.token = null
	}

	async getToken() {
		if (this.token === null || this.token.expired()) {
			const token = await this.client.clientCredentials.getToken()
			this.token = this.client.accessToken.create(token)
			return this.token
		}
		return this.token.token.access_token
	}
}

export { OAuthClient }
