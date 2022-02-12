import Reducer from "../src/reducer"
import {CHANGE_MONTH, CHANGE_YEAR} from "../src/actions"

describe("Reducer should", () => {

	const testCases = [
		[
			{type: "do nothing"},
			{},
			{}
		],
		[
			{type: CHANGE_MONTH, value: 2},
			{year: 1, month: 1},
			{year: 1, month: 2}
		],
		[
			{type: CHANGE_YEAR, value: 2},
			{year: 1, month: 1},
			{year: 2, month: 1}
		]
	]

	test.each(testCases)("%s from %s to %s", (action, arrange, expected) => {
		const actual = Reducer(arrange, action)
		expect(actual).toEqual(expected)
	})

})