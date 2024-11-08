import { BiSolidCoinStack } from "react-icons/bi";

const Marketplace = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col items-center px-4 space-y-4">
      <h1 className="text-3xl text-white">Marketplace</h1>
      <div className="w-full grid grid-cols-2 gap-4 h-full overflow-y-scroll pb-10 hidden-scroll">
        <div className="col-span-2 w-full rounded-2xl bg-[#D9D9D9]/20 backdrop-blur flex">
          <div className="w-1/2 bg-[#E15050] h-full rounded-lg overflow-hidden">
            <img src="/knight.gif" alt="" className=" scale-150" />
          </div>
          <div className="flex flex-col items-center py-10 px-6 w-1/2">
            <h1 className=" text-mainColor text-xl">The Knight</h1>
            <p className="text-white text-sm">
              Knight of the Web3 Realm, The Ultimate Web3 Loyalty and
              Entertainment App.
            </p>
            <button className="px-10 bg-mainColor rounded mt-2 text-black flex items-center space-x-1">
              <BiSolidCoinStack />
              <p>1M</p>
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
          <div className="bg-[#CD48C0] w-full aspect-square rounded-lg overflow-hidden">
            <img src="/swordman.gif" alt="" className=" scale-150" />
          </div>
          <div className="flex flex-col items-center py-4">
            <h1>The Swordman</h1>
            <button className="px-10 bg-mainColor rounded mt-2 text-black flex items-center space-x-1">
              <BiSolidCoinStack />
              <p>1M</p>
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
          <div className="bg-[#6A91DC] w-full aspect-square rounded-lg overflow-hidden">
            <img src="/soldier.gif" alt="" className=" scale-150" />
          </div>
          <div className="flex flex-col items-center py-4">
            <h1>The Soldier</h1>
            <button className="px-10 bg-mainColor rounded mt-2 text-black flex items-center space-x-1">
              <BiSolidCoinStack />
              <p>1M</p>
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
          <div className="w-full aspect-square rounded-lg flex justify-center items-center">
            <img src="/unknow-hero1.png" alt="" className="w-1/2" />
          </div>
          <div className="flex flex-col items-center py-4">
            <h1>???</h1>
            <button className="px-10 bg-white rounded mt-2 text-black flex items-center space-x-1">
              <BiSolidCoinStack />
              <p>???</p>
            </button>
          </div>
        </div>
        <div className="rounded-2xl bg-[#D9D9D9]/20 backdrop-blur text-white flex flex-col">
          <div className="w-full aspect-square rounded-lg flex justify-center items-center">
            <img src="/unknow-hero2.png" alt="" className="w-1/3" />
          </div>
          <div className="flex flex-col items-center py-4">
            <h1>???</h1>
            <button className="px-10 bg-white rounded mt-2 text-black flex items-center space-x-1">
              <BiSolidCoinStack />
              <p>???</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
