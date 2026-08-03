import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

export function generateAvatarSvg(seed: string): string {
  const avatar = createAvatar(lorelei, {
    seed,
    backgroundColor: ["f8f8f8"],
  });
  return avatar.toString();
}

export function generateAvatarDataUrl(seed: string): string {
  const svg = generateAvatarSvg(seed);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
