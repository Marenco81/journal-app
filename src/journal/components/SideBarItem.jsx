import { TurnedInNot } from "@mui/icons-material"
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

const SideBarItem = ({title = '', body, id, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch (setActiveNote({title, body, id, date, imageUrls}))
    }

    const newTitle = useMemo ( () => {
        return title.length > 17 ? title.substring (0, 17) + '...' : title;
    }, [title]);
  return (
    <ListItem  disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid2 container>
                <ListItemText primary={newTitle} />
                <ListItemText secondary={body} />

            </Grid2>
        </ListItemButton>
    </ListItem>
  )
}

export default SideBarItem
