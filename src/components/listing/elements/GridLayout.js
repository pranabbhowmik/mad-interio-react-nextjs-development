// GridLayout.js
import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import PropertyBox from "../../elements/propertyBoxs/PropertyBox";

const GridLayout = ({
  value,
  grid,
  listSize,
  relativeSlider,
  video,
  infiniteScroll,
  myList,
  gridDispatch,
}) => {
  return (
    <Fragment>
      <Row
        className={`property-2 column-sm zoom-gallery property-label property-grid ${
          grid.gridStyle === "list-view" ? "list-view" : ""
        }`}
      >
        {value && value.length > 0 ? (
          value.map((data, i) => (
            <Col
              key={i}
              sm={
                grid.gridStyle === "grid-view" &&
                (grid.gridSize === 3 || 4) &&
                "6"
              }
              md={grid.gridStyle === "list-view" && "12"}
              lg={
                grid.gridStyle === "grid-view" &&
                ((grid.gridSize === 2 && "6") ||
                  ((grid.gridSize === 3 || 4) && "4"))
              }
              xl={grid.gridStyle === "list-view" && listSize === 2 && "6"}
              xxl={grid.gridStyle === "grid-view" && grid.gridSize === 4 && "3"}
              className={`${
                grid.gridStyle === "list-view" ? "list-view" : ""
              } wow fadeInUp grid-view `}
            >
              <PropertyBox
                data={data}
                relativeSlider={relativeSlider}
                video={video}
              />
            </Col>
          ))
        ) : (
          <p className="text-center">No professionals found.</p>
        )}
      </Row>
    </Fragment>
  );
};

export default GridLayout;
