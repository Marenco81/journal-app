import { TurnedInNot } from "@mui/icons-material"
import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";

const SideBarItem = ({title = '', body = '', id, date, imageUrls = []}) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch (setActiveNote({title, body, id, date, imageUrls}))
    }

    const newTitle = useMemo ( () => {
        return title.length > 17 ? title.substring (0, 17) + '...' : title;
    }, [title]);
    const newBody = useMemo ( () => {
        return body.length > 17 ? body.substring (0, 17) + '...' : body; // Cuerpo de la nota cortado a 17 caracteres en el sidebar
    }, [body]);
  return (
    <ListItem  disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>
            <Grid2 container>
                <ListItemText primary={newTitle} />
                <ListItemText secondary={newBody} />

            </Grid2>
        </ListItemButton>
    </ListItem>
  )
}

export default SideBarItem
