import { useState } from "react";

export const useAnonUserId = (): string => {
  const [id] = useState<string>(() => {
    const key = "anonUserId";
    let v = localStorage.getItem(key);
    if (!v) {
      const rnd =
        (window.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2))
          .replace(/-/g, "")
          .slice(0, 10);
      v = `user_${rnd}`;
      localStorage.setItem(key, v);
    }
    return v;
  });
  return id;
};