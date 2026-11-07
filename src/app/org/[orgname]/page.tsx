import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { OrganizationView } from "@/components/organization/organization-view";
import { getPublicOrganization } from "@/features/organizations/public-api.server";

// SSR bloqueante: fetch no-store + notFound() precisam do status HTTP correto.
export const instant = false;

interface OrganizationPageProps {
  params: Promise<{ orgname: string }>;
}

const ORGANIZATION_DESCRIPTION =
  "Organização no Blklight: documentos publicados pela equipe.";

/**
 * Server Component shell for /org/:orgname.
 *
 * The organization is fetched here with a server-safe helper (no apiClient —
 * the session lives in localStorage) so generateMetadata can use the display
 * name and the first copy can be handed to OrganizationView without a second
 * round-trip. A 404 (missing or private-and-not-visible) becomes notFound().
 */
export async function generateMetadata({
  params,
}: OrganizationPageProps): Promise<Metadata> {
  const { orgname } = await params;
  const organization = await getPublicOrganization(orgname);

  if (!organization) {
    return { title: "Organização não encontrada" };
  }

  return {
    title: organization.name,
    description: organization.description ?? ORGANIZATION_DESCRIPTION,
    openGraph: {
      title: organization.name,
      description: organization.description ?? ORGANIZATION_DESCRIPTION,
    },
  };
}

export default async function OrganizationPage({
  params,
}: OrganizationPageProps) {
  const { orgname } = await params;
  const organization = await getPublicOrganization(orgname);

  if (!organization) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
        <OrganizationView
          orgname={orgname}
          initialOrganization={organization}
        />
      </main>
    </>
  );
}
