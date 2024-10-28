import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import ProductCreateCard from "../component/ProductCreateCard";

const ProductCreatePage = () => {
  const breadcrumbPaths = [
    { name: "Products", href: "/product" },
    { name: "Create Product", href: "/product/create" },
  ];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <ProductCreateCard />
      </Container>
    </section>
  );
};

export default ProductCreatePage;
