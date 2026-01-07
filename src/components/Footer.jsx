import {
  FaDiscord,
  FaTwitter,
  FaYoutube,
  FaGamepad,
  FaTwitch,
  FaGithub,
} from "react-icons/fa";
import { SiOpensea } from "react-icons/si";

const socialLinks = [
  {
    href: "https://discord.gg/zentry",
    icon: <FaDiscord />,
    label: "Join Zentry Gaming Discord",
    color: "hover:text-[#5865F2]",
  },
  {
    href: "https://twitter.com/ZentryHQ",
    icon: <FaTwitter />,
    label: "Follow Zentry on X",
    color: "hover:text-[#1DA1F2]",
  },
  {
    href: "https://www.youtube.com/@ZentryGaming",
    icon: <FaYoutube />,
    label: "Subscribe to Zentry YouTube",
    color: "hover:text-[#FF0000]",
  },
  {
    href: "https://twitch.tv/zentry",
    icon: <FaTwitch />,
    label: "Watch on Twitch",
    color: "hover:text-[#9146FF]",
  },
  {
    href: "https://opensea.io/collection/zentry",
    icon: <SiOpensea />,
    label: "View NFTs on OpenSea",
    color: "hover:text-[#2081E2]",
  },
  {
    href: "https://github.com/zentry",
    icon: <FaGithub />,
    label: "Contribute on GitHub",
    color: "hover:text-[#f5f5f5]",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-t from-gray-900 via-gray-800 to-black border-t border-white/10 py-10 md:py-12 text-white">
      <div className="container mx-auto px-5 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaGamepad className="text-3xl text-violet-500" />
              <h3 className="special-font text-2xl font-bold">
                ZENTR<span className="text-violet-500">G</span>
              </h3>
            </div>
            <p className="text-gray-400 font-robert-regular text-sm leading-relaxed max-w-md">
              Redefining gaming through the metagame layer. Join millions of
              players shaping the future of play-to-earn and digital economies.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Live on Mainnet</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-zentry text-lg mb-6 text-white border-l-4 border-violet-500 pl-3">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Whitepaper", href: "#" },
                { label: "Documentation", href: "#" },
                { label: "Marketplace", href: "#" },
                { label: "Leaderboards", href: "#" },
                { label: "Tournaments", href: "#" },
                { label: "Support", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Partners", href: "#" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-300 text-sm font-robert-regular hover:pl-2 hover:border-l-2 hover:border-violet-500"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-zentry text-lg mb-6 text-white border-l-4 border-violet-500 pl-3">
              Stay Updated
            </h4>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest gaming updates, tournament alerts, and NFT drops.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center mb-8">
          <h5 className="text-gray-400 mb-6 text-sm uppercase tracking-wider font-robert-regular">
            Join Our Community
          </h5>
          <div className="flex flex-wrap justify-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={`group relative p-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${link.color} hover:bg-white/10 hover:scale-110 hover:border-white/20 hover:shadow-lg hover:shadow-current/10`}
              >
                <span className="text-2xl">{link.icon}</span>
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded whitespace-nowrap">
                    {link.label}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {currentYear} Zentry Gaming. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Powered by Ethereum & Polygon
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Cookie Policy", href: "#cookies" },
                { label: "Disclaimer", href: "#disclaimer" },
                { label: "Bug Bounty", href: "#bounty" },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm font-light transition-colors duration-300 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <div className="text-center">
                <div className="text-white font-bold">2.4M+</div>
                <div className="text-gray-400">Players</div>
              </div>
              <div className="h-4 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-white font-bold">$850M+</div>
                <div className="text-gray-400">Volume</div>
              </div>
            </div>
          </div>

          {/* Platform Badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-white/5">
            <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-400/20">
              🛡️ Web3 Secure
            </span>
            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-400/20">
              ⚡ Layer 2 Optimized
            </span>
            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full border border-purple-400/20">
              🎮 Cross-Platform
            </span>
            <span className="px-3 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded-full border border-yellow-400/20">
              🔥 Play-to-Earn
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

// const socialLinks = [
//   {
//     href: "https://discord.com",
//     icon: <FaDiscord />,
//     label: "Join our Discord community",
//   },
//   {
//     href: "https://twitter.com",
//     icon: <FaTwitter />,
//     label: "Follow us on Twitter",
//   },
//   {
//     href: "https://youtube.com",
//     icon: <FaYoutube />,
//     label: "Subscribe to our YouTube channel",
//   },
//   {
//     href: "https://medium.com",
//     icon: <FaMedium />,
//     label: "Read our blog on Medium",
//   },
// ];

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full bg-[#5542ff] py-6 text-black">
//       <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-5 md:flex-row md:gap-0">
//         {/* Copyright */}
//         <p className="text-center text-sm font-light md:text-left">
//           ©Nova {currentYear}. All rights reserved
//         </p>

//         {/* Social Links */}
//         <div className="flex justify-center gap-6 md:justify-start">
//           {socialLinks.map((link, index) => (
//             <a
//               key={index}
//               href={link.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label={link.label}
//               className="text-black transition-all duration-300 ease-in-out hover:scale-110 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5542ff]"
//             >
//               <span className="text-xl md:text-2xl">{link.icon}</span>
//             </a>
//           ))}
//         </div>

//         {/* Privacy Policy */}
//         <a
//           href="#privacy-policy"
//           className="text-center text-sm font-light transition-all duration-300 hover:underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5542ff] md:text-right"
//           aria-label="Read our privacy policy"
//         >
//           Privacy Policy
//         </a>
//       </div>

//       {/* Optional: Add a subtle top border */}
//       <div className="mt-6 border-t border-black/20"></div>
//     </footer>
//   );
// };

// export default Footer;
