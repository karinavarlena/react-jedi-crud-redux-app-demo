import React, {useEffect, useState} from 'react';
import Input from "./common/Input";
import Button from './common/Button';
import {nanoid} from "nanoid";
import { createPlanet, setPlanets } from '../store/actions/planets';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlanets } from '../store/selectors/planets';
import { planetsColumns } from "../services/planetsService";

const initialPlanetData = planetsColumns.reduce((columns, columnName) => {
    columns[columnName] = '';
    return columns;
}, {})

const PlanetsForm = ({history, match}) => {
    const [formErrors, setFormErrors] = useState({});
    const [planetData, setPlanetData] = useState({...initialPlanetData});
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    const planets = useSelector(state => getAllPlanets(state));

    useEffect(() => {
        const planetId = match.params.id;
        if (planetId === "new") return;
        const existingPlanetData = planets.find(planet => planet.id === planetId)
        setPlanetData(existingPlanetData)
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
        const errors = validate(planetData);

        if (Object.keys(errors).length) {
            return;
        }

        if (editMode) {
            const newPlanetsList = planets.map(planet => planet.id === planetData.id ? planetData : planet);
            dispatch(setPlanets(newPlanetsList))

        } else {
            dispatch(createPlanet({...planetData, id: nanoid()}))
        }
        history.push('/planets')
    }

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const data = {...planetData};
        const errors = {...formErrors};
        if (errors[input.name]) {
            delete errors[input.name];
        }

        data[input.name] = input.value;
        setPlanetData(data);
        setFormErrors(errors)
    }

    return (
        <form>
            {planetsColumns.map(planetsColName => (
                <Input
                    key={planetsColName}
                    name={planetsColName}
                    label={planetsColName[0].toUpperCase() + planetsColName.slice(1)}
                    value={planetData[planetsColName]}
                    type='input'
                    error={formErrors[planetsColName]}
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

export default PlanetsForm;
