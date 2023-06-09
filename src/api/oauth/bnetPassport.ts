import passport from "passport"
import strategies, { StrategyOptions } from "passport-bnet"
const env = import.meta.env
const BnetStrategy = strategies.Strategy

const passportCallback = (
	accessToken: string,
	refreshToken: string,
	profile: any,
	done: any
) => {
	console.log(
		"felix fuer unsere augen, pipikaka ",
		accessToken,
		refreshToken,
		profile
	)
	return done(null, profile)
}

const passportOptions: StrategyOptions = {
	clientID: env.OAUTH_CLIENT_ID,
	clientSecret: env.OAUTH_CLIENT_SECRET,
	callbackURL: env.OAUTH_CALLBACK_URL,
	scope: "wow.profile"
}

export interface BnetUser {
	sub: string
	id: number
	battletag: string
	provider: string
	token: string
}
passport.serializeUser(async (user: BnetUser, request) => {
	console.log("LÖCKCHEBN")
	return user
 })

passport.deserializeUser(async (user: BnetUser, request) => {
	console.log("LÖCKCHEBN2")

	return user
 })

try {
	passport.use(new BnetStrategy(passportOptions, passportCallback))

} catch (e) {
	console.log(e)
}
export { passport }
