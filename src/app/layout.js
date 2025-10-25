import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Muntaha Online Shop",
  description: "Muntaha Online Shop is a Online shopping center. You can order many product from here",
  icons: {
    icon: '/my-logo.jpg '
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <Provider>
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
