import { Redirect, Slot } from "expo-router";
import React from "react";

const _layout = () => {
  const isAuthenticated = false;
  if (!isAuthenticated) return <Redirect href="/sign_in" />;
  return <Slot />;
};

export default _layout;
