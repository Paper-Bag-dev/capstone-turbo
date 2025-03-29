import { useRouter, useSearchParams } from "next/navigation";
import AddDevicePopup from "../common/modals/AddDevice";
import AddLocationPopup from "../common/modals/AddLocation";
import { Suspense } from "react";

const DashboardPopups = ({
  locRefresh,
  setLocRefresh,
  router,
  pathname,
}: {
  locRefresh: boolean;
  setLocRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  router: ReturnType<typeof useRouter>;
  pathname: string;
}) => {
  const searchParams = useSearchParams();
  const show = searchParams.get("show");
  const loc = searchParams.get("loc");
  return (
    <Suspense fallback={<p>Loading PopUps...</p>}>
      <AddDevicePopup
        show={show}
        refresh={locRefresh}
        backFn={() => router.push(`${pathname}/?show=false`)}
      />
      <AddLocationPopup
        show={loc}
        setLocRefresh={setLocRefresh} // ✅ Now properly passed
        backFn={() => router.push(`${pathname}/?loc=false`)}
      />
    </Suspense>
  );
};

export default DashboardPopups;
