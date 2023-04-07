import { Container } from "react-bootstrap";
import AppNavBar from "../components/AppNavbar";
import ProductView from "../components/ProductView";
import { useState } from "react";

export default function ProductPage() {
  return (
    <>
        <AppNavBar />
        <Container className="mt-4">
            <ProductView />
        </Container>
    </>
  )
}
