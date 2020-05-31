import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {getAllUsers} from "../../apollo/queries";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});

const reduceWidth = {width: '10%'}

const UserList: React.FC = () => {
    const {data, loading, error} = useQuery(getAllUsers);
    const classes = useStyles();

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Ooops....</h1>
    }

    console.log(data)

    const rows: any[] = data?.users || []
    return (
        <TableContainer component={Paper}>
            <Table style={{tableLayout: 'auto'}} className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={reduceWidth}>Id</TableCell>
                        <TableCell style={reduceWidth}>Name</TableCell>
                        <TableCell style={reduceWidth}>Email</TableCell>
                        <TableCell style={reduceWidth}>Phone</TableCell>
                        <TableCell style={reduceWidth}>Address</TableCell>
                        <TableCell style={reduceWidth}>Zip</TableCell>
                        <TableCell style={reduceWidth}>Image</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell style={reduceWidth} component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell style={reduceWidth}>{row.name}</TableCell>
                            <TableCell style={reduceWidth}>{row.email}</TableCell>
                            <TableCell style={reduceWidth}>{row.phoneNumber}</TableCell>
                            <TableCell style={reduceWidth}>{row.address}</TableCell>
                            <TableCell style={reduceWidth}>{row.zip}</TableCell>
                            <TableCell style={reduceWidth}>
                                <ul>
                                    {row.files.map((e: string) => <li>{e}</li>)}
                                </ul>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default UserList;
