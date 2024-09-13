import Link from "next/link"

import { Icons } from "@/icons"

const Brand = () => {
	return (
		<>
			<Link href="/">
				<Icons.cat aria-label="Cat icon" />
			</Link>
		</>
	)
}

export { Brand }
