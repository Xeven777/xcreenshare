import JoinPage from "@/components/JoinComponent";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <JoinPage />
    </Suspense>
  );
};

export default page;
