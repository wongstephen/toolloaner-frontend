import React, { useEffect, useState } from "react";

import { getUserToolsApi } from "../api/axiosApi";

import { FeedItemSkeleton } from "./FeedItemSkeleton";
import { AppTitle } from "./AppTitle";
import { FeedItem } from "./FeedItem";
import { FeedMenu } from "./FeedMenu";
import { FeedSearch } from "./FeedSearch";
import { PageTemplate } from "./PageTemplate";

export const Feed = () => {
  const [feedData, setFeedData] = useState([]);

  // TODO: Search Input
  const [searchData, setSearchData] = useState("");
  const [searcInput, setSearchInput] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const token = await localStorage.getItem("token");
      const data = await getUserToolsApi(token);
      // ! remove later
      // console.log(data);
      setFeedData(data);
    };
    getItems();
  }, []);

  return (
    <PageTemplate>
      <FeedMenu setfeedData={setFeedData} />

      <FeedSearch />

      {/* checkout feed */}
      <ul className="flex flex-col justify-between gap-2.5 ">
        <li>
          <h2
            className="text-lg font-medium tracking-wider text-left "
            onClick={() => console.log(feedData)}
          >
            Loaned Out
          </h2>
        </li>
        <li className="flex items-center gap-5">
          <p className="text-sm font-normal tracking-wider ">Sort By</p>
          <button className="text-xs font-light tracking-wider p-2.5 bg-gray-500/10 rounded-md">
            Tool Name
          </button>
          <button className="text-xs font-light p-2.5 tracking-wider  bg-gray-500/10 rounded-md">
            Borrower
          </button>
        </li>
        {feedData.length > 0 ? (
          feedData
            .filter((tool) => {
              return tool.loanee;
            })
            .sort((toola, toolb) => (toola.name > toolb.name ? 1 : -1))
            .map((tool) => <FeedItem key={tool.id} feed={tool} />)
        ) : (
          <>
            <FeedItemSkeleton />
            <FeedItemSkeleton />
            <FeedItemSkeleton />
            <FeedItemSkeleton />
            <FeedItemSkeleton />
            <FeedItemSkeleton />
          </>
        )}
      </ul>
    </PageTemplate>
  );
};
