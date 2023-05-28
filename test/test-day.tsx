import React from "react"
import {render, screen} from "@testing-library/react"

import Day from "../src/day"

describe("Day should", () => {

	test("render", () => {
		const d = {type: "type", date: 1}

		render(<table>
			<tbody>
				<tr>
					<Day day={d}/>
				</tr>
			</tbody>
		</table>
		)

		//expect(screen.getByText("1")).toBeInDocument()
		expect(screen.getByText("1")).toBeDefined()
	})

})
