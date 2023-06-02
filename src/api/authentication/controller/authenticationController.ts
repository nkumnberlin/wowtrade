import { FastifyPluginCallback, FastifyReply } from "fastify"
import { authenticator } from "../../oauth/bnetPassport"
import { env } from "../../utils/env"

const COOKIE_Name = "wow-trade-session"
export const authenticationController: FastifyPluginCallback = (
	app,
	opts,
	done
) => {
	app.get("/login", (req, res) => {
		res.redirect("/login/oauth/battlenet")
	})

	app.get("/alive", (req, res) => {
		res.send({ status: 200, message: "alive" })
	})

	app.get("/logout", async (req, res) => {
		console.log("session id ", req.session.sessionId)
		await req.session.destroy()
		const invalidationDate = new Date()
		invalidationDate.setMilliseconds(invalidationDate.getMilliseconds() + 3000)
		return res
			.status(301)
			.setCookie(COOKIE_Name, "", { maxAge: 0 })
			.send({
				status: 301,
				message: "Logged out"
			})
			.redirect("/")
	})

	app.get("/login/oauth/battlenet", authenticator.authenticate("bnet"))
	const maxAge = 1000 * 60 * 30

	app.get(
		"/redirect",
		{
			preValidation: authenticator.authenticate("bnet", {
				failureRedirect: "/"
			})
		},
		(req, res) => {
			console.log(
				"landet der boy hier?",
				req.cookies,
				"____ res ",
				req.cookies[COOKIE_Name]
			)
			let redirectURL: URL
			if (env.NODE_ENV !== "development") {
				console.log("____ in to vercel")
				if (req.cookies[COOKIE_Name] === undefined) {
					return res
						.status(301)
						.redirect("https://wowtrade.vercel.app/authenticate")
				}
				return (
					res
						// .setCookie(COOKIE_Name, req.cookies[COOKIE_Name], {
						//   domain: 'wowtrade-api.vercel.app',
						//   secure: true,
						//   maxAge,
						//   sameSite: 'none',
						// })
						.redirect(301, "https://wowtrade.vercel.app/callback")
				)
			}
			redirectURL = new URL(`http://localhost:3005/callback`)
			res.status(301).redirect(redirectURL.href)
		}
	)
	app.get("/", (req, res: FastifyReply) => {
		console.log("nice cookies!", req.cookies)
		if (req.isAuthenticated()) {
			return res.redirect("/authenticated")
		}
		console.log("ist nicht authentifizifert > redirect to /login-")
		const redirectURL: URL = new URL("/ungracefully-logout")
		return res.status(301).redirect(redirectURL.href)
	})
	done()
}
