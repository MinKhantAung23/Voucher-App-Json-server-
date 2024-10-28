import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import VoucherList from "../component/VoucherList";

const VoucherPage = () => {
  const breadcrumbPaths = [{ name: "Vouchers", href: "/voucher" }];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <VoucherList />
      </Container>
    </section>
  );
};

export default VoucherPage;
