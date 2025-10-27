import "./globals.css";
import Provider from "./Provider";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Muntaha Multi Trade",
  description: "Muntaha Multi Trade is a Online shopping and supporting center. You can order and can get support in many ways from here",
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
