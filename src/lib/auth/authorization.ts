import "server-only";

import type { User } from "@supabase/supabase-js";
import type { AppRole } from "@/lib/auth-navigation";
import { createClient } from "@/lib/supabase/server";

export type Viewer =
  | { user: User; role: AppRole }
  | { user: null; role: null };

export async function getViewer(): Promise<Viewer> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return { user: null, role: null };

    return {
      user: data.user,
      role: data.user.app_metadata?.app_role === "admin" ? "admin" : "user",
    };
  } catch {
    return { user: null, role: null };
  }
}
