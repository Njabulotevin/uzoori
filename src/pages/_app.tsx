"use Client";
import store from "@/app/store";
import Layout from "@/components/molecules/profile/Layout";
import { NoSSR } from "@/components/molecules/NoSSR";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import Protected from "@/components/ProtectedRouted/Protected";
import "animate.css";
import { Provider as JotaiProvider } from "jotai";
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== undefined) {
      const loader = document.getElementById("splash_screen");
      setTimeout(() => {
        if (loader) loader.style.display = "none";
      }, 1000);
    }
  }, []);

  const getContent = () => {
    if (appProps.router.pathname.includes("/account")) {
      return (
        <>
          <JotaiProvider>
            <CustomHead />
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </JotaiProvider>
        </>
      );
    } else if (appProps.router.pathname.includes("/app")) {
      return (
        <>
          <Provider store={store}>
            <CustomHead />
            <JotaiProvider>
              {" "}
              <NoSSR>
                <Protected>
                  <Layout title={"testing"}>
                    <Component {...pageProps} />
                  </Layout>
                </Protected>{" "}
              </NoSSR>
            </JotaiProvider>
          </Provider>
        </>
      );
    } else {
      return (
        <>
          <Provider store={store}>
            {" "}
            <CustomHead />
            <JotaiProvider>
              <NoSSR>
                <Layout title={"testing"}>
                  <Component {...pageProps} />
                </Layout>
              </NoSSR>
            </JotaiProvider>
          </Provider>
        </>
      );
    }
  };

  return <>{getContent()}</>;

  // return<Layout><Component {...pageProps} /></Layout>
}

function CustomHead() {
  return (
    <Head>
      <title>Uzoori</title>
      <meta property="og:title" content="Create account" key="uzoori.app" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Head>
  );
}
