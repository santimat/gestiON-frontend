import {
  BadgePercent,
  LayoutDashboard,
  Package,
  ReceiptText,
  ScanBarcode,
  Settings,
  ShoppingCart,
  StoreIcon,
  Tags,
  UserGroupIcon,
  Users,
} from "lucide-react";

import type { NavItem } from "@shared/types";

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
  {
    icon: ReceiptText,
    text: "Ventas",
    short: "Ventas",
    href: "/sales",
  },
  { icon: Package, text: "Productos", short: "Productos", href: "/products" },
  { icon: Tags, text: "Categorías", short: "Categorías", href: "/categories" },
  { icon: BadgePercent, text: "Ofertas", short: "Ofertas", href: "/offers" },
  {
    icon: UserGroupIcon,
    text: "Clientes",
    short: "Clientes",
    href: "/clients",
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
  { icon: Users, text: "Cajeros", short: "Cajeros", href: "/cashiers" },
  { icon: Settings, text: "Configuración", short: "Config", href: "/settings" },
];
