import React, { useState, useEffect, useRef } from "react";
import {
  InputBase,
  IconButton,
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { fetchSearchResults } from "@/lib/api";
import useDebounce from "@/lib/useDebounce";

const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  display: "flex",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const ResultsDropdown = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1300, // High z-index to ensure it appears above other components
  maxHeight: 200,
  overflowY: "auto",
}));

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef();
  const dropdownRef = useRef();

  useEffect(() => {
    if (debouncedQuery) {
      const fetchResults = async () => {
        const response = await fetchSearchResults(debouncedQuery);
        setResults(response.results);
        setShowDropdown(true);
      };
      fetchResults();
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [debouncedQuery]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/${query}`);
      setShowDropdown(false);
    }
  };

  const handleItemClick = (id) => {
    router.push(`/food/${id}`);
    setShowDropdown(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <SearchContainer>
      <Search ref={dropdownRef}>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()} // Prevent drawer close on click
        />
        <IconButton type="submit" aria-label="search" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Search>
      {showDropdown && results.length > 0 && (
        <ResultsDropdown>
          <List>
            {results.map((result) => (
              <ListItemButton
                key={result.id}
                onClick={() => handleItemClick(result.id)}
              >
                <ListItemText primary={result.name} />
              </ListItemButton>
            ))}
          </List>
        </ResultsDropdown>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
