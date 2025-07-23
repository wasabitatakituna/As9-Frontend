export default function FlightCard({ flight }) {
    return (
        <div style={{ border: '1px solid rgb(236, 239, 243)', padding: '1rem', marginBottom: '1rem', borderRadius: '10px' }}>
            <p><strong>{flight.airline}</strong></p>
            <p>From: {flight.from} → To: {flight.to}</p>
            <p>Price: ${flight.price}</p>
        </div>
    );
}