import React from "react"
import ReactDOM from "react-dom"
import App from "./app"

ReactDOM.render(<App year={new Date().getFullYear()}/>, document.getElementById("app1"))