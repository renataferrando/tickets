/* eslint-disable @next/next/no-async-client-component */
"use client";
import Page from "@/app/components/common/page";
import gsap from "gsap";
import { EventCard } from "@/app/components/events/event-card";
// import { useGetEventsQuery } from "@/services/eventService.ts";
import { getEvents } from "@/lib/getEventsDb";

import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "@/app/components/common/button";
import Image from "next/image";
// Register GSAP plugins inside the component
gsap.registerPlugin(ScrollTrigger);

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
import { formatDate } from "@/app/utils/string-format/formatDate";
import { Divider } from "@mui/material";

const Slider = ({ events }) => {
  const slider = useRef();
  const component = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current.offsetWidth,
          markers: true,
        },
      });
    }, component);
    return () => ctx.revert();
  });

  console.log(slider);
  return (
    <div>
      <div ref={component} className="flex gap-4 items-center w-[2009px]">
        {events?.map((event) => (
          <>
            <div
              ref={slider}
              className="w-[320px] h-[450px] flex-none border border-opacity-20 border-white-200 rounded-lg grid grid-rows-[75%_25%] gap-2 group"
            >
              {/* <ImageEffect imageSrc={event?.imageUrl || ""} /> */}
              <Image
                src={event?.imageUrl || ""}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                }} // optional
                alt="Event's image"
              />
              <div className="px-4 py-2">
                <div className="flex items-center w-full justify-between">
                  <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                  <p className="font-proto-sans text-xs">
                    {formatDate(event.date)}
                  </p>
                </div>
                <Divider className="mb-4 bg-white opacity-20" />
                <div className="grid grid-cols-[50%_50%] items-center w-full justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-xs">{event.location}</p>
                  </div>
                  <Button
                    className="py-2 px-4 rounded-lg text-sm"
                    primary
                    text="Buy tickets"
                  />
                </div>
              </div>
            </div>
          </>
          // <EventCard ref={slider} key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default function EventsPage() {
  // const { data: eventsData } = useGetEventsQuery(null);
  // const eventsData = await getEvents({
  //   sortBy: "date",
  //   sortOrder: "asc",
  //   page: 1,
  //   limit: 8,
  // });

  const eventsData = [
    {
      name: "Full Moon Rave",
      date: "2024-03-25T00:00:00Z",
      location: "Buenos Aires",
      description:
        "Dance under the moonlight with top DJs, neon body paint, and endless beach vibes.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 100,
            type: "Regular",
            stock: 500,
            description: "General admission ticket",
          },
          {
            price: 200,
            type: "VIP",
            stock: 50,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Neon Beach Party",
      date: "2024-04-24T00:00:00Z",
      location: "Rio de Janeiro",
      description:
        "A high-energy full moon celebration with fire dancers, electronic beats, and tropical cocktails.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 105,
            type: "Regular",
            stock: 490,
            description: "General admission ticket",
          },
          {
            price: 210,
            type: "VIP",
            stock: 48,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Lunar Night Fest",
      date: "2024-05-24T00:00:00Z",
      location: "Miami",
      description:
        "Experience an unforgettable night with neon lights, deep house music, and glowing party accessories.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 110,
            type: "Regular",
            stock: 480,
            description: "General admission ticket",
          },
          {
            price: 220,
            type: "VIP",
            stock: 46,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Moonlight Madness",
      date: "2024-06-23T00:00:00Z",
      location: "Barcelona",
      description:
        "A vibrant festival featuring international DJs, laser shows, and stunning moonlit scenery.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 115,
            type: "Regular",
            stock: 470,
            description: "General admission ticket",
          },
          {
            price: 230,
            type: "VIP",
            stock: 44,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Electric Moon",
      date: "2024-07-23T00:00:00Z",
      location: "Sydney",
      description:
        "Get ready for a wild neon-lit party with the best techno and house music.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 120,
            type: "Regular",
            stock: 460,
            description: "General admission ticket",
          },
          {
            price: 240,
            type: "VIP",
            stock: 42,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Glowwave Festival",
      date: "2024-08-22T00:00:00Z",
      location: "Ibiza",
      description:
        "A celestial celebration with live music, immersive visuals, and an electrifying atmosphere.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 125,
            type: "Regular",
            stock: 450,
            description: "General admission ticket",
          },
          {
            price: 250,
            type: "VIP",
            stock: 40,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Starlit Dance",
      date: "2024-09-21T00:00:00Z",
      location: "Tokyo",
      description:
        "Enjoy a tropical-themed full moon event with fire performances and exotic drinks.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 130,
            type: "Regular",
            stock: 440,
            description: "General admission ticket",
          },
          {
            price: 260,
            type: "VIP",
            stock: 38,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Midnight Groove",
      date: "2024-10-21T00:00:00Z",
      location: "Cape Town",
      description:
        "The ultimate beach rave with glow-in-the-dark decor, pulsating beats, and unlimited fun.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 135,
            type: "Regular",
            stock: 430,
            description: "General admission ticket",
          },
          {
            price: 270,
            type: "VIP",
            stock: 36,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Lunar Soundscape",
      date: "2024-11-20T00:00:00Z",
      location: "Bali",
      description:
        "A cosmic dance experience blending futuristic visuals, deep bass, and lunar aesthetics.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 140,
            type: "Regular",
            stock: 420,
            description: "General admission ticket",
          },
          {
            price: 280,
            type: "VIP",
            stock: 34,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Moonbeam Bash",
      date: "2024-12-20T00:00:00Z",
      location: "Mykonos",
      description:
        "Party under the stars with high-energy beats, glowing costumes, and a surreal moonlit setting.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 145,
            type: "Regular",
            stock: 410,
            description: "General admission ticket",
          },
          {
            price: 290,
            type: "VIP",
            stock: 32,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Celestial Rhythms",
      date: "2025-01-19T00:00:00Z",
      location: "Los Angeles",
      description:
        "A legendary moonlit festival featuring top international DJs and unforgettable performances.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 150,
            type: "Regular",
            stock: 400,
            description: "General admission ticket",
          },
          {
            price: 300,
            type: "VIP",
            stock: 30,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Galactic Glow Party",
      date: "2025-02-18T00:00:00Z",
      location: "Goa",
      description:
        "Step into a night of glowing wonder with pulsating music, fire acts, and non-stop dancing.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 155,
            type: "Regular",
            stock: 390,
            description: "General admission ticket",
          },
          {
            price: 310,
            type: "VIP",
            stock: 28,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Eclipse Night",
      date: "2025-03-20T00:00:00Z",
      location: "Tulum",
      description:
        "A mystical night of music, magic, and moonlit celebrations in a stunning beachfront location.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 160,
            type: "Regular",
            stock: 380,
            description: "General admission ticket",
          },
          {
            price: 320,
            type: "VIP",
            stock: 26,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Supermoon Beats",
      date: "2025-04-19T00:00:00Z",
      location: "Berlin",
      description:
        "Feel the power of the full moon as you dance to electrifying tunes in an epic setting.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 165,
            type: "Regular",
            stock: 370,
            description: "General admission ticket",
          },
          {
            price: 330,
            type: "VIP",
            stock: 24,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Dark Side Disco",
      date: "2025-05-19T00:00:00Z",
      location: "London",
      description:
        "The most immersive full moon party with cutting-edge visuals, hypnotic beats, and neon vibes.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 170,
            type: "Regular",
            stock: 360,
            description: "General admission ticket",
          },
          {
            price: 340,
            type: "VIP",
            stock: 22,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Stardust Celebration",
      date: "2025-06-18T00:00:00Z",
      location: "Paris",
      description:
        "Get lost in the music and the moon's glow with the ultimate beach party experience.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 175,
            type: "Regular",
            stock: 350,
            description: "General admission ticket",
          },
          {
            price: 350,
            type: "VIP",
            stock: 20,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Astro Rave",
      date: "2025-07-18T00:00:00Z",
      location: "Dubai",
      description:
        "Step into another dimension with high-energy beats, psychedelic visuals, and a stunning night sky.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 180,
            type: "Regular",
            stock: 340,
            description: "General admission ticket",
          },
          {
            price: 360,
            type: "VIP",
            stock: 18,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Lunar Pulse",
      date: "2025-08-17T00:00:00Z",
      location: "Santorini",
      description:
        "A fusion of nature and music, where the moon's glow sets the stage for an epic celebration.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 185,
            type: "Regular",
            stock: 330,
            description: "General admission ticket",
          },
          {
            price: 370,
            type: "VIP",
            stock: 16,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Neon Eclipse",
      date: "2025-09-16T00:00:00Z",
      location: "Phuket",
      description:
        "A mesmerizing mix of music, light, and dance, set in an exotic moonlit paradise.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 190,
            type: "Regular",
            stock: 320,
            description: "General admission ticket",
          },
          {
            price: 380,
            type: "VIP",
            stock: 14,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
    {
      name: "Cosmic Dance Night",
      date: "2025-10-16T00:00:00Z",
      location: "Bangkok",
      description:
        "The most talked-about full moon party of the year, featuring world-class DJs and mind-blowing performances.",
      category: "PARTY",
      imageUrl: null,
      organizerId: 1,
      tickets: {
        create: [
          {
            price: 195,
            type: "Regular",
            stock: 310,
            description: "General admission ticket",
          },
          {
            price: 390,
            type: "VIP",
            stock: 12,
            description: "VIP access with premium seating and exclusive perks",
          },
        ],
      },
    },
  ];
  console.log(eventsData);
  return (
    <Page className="bg-cover bg-no-repeat bg-right bg-sky-900 overflow-y-auto h-[100vh] ">
      <div className="p-6">
        <h1>SSR Events Page</h1>
        <Slider events={eventsData} />
      </div>
    </Page>
  );
}
