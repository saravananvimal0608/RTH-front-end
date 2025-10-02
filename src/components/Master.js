import { useState } from "react";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from 'react-router-dom'

const Master = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        project: [],
        zone: [],
        transactionType: [],
        propertyType: [],
        availabilityStatus: [],
        furnishing: [],
        orientation: [],
        view: [],
        parkingAvailable: [],
        petPolicy: [],
        landuseType: [],
        galleryCategory: []
    });

    // Options for multi-select fields
    const zoneOptions = [
        { value: "Zone 1", label: "Zone 1" },
        { value: "Zone 2", label: "Zone 2" },
        { value: "Zone 3", label: "Zone 3" }
    ];

    const propertyOptions = [
        { value: "Apartment", label: "Apartment" },
        { value: "Villa", label: "Villa" },
        { value: "Plot", label: "Plot" }
    ];

    const furnishingOptions = [
        { value: "Semi-Furnished", label: "Semi-Furnished" },
        { value: "Fully Furnished", label: "Fully Furnished" },
        { value: "None", label: "None" },
    ];
    const transactionType = [
        { value: "For-Lease", label: "For Lease" },
        { value: "Sell", label: "Sell" },
    ];

    const viewOptions = [
        { value: "River View", label: "River View" },
    ];

    const petOptions = [
        { value: "Dogs Allowed", label: "Dogs Allowed" },
        { value: "Cats Allowed", label: "Cats Allowed" },
        { value: "No Pets", label: "No Pets" }
    ];
    const orientation = [
        { value: "South", label: "South" },
        { value: "East", label: "East" },
        { value: "West", label: "West" },
        { value: "North", label: "North" }
    ];

    const parkingAvailable = [
        { value: "1-Car", label: "1 Car" },
        { value: "1-Bike", label: "1 Bike" },
    ];
    const galleryOptions = [
        { value: "Interior", label: "Interior" },
        { value: "Exterior", label: "Exterior" },
    ];

    const landuseType = [
        { value: "Residental", label: "Residental" },
    ];
    const availabilityStatus = [
        { value: "On-Sale", label: "On Sale" },
        { value: "Coming-soon", label: "Coming soon" },
        { value: "Sale", label: "Sale" }
    ];
    const project = [
        { value: "project-1", label: "project-1" },
        { value: "project-2", label: "project-2" },
        { value: "project-3", label: "project-3" }
    ];

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/api/masterDropDown`, formData);
            alert("Data stored successfully");
            setFormData({
                project: [],
                zone: [],
                transactionType: [],
                propertyType: [],
                availabilityStatus: [],
                furnishing: [],
                orientation: [],
                view: [],
                parkingAvailable: [],
                petPolicy: [],
                landuseType: [],
                galleryCategory: []
            });
            navigate("/listallproperty")
        } catch (error) {
            console.error(error);
            alert("Error saving data");
        }
    };

    return (
        <div className="d-flex">
            {/* <SideBar /> */}
            <Container className="mt-5">
                <h2>Master Page</h2>
                <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">

                    <Form.Group className="mb-3">
                        <Form.Label>Project</Form.Label>
                        <Select
                            isMulti
                            name="project"
                            options={project}
                            value={project.filter(opt => formData.project.includes(opt.value))}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    project: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Zone</Form.Label>
                        <Select
                            isMulti
                            name="zone"
                            options={zoneOptions}
                            value={zoneOptions.filter(opt => formData.zone.includes(opt.value))}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    zone: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Transaction Type</Form.Label>
                        <Select
                            isMulti
                            name="transactionType"
                            options={transactionType}
                            value={transactionType.filter(opt =>
                                formData.transactionType.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    transactionType: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Property Type</Form.Label>
                        <Select
                            isMulti
                            name="propertyType"
                            options={propertyOptions}
                            value={propertyOptions.filter(opt =>
                                formData.propertyType.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    propertyType: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Availability Status</Form.Label>
                        <Select
                            isMulti
                            name="availabilityStatus"
                            options={availabilityStatus}
                            value={availabilityStatus.filter(opt =>
                                formData.availabilityStatus.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    availabilityStatus: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Furnishing</Form.Label>
                        <Select
                            isMulti
                            name="furnishing"
                            options={furnishingOptions}
                            value={furnishingOptions.filter(opt =>
                                formData.furnishing.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    furnishing: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Orientation</Form.Label>
                        <Select
                            isMulti
                            name="Orientation"
                            options={orientation}
                            value={orientation.filter(opt =>
                                formData.orientation.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    orientation: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>View</Form.Label>
                        <Select
                            isMulti
                            name="view"
                            options={viewOptions}
                            value={viewOptions.filter(opt =>
                                formData.view.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    view: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Parking Available</Form.Label>
                        <Select
                            isMulti
                            name="parkingAvailable"
                            options={parkingAvailable}
                            value={parkingAvailable.filter(opt =>
                                formData.parkingAvailable.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    parkingAvailable: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pet Policy</Form.Label>
                        <Select
                            isMulti
                            name="petPolicy"
                            options={petOptions}
                            value={petOptions.filter(opt =>
                                formData.petPolicy.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    petPolicy: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Land use Type</Form.Label>
                        <Select
                            isMulti
                            name="landuseType"
                            options={landuseType}
                            value={landuseType.filter(opt =>
                                formData.landuseType.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    landuseType: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Gallery Category</Form.Label>
                        <Select
                            isMulti
                            name="galleryCategory"
                            options={galleryOptions}
                            value={galleryOptions.filter(opt =>
                                formData.galleryCategory.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                setFormData({
                                    ...formData,
                                    galleryCategory: selected ? selected.map(opt => opt.value) : []
                                })
                            }
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Master;
