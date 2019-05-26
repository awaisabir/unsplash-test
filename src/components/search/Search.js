import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Select, Button } from "semantic-ui-react";

const propTypes = {
    currentOption: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired
};

const SearchBar = ({
    currentOption,
    onSearch, 
    onSubmit,
    options,
    error
}) => {
    const [newOption, setNewOption] = useState(currentOption);

    return (
        <Input
            onChange={(e) => onSearch(e.target.value)}
            type="text" 
            placeholder="Search..." 
            action
            error={error}
        >
            <input />
            <Select compact options={options} defaultValue="photos" onChange={(e) => {setNewOption(e.target.innerText.toLowerCase())}}/>
            <Button type="submit" onClick={() => onSubmit(newOption)}>Search</Button>
        </Input>
    );
};

SearchBar.propTypes = propTypes;
SearchBar.displayName = "Search";
export default SearchBar;