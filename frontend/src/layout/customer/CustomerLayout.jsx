import { Outlet } from "react-router-dom";
import Header from "../../components/customer/header";
import Footer from "../../components/customer/footer";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Mireille';
    src: url('../../fonts/Demo-Mireille/Fontspring-DEMO-mireille-medium.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: 'Mireille', sans-serif;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <CustomerLayout />
    </>
  );
}


export default function CustomerLayout() {
  return (
    <div>
      {/* <div>Customer Page</div> */}
      {/* Content */}
      <Outlet />
      <Footer />
    </div>
  );
}
