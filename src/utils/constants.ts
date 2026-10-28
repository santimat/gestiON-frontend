import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  ShoppingCart,
  StoreIcon,
  Tags,
  UserGroupIcon,
  Users,
} from "lucide-react";

import type { ClientRequest, NavItem } from "@/types";

export const ALLOWEDS_ROUTES_BY_ROLE = {
  SUDO: ["/commerces"],
  OWNER: [
    "/dashboard",
    "/cashiers",
    "/sell-point",
    "/products",
    "/categories",
    "/sell",
    "/clients",
  ],
  CASHIER: ["/sell", "/products", "/clients"],
};

export const SIDEBAR_ITEMS: NavItem[] = [
  {
    icon: LayoutDashboard,
    text: "Dashboard",
    short: "Panel",
    href: "/dashboard",
  },
  {
    icon: ShoppingCart,
    text: "Vender",
    short: "Vender",
    href: "/sell",
  },
  { icon: Package, text: "Productos", short: "Productos", href: "/products" },
  { icon: Tags, text: "Categorías", short: "Categorías", href: "/categories" },
  {
    icon: StoreIcon,
    text: "Comercios",
    short: "Comercios",
    href: "/commerces",
  },
  {
    icon: ScanBarcode,
    text: "Puntos de venta",
    short: "Puntos",
    href: "/sell-point",
  },
  { icon: Users, text: "Cajeros", short: "Cajeros", href: "/cashiers" },
  {
    icon: UserGroupIcon,
    text: "Clientes",
    short: "Clientes",
    href: "/clients",
  },
];

export const ROLE_DICTIONARY = {
  OWNER: "Dueño",
  CASHIER: "Cajero",
  SUDO: "Administrador general",
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
];

export const DEFAULT_CLIENT_FORM: ClientRequest = {
  name: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  dni: "",
};
