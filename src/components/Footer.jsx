import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://discord.com",
    icon: <FaDiscord />,
    label: "Join our Discord community",
  },
  {
    href: "https://twitter.com",
    icon: <FaTwitter />,
    label: "Follow us on Twitter",
  },
  {
    href: "https://youtube.com",
    icon: <FaYoutube />,
    label: "Subscribe to our YouTube channel",
  },
  {
    href: "https://medium.com",
    icon: <FaMedium />,
    label: "Read our blog on Medium",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#5542ff] py-6 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-5 md:flex-row md:gap-0">
        {/* Copyright */}
        <p className="text-center text-sm font-light md:text-left">
          ©Nova {currentYear}. All rights reserved
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-black transition-all duration-300 ease-in-out hover:scale-110 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5542ff]"
            >
              <span className="text-xl md:text-2xl">{link.icon}</span>
            </a>
          ))}
        </div>

        {/* Privacy Policy */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light transition-all duration-300 hover:underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5542ff] md:text-right"
          aria-label="Read our privacy policy"
        >
          Privacy Policy
        </a>
      </div>

      {/* Optional: Add a subtle top border */}
      <div className="mt-6 border-t border-black/20"></div>
    </footer>
  );
};

export default Footer;
