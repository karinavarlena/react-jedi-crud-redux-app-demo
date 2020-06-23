import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";
import { createStarship, setStarships } from '../store/actions/starships';
import { useSelector, useDispatch } from 'react-redux';
import { getAllStarships } from '../store/selectors/starships';
import { starshipsColumns } from "../services/spaceshipsService";

const initialShipData = starshipsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const StarsipsForm = ({history, match}) => {
    const [formErrors, setFormErrors] = useState({});
    const [starshipData, setStarshipData] = useState({...initialShipData});
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const existingStarshipData = starships.find(starship => starship.id === starshipId)
        setStarshipData(existingStarshipData)
        setEditMode(true);
    }, [])

    const validate = (data) => { // super simple validation
        let errors = {};
        Object.entries(data).map(([propKey, propVal]) => {
            if (!propVal) {
                errors = {...errors, [propKey]: 'Field should not be empty'};
            }
        })
        setFormErrors(errors);
        return errors
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const errors = validate(starshipData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newStarshipsList = starships.map(starship => starship.id === starshipData.id ? starshipData : starship);
            dispatch(setStarships(newStarshipsList))

        } else {
            dispatch(createStarship({...starshipData, id: nanoid()}))
        }
        history.push('/starships')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...starshipData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setStarshipData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {starshipsColumns.map(starshipsColName => (
                <Input
                    key={starshipsColName}
                    name={starshipsColName}
                    label={starshipsColName[0].toUpperCase() + starshipsColName.slice(1)}
                    value={starshipData[starshipsColName]}
                    type='input'
                    error={formErrors[starshipsColName]}
                    onChange={event => handleChange(event)}
                />
            ))}
            <Button
                onClick={event => onSubmit(event)}
                label="Save"
                disabled={Object.keys(formErrors).length}
                classes="btn btn-dark"
            />
        </form>
    );
};

export default StarsipsForm;
