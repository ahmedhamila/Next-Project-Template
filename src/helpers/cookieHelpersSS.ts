import { cookies } from "next/headers";

// Server-side getCookie using Next.js cookies API
export const getCookieSS = (key: string): string | null => {
	const cookieStore = cookies();
	const cookie = cookieStore.get(key);
	return cookie?.value || null;
};
