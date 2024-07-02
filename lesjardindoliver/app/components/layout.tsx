import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

export type PageName = "HOME_PAGE" | "HISTORY_PAGE" | "ADMIN_PAGE";

function Navbar({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return <nav className="flex gap-6 grow justify-center" {...props} />;
}

function NavbarLink({
  children,
  href,
  target,
}: {
  children: React.ReactNode;
  href: string;
  target?: HTMLAttributeAnchorTarget | undefined;
}) {
  return (
    <Link
      className="px-2 py-2 font-semibold hover:text-primary-solid transition-colors border-b-2 border-solid border-transparent"
      href={href}
      target={target}
    >
      {children}
    </Link>
  );
}
Navbar.Link = NavbarLink;

function Logo() {
  return (
    <div className="flex items-center shrink-0 ">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="h-[56px] -my-[8px] w-auto"
        src={"/images/logo.jpeg"}
      />
    </div>
  );
}

function HomeLink() {
  return (
    <NavbarLink href="/">
      {" "}
      <div className="flex items-center">Accueil</div>
    </NavbarLink>
  );
}

function AboutLink() {
  return (
    <NavbarLink href="/about">
      {" "}
      <div className="flex items-center">Mes créations </div>
    </NavbarLink>
  );
}

function ContactLink() {
  return (
    <NavbarLink href="/contact">
      {" "}
      <div className="flex items-center">Me contacter </div>
    </NavbarLink>
  );
}

function Header() {
  return (
    <header className="h-16">
      <div className="fixed h-16 flex items-center bg-slate-100 text-black z-[60] w-full shadow-header">
        <>
          <div className="mx-auto px-6 flex items-center grow">
            <Logo />
            <Navbar >
              <HomeLink />
              <AboutLink />
              <ContactLink />
            </Navbar>
          </div>

        </>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="h-16 bg-basic-white w-full flex justify-center">
      <div className="flex grow justify-start items-center max-w-[1440px] px-6">
        <a
          className=" text-sm font-semibold hover:underline  border-b-2 border-solid border-transparent"
          href={"/docs/rgpd_test.pdf"}
          rel="noreferrer"
          target="_blank"
        >
          Page RGPD
        </a>
      </div>
    </footer>
  );
}

type MainProps = {
  children: React.ReactNode;
};
function Main(props: MainProps) {
  return <main >{props.children}</main>;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="grow">
        <Main>{children}</Main>
      </div>
      <Footer />
    </div>
  );
}
