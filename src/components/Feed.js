import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { AuthContext } from "../hooks/AuthContext";

import { AddItemBtn } from "./AddItemBtn";
import { FeedItem } from "./FeedItem";
import { getUserToolsApi } from "../api/axiosApi";

export const Feed = () => {
  const { hasUser } = useContext(AuthContext);
  const [feedData, setfeedData] = useState([]);

  useEffect(() => {
    getUserToolsApi(setfeedData, hasUser.token);
  }, []);

  return (
    <main className="feed__container">
      <h1 className="feed__title">Tool Library</h1>
      <h2 className="feed__title-section" onClick={() => console.log(feedData)}>
        Checked Out
      </h2>
      <ul className="feed__layout">
        {feedData.length > 0 &&
          feedData.map((tool) => <FeedItem key={tool.id} feed={tool} />)}
      </ul>
      <div className="feed__container-addBtn">
        <AddItemBtn />
      </div>
    </main>
  );
};
