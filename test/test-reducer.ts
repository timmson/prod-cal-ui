import Reducer from "../src/reducer"
import {ADD_YEAR} from "../src/actions"

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
			action: {type: ADD_YEAR},
			state: {deep: 0, year: 1, month: 1},
			expected: {deep: 1, year: 1, month: 1}
		}
	].map((t, i) => {
		test(getTestCaseDescription(t, i), () => {
			const actual = Reducer(t.state, t.action)
			expect(actual).toEqual(t.expected)
		})
	})

})
