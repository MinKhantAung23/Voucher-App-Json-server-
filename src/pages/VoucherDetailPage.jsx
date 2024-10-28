import React from "react";
import Container from "../component/Container";
import Breadcrumb from "../component/Breadcrumb";
import VoucherCard from "../component/VoucherCard";

const VoucherDetailPage = () => {
  const breadcrumbPaths = [
    { name: "Voucher List", href: "/voucher" },
    { name: "Voucher Detail" },
  ];
  return (
    <section>
      <Container>
        <Breadcrumb paths={breadcrumbPaths} />
        <VoucherCard />
      </Container>
    </section>
  );
};

export default VoucherDetailPage;
