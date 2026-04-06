import { Keyboard, Cpu, Layers, SwitchCamera, Palette, Hammer, Cable, Wrench } from "lucide-react";

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519162721257-18cd195350c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Restocked: Holy Pandas",
    title: "Build Your",
    highlight: "Endgame Keyboard",
    description:
      "Curated components, premium barebone kits, and enthusiast-grade switches. Everything you need to craft the perfect typing experience.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "New Arrival: GMK Sets",
    title: "Premium",
    highlight: "Keycap Sets",
    description:
      "Elevate your aesthetics with high-quality, double-shot ABS and dye-sub PBT keycaps designed by the community.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Group Buy Live",
    title: "Custom",
    highlight: "Artisan Switches",
    description:
      "Experience unparalleled tactile feedback and smooth linear presses with our exclusive hand-lubed switch collections.",
  },
];

export const CATEGORIES_NAV = [
  { name: "Barebones", icon: Keyboard },
  { name: "Keycaps", icon: Palette },
  { name: "Switches", icon: SwitchCamera },
  { name: "PCBs", icon: Cpu },
  { name: "Plates", icon: Layers },
  { name: "Cables", icon: Cable },
  { name: "Mods", icon: Hammer },
  { name: "Tools", icon: Wrench },
];
