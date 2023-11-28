import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center px-4 py-8 relative">
      <p className="text-center">
        &copy; 2023 WhatsAppGenVal. <br /> Dikembangkan dengan ☕ &#38; 🚬 oleh:{" "}
        <Link
          className="hover:text-red-600 transition-all"
          href="https://muhammadfathurraiyan.site/"
          target="_blank"
        >
          Raiyan.
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
