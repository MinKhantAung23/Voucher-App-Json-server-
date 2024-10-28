import React from "react";
import Container from "./Container";

const Header = () => {
  return (
    <header className="py-3">
      <Container>
        <h1 className="text-2xl font-bold ">Voucher App</h1>
        <p className="text-stone-500">MMS Solutions</p>
      </Container>
    </header>
  );
};

export default Header;
