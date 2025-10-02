import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    ListGroup,
    Carousel,
} from "react-bootstrap";

const ShareDetails = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/${id}`);
            setData(res.data.data);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Failed to get properties");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return (
            <Container className="mt-5 text-center">
                <h4>Loading...</h4>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white">
                    <h3>{data.propertyTitle}</h3>
                    <small>{data.address}</small>
                </Card.Header>

                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Zone:</strong> {data.zone}</Col>
                                        <Col><strong>Project:</strong> {data.project}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Transaction Type:</strong> {data.transactionType}</Col>
                                        <Col><strong>Property Type:</strong> {data.propertyType}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Availability Status:</strong> {data.availabilityStatus}</Col>
                                        <Col><strong>Size:</strong> {data.size} m²</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Bedrooms:</strong> {data.bedrooms}</Col>
                                        <Col><strong>Bathrooms:</strong> {data.bathrooms}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Floors:</strong> {data.floors}</Col>
                                        <Col><strong>Floor Number:</strong> {data.floorNumber}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Furnishing:</strong> {data.furnishing}</Col>
                                        <Col><strong>Year Built:</strong> {data.yearBuilt}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Orientation:</strong> {data.orientation}</Col>
                                        <Col><strong>View:</strong> {data.view}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Parking:</strong> {data.parkingAvailability}</Col>
                                        <Col><strong>Pet Policy:</strong> {data.petPolicy}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Price:</strong> {data.price} {data.currencyType}</Col>
                                        <Col><strong>Contract Terms:</strong> {data.contractTerms}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Deposit Terms:</strong> {data.depositPaymentTerms}</Col>
                                        <Col><strong>Maintenance Fee:</strong> {data.maintenanceFee}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Available From:</strong> {new Date(data.availableFrom).toLocaleDateString()}</Col>
                                        <Col><strong>Date Listed:</strong> {data.dateListed}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Auto Expiry:</strong> {data.autoExpiryDate}</Col>
                                        <Col><strong>Developer Name:</strong> {data.developerName}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Land Use Type:</strong> {data.landUseType}</Col>
                                        <Col><strong>Incentives/Promotions:</strong> {data.incentivesPromotions}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col><strong>Multi-language Support:</strong> {data.multiLanguageSupport}</Col>
                                        <Col><strong>Highlighted:</strong> {data.highlighted ? "Yes" : "No"}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                    </Row>

                    <Row className="mt-4">
                        <Col>
                            <h5>Description</h5>
                            <p>{data.description}</p>
                        </Col>
                    </Row>

                    {data.propertyImages?.length > 0 && (
                        <Row className="mt-4">
                            <Col>
                                <h5>Gallery</h5>
                                <Carousel>
                                    {data.propertyImages.map((img, i) => (
                                        <Carousel.Item key={i}>
                                            <img
                                                className="d-block w-100"
                                                src={img}
                                                alt={`slide-${i}`}
                                                style={{ maxHeight: "400px", objectFit: "cover" }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ShareDetails;
