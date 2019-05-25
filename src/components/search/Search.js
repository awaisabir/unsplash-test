import React, { useState } from "react";
import { Input, Select, Button } from "semantic-ui-react";

const SearchBar = ({
    currentOption,
    onSearch, 
    onSubmit,
    options
}) => {
    const [newOption, setNewOption] = useState(currentOption);

    return (
        <Input
            onChange={(e) => onSearch(e.target.value)}
            type="text" 
            placeholder="Search..." 
            action
        >
            <input />
            <Select compact options={options} defaultValue="photos" onChange={(e) => {setNewOption(e.target.innerText)}}/>
            <Button type="submit" onClick={() => onSubmit(newOption)}>Search</Button>
        </Input>
    );
};

export default SearchBar;