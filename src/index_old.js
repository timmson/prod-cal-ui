import "bootstrap"
import "./index.scss"
//import  "./index1"

import Calendar from "prod-cal"

import Vue from "vue"
import Moment from "moment"
import GenerateYear from "./generate-year"

const telegramShareUrl = "https://t.me/share/url"

const params = new URL(window.location.href).searchParams
const currentYear = parseInt(Moment().format("YYYY"))
const request = {
	year: params.get("year") || currentYear,
	month: params.get("month") || parseInt(Moment().format("M"))
}

new Vue({
	el: "#app",
	data: {
		currentYear: currentYear,
		shareUrl: "",
		request: request,
		calendar: new Calendar("ru"),
		year: {}
	},
	methods: {
		decreaseYear: function () {
			this.request.year--
			this.buildCalendar()
			this.updateUrl()
		},
		increaseYear: function () {
			this.request.year++
			this.buildCalendar()
			this.updateUrl()
		},
		buildCalendar: function () {
			this.year = GenerateYear(this.request.year)
		},
		selectMonth(month) {
			this.request.month = month
			this.updateUrl()
		},
		updateUrl() {
			params.set("year", this.request.year)
			params.set("month", this.request.month)
			window.history.replaceState({}, "Production Calendar", "?" + params.toString())
			this.shareUrl = `${telegramShareUrl}?url=${encodeURIComponent(window.location.href)}`
		}
	},
	mounted() {
		this.buildCalendar()
		this.updateUrl()
	}
})