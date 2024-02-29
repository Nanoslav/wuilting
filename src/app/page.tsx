import React from "react";
import WuiltingMain from "@/app/components/wuilting/WuiltingMain";
import Link from "next/link";

export default function Home() {

    return (
      <main className={'w-full h-full flex justify-center items-center'} >
          <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.25/10 z-10 min-w-4/10'}>
              <h2 className='text-center text-2.5 font-bold'>🌟 Wuilting ✨</h2>
              <div className='flex flex-row items-center justify-between w-full'>
                  <button className="btn text-1 w-3/10" title={'Leaderboard'}>
                      💫 Leaderboard</button>
                  <button className="btn text-1 w-3/10" title={'Top Wuilters'}>
                      🥇 Top Wuilters</button>
                  <Link href={"/history"} title={"History"} className="btn text-1 w-3/10">📜 History</Link>
              </div>

              <WuiltingMain />

          </div>
      </main>
    );
}
