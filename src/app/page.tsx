import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { landingAuthRedirect } from "@/lib/auth-navigation";
import { SiteHeader } from "./_components/navigation/site-header";
import { SiteFooter } from "./_components/navigation/site-footer";
import { Hero } from "./_components/landing/hero";
import { Story } from "./_components/story/story";
import { Features } from "./_components/landing/features";
import { Sources } from "./_components/landing/sources";
import { FinalCta } from "./_components/landing/final-cta";
import { ProfilePanel } from "./_components/live/account-panels";
import { LandingDemoToolbar } from "./_components/demo/landing-toolbar";

export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const authRedirect = landingAuthRedirect(await searchParams);
  if (authRedirect) redirect(authRedirect);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect("/app");
  return <>
    <SiteHeader />
    <LandingDemoToolbar />
    <main id="main-content">
      <Hero />
      <Story />
      <Features />
      <Sources />
      <section className="wrap account-section" id="account" aria-label="Tài khoản của bạn"><ProfilePanel /></section>
      <FinalCta />
    </main>
    <SiteFooter />
  </>;
}
