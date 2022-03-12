import React from "react"
import renderer from "react-test-renderer"
import Week from "../src/week"

describe("Week should", () => {

	test("be equal to snapshot", () => {
		const w = {
			number: 1,
			days: [
				{
					type: "inactive",
					date: 1
				}
			]
		}

		const component = renderer.create(<Week week={w}/>)

		expect(component.toJSON()).toMatchSnapshot()
		component.unmount()
	})

})