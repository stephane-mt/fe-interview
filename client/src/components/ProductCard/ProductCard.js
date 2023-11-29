import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import React, { useRef } from "react";

function Date({ children }) {
  return <Moment format="MMM D YYYY HH:mm a">{children}</Moment>;
}

function ProductCard({ params }) {
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const locationIsOverflowing =
    locationRef?.current?.offsetWidth < locationRef?.current?.scrollWidth;
  const dateIsOverflowing =
    dateRef?.current?.offsetWidth < dateRef?.current?.scrollWidth;

  return (
    <Card>
      <Link to={`/categories/${params.category}/${params._id}/details`}>
        <Card.Img variant="top" src={params.image} />
        <Card.Body>
          <Card.Title>{params.title}</Card.Title>
          <Card.Text>{params.price.toFixed(2)}€</Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer>
        {params?.city && (
          <OverlayTrigger
            show={!locationIsOverflowing ? false : undefined}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${params.addedAt}`}>{params.city}</Tooltip>
            }
          >
            <small className="text-muted text-ellipsis" ref={locationRef}>
              <strong>Location: </strong>
              {params.city}
            </small>
          </OverlayTrigger>
        )}
        {params?.addedAt && (
          <OverlayTrigger
            show={!dateIsOverflowing ? false : undefined}
            placement="top"
            overlay={
              <Tooltip id={`tooltip-${params.addedAt}`}>
                <Date>{params.addedAt}</Date>
              </Tooltip>
            }
          >
            <small className="text-muted text-ellipsis" ref={dateRef}>
              <strong>Posted: </strong>
              <Date>{params.addedAt}</Date>
            </small>
          </OverlayTrigger>
        )}
      </Card.Footer>
    </Card>
  );
}

export default ProductCard;
