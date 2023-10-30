const Filter = ({filter, handleFindCountry}) => {
    return (
        <div>
            <p>find countries <input value={filter} onChange={handleFindCountry} /></p>
        </div>
    )
}

export default Filter