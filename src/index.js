import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import Moment from "moment"

const params = new URL(window.location.href).searchParams
const currentYear = parseInt(Moment().format("YYYY"))
const request = {
	year: params.get("year") || currentYear,
	month: params.get("month") || Moment().format("M")
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
			<div className="col-sm-7">&nbsp;</div>
			<div className="col-sm-4">
				<a href="#" target="_blank" onClick={() => shareUrl()}>[Share via TG]</a>
				<p className="copyright">Copyright &copy; <span>{new Date().getFullYear()}</span> - Designed by timmson</p>
			</div>
			<div className="col-sm-1">&nbsp;</div>
		</div>
	</>,
	document.getElementById("app"))