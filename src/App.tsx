import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'routers';
// import { ToastContainer } from 'react-toastify';
import './assets/fonts/Fonts.css';
import useStore from 'store/useStore';
import GlobalStyles from 'assets/styles/GlobalStyles';
import ScrollToTop from 'components/ScrollToTop';
import Loading from 'components/Loading';

const App = () => {
  const { isLoading } = useStore();

  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRouter />
      <ScrollToTop />
      {/* <ToastContainer /> */}
      <Loading isVisible={isLoading} />
    </BrowserRouter>
  );
};

export default App;
