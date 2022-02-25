import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";
import { api } from "./bike";
import { useFormik } from "formik";
import * as yup from "yup";





export const formValidationSchema = yup.object({
    post: yup.string()
        .required("Why not fill this post? 😉")
        .min(5, "Need a longer poster 😄"),

    name: yup.string()
        .required("Why not fill this name? 😉")
        .min(1, "Need a longer name 😄"),

    rate: yup.string()
        .required("Why not fill this rate? 😉")
        .min(5),

    launch: yup.string()
        .required("Why not fill this launch? 😉"),

    details: yup.string()
        .required("Why not fill this details? 😉")
        .min(20, "Need a longer details 😄")


});


export function AddBikes() {

    const history = useHistory()


    const formik = useFormik({
        initialValues: {
            post: "",
            name: "",
            rate: "",
            details: "",
            launch: "",

        },
        validationSchema: formValidationSchema,
        onSubmit: (newBike) => addBike(newBike),
    });

    const addBike = (newBike) => {
        fetch(`${api}`, {
            method: "POST",
            body: JSON.stringify(newBike),
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

                    <Button variant="contained" className="button" type="submit" >
                        Add Bike
                    </Button>

                </div>
            </form>

        </div>
    );
}