import { useParams } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useState, useEffect } from "react";
import { api } from "./bike";

export function DisplayDetails() {

    const { id } = useParams();

    const history = useHistory()


    const [bike, setbike] = useState({});

    useEffect(() => {
        fetch(`${api}/${id}`)
            .then(data => data.json())
            .then((bikes) => setbike(bikes))
    }, [id]);



    // console.log(id,bikeList)
    return (

        <div>
            <Card className="moredetials-card">
                <img src={bike.post} className="moredetails-img" alt="IMG" />

                <CardContent >
                    <h5 className="moredetails-title" >{bike.name}</h5>
                    <p className="moredetails-details">{bike.details}</p>
                </CardContent>
            </Card>
            <Button variant="contained" className="moredetails-btn" startIcon={<ArrowBackIosNewIcon />}
                onClick={() => history.goBack()}>Back</Button>
        </div>



    );
}
