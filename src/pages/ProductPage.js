import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import ProductReviews from "../components/ProductReviews";
import ProductView from "../components/ProductView";

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
