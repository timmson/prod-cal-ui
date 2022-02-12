import GenerateYear from "../src/generate-year"

describe("GenerateYear should", () => {

	test("generate production calendar of the year", () => {
		const year = GenerateYear(2021)
		expect(year).toMatchSnapshot()
	})

})