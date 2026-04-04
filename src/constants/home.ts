import { Keyboard, Cpu, Layers, SwitchCamera, Palette, Hammer, Cable, Wrench } from "lucide-react";

export const HERO_SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2042&auto=format&fit=crop",
    badge: "Restocked: Holy Pandas",
    title: "Build Your",
    highlight: "Endgame Keyboard",
    description:
      "Curated components, premium barebone kits, and enthusiast-grade switches. Everything you need to craft the perfect typing experience.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=2000&auto=format&fit=crop",
    badge: "New Arrival: GMK Sets",
    title: "Premium",
    highlight: "Keycap Sets",
    description:
      "Elevate your aesthetics with high-quality, double-shot ABS and dye-sub PBT keycaps designed by the community.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2000&auto=format&fit=crop",
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
