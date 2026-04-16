import Link from "next/link";

type Props = {
  size?: string;
  light?: boolean;
};

function Logo({ size = "24px", light = false }: Props) {
  return (
    <Link href='/' className=" text-decoration-none">
      <h2
        className="logo"
        style={{ fontSize: size, color: light ? "#fff" : "#000" }}
      >
        CineVault
      </h2>
    </Link>
  );
}

export default Logo;
