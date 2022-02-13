import React from "react"
import renderer from "react-test-renderer"
import Month from "../src/month"

describe("Month should", () => {

	test("be equal to snapshot", () => {
		const m = {
			name: "October",
			number: "10",
			working: {
				days: 10,
				hours: 100
			},
			weeks: []
		}

		const component = renderer.create(<Month year={2020} month={m} isSelected={false}/>)

		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

})