import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(
  address: string | undefined,
  truncateLength: number
): string {
  if (!address) return "";

  const length = address.length - 2;
  if (length <= truncateLength) {
    return address;
  }
  return `0x${address.slice(2, 2 + truncateLength)}...${address.slice(
    length + 2 - truncateLength
  )}`;
}
