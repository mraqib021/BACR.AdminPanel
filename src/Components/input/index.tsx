import TextField from '@mui/material/TextField';

type inputtype = {
    id: string
    label: string
    variants: any
    rows?: number
}

export default function Input(props: inputtype) {
    console.log(props)
    return (
        <div style={{margin:"20px"}}>
            <TextField id={props.id} label={props.label} variant={props.variants} multiline rows={props.rows} />
        </div>
    );
}