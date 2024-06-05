import Link from "next/link";
import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";

const socialMedias = [
  [BsInstagram, "https://instagram.com"],
  [BsTwitter, "https://twitter.com"],
  [BsFacebook, "https://facebook.com/sr.sohan.1"],
  [BsLinkedin, "https://linkedin.com/in/sohanur1"],
];

const Footer = () => {
  const footerLinks = [
    {
      label: "company",
      links: [
        ["About", "/about"],
        ["Term Of Use", "/term-of-use"],
        ["privacy Policy", "/privacy-policy"],
        ["How It Works", "/how-works"],
        ["Contact Us", "/contact-us"],
      ],
    },
    {
      label: "Support",
      links: [
        ["Support Career", "/support"],
        ["Service", "/24-service"],
        ["Quick Chat", "/quick-chat"],
      ],
    },
    {
      label: "Contact",
      links: [
        ["Whatsapp", "/whatsapp"],
        ["Support", "/24-service"],
      ],
    },
  ];

  return (
    <footer className="mb-16 bg-white md:mb-0">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col md:flex-1">
            {/* <Link href="/">
              <Image
                priority
                src="/logo.png"
                alt="Yummy Food"
                width={100}
                height={35}
                quality={100}
              />
            </Link> */}
            <p className="py-4 text-sm font-normal text-neutral-500">
              {"Yummy Food"}
            </p>
            <div className="my-5 flex justify-center md:justify-start">
              {socialMedias.map(([Icon, href]) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  className="mr-2 rounded-lg bg-neutral-200 p-2 text-neutral-600 transition hover:bg-neutral-300 hover:text-neutral-700"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-between md:mt-0 md:flex-[2] md:justify-around">
            {footerLinks.map(({ label, links }) => (
              <div key={label} className="flex flex-col">
                <strong className="mb-5 text-sm font-bold text-neutral-600 md:text-base">
                  {label}
                </strong>
                <ul className="flex flex-col gap-2 text-xs font-normal text-neutral-500 md:text-sm">
                  {links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="transition hover:text-neutral-700"
                    >
                      {label}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-neutral-100">
        <div className="mx-auto max-w-7xl px-2 py-3">
          <div className="flex flex-col items-center justify-between gap-3 text-xs font-medium text-neutral-700 md:flex-row">
            <p>{"copyright"}</p>
            <Link href="https://github.com/tangent24-hash" target="_blank">
              <BsGithub size="1.25rem" />
            </Link>
            <p>
              {`${"Created By"} `}
              <strong>
                <Link href="https://github.com/tangent24-hash" target="_blank">
                  Sohan
                </Link>
              </strong>
              {". "}
              {"reserved"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
