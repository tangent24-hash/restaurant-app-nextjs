import Link from "next/link";
import { FiGrid, FiPhone } from "react-icons/fi";

const TopbarItem = ({ label, url, Icon }) => (
  <li className="mx-1 pb-px md:mr-2.5 lg:[&:nth-of-type(3)]:mr-10 lg:[&:nth-of-type(5)]:mr-10">
    <Link
      href={url}
      className="flex items-center transition-colors hover:text-white"
    >
      {Icon && <Icon className="mx-1 md:text-sm"></Icon>}
      <span>{label}</span>
    </Link>
  </li>
);

export const TopBar = () => {
  const topbarItems = [
    { label: "careers", url: "careers" },
    { label: "help", url: "help" },
    { label: "buyer", url: "buyer" },
    {
      label: "download",
      url: "https://play.google.com/store/apps",
      Icon: FiGrid,
    },
    { label: "phone", url: "tel:+0125258192502", Icon: FiPhone },
  ];

  return (
    <div className="bg-[#232323] text-[10px] text-gray-300 md:text-xs">
      <div className="mx-auto flex flex-col items-center px-4 py-1 xl:container md:flex-row md:py-2.5">
        <p className="pb-2 md:pb-0">{"20% Discount"}</p>
        <ul className="flex flex-wrap justify-center md:ml-auto">
          {topbarItems.map((item) => (
            <TopbarItem key={item.label} {...item} />
          ))}
        </ul>
      </div>
    </div>
  );
};
