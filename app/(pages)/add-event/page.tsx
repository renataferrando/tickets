/* eslint-disable */
"use client";
import UploadEventForm from "@/app/components/admins/upload-event";
import Page from "@/app/components/common/page";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";
import { useGetProfileQuery } from "@/services/userService.ts";

const AddEventPage = () => {
  const { data: profile } = useGetProfileQuery(null);
  return (
    <Page className="flex justify-center items-center bg-cover bg-no-repeat bg-right bg-[url('https://res.cloudinary.com/dtvkdwnoa/image/upload/v1735004291/sky-1441936_1280_ot2wen.jpg')]">
      <div className="w-full absolute top-0 left-0 h-full backdrop-blur-lg "></div>
      <div className="w-full flex flex-col items-center h-full justify-center z-10 text-gray-900">
        <div className="2xl:min-w-[900px] min-w-[700px] grid w-[70%] border rounded-xl border-white-200 grid-cols-[40%_1fr] min-h-[500px] z-10">
          <div className="rounded-l-xl bg-auto bg-no-repeat bg-center bg-[url('https://res.cloudinary.com/dtvkdwnoa/image/upload/v1734988102/music-7238254_1280_iw7g7k.jpg')]"></div>
          <div className="bg-slate-100 rounded-r-xl p-6 flex w-full items-center flex-col">
            <Link href="my-events" className="self-end">
              <CloseRoundedIcon className="text-gray-500 font-thin m-1 cursor-pointer" />
            </Link>
            <h3 className="text-xl font-semibold mb-1">
              Create your next event
            </h3>

            <UploadEventForm user={profile?.user} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AddEventPage;
