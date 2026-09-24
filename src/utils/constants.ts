import {
	LayoutDashboard,
	Package,
	ScanBarcode,
	StoreIcon,
	UserGroupIcon,
	Users,
} from "lucide-react";

import type { NavItem } from "@/types";

export const ALLOWEDS_ROUTES_BY_ROLE = {
	SUDO: ["/commerces"],
	OWNER: ["/dashboard", "/cashiers", "/products", "/sell","/clients" ],
	CASHIER: ["/sell", "/products", "/clients"],
};

export const SIDEBAR_ITEMS: NavItem[] = [
	{ icon: LayoutDashboard, text: "Dashboard", href: "/dashboard" },
	{ icon: StoreIcon, text: "Comercios", href: "/commerces" },
	{ icon: ScanBarcode, text: "Puntos de venta", href: "/sell" },
	{ icon: Package, text: "Productos", href: "/products" },
	{ icon: Users, text: "Cajeros", href: "/cashiers" },
	{ icon: UserGroupIcon, text: "Clientes", href: "/clients" }
];

export const ROLE_DICTIONARY = {
	OWNER: "Dueño",
	CASHIER: "Cajero",
	SUDO: "Maestro supremo de las artes oscuras",
};

export const AVAILABLE_AVATAR_COLORS = [
	"cyan",
	"blue",
	"indigo",
	"violet",
	"pink",
	"red",
	"orange",
	"lime",
	"grape",
	"teal",
	"yellow",
	"green",
	"blue",
];
