import Navbar from "./Navbar";

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <div className="w-full">
    {/* <Navbar/> */}
    {children}
    </div>
  );
}