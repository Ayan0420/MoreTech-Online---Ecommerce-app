import { Container } from "react-bootstrap";
import AppNavBar from "../components/AppNavbar";
import ProductView from "../components/ProductView";
import ProductReviews from "../components/ProductReviews";
import Footer from "../components/Footer";

export default function ProductPage() {
  return (
    <>
        <Container className="mt-4">
            <ProductView />
            <ProductReviews />
        </Container>
        <Footer />
    </>
  )
}
