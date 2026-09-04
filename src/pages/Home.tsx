import { SideBar } from "@/shared/components/SideBar";

export function HomePage() {
	return (
		<div className="flex gap-4 h-full">
			<SideBar />
			<section className="flex-1">Esto va a ser el resto de la página</section>
		</div>
	);
}
