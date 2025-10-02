import { useState, useEffect } from "react";
import axios from 'axios'
import { Form, Button, Container } from "react-bootstrap";
import Select from "react-select";
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddProperty = () => {
 const BASE_URL =process.env.REACT_APP_BASE_URL;
    //get the id for update purpose
    const { id } = useParams();

    // setting all data
    const [formData, setFormData] = useState({
        oldRefNo: "",
        project: [],
        zone: [],
        propertyTitle: "",
        transactionType: [],
        propertyType: [],
        address: "",
        availabilityStatus: [],
        size: "",
        bedrooms: "",
        bathrooms: "",
        floors: "",
        floorNumber: "",
        furnishing: [],
        yearBuilt: "",
        orientation: [],
        view: [],
        parkingAvailable: [],
        petPolicy: [],
        price: "",
        contractTerms: "",
        depositPaymentTerms: "",
        maintenanceFee: "",
        availableFrom: "",
        description: "",
        highlighted: false,
        propertyImages: [],
        galleryCategory: [],
        propertyVideo: "",
        landlordName: "",
        landlordPhone: "",
        landlordEmail: "",
        propertyDocuments: [],
        bankInfo: "",
        propertyConsultant: "",
        agentEmail: "",
        internalNotes: "",
        landuseType: [],
        utilitiesIncluded: [],
        incentivesPromotions: "",
        multiLanguageSupport: "",
        currencyType: "AED",
        developerName: "",
        projectCompletionDate: "",
        projectFacilities: []
    });

    // setting the dropdown datas
    const [option, setOption] = useState({
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

    // for normal fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? Number(value)
                        : value,
        });
    };

   //for select options
    const handleSelectChange = (selected, fieldName) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: selected ? selected.map((opt) => opt.value) : [],
        }));
    };

    // handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (id) {
                res = await axios.put(`${BASE_URL}/api/${id}`, formData);
                alert("Property updated successfully");
            } else {
                res = await axios.post(`${BASE_URL}/api/add`, formData);
                alert("Property added successfully");

                // removing values after submit
                setFormData({
                    oldRefNo: "",
                    project: [],
                    zone: [],
                    propertyTitle: "",
                    transactionType: [],
                    propertyType: [],
                    address: "",
                    availabilityStatus: [],
                    size: "",
                    bedrooms: "",
                    bathrooms: "",
                    floors: "",
                    floorNumber: "",
                    furnishing: [],
                    yearBuilt: "",
                    orientation: [],
                    view: [],
                    parkingAvailable: [],
                    petPolicy: [],
                    price: "",
                    contractTerms: "",
                    depositPaymentTerms: "",
                    maintenanceFee: "",
                    availableFrom: "",
                    description: "",
                    highlighted: false,
                    propertyImages: [],
                    galleryCategory: [],
                    propertyVideo: "",
                    landlordName: "",
                    landlordPhone: "",
                    landlordEmail: "",
                    propertyDocuments: [],
                    bankInfo: "",
                    propertyConsultant: "",
                    agentEmail: "",
                    internalNotes: "",
                    landuseType: [],
                    utilitiesIncluded: [],
                    incentivesPromotions: "",
                    multiLanguageSupport: "",
                    currencyType: "AED",
                    developerName: "",
                    projectCompletionDate: "",
                    projectFacilities: []
                });
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            alert("Failed to save property");
        }
    };

    // get a dropdowns from masters
    const fetchoption = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/masterDropDownGet`);
            const data = res.data.result[0]
            setOption({
                project: (data.project || []).map(item => ({ value: item, label: item })),
                zone: (data.zone || []).map(item => ({ value: item, label: item })),
                transactionType: (data.transactionType || []).map(item => ({ value: item, label: item })),
                propertyType: (data.propertyType || []).map(item => ({ value: item, label: item })),
                availabilityStatus: (data.availabilityStatus || []).map(item => ({ value: item, label: item })),
                furnishing: (data.furnishing || []).map(item => ({ value: item, label: item })),
                orientation: (data.orientation || []).map(item => ({ value: item, label: item })),
                view: (data.view || []).map(item => ({ value: item, label: item })),
                parkingAvailable: (data.parkingAvailable || []).map(item => ({ value: item, label: item })),
                petPolicy: (data.petPolicy || []).map(item => ({ value: item, label: item })),
                landuseType: (data.landuseType || []).map(item => ({ value: item, label: item })),
                galleryCategory: (data.galleryCategory || []).map(item => ({ value: item, label: item }))
            });


        } catch (err) {
            console.error("Error:", err);
        }
    }

    // get a single data for updating purpose
    const getSingleData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/${id}`);
            const data = res.data.data;
            console.log("res.data.data", res.data.data);

            // set a old data
            const formattedData = {
                ...data,
                project: data.project || [],
                zone: data.zone || [],
                transactionType: data.transactionType || [],
                propertyType: data.propertyType || [],
                availabilityStatus: data.availabilityStatus || [],
                furnishing: data.furnishing || [],
                orientation: data.orientation || [],
                view: data.view || [],
                parkingAvailable: data.parkingAvailable || [],
                petPolicy: data.petPolicy || [],
                landuseType: data.landuseType || [],
                galleryCategory: data.galleryCategory || [],
                availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
            };
            setFormData(formattedData);
        } catch (error) {
            console.log(error, "getSingleData error");
        }
    };


    useEffect(() => {
        fetchoption()
        if (id) {
            getSingleData()
        }
    }, [])

    return (
        <div className="d-flex">
            <Container className="mt-5">
                <h2>{id ? "Edit Property" : "Add Property Page"}</h2>
                <Form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">

                    <Form.Group className="mb-3">
                        <Form.Label>Old ref no</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Old ref no"
                            name="oldRefNo"
                            value={formData.oldRefNo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Project</Form.Label>
                        <Select
                            isMulti
                            name="project"
                            options={option.project}
                            value={option.project.filter((opt) =>
                                formData.project.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "project")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Zone</Form.Label>
                        <Select
                            isMulti
                            name="zone"
                            options={option.zone}
                            value={option.zone.filter((opt) =>
                                formData.zone.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "zone")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Property Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="propertyTitle"
                            name="propertyTitle"
                            value={formData.propertyTitle}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Transaction Type</Form.Label>
                        <Select
                            isMulti
                            name="transactionType"
                            options={option.transactionType}
                            value={option.transactionType.filter((opt) =>
                                formData.transactionType.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                handleSelectChange(selected, "transactionType")
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Property Type</Form.Label>
                        <Select
                            isMulti
                            name="propertyType"
                            options={option.propertyType}
                            value={option.propertyType.filter((opt) =>
                                formData.propertyType.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "propertyType")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Availability Status</Form.Label>
                        <Select
                            isMulti
                            name="availabilityStatus"
                            options={option.availabilityStatus}
                            value={option.availabilityStatus.filter((opt) =>
                                formData.availabilityStatus.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                handleSelectChange(selected, "availabilityStatus")
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bed rooms</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Bath rooms</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Floors</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="floors"
                            name="floors"
                            value={formData.floors}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>floor Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="floorNumber"
                            name="floorNumber"
                            value={formData.floorNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Furnishing</Form.Label>
                        <Select
                            isMulti
                            name="furnishing"
                            options={option.furnishing}
                            value={option.furnishing.filter((opt) =>
                                formData.furnishing.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "furnishing")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Year Built</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="yearBuilt"
                            name="yearBuilt"
                            value={formData.yearBuilt}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Orientation</Form.Label>
                        <Select
                            isMulti
                            name="orientation"
                            options={option.orientation}
                            value={option.orientation.filter((opt) =>
                                formData.orientation.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "orientation")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>view</Form.Label>
                        <Select
                            isMulti
                            name="view"
                            options={option.view}
                            value={option.view.filter((opt) =>
                                formData.view.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "view")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Parking Availability</Form.Label>
                        <Select
                            isMulti
                            name="parkingAvailable"
                            options={option.parkingAvailable}
                            value={option.parkingAvailable.filter((opt) =>
                                formData.parkingAvailable.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                handleSelectChange(selected, "parkingAvailable")
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pet Policy</Form.Label>
                        <Select
                            isMulti
                            name="petPolicy"
                            options={option.petPolicy}
                            value={option.petPolicy.filter((opt) =>
                                formData.petPolicy.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "petPolicy")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>contractTerms</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="contractTerms"
                            name="contractTerms"
                            value={formData.contractTerms}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>depositPaymentTerms</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="depositPaymentTerms"
                            name="depositPaymentTerms"
                            value={formData.depositPaymentTerms}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>maintenanceFee</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="maintenanceFee"
                            name="maintenanceFee"
                            value={formData.maintenanceFee}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Available From</Form.Label>
                        <DatePicker
                            selected={formData.availableFrom}
                            onChange={(date) =>
                                setFormData({ ...formData, availableFrom: date })
                            }
                            dateFormat="yyyy-MM-dd"
                            className="form-control"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Highlighted"
                            name="highlighted"
                            checked={formData.highlighted}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>galleryCategory</Form.Label>
                        <Select
                            isMulti
                            name="galleryCategory"
                            options={option.galleryCategory}
                            value={option.galleryCategory.filter((opt) =>
                                formData.galleryCategory?.includes(opt.value)
                            )}
                            onChange={(selected) =>
                                handleSelectChange(selected, "galleryCategory")
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>landlord Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="landlordName"
                            name="landlordName"
                            value={formData.landlordName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>landlord Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="landlordPhone"
                            name="landlordPhone"
                            value={formData.landlordPhone}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>landlord Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="landlordEmail"
                            name="landlordEmail"
                            value={formData.landlordEmail}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>propertyDocuments</Form.Label>
                        <Form.Control
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            placeholder="propertyDocuments"
                            name="propertyDocuments"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>bankInfo</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="bankInfo"
                            name="bankInfo"
                            value={formData.bankInfo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>internalNotes</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="internalNotes"
                            name="internalNotes"
                            value={formData.internalNotes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>land Use Type</Form.Label>
                        <Select
                            isMulti
                            name="landuseType"
                            options={option.landuseType}
                            value={option.landuseType.filter((opt) =>
                                formData.landuseType.includes(opt.value)
                            )}
                            onChange={(selected) => handleSelectChange(selected, "landuseType")}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="w-100">
                        {id ? "Update" : "Submit"}
                    </Button>
                </Form>
            </Container>
        </div>

    );
};

export default AddProperty;
