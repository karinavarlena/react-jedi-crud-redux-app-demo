import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPlanets } from '../../store/selectors/planets';
import { deletePlanet } from '../../store/actions/planets';

const PlanetsPage = () => {
    const dispatch = useDispatch();
    const planets = useSelector(state => getAllPlanets(state));

    
    const handleDelete = (id) => {
        dispatch(deletePlanet(id));
    }

    const getColumns = () => {
        if (!planets.length) return [];

        return Object.keys(planets[0]).map(colName => {
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/planets/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3 className="my-3">Planets</h3>
            <Table
                columns={getColumns()}
                data={Object.values(planets)}
                tableDescriptor="Planets"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default PlanetsPage;
