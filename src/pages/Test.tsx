import { backendAPI } from "@/services/axios";

export function Test() {
	const testingFetch = async () => {
		const res = await backendAPI.post("/auth/login", { a: "pepe" });
		console.log(res);
	};

	return (
		<>
			<button className="bg-background-soft p-2 m-auto" onClick={testingFetch}>
				Clickeame cagón
			</button>
		</>
	);
}
