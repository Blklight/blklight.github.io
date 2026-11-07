"use client";

import { userScopedKey } from "@/lib/user-storage";
import { createDocumentDesignStore } from "./create-document-design-store";

export const useDocumentDesignStore = createDocumentDesignStore({
  name: userScopedKey("blklight-document-design"),
});
