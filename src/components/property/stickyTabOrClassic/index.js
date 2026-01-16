"use client";

import React, { useEffect, useState } from "react";
import { Container, Row } from "reactstrap";
import ContactInfo from "../../../layout/sidebarLayout/ContactInfo";
import Featured from "../../../layout/sidebarLayout/Featured";
import RecentlyAdded from "../../../layout/sidebarLayout/RecentlyAdded";
import Sidebar from "../../../layout/sidebarLayout/Sidebar";
import NoSsr from "../../../utils/NoSsr";
import SinglePropertySection from "./SingleProperty";
import SliderBreadcrumbSection from "./SliderBreadcrumb";

const BodyContent = ({ side, id }) => {
  const [data, setData] = useState(null);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  useEffect(() => {
    if (!id) return;

    fetch(`${SITE_URL}/Professionals/${id}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error("Error fetching data:", err));
  }, [id]);

  return (
    <NoSsr>
      <SliderBreadcrumbSection property={data} />
      <section className="single-property">
        <Container>
          <Row className="ratio_65">
            <Sidebar mortgage={true} side={side} singleProperty={true}>
              {data && (
                <ContactInfo
                  contact={data}
                  designerId={data.id}
                  designerName={data.businessName}
                  designerCatagory={data.professionType}
                />
              )}

              <RecentlyAdded recentdata={data?.similarProfessionals} />
            </Sidebar>
            <SinglePropertySection property={data} />
          </Row>
        </Container>
      </section>
    </NoSsr>
  );
};

export default BodyContent;
