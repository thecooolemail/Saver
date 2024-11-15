import "../app/styles/globals.css";
import localFont from '@next/font/local'



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



const Normal = localFont({
  src: '../../public/Fonts/SfPro/SF-Pro.woff2',
  variable: '--fontfamily',
  weight: '300',
  display: 'swap',
})
 




export default function RootLayout({ children }) {


  
  return (
    <html lang="en" className={Normal.className}>
      <body>{children}</body>
    </html>
  );
}


