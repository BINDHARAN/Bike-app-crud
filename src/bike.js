import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Badge from "@mui/material/Badge";
import { useHistory } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export const api = "https://6209ed8f92946600171c55c2.mockapi.io/bikes"

export function BikeList() {
    const history = useHistory()
    const [bike, setbike] = useState([]);

    const getbike = () => {

        fetch(`${api}`, {
            method: "GET"
        })
            .then(data => data.json())
            .then((bike) => setbike(bike))

    }

    useEffect(() => getbike(), []);

    const deletebike = (id) => {
        fetch(`${api}/${id}`, {
            method: "DELETE"
        }).then(() => getbike())
    }

    return (
        <div className="card-container">
            {bike.map(
                ({ post, name, rate, details, launch, id }, index) => (
                    <Bike
                        key={index}
                        name={name}
                        post={post}
                        rate={rate}
                        launch={launch}
                        details={details}
                        // delete
                        deleteButton={

                            <Tooltip title="Delete">

                                <IconButton aria-label="delete"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => {
                                        deletebike(id)
                                    }}
                                    color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                        }
                        editButton={
                            <Tooltip title="Edit">
                                <IconButton aria-label="edit button"
                                    onClick={() => history.push(`./Bikes/edit/${id}`)}
                                    color="secondary">
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                        }
                        id={id}

                    />
                )
            )}
        </div>
    );
}
function Bike({ post, name, rate, launch, deleteButton, editButton, id }) {

    const history = useHistory()

    return (

        <Card className="cards">

            <img src={post} className="img" alt="IMG" />
            <CardContent>
                <div className="cardtitle"> <span>{name} </span>
                    <Tooltip title="Info">
                        <IconButton>
                            <InfoOutlinedIcon className="infoOutlineIcon" onClick={() => history.push(`/Bikes/${id}`)} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div >
                    <span className=" sub-title">Rate: </span>
                    <span className="pfont ">{rate}</span>
                </div>
                <div>
                    <span className=" sub-title">Launch: </span>
                    <span className="pfont"> {launch}</span>
                </div>

            </CardContent>

            <Counter deleteBtn={deleteButton} editButton={editButton} />


        </Card>
    );
}

function Counter({ deleteBtn, editButton }) {
    const [like, setLike] = useState(0);
    const [unlike, setunLike] = useState(0);
    return (
        <div className="button-group">
            <IconButton
                color="primary"
                className="btn1"
                onClick={() => setLike(like + 1)}
            >
                <Badge badgeContent={like} color="secondary">
                    👍
                </Badge>
            </IconButton>

            <IconButton
                color="primary"
                className="btn"
                onClick={() => setunLike(unlike + 1)}
            >
                <Badge badgeContent={unlike} color="error">
                    👎
                </Badge>
            </IconButton>
            {/* delete btn and edit btn */}
            {deleteBtn} {editButton}
        </div>
    );
}