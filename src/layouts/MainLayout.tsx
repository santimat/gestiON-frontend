import { SideBar } from "@/components/SideBar";

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-full">
			<SideBar />
			<section className="flex-1">{children}</section>
		</div>
	);
}
