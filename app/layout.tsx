export const metadata = {
  title: "DealWatch",
  description: "Global price comparison made simple"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, sans-serif",
          background: "#fff"
        }}
      >
        {children}
      </body>
    </html>
  );
}
