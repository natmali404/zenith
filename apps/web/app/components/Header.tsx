import Image, { type ImageProps } from "next/image";

export function Header() {
  return (
    <header className="p-4">
        <Image src="/logo-image.png" alt="Zenith Logo" quality={100} width={200} height={100} className="mx-auto" />
    </header>
  );
}   

export default Header;