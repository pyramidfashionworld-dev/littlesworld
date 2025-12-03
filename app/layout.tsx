import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Little's World",
  description: "Baby and Kids Clothing Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}