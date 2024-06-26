import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import menuQuery from "@/graphql/menu";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/utils/reduxProvider";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default  function RootLayout({ children }) {

  // const mainmenu =  menuQuery(); 
  // const { menu } = mainmenu?.data
  

  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.css"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.css"/>
      <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>
    
    <script src={process.env.BASE_URL+"/script.js"} defer />
    
      </head>
      <body className={inter.className}>
        <ReduxProvider>
         <Header  />
          {children}
         <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
