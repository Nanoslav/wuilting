import React from "react";
import WuiltingMain from "@/app/components/wuilting/WuiltingMain";
import Link from "next/link";
import {database, databases} from "@/app/lib/appwrite";
import {Query} from "appwrite";

export default async function Home() {

    const fetchedWuiltings: any = await databases.listDocuments(database, 'wuilting', [Query.orderDesc("$updatedAt"), Query.limit(5)]);

    return (
      <main className={'w-full flex justify-center items-center h-9.5/10'} >
          <div className={'bg-base-100 rounded-md flex flex-col gap-[1dvw] p-0.5/10 lg:p-0.25/10 z-10 w-9/10 sm:w-8/10 md:w-7/10 lg:w-4/10'}>
              <h1 className='text-center text-7.5 md:text-4 sm:text-4 lg:text-2.5 font-bold'>🌟 Wuilting ✨</h1>
              <div className='flex flex-row items-center justify-between w-full'>
                  <button className="btn sm:text-2 md:text-1.5 lg:text-1 w-3/10" title={'Leaderboard'}>
                      💫 Leaderboard</button>
                  <button className="btn sm:text-2 md:text-1.5 lg:text-1 w-3/10" title={'Top Wuilters'}>
                      🥇 Top Wuilters</button>
                  <Link href={"/history"} title={"History"} className="btn sm:text-2 md:text-1.5 lg:text-1 w-3/10">📜 History</Link>
              </div>

              <WuiltingMain fetchedWuiltings={fetchedWuiltings} />

          </div>
      </main>
    );
}
