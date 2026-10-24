import { Hero } from "./_components/landing/hero";
import { Story } from "./_components/story/story";
import { Features } from "./_components/landing/features";
import { Sources } from "./_components/landing/sources";
import { FinalCta } from "./_components/landing/final-cta";
import { ProfilePanel } from "./_components/live/account-panels";
import { redirect } from "next/navigation";
import { landingAuthRedirect } from "@/lib/auth-navigation";
export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const authRedirect = landingAuthRedirect(await searchParams);
  if (authRedirect) redirect(authRedirect);
  return <main id="main-content">
    <Hero />
    <Story />
    <Features />
    <Sources />
    <section className="wrap account-section" id="account" aria-label="Tài khoản của bạn"><ProfilePanel /></section>
    <FinalCta />
  </main>;
}
