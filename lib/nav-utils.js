/** Shared active-state logic for header + mobile bottom bar */
export function isNavLinkActive(pathname, hash, href) {
  if (href === "/") {
    return pathname === "/" && (!hash || hash === "");
  }
  if (href.startsWith("/#")) {
    const target = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    return pathname === "/" && hash === target;
  }
  if (href === "/shop") {
    return pathname === "/shop" || pathname.startsWith("/shop/") || pathname.startsWith("/product/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isMobileMoreRoute(pathname) {
  return (
    pathname === "/about" ||
    pathname === "/gallery" ||
    pathname.startsWith("/gallery/") ||
    pathname === "/contact"
  );
}
