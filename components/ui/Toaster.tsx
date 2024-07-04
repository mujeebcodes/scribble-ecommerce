"use client";

import { Toaster as CustomToaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";

const Toaster = () => {
  const { theme } = useTheme();
  if (typeof theme === "string") {
    return (
      <CustomToaster
        richColors
        theme={theme as "light" | "dark" | "system" | undefined}
      />
    );
  }
};
export default Toaster;
