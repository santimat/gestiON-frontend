import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  StoreIcon,
  UserGroupIcon,
  Users,
} from "lucide-react";

import type { CommerceWithOwnerForm, NavItem } from "@/types";

export const ALLOWEDS_ROUTES_BY_ROLE = {
  SUDO: [
    "/commerces",
    "/dashboard",
    "/cashiers",
    "/products",
    "/sell",
    "/clients",
  ],
  OWNER: ["/dashboard", "/cashiers", "/products", "/sell", "/clients"],
  CASHIER: ["/sell", "/products", "/clients"],
};

export const SIDEBAR_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, text: "Dashboard", href: "/dashboard" },
  { icon: StoreIcon, text: "Comercios", href: "/commerces" },
  { icon: ScanBarcode, text: "Puntos de venta", href: "/sell" },
  { icon: Package, text: "Productos", href: "/products" },
  { icon: Users, text: "Cajeros", href: "/cashiers" },
  { icon: UserGroupIcon, text: "Clientes", href: "/clients" },
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

export const DEFAULT_COMMERCE_WITH_OWNER = {
  userId: 0,
  commerceId: 0,
  username: "",
  email: "",
  cuit: "",
  password: "",
  phoneNumber: "",
  businessName: "",
  address: "",
  businessLogo: null,
};

export const DEFAULT_PRODUCT_FORM = {
  name: "",
  description: "",
  price: 0,
  category: "",
  image: null,
  minStock: 0,
  maxStock: 0,
};
