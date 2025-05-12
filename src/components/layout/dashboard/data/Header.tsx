import { House, LayoutDashboard, Info, HandPlatter, Users, UserRoundPen, ShoppingCart } from "lucide-react";

export const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },

    {
        label: "Home",
        href: "/dashboard/home",
        icon: House,
    },

    {
        label: "Services",
        href: "/dashboard/services",
        icon: HandPlatter,
    },

    {
        label: "About",
        href: "/dashboard/about",
        icon: Info,
    },

    {
        label: "Products",
        href: "/dashboard/products",
        icon: ShoppingCart,
        subItems: [
            {
                label: "All Products",
                href: "/dashboard/products/all"
            },

            {
                label: "Add Product",
                href: "/dashboard/products/add"
            },

            {
                label: "Categories",
                href: "/dashboard/products/categories"
            },
        ]
    },

    {
        label: "Testimonials",
        href: "/dashboard/testimonials",
        icon: Users,
    },

    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: UserRoundPen,
    },

    {
        label: "Home",
        href: "/",
        icon: House,
    },
];