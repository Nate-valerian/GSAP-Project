import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, alt, clipClass = "", imgClass = "" }) => (
  <div className={`overflow-hidden ${clipClass}`}>
    <img
      src={src}
      alt={alt || "Image"}
      className={`w-full h-full object-cover ${imgClass}`}
      loading="lazy"
    />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-5 md:px-10">
      <div className="relative rounded-lg bg-black py-16 md:py-24 text-blue-50 overflow-hidden">
        {/* Left side images - Hidden on mobile, shown on sm+ */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            alt="Zentry community member 1"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            alt="Zentry community member 2"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* Right side swordman images */}
        <div className="absolute -top-20 left-10 w-48 sm:top-1/2 sm:-translate-y-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            alt="Swordman character partial"
            clipClass="absolute md:scale-125"
            imgClass="opacity-70"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            alt="Swordman character full"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="mb-8 md:mb-10 font-general text-xs md:text-[10px] uppercase tracking-wider">
            Join Zentry
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            containerClass="special-font w-full font-zentry !text-4xl md:!text-5xl lg:!text-[6.2rem] !font-black !leading-[.9] text-center" // Fixed: className → containerClass
          />

          <Button
            title="Contact us"
            containerClass="mt-8 md:mt-10 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
      </div>
    </div>
  );
};

export default Contact;
