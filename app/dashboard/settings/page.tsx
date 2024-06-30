import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./SettingsCard";

const Settings = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  return <SettingsCard session={session} />;
};
export default Settings;
