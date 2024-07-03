import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import CreateProductForm from "./CreateProductForm";

const AddProduct = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return <CreateProductForm />;
};
export default AddProduct;
