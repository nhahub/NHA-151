"use client";

import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

import { Fragment, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useCart } from "../Cart/useCart";
import Cart from "../Cart/Cart";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice"; // أو حسب مسار authSlice عندك

const navigation = {
  categories: [
    {
      id: "indoor",
      name: "Indoor Plants",
      href: "#",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg",
          imageAlt: "Beautiful indoor plants in pots",
        },
        {
          name: "Low Light Plants",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/37076/pots-plants-cactus-succulent.jpg",
          imageAlt: "Indoor plants for low light",
        },
      ],
      sections: [
        {
          id: "types",
          name: "Types",
          items: [
            { name: "Peace Lily (Spathiphyllum)", href: "#" },
            { name: "Snake Plant (Sansevieria)", href: "#" },
            { name: "Monstera Deliciosa", href: "#" },
            { name: "ZZ Plant (Zamioculcas zamiifolia)", href: "#" },
            { name: "Pothos (Epipremnum aureum)", href: "#" },
          ],
        },
        {
          id: "care",
          name: "Care Tips",
          items: [
            {
              name: "Water when top soil is dry — usually once a week",
              href: "#",
            },
            {
              name: "Keep away from direct sunlight; bright, indirect light is best",
              href: "#",
            },
            {
              name: "Clean leaves monthly to remove dust",
              href: "#",
            },
            {
              name: "Use well-draining soil to prevent root rot",
              href: "#",
            },
          ],
        },
      ],
    },
    {
      id: "outdoor",
      name: "Outdoor Plants",
      href: "#",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/4451934/pexels-photo-4451934.jpeg",
          imageAlt: "Beautiful outdoor plants",
        },
        {
          name: "Flowering Plants",
          href: "#",
          imageSrc:
            "https://images.pexels.com/photos/2869199/pexels-photo-2869199.jpeg",
          imageAlt: "Outdoor flowering plants",
        },
      ],
      sections: [
        {
          id: "types",
          name: "Types",
          items: [
            { name: "Bougainvillea", href: "#" },
            { name: "Hibiscus", href: "#" },
            { name: "Jasmine (Arabian)", href: "#" },
            { name: "Lavender", href: "#" },
            { name: "Rosemary", href: "#" },
          ],
        },
        {
          id: "care",
          name: "Care Tips",
          items: [
            {
              name: "Ensure at least 4–6 hours of sunlight daily",
              href: "#",
            },
            {
              name: "Water deeply but less frequently to encourage strong roots",
              href: "#",
            },
            {
              name: "Use compost or organic fertilizer every 4–6 weeks",
              href: "#",
            },
            {
              name: "Prune regularly to shape and remove dead growth",
              href: "#",
            },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/Contact" },
  ],
};

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { openCart, cartItems } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sticky top-0 left-0 z-50 bg-white">
      {/* Mobile menu */}
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-100 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-300 ease-linear bg-black/25 data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto transition duration-300 ease-in-out transform bg-white shadow-xl data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="flex px-4 -mb-px space-x-8">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 px-1 py-4 text-base font-medium text-gray-900 border-b-2 border-transparent whitespace-nowrap data-selected:border-lime-600 data-selected:text-lime-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="px-4 pt-10 pb-8 space-y-10"
                  >
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="relative text-sm group">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="object-cover w-full bg-gray-100 rounded-lg aspect-square group-hover:opacity-75"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 z-10"
                          />
                          {item.name}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/${category.id}`}
                      className="inline-block px-3 py-1 text-sm font-medium text-white transition rounded bg-lime-600 hover:bg-lime-700"
                    >
                      Shop Now
                    </Link>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="flex flex-col mt-6 space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <span className="block p-2 -m-2 text-gray-500">
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="px-2 py-6 space-y-6 border-t border-gray-200">
              <div className="flow-root">
                <Link
                  to="/about"
                  className="block p-4 -m-2 font-medium text-gray-900 hover:text-lime-600"
                >
                  About Us
                </Link>
                <Link
                  to="/Contact"
                  className="block p-4 -m-2 font-medium text-gray-900 hover:text-lime-600"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="px-4 py-6 space-y-6 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  {user?.isAdmin ? (
                    <div className="flow-root">
                      <Link
                        to="/admin"
                        className="block p-2 -m-2 font-medium text-gray-900 hover:text-lime-600"
                      >
                        Dashboard
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flow-root">
                    <Link
                      to="/myaccount"
                      className="block p-2 -m-2 font-medium text-gray-900 hover:text-lime-600"
                    >
                      My Account
                    </Link>
                  </div>
                  <div className="flow-root">
                    <button
                      onClick={handleLogout}
                      className="block p-2 -m-2 font-medium text-gray-900 hover:text-lime-600"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flow-root">
                    <Link
                      to="/signin"
                      className="block p-2 -m-2 font-medium text-gray-900 hover:text-lime-600"
                    >
                      Sign In
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/signup"
                      className="block p-2 -m-2 font-medium text-gray-900 hover:text-lime-600"
                    >
                      Create Account
                    </Link>
                  </div>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-lime-600 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex items-center h-16">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative p-2 text-gray-400 bg-white rounded-md lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img alt="Greenifiy" src={logo} className=" w-[200px]" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ close }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton className="relative flex items-center justify-center text-sm font-medium text-gray-700 transition-colors duration-200 ease-out group hover:text-lime-600 data-open:text-lime-600">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-lime-600"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 z-20 w-full text-sm text-gray-500 transition bg-white top-full data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-white shadow-sm top-1/2"
                            />
                            <div className="relative bg-white">
                              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="grid grid-cols-2 py-16 gap-x-8 gap-y-10">
                                  <div className="grid grid-cols-2 col-start-2 gap-x-8">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="relative text-base group sm:text-sm"
                                      >
                                        <img
                                          alt={item.imageAlt}
                                          src={item.imageSrc}
                                          className="object-cover w-full bg-gray-100 rounded-lg aspect-square group-hover:opacity-75"
                                        />
                                        <p className="block mt-6 font-medium text-gray-900">
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0 z-10"
                                          />
                                          {item.name}
                                        </p>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="grid grid-cols-3 row-start-1 text-sm gap-x-8 gap-y-10">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text-gray-900 "
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <span className="hover:text-gray-800">
                                                {item.name}
                                              </span>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>

                                  <div className="-mt-14">
                                    <Link
                                      to={`/${category.id}`}
                                      onClick={() => close()}
                                      className="inline-block px-3 py-1 text-sm font-medium text-white transition rounded bg-lime-600 hover:bg-lime-700"
                                    >
                                      Shop Now
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="flex items-center ml-auto">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isLoggedIn ? (
                    <>
                      {user?.isAdmin ? (
                        <Link
                          to="/admin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Dashboard
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link
                        to="/myaccount"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        My Account
                      </Link>
                      <span
                        aria-hidden="true"
                        className="w-px h-6 bg-gray-200"
                      />
                      <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign In
                      </Link>
                      <span
                        aria-hidden="true"
                        className="w-px h-6 bg-gray-200"
                      />
                      <Link
                        to="/signup"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>

                {/* Cart */}
                <div className="flow-root ml-4 lg:ml-6">
                  <button
                    onClick={openCart}
                    className="flex items-center p-2 -m-2 group"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="text-gray-400 size-6 shrink-0 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartItems.length}
                    </span>
                  </button>
                  <Cart />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
