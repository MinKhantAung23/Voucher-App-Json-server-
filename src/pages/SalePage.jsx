import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import VoucherInfo from "../component/VoucherInfo";

const SalePage = () => {
  const breadcrumbPaths = [{ name: "Sales", href: "/sale" }];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <VoucherInfo />
      </Container>
    </section>
  );
};

export default SalePage;
