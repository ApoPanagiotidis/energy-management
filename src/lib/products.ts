export type Product = {
  id: string;
  name: string;
  category: "Energy meter" | "Communication gateway";
  description: string;
  specifications: { label: string; value: string }[];
  sourceUrl: string;
};

export const products: Product[] = [
  {
    id: "count3-pro",
    name: "KDK COUNT3 PRO",
    category: "Energy meter",
    description:
      "A three-phase meter for tracking imported and exported active and reactive energy, with a Modbus interface for integration into an energy management system.",
    specifications: [
      { label: "Nominal voltage", value: "3 × 230/400 V" },
      { label: "Maximum current", value: "100 A" },
      { label: "Connectivity", value: "Modbus · 2 S0 pulse outputs" },
      { label: "DIN-rail width", value: "72 mm (4 modules)" },
      { label: "Protection", value: "IP51" },
    ],
    sourceUrl: "https://www.apollo-gs.com/product-page/kdk-count3-pro",
  },
  {
    id: "count3-cage-clamp",
    name: "KDK COUNT3 CAGE CLAMP",
    category: "Energy meter",
    description:
      "A three-phase meter with push-in lever terminals for tool-free wiring. Bidirectional energy measurement and four tariffs support detailed consumption monitoring.",
    specifications: [
      { label: "Nominal voltage", value: "3 × 230/400 V" },
      { label: "Maximum current", value: "65 A" },
      { label: "Connectivity", value: "Modbus RTU · M-Bus · Bluetooth" },
      { label: "DIN-rail width", value: "72 mm (4 modules)" },
      { label: "Protection", value: "IP51" },
    ],
    sourceUrl: "https://www.apollo-gs.com/product-page/kdk-count3-cage-clamp-push-in",
  },
  {
    id: "count-ct-cage-clamp",
    name: "KDK COUNT CT CAGE CLAMP",
    category: "Energy meter",
    description:
      "A compact meter that measures larger loads through external current transformers. Push-in terminals and several communication interfaces simplify integration.",
    specifications: [
      { label: "Nominal voltage", value: "3 × 230/400 V" },
      { label: "CT input current", value: "1.5 A reference / 5 A maximum" },
      { label: "Connectivity", value: "Modbus RTU · M-Bus · Bluetooth" },
      { label: "DIN-rail width", value: "36 mm (2 modules)" },
      { label: "Protection", value: "IP51" },
    ],
    sourceUrl: "https://www.apollo-gs.com/product-page/kdk-count-ct-cage-clamp-push-in",
  },
  {
    id: "modbus-converter",
    name: "KDK CONVERTER",
    category: "Communication gateway",
    description:
      "Connect serial energy meters to an Ethernet network. This gateway translates Modbus RTU to Modbus TCP/IP, bringing existing meter wiring into a connected system.",
    specifications: [
      { label: "Protocol conversion", value: "Modbus RTU → Modbus TCP/IP" },
      { label: "Meter capacity", value: "Up to 50 Professional-series meters" },
      { label: "Meter connection", value: "Modbus wiring" },
      { label: "DIN-rail width", value: "18 mm (1 module)" },
      { label: "Power supply", value: "5 V DC, included" },
    ],
    sourceUrl: "https://www.apollo-gs.com/product-page/kdk-converter-modbus-rtu-to-modbus-tcp",
  },
];
