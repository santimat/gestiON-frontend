import { SideBar } from "@/components/SideBar";
import { Route, Routes } from "react-router";
import { Cashiers } from "./Cashiers";

export function HomePage({children}) {
	return (
		<div className="flex h-full">
			<SideBar />
			<section className="flex-1">
				{children}
			</section>
		</div>
	);
}
