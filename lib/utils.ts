import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(
  address: string,
  truncateLength: number
): string {
  const length = address.length - 2;
  if (length <= truncateLength) {
    return address;
  }
  return `0x${address.slice(2, 2 + truncateLength)}...${address.slice(
    length + 2 - truncateLength
  )}`;
}
