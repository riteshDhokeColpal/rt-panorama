import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import getMembers from "../../service/members/members";
import getProjects from "../../service/project/project_service";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import Header from "../common/Header";
const SearchPage = () => {
  const navigate = useNavigate();
  const [autocomplete, setAutocomplete] = useState([]);
  const [selectedSearchType, setSearchType] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  // Fetch members data and set it in state
  useEffect(() => {
    const fetchMembers = () => {
      const data = getMembers(); // Assume getMembers is a promise-based function
      setAutocomplete(data);
    };
    const fetchProjects = () => {
      const data = getProjects(); // Assume getMembers is a promise-based function
      setAutocomplete(data);
    };
    if (selectedSearchType?.code == "M") {
      fetchMembers();
    } else if (selectedSearchType?.code == "P") {
      fetchProjects();
    } else {
      setAutocomplete([]);
    }
  }, [selectedSearchType]);

  // Generate suggestions based on user input
  const search = (event) => {
    const filteredSuggestions = autocomplete.filter((member) =>
      member.name.toLowerCase().includes(event.query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const SearchType = [
    { name: "Select Search Type", code: "" },
    { name: "Member", code: "M" },
    { name: "Project", code: "P" },
    { name: "Skillset", code: "S" },
  ];

  return (
    <>
      <Header />
      <div>
        <Dropdown
          value={selectedSearchType}
          onChange={(e) => setSearchType(e.value)}
          options={SearchType}
          optionLabel="name"
          placeholder="Select Search Type"
          className="w-full md:w-15rem"
          style={{ marginRight: "1rem" }}
        />
        <AutoComplete
          value={value}
          suggestions={suggestions}
          completeMethod={search} // Set the search function for autocomplete
          field="name" // Specify the field to show for suggestions, assuming it is 'name'
          onChange={(e) => setValue(e.value)}
          onSelect={(e) => console.log("Selected:", e.value)} // Just an example event
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Button
          label="Search"
          type="success"
          onClick={() => {
            if (selectedSearchType?.code == "M") {
              if (value?.uuid) {
                navigate(`/profile/${value?.uuid}`);
              }
            } else if (selectedSearchType?.code == "P") {
              navigate(`/project/${value?.uuid}`);

            }
          }}
        />
      </div>
    </>
  );
};

export default SearchPage;
