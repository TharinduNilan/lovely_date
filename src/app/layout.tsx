import "./globals.css";

export const metadata = {
  title: "Lovely Date 💖",
  description: "A romantic date planner app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}