import { Hero } from "@/types/Hero";

export const MODULE_ADDRESS =
  "15edafe62e1fe3403500f9ba243b49cbf29870951d965a4a1fdc40e864ba0c8f";

export const heros: Hero[] = [
  {
    id: 0,
    name: "The Knight",
    description:
      "Knight of the Web3 Realm, The Ultimate Web3 Loyalty and Entertainment App.",
    image: "/knight.gif",
    price: 100,
    is_valid: true,
  },
  {
    id: 1,
    name: "The Swordman",
    description:
      "Knight of the Web3 Realm, The Ultimate Web3 Loyalty and Entertainment App.",
    image: "/swordman.gif",
    price: 100,
    is_valid: true,
  },
  {
    id: 2,
    name: "The Soldier",
    description:
      "Knight of the Web3 Realm, The Ultimate Web3 Loyalty and Entertainment App.",
    image: "/soldier.gif",
    price: 100,
    is_valid: false,
  },
];
