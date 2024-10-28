import React from "react";
import Container from "../component/Container";
import ModuleBtn from "../component/ModuleBtn";
import {
  HiCircleStack,
  HiComputerDesktop,
  HiDocumentDuplicate,
} from "react-icons/hi2";

const DashboardPage = () => {
  return (
    <section className="my-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4">
          <div className="col-span-1 row-span-1">
            <ModuleBtn
              name={"Product Module"}
              icon={<HiCircleStack className="size-12" />}
              url={"/product"}
            />
          </div>
          <div className="col-span-1 row-span-1">
            <ModuleBtn
              name={"Sale Module"}
              icon={<HiComputerDesktop className="size-12" />}
              url={"/sale"}
            />
          </div>
          <div className="col-span-1 row-span-1">
            <ModuleBtn
              name={"Voucher Module"}
              icon={<HiDocumentDuplicate className="size-12" />}
              url={"/voucher"}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DashboardPage;
