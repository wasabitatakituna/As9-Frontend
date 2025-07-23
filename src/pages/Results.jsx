import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FlightList from '../components/FlightList';
import NoResults from '../components/NoResults'
import Spinner from 'react-bootstrap/Spinner';

import { gql, useQuery } from '@apollo/client';
// import { useLocation } from 'react-router-dom';


export default function Results() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    // const [flights, setFlights] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    const GET_FLIGHTS = gql`
        query GetFlights($from: String, $to: String) {
            flights(from: $from, to: $to) {
                id
                from
                to
                price
                airline
                departureTime
            }
        }
    `;

    /* function useQueryParams() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQueryParams();
    const from = query.get('from');
    const to = query.get('to'); */

    if (!from || !to) {
        return <p>Waiting for search parameters...</p>;
    }

    const { loading, error, data } =
        useQuery(GET_FLIGHTS, {
        variables: { from, to },
    });

    if (loading) {
        return <Spinner animation="border" role="status" />;
    }
    if (error) {
        return <p>Error loading flights.</p>;
    }

    const flights = data?.flights || [];

    /* if (flights.length === 0) {
        return <p>No flights found from {from} to {to}.</p>;
    } */


    /* useEffect(() => {
        fetch(`http://localhost:4000/flights?from=${from}&to=${to}`)
            .then((res) => res.json())
            .then((data) => {
                setFlights(data.data); // use .data only if paginated
                setIsLoading(false);
                setTimeout(() => {
                    setIsLoading(false);
                    navigate(`/results?from=${from}&to=${to}`);
                }, 1000)
            });
    }, [from, to]);
    if (isLoading) {
        return <Spinner animation="border" role="status" />;
    } */

    return (
        <div>
            <button onClick={() => {navigate("/")}} id="back">
                Go Back
            </button>
            <h2>Flights from {from} to {to}</h2>
            <div>
                {flights.length===0 ? <NoResults from={from} to={to} /> : <FlightList flights={flights} />}
            </div>
        </div>
    );
}

