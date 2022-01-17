import { toolbar_item, toolbar } from "../styles/main"

export const Toolbar = (props) => {


    return (<div style={toolbar}>
        <h4 style= {toolbar_item} onClick = {() => props.onSelectionChanged('lookup')}>Lookup</h4>
        <h4 style = {toolbar_item} onClick = {() => props.onSelectionChanged('fav')}>Favorites</h4>
    </div>)
}