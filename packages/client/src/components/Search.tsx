import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import { items } from "../utils/testData";

export default function Search() {
    return (
        <Autocomplete
            freeSolo
            id="search-items"
            disableClearable={true}
            options={items.map((item) => item.name)}
            sx={{ flexGrow: 2, mx: 4 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search input"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            )}
        />
    )
}
