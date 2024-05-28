import { NextPage } from "next";
import { AppProps } from "next/app";
import "@/styles/globals.css";

// The type annotations are removed for JavaScript

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
