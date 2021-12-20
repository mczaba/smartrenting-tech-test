import React from "react";
import { useLocation } from "react-router";
import dayjs from 'dayjs'

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { token, setToken } = useAppContext();
  const location = useLocation();

  if (token) {
    return null;
  }

  //const matchedToken = /(?:\?|&)token=([^=&]*)(?:&?)/gi.exec(location.search);
  const matchedToken = JSON.parse(localStorage.getItem('token'))
  if (!matchedToken) return null
  if (dayjs().isBefore(dayjs(matchedToken.expireDate))) setToken(matchedToken.token)
  else localStorage.removeItem('token')

  return null;
}
