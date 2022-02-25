import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { api } from "./bike";
import CircularProgress from '@mui/material/CircularProgress';
import { useFormik } from "formik";
import { formValidationSchema } from "./addBike";

export function EditBike() {

    const { id } = useParams();

    const [bike, setbike] = useState(null);

    useEffect(() => {
        fetch(`${api}/${id}`)
            .then(data => data.json())
            .then((bike) => setbike(bike))
    }, [id]);

    return (
        <div>{bike ? <BikeForm Bike={bike} /> : <h2 className="edit-loadmsg"> Loading... <CircularProgress /></h2>} </div>
    );
}

function BikeForm({ Bike }) {
    const history = useHistory()

    const formik = useFormik({

        initialValues: {
            post: Bike.post,
            name: Bike.name,
            rate: Bike.rate,
            details: Bike.details,
            launch: Bike.launch,

        },
        validationSchema: formValidationSchema,
        onSubmit: (editedbike) => editbike(editedbike),
    });

    const editbike = (editedbike) => {
        fetch(`${api}/${Bike.id}`, {
            method: "PUT",
            body: JSON.stringify(editedbike),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => history.push("/Bikes"));
    }


    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="Bike_form">
                    <TextField
                        label="Bike Poster(url)"
                        variant="outlined"
                        id="post"
                        name="post"
                        value={formik.values.post}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.post && formik.errors.post}
                        helperText={formik.touched.post && formik.errors.post ? formik.errors.post : ""}

                    />
                    <TextField
                        label="Bike Name"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.name && formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                    />
                    <TextField
                        label="Bike rate"
                        id="rate"
                        name="rate"
                        value={formik.values.rate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.rate && formik.errors.rate}
                        helperText={formik.touched.rate && formik.errors.rate ? formik.errors.rate : ""}
                    />

                    <TextField
                        label="Bike launch"
                        id="launch"
                        name="launch"
                        value={formik.values.launch}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.launch && formik.errors.launch}
                        helperText={formik.touched.launch && formik.errors.launch ? formik.errors.launch : ""}
                    />
                    <TextField
                        label="Bike details"
                        id="details"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        error={formik.touched.details && formik.errors.details}
                        helperText={formik.touched.details && formik.errors.details ? formik.errors.details : ""}
                    />

                    <Button variant="contained" color="success" className="button" type="submit" >
                        Save
                    </Button>

                </div>
            </form>

        </div>
    )
}