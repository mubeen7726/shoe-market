import './globals.css';  
import ReduxProvider from './ReduxProvider'; 
import Navbar from './components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';


export const metadata = {
  title: "Shoe Store",
  description: "A Next.js e-commerce shoe store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <Footer/>
      </body>
    </html>
  );
}
