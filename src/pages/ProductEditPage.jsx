import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import ProductEditCard from "../component/ProductEditCard";

const ProductEditPage = () => {
  const breadcrumbPaths = [
    { name: "Products", href: "/product" },
    { name: "Edit Product", href: "/product/edit" },
  ];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <ProductEditCard />
      </Container>
    </section>
  );
};

export default ProductEditPage;
