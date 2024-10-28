import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import ProductList from "../component/ProductList";

const ProductPage = () => {
  const breadcrumbPaths = [{ name: "Products", href: "/products" }];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <ProductList />
      </Container>
    </section>
  );
};

export default ProductPage;
