import React, { useContext } from "react";
import { Modal, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { usePlayer } from "@/hooks/usePlayer";
import clsx from "clsx";
import { LeaderBoardEvent } from "@/types/Events";
import { AuthenticationContext } from "@/contexts/Authentication";

interface LeaderboardModalProps {
  open: boolean;
  handleClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  open,
  handleClose,
}) => {
  const { getDashboardInfor } = usePlayer();
  const [leaderboard, setLeaderboard] = useState<LeaderBoardEvent[] | null>(
    null
  );
  const { playerInfor } = useContext(AuthenticationContext);

  useEffect(() => {
    if (playerInfor.id.id === "") return;

    const getLeaderboard = async () => {
      const data = await getDashboardInfor(playerInfor.id.id);

      if (!data.events) {
        setLeaderboard([]);
        return;
      }
      const leaderboardData = data.events.map((e) => {
        return e.parsedJson as LeaderBoardEvent;
      });

      setLeaderboard(leaderboardData);
    };

    getLeaderboard();
  }, [playerInfor]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <div className="flex w-3/4 flex-col items-center rounded-lg bg-[#222222] p-6 text-white">
        <h1 className="text-2xl">Leaderboard</h1>
        <table className="w-full border-separate border-spacing-y-1 text-center">
          <thead className="text-lg uppercase text-white table table-fixed w-full">
            <tr>
              <th scope="col" className="py-2">
                Rank
              </th>
              <th scope="col" className="py-2">
                Name
              </th>
              <th scope="col" className="py-2">
                Point
              </th>
            </tr>
          </thead>
          <tbody className=" !max-h-52 overflow-y-scroll block hidden-scroll">
            {leaderboard?.map((row, index) => {
              return (
                <tr
                  key={index}
                  className="rounded-full table table-fixed w-full"
                >
                  <td
                    className={clsx(
                      "rounded-l-lg py-2",
                      index === 0 && "bg-mainColor",
                      index === 1 && "bg-[#FE6363]",
                      index === 2 && "bg-[#C363FE]",
                      index === 3 && "bg-[#7963FE]",
                      index > 3 && "bg-[#DDDDDD]/20"
                    )}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={clsx(
                      "py-2",
                      index === 0 && "bg-mainColor",
                      index === 1 && "bg-[#FE6363]",
                      index === 2 && "bg-[#C363FE]",
                      index === 3 && "bg-[#7963FE]",
                      index > 3 && "bg-[#DDDDDD]/20"
                    )}
                  >
                    {row.name}
                  </td>
                  <td
                    className={clsx(
                      "rounded-r-lg py-2",
                      index === 0 && "bg-mainColor",
                      index === 1 && "bg-[#FE6363]",
                      index === 2 && "bg-[#C363FE]",
                      index === 3 && "bg-[#7963FE]",
                      index > 3 && "bg-[#DDDDDD]/20"
                    )}
                  >
                    {row.point}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default LeaderboardModal;
