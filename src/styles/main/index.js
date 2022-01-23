import { big_text } from "../card"
export const toolbar = {
    display: 'flex',
    justifyContent: 'center',
    columnGap: '8px',
    flexDirection: 'row',
    background: '#113f67',
    minWidth: '300px',
    width: '30%',
    borderRadius: '4px',
    margin: '8px',
    padding: '8px',
    border: '.1px solid white'
}

export const toolbar_item = {
    ...big_text,
    cursor: 'pointer',
    background: '#385170',
    padding: '4px',
    border: '.1px solid white',
    borderRadius: '2px'
}
export const suggestionList = (width) => ({
    marginBottom: '0px',
    width: width ? width : '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '0px',
    alignSelf: 'center',
    justifySelf: 'center',
    listStyleType: 'none',
    padding: '0px',
    display: 'none',
    flexDirection: 'column',
    background: 'whitesmoke'
})
export const suggestionListItem = {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '12px',
    color: 'black'
}