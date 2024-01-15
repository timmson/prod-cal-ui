import "bootstrap"
import "./index.scss"

import React from "react"
import {createRoot} from "react-dom/client"

import App from "./app"
import Moment from "moment"
import {faTelegram} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {StateType} from "./types"

const currentYear = new Date().getFullYear()
const params = new URL(window.location.href).searchParams
const request = {
	year: parseInt(params.get("year") || Moment().format("YYYY"), 10),
	month: parseInt(params.get("month") || Moment().format("M"), 10),
	deep: parseInt(params.get("deep") || "0", 10)
}

const notify = (state: StateType) => {
	params.set("year", state.year.toString())
	params.set("month", state.month.toString())
	params.set("deep", state.deep.toString())
	window.history.replaceState({}, "Production Calendar", "?" + params.toString())
}

const shareUrl = () => {
	window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, "blank")
}

const root = createRoot(document.getElementById("app"))

root.render(
	<>
		<App request={request} notify={notify}/>
		<div className="row mt-5">
			<div className="col text-end">
				<a href="#" target="_blank" onClick={() => shareUrl()}>
                    [Share via <FontAwesomeIcon icon={faTelegram}/>]
				</a>
				<p className="copyright">&copy; {currentYear} timmson</p>
			</div>
			<div className="col-sm-1">&nbsp;</div>
		</div>
	</>
)
