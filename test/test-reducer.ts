import Reducer from "../src/reducer"
import {CHANGE_MONTH, CHANGE_YEAR} from "../src/actions"

const getTestCaseDescription = (t, i) =>
	`# ${i} - ${JSON.stringify(t.action)} when state:${JSON.stringify(t.state)} and return:${JSON.stringify(t.expected)}`

describe("Reducer should", () => {

	[
		{
			state: {},
			action: {type: "do nothing"},
			expected: {}
		},
		{
			state: {year: 1, month: 1},
			action: {type: CHANGE_MONTH, value: 2},
			expected: {year: 1, month: 2}
		},
		{
			action: {type: CHANGE_YEAR, value: 2},
			state: {year: 1, month: 1},
			expected: {year: 2, month: 1}
		}
	].map((t, i) => {
		test(getTestCaseDescription(t, i), () => {
			const actual = Reducer(t.state, t.action)
			expect(actual).toEqual(t.expected)
		})
	})

})
