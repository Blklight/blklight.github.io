import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ProfileView } from "@/components/profile/profile-view";
import { getPublicProfile } from "@/features/documents/public-api.server";

// params e dados são aguardados fora de <Suspense>; sem isto o build falha na validação do shell.
// O shell do layout já foi enviado, então notFound() responde 200 com noindex, não 404.
export const instant = false;

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

const PROFILE_DESCRIPTION =
  "Perfil público, documentos publicados e informações do autor.";

/**
 * Server Component shell for /:username.
 *
 * The profile itself is fetched here with the same server-safe helper the
 * document read route uses (no apiClient — the session lives in
 * localStorage), which gives generateMetadata a real display name and hands
 * the first copy to ProfileView. That copy has no session attached, so
 * ProfileView revalidates with the Bearer token before it decides whether a
 * private profile is viewable; the split is what keeps an accepted follower
 * from being shown the redacted anonymous view.
 */
export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getPublicProfile(username);

  if (!profile) {
    return { title: "Perfil não encontrado" };
  }

  const label = profile.displayName || profile.username;

  return {
    title: profile.displayName
      ? `${label} (@${profile.username})`
      : `@${username}`,
    description: profile.bio ?? PROFILE_DESCRIPTION,
    openGraph: {
      title: label,
      description: profile.bio ?? PROFILE_DESCRIPTION,
      ...(profile.avatarUrl ? { images: [profile.avatarUrl] } : {}),
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = await getPublicProfile(username);

  // The backend answers 404 only for a user/profile that does not exist or was
  // soft-deleted. A private profile resolves 200 with a redacted body, so a
  // 404 here means "no such profile", never "not allowed to see".
  if (!profile) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
        {/*
          The whole ProfilePublic is handed down, and the view deliberately
          renders neither `bioPrivate` nor `socialLinks`. Note the backend only
          redacts `bio`/`socialLinks` for a blocked private profile, so
          `bioPrivate` still travels to the client in the RSC payload and in the
          browser's own /profiles/:username response — that leak is a backend
          gap, tracked separately; suppressing the copy here would only hide it
          from view, not from the network.
        */}
        <ProfileView username={username} initialProfile={profile} />
      </main>
    </>
  );
}
