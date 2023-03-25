import AboutUs from "../components/AboutUs";
import Products from '../components/products/index'
import ProductViewModal from "../components/products/ProductViewModal";
import SlideShow from "../components/SlideShow";
import TailwindToaster from '../components/common/TailwindToaster'

const Home = () => {

  return (
    <>
     <SlideShow/>
     <Products/>
     <ProductViewModal/>
     <TailwindToaster/>
     <AboutUs/>     
    </>
  );
};

export default Home;
