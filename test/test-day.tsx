import React from "react"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

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

		expect(screen.getByText(d.date)).toBeInTheDocument()
		expect(screen.getByText(d.date)).toHaveClass(d.type)
	})

})
