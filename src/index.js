import "bootstrap"
import "./index.scss"

import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import Moment from "moment"
import {faTelegram} from "@fortawesome/free-brands-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const currentYear = new Date().getFullYear()
const params = new URL(window.location.href).searchParams
const request = {
	year: parseInt(params.get("year") || Moment().format("YYYY"), 10),
	month: parseInt(params.get("month") || Moment().format("M"), 10)
}

const notify = (state) => {
	params.set("year", state.year)
	params.set("month", state.month)
	window.history.replaceState({}, "Production Calendar", "?" + params.toString())
}

const shareUrl = () => {
	window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`, "blank")
}

ReactDOM.render(
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
	</>,
	document.getElementById("app"))