"use client";
import React from "react";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import promobanner1 from "@/public/assets/foods/hero/promo-banner1.jpeg";
import promobanner2 from "@/public/assets/foods/hero/promo-banner2.jpeg";
import promobanner3 from "@/public/assets/foods/hero/promo-banner3.jpeg";

export default function HeroAndOfferSection() {
  const items = [
    {
      img: promobanner1,
      alt: "Promotional Banner 1",
    },
    {
      img: promobanner2,
      alt: "Promotional Banner 2",
    },
    {
      img: promobanner3,
      alt: "Promotional Banner 3",
    },
  ];

  return (
    <>
      {/* <Carousel
        autoPlay={false}
        animation="slide"
        indicators={true}
        timeout={500}
        navButtonsAlwaysVisible={true}
        navButtonsAlwaysInvisible={false}
      >
        {items?.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel> */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
        {items?.map((item, i) => (
          <div key={i} className="w-full mx-auto">
            <Image
              src={item.img}
              alt={`Offer ${i + 1}`}
              width={300}
              height={300}
              layout="responsive"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </>
  );
}

function Item(props = null) {
  return (
    <Paper style={{ height: "auto" }}>
      <Image
        src={props?.item.img}
        alt={props?.item.alt}
        layout="responsive"
        objectFit="cover"
      />
    </Paper>
  );
}
