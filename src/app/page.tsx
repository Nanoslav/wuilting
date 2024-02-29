import React from "react";
import {WuiltingInput} from "@/app/components/form/WuiltingInput";
import WuiltingMain from "@/app/components/wuilting/WuiltingMain";

export default function Home() {

    return (
      <main className={'w-full h-full flex justify-center items-center'} >
          <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 min-w-4/10'}>
              <h2 className='text-center text-2.5 font-bold'>🌟 Wuilting ✨</h2>
              <div className='flex flex-row items-center justify-between w-full'>
                  <button className="btn text-1.25 w-3/10">
                      {/*<FontAwesomeIcon icon={faRankingStar}/>*/}
                      Leaderboard</button>
                  <button className="btn text-1.25 w-3/10">
                      {/*<FontAwesomeIcon icon={faStar} /> */}
                      Top Wuilters</button>
                  <button className="btn text-1.25 w-3/10">
                      {/*<FontAwesomeIcon icon={faClockRotateLeft} />*/}
                      History</button>
              </div>

              <WuiltingMain />

          </div>
      </main>
    );
}
