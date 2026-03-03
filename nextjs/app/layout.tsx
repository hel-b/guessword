import { Nunito_Sans } from "next/font/google";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

import "./globals.css";
// Font configuration
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});
// Metadata for the application
export const metadata: Metadata = {
  title: "GuessWord",
  description: "Guess the 6 letter word in as few attempts as possible!",
  icons: {
    icon: "/icon.png",
  },
};

// Head theme script
const headThemeScript = `(function() {
  try {
    var isDark = localStorage.getItem('isDark') === 'true';
    document.documentElement.setAttribute('data-theme', isDark ? 'dracula' : 'garden');
  } catch(e) {
    console.error(e);
  }
})();
`.trim();
// Post body parse theme script
const bodyThemeControllerScript = `
(function() {
  try {
    var isDark = localStorage.getItem('isDark') === 'true';
    var checkboxes = document.querySelectorAll('input[type=checkbox].theme-controller');
    
    checkboxes.forEach((el) => {
      el.checked = isDark;
    });
    
    document.documentElement.removeAttribute('data-theme');
  } catch(e) {
    console.error(e);
  }
})();
`.trim();

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={nunitoSans.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headThemeScript }} />
      </head>
      <body className={`${nunitoSans.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: bodyThemeControllerScript }}
        />
      </body>
    </html>
  );
}
