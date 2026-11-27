"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ImageUp, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { RequireAuth } from "@/components/require-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { updateMyProfile } from "@/features/profile/api";
import { profileKeys, useCurrentProfile } from "@/features/profile/queries";
import {
  IMAGE_ACCEPT,
  uploadWithToast,
  useUploadToast,
} from "@/features/uploads/api";
import { logout } from "@/lib/session";
import { useAuthStore } from "@/store/useAuthStore";

/** Profile photo: upload a file (square WebP of at most 512px, made by the API) or use an external URL. */
function AvatarSection({ username }: { username: string }) {
  const t = useTranslations("account");
  const queryClient = useQueryClient();
  const { data: profile } = useCurrentProfile(true);
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadToast = useUploadToast("photo");

  const save = async (avatarUrl: string | null, success?: string) => {
    setBusy(true);
    try {
      await updateMyProfile({ avatarUrl });
      await queryClient.invalidateQueries({ queryKey: profileKeys.me() });
      setUrl("");
      if (success) toast.success(success);
    } catch {
      toast.error(t("photoSaveError"));
    } finally {
      setBusy(false);
    }
  };

  const upload = async (file: File) => {
    setBusy(true);
    const uploaded = await uploadWithToast(file, "avatar", uploadToast);
    if (uploaded) await save(uploaded.url);
    else setBusy(false);
  };

  const validUrl = /^https?:\/\/\S+$/.test(url.trim());

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start">
      <Avatar className="size-24 rounded-xs">
        <AvatarImage
          src={profile?.avatarUrl ?? undefined}
          alt=""
          className="rounded-xs"
        />
        <AvatarFallback className="rounded-xs text-2xl">
          {username.slice(0, 1).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col gap-2">
        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_ACCEPT}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void upload(file);
          }}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="rounded-xs"
            disabled={busy}
            onClick={() => fileInput.current?.click()}
          >
            <ImageUp className="size-4" />
            {busy ? t("saving") : t("uploadPhoto")}
          </Button>
          {profile?.avatarUrl && (
            <Button
              variant="ghost"
              className="rounded-xs"
              disabled={busy}
              onClick={() => void save(null, t("photoRemoved"))}
            >
              {t("remove")}
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder={t("urlPlaceholder")}
            aria-label={t("urlLabel")}
            disabled={busy}
          />
          <Button
            variant="outline"
            className="rounded-xs"
            disabled={busy || !validUrl}
            onClick={() => void save(url.trim(), t("photoUpdated"))}
          >
            {t("useUrl")}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{t("photoHint")}</p>
      </div>
    </div>
  );
}

function Account() {
  const t = useTranslations("account");
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  const rows: Array<[string, string]> = [
    [t("username"), `@${user.username}`],
    [t("email"), user.email],
    [
      t("roleLabel"),
      user.role === "admin" || user.role === "user"
        ? t(`role.${user.role}`)
        : user.role,
    ],
    [t("onboarding"), user.onboardingComplete ? t("done") : t("pending")],
    [t("session"), t("sessionActive")],
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-12 animate-fade-in">
      <h1 className="font-sans text-4xl font-bold tracking-tight mb-2">
        {t("title")}
      </h1>
      <p className="text-muted-foreground mb-10">{t("lead")}</p>

      <AvatarSection username={user.username} />

      <dl className="border-y border-border divide-y divide-border">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm"
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="truncate">{value}</dd>
          </div>
        ))}
      </dl>

      <Button
        variant="outline"
        className="mt-8 rounded-xs"
        onClick={async () => {
          await logout();
          router.replace("/");
        }}
      >
        <LogOut className="size-4" />
        {t("signOut")}
      </Button>
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <Navbar />
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative z-0 min-h-[calc(100dvh-4.125rem)]">
        <TextureOverlay texture="grid" className="mix-blend-overlay" />
        <div className="relative z-10">
          <Account />
        </div>
      </section>
    </RequireAuth>
  );
}
