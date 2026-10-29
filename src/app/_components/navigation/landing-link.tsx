"use client";
import type { ComponentProps } from "react";
import { useLandingAnchor } from "@/hooks/use-landing-navigation";

type Props = Omit<ComponentProps<"a">, "href" | "onClick"> & { section: string };
export function LandingLink({ section, ...props }: Props) {
  const navigation = useLandingAnchor(section);
  return <a {...props} {...navigation} />;
}
