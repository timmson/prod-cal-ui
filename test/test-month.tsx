import React from "react"
import {render} from "@testing-library/react"


import Month from "../src/month"

describe("Month should", () => {

	test("render", () => {
		const m = {
			name: "October",
			number: 10,
			working: {
				days: 10,
				hours: 100
			},
			weeks: [
				{
					number: 1,
					days: []
				}
			]
		}

		render(<Month year={2020} month={m} isSelected={false}/>)


	})
})
