import React from 'react';
import {Link} from "react-router-dom";
import Table from '../common/Table'
import { useSelector, useDispatch } from 'react-redux';
import { getAllStarships } from '../../store/selectors/starships';
import { deleteStarship } from '../../store/actions/starships';

const StarshipsPage = () => {
    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));

    
    const handleDelete = (id) => {
        dispatch(deleteStarship(id));
    }

    const getColumns = () => {
        if (!starships.length) return [];

        return Object.keys(starships[0]).map(colName => {
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#ffc107'}} to={`/starships/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    }

    return (
        <div>
            <h3 className="my-3">Starships</h3>
            <Link
                to={"/starships/new"}
                className="btn btn-warning"
                style={{marginBottom: 25}}
            >
                New Starship
            </Link>
            <Table
                columns={getColumns()}
                data={Object.values(starships)}
                tableDescriptor="Starships"
                onDelete={handleDelete}
            />
        </div>

    );
};

export default StarshipsPage;
