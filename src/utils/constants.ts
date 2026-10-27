import {
  LayoutDashboard,
  Package,
  ScanBarcode,
  StoreIcon,
  Tags,
  UserGroupIcon,
  Users,
} from "lucide-react";

import type {
  CashierRequest,
  CategoryRequest,
  ClientRequest,
  CommerceWithOwnerRequest,
  NavItem,
  ProductForm,
  SellPointRequest,
} from "@/types";

export const ALLOWEDS_ROUTES_BY_ROLE = {
  SUDO: [
    "/commerces",
    "/dashboard",
    "/cashiers",
    "/products",
    "/categories",
    "/sell",
    "/clients",
  ],
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
  { icon: Package, text: "Productos", short: "Productos", href: "/products" },
  { icon: Tags, text: "Categorías", short: "Categorías", href: "/categories" },
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

export const DEFAULT_CATEGORY_FORM: CategoryRequest = {
  name: "",
  description: "",
};

export const DEFAULT_SELL_POINT_FORM: SellPointRequest = {
  name: "",
  cashierIds: [],
};
