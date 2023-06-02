import "dotenv/config"
import { cleanEnv, port, str } from "envalid"

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ default: "development" }),
	OAUTH_CLIENT_ID: str({ default: "" }),
	OAUTH_CLIENT_SECRET: str({ default: "" }),
	OAUTH_CALLBACK_URL: str({ default: "" }),
	ACC: str({ default: "admin" }),
	PW: str({ default: "test" }),
	PORT: port({ default: 3000 })
})
