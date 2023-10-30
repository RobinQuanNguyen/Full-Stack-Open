const Filter = ({filter, handleFindPerson}) => {
    return (
        <div>
            <p>filter shown with <input value={filter} onChange={handleFindPerson} /></p>
        </div>
    )
}

export default Filter