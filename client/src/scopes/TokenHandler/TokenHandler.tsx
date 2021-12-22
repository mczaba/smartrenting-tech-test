import React from "react";
import dayjs from 'dayjs'

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { token, setToken } = useAppContext();
  const { userId, setUserId } = useAppContext();

  if (token) {
    return null;
  }

  //const matchedToken = /(?:\?|&)token=([^=&]*)(?:&?)/gi.exec(location.search);
  const matchedToken = JSON.parse(localStorage.getItem('token'))
  if (!matchedToken) return null
  if (dayjs().isBefore(dayjs(matchedToken.expireDate))) {
    console.log(matchedToken)
    setToken(matchedToken.token)
    setUserId(matchedToken.userId)
  }
  else localStorage.removeItem('token')

  return null;
}
