import { FaTelegram, FaXTwitter } from "react-icons/fa6";
import { RiKey2Fill } from "react-icons/ri";

const listTask = [
   
]

const DailyTask = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center justify-center px-4 space-y-4">
      {/* <div className="flex h-80 w-full items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm text-3xl">
        
      </div> */}
      <div className="p-6 w-full rounded-2xl bg-[#D9D9D9]/20 backdrop-blur flex flex-col space-y-4">
        <h1 className="text-mainColor text-2xl">Daily credit</h1>
        <div className=" relative h-20 flex">
          <img
            src="/Union.png"
            alt="img"
            className="w-full absolute z-0 h-20"
          />
          <img
            src="/Tower_Red.png"
            alt="img"
            className="relative h-full z-10 translate-x-4 translate-y-1"
          />
          <div className="flex relative z-10 ps-14 pe-4 justify-between items-center h-full w-full">
            <div className="rounded-full p-3 bg-mainColor text-2xl">
              <RiKey2Fill />
            </div>
            <div className="rounded-full p-3 bg-mainColor text-2xl">
              <RiKey2Fill />
            </div>
            <div className="rounded-full p-3 bg-mainColor text-2xl">
              <RiKey2Fill />
            </div>
          </div>
        </div>
        <button className="rounded-lg bg-mainColor px-10 py-2 text-black w-fit self-end text-lg">
          Claim
        </button>
      </div>
      <div className="p-6 w-full rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
        <div className="w-full flex space-x-4 text-xl">
          <FaXTwitter className="text-3xl" />
          <h1>Follow The WeCastle on X</h1>
        </div>
        <button className=" self-end px-10 py-1 bg-[#DDDDDD] rounded-xl text-black mt-2">
          Go
        </button>
      </div>
      <div className="p-6 w-full rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
        <div className="w-full flex space-x-4 text-xl">
          <FaTelegram className="text-4xl" />
          <h1 className=" line-clamp-1">Join The WeCastle community on Telegram</h1>
        </div>
        <button className=" self-end px-10 py-1 bg-[#DDDDDD] rounded-xl text-black mt-2">
          Go
        </button>
      </div>
    </div>
  );
};

export default DailyTask;
