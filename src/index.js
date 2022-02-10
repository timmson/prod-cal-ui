import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import Moment from "moment"

const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}`
const params = new URL(window.location.href).searchParams
const currentYear = parseInt(Moment().format("YYYY"))
const request = {
	year: params.get("year") || currentYear,
	month: params.get("month") || Moment().format("M")
}

ReactDOM.render(
	<>
		<App request={request}/>
		<div className="row mt-5">
			<div className="col-sm-7">&nbsp;</div>
			<div className="col-sm-4">
				<a href={shareUrl} target="_blank" rel="noreferrer">[Share via TG]</a>
				<p className="copyright">Copyright &copy; <span>{new Date().getFullYear()}</span> - Designed by timmson</p>
			</div>
			<div className="col-sm-1">&nbsp;</div>
		</div>
	</>,
	document.getElementById("app"))