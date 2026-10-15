import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  StoreIcon,
  UserGroupIcon,
  Users,
} from "lucide-react";

import type {
  CashierRequest,
  ClientRequest,
  CommerceWithOwnerRequest,
  NavItem,
  ProductForm,
} from "@/types";

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

export const DEFAULT_COMMERCE_WITH_OWNER: CommerceWithOwnerRequest = {
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

export const DEFAULT_PRODUCT_FORM: ProductForm = {
  name: "",
  description: "",
  categoryId: 0,
  costPrice: 0,
  salePrice: 0,
  currentStock: 0,
  minStock: 0,
  image: null,
};

export const DEFAULT_CLIENT_FORM: ClientRequest = {
  name: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  dni: "",
};

export const DEFAULT_CASHIER_FORM: CashierRequest = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};
