import Image from "next/image";

export default function OfferSection() {
  return (
    <div className="flex justify-around">
      <div>
        <Image src="/offer1.jpg" width={300} height={300} alt="Offer 1" />
      </div>
      <div>
        <Image src="/offer2.jpg" width={300} height={300} alt="Offer 2" />
      </div>
      <div>
        <Image src="/offer3.jpg" width={300} height={300} alt="Offer 3" />
      </div>
    </div>
  );
}
