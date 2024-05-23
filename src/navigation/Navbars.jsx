import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import {
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Button,
} from "@nextui-org/react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { AcmeLogo } from "./AcmeLogo.jsx";
import Searching from "../Components/Searching/Searching.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useCartContext } from "../ContextApi/Cart_context.jsx";
import { useAuth } from "../ContextApi/AppProvider.jsx";
export default function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(
    window.innerWidth > 721
  );
  const [cartLength, setCartLength] = React.useState();
  const navigate = useNavigate();
  const { cart } = useCartContext();
  const { isLoggedIn, user } = useAuth();
  const isAuthenticated = isLoggedIn;
  useEffect(() => {
    setCartLength(cart.length);
  }, [cart]);

  console.log(cartLength);
  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 721);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Profile", href: "/profile" },
    { label: "My orders", href: "/orders" },
    { label: "Cart", href: "/cart" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
    { label: "Help & Feedback", href: "/help" },
    { label: "Log Out", href: "/logout" },
  ];
  const profileMenu = isAuthenticated ? (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src={user?.msg?.photoURL ? user?.msg?.photoURL : user?.msg?.username?.charAt(0)}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem
          key="settings"
          onClick={() => {
            navigate("/myProfile");
          }}
        >
          My Profile
        </DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          <NavLink to="/logout" className="w-full">
            Logout
          </NavLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : null;

  return (
    <>
      {isLargeScreen ? (
        <Navbar isBordered>
          {/* Desktop View */}
          <NavbarContent justify="start">
            <NavLink to="/">
              <NavbarBrand className="mr-4">
                <AcmeLogo />
                <p className="hidden sm:block font-bold text-inherit">ACME</p>
              </NavbarBrand>
            </NavLink>
            <NavbarContent className=" start sm:flex gap-3">
              <NavbarItem>
                <NavLink to="/" exact className="nav-link">
                  Home
                </NavLink>
              </NavbarItem>
              <NavbarItem isActive>
                <NavLink to="/products" className="nav-link">
                  Products
                </NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to="/about" className="nav-link">
                  About us
                </NavLink>
              </NavbarItem>
              <NavbarItem>
                <NavLink to="/contact" className="nav-link">
                  Contact us
                </NavLink>
              </NavbarItem>
            </NavbarContent>
          </NavbarContent>
          <NavbarContent as="div" className="items-center" justify="end">
            <NavbarContent className="items-center" justify="end">
              <Searching />
            </NavbarContent>

            {profileMenu}
          </NavbarContent>

          <NavbarItem>
            {isAuthenticated ? (
              <></>
            ) : (
              <div>
                <NavLink to="/login">Login</NavLink>/
                <NavLink to="/signup">Signup</NavLink>
              </div>
            )}
          </NavbarItem>
          <NavbarItem>
            <NavbarItem className="ml-3 relative">
              <NavLink to="/cart" className="flex items-center justify-center">
                <LocalMallIcon />
                <div className="absolute top-0 right-0 -mt-2 -mr-5 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartLength}
                </div>
              </NavLink>
            </NavbarItem>
          </NavbarItem>
        </Navbar>
      ) : (
        <Navbar
          isBordered
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
              <AcmeLogo />
              <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarBrand>
              <AcmeLogo />
              <p className="font-bold text-inherit">ACME</p>
            </NavbarBrand>
            <NavbarItem>
              <NavLink color="foreground" to="#">
                Features
              </NavLink>
            </NavbarItem>
            <NavbarItem isActive>
              <NavLink to="#" aria-current="page">
                Customers
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink color="foreground" to="#">
                Integrations
              </NavLink>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <NavLink to="#">Login</NavLink>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" to="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/cart">
                <LocalMallIcon />
              </NavLink>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <NavLink
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  to={item.href}
                  size="lg"
                >
                  {item.label}
                </NavLink>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      )}
    </>
  );
}
