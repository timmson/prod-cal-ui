import React from "react"
import renderer from "react-test-renderer"
import Day from "../src/day"

describe("Day should", () => {

	test("be equal to snapshot", () => {
		const d = {
			type: "type",
			date: "1"
		}

		const component = renderer.create(<Day day={d}/>)

		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

})