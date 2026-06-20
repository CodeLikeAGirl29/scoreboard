import "./globals.css";

export const metadata = {
  title: "Scoreboard",
  description: "Team Treehouse Scoreboard, rebuilt in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
