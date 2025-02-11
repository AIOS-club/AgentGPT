import { type ReactNode } from "react";
import Head from "next/head";
import DottedGridBackground from "../components/DottedGridBackground";
import clsx from "clsx";
import Script from "next/script";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const DefaultLayout = (props: LayoutProps) => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-[#2B2B2B] to-[#1F1F1F]">
      <DottedGridBackground className={clsx("min-h-screen", props.className)}>
        {props.children}
      </DottedGridBackground>
    </div>
  );
};

export default DefaultLayout;
