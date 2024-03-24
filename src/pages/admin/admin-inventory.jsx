import {Button} from "@mui/material";
import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import ProductImage from "../../assets/images/product.jpg"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'quantity', label: 'Quantity', minWidth: 100 },
    { id: 'reorderLevel', label: 'Reorder Level', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'category', label: 'Category', minWidth: 100 },
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

function createData(id, image, name, quantity, reorderLevel, price, category,actions) {
    return { id, image, name, quantity, reorderLevel, price, category,actions};
}

const rows = [
    createData(1, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(2, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(3, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(4, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(5, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(6, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(7, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(8, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(9, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(10, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(11, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(12, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(13, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(14, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(15, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(16, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(17, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(18, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(19, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
    createData(20, ProductImage, 'Affairs of Hearts', 100, 50, 3000, 'Love & Romance', 1),
];

function AdminInventory() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <div className={'flex justify-between items-center'}>
                <div className={'text-3xl font-semibold'}>Inventory</div>
                <div className={'flex items-center justify-end gap-5 w-[40%]'}>
                    <FormControl className={'w-[50%]'}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Category
                        </InputLabel>
                        <NativeSelect
                            defaultValue={'all'}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={'all'}>All</option>
                            <option value={'love&romance'}>Love & Romance</option>
                            <option value={'birthday'}>Birthday</option>
                            <option value={'anniversary'}>Anniversary</option>
                        </NativeSelect>
                    </FormControl>
                    <Button variant="contained" color="secondary3" className={'w-[16.8em] h-8 2xl:h-10 !font-semibold'}>
                        Add New Bouquet
                    </Button>
                </div>

            </div>
            <div className={'mt-10 max-h-[70vh]'}>
                <TableContainer className={'h-[70vh]'}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                        className={'!font-semibold !text-xl'}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    column.id === 'image' ? <TableCell key={column.id} align={column.align}>
                                                        <img src={value} alt={'product'} className={'w-20 h-20 rounded-md shadow-md'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                        <ModeEditIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-green-500'} />
                                                        <DeleteIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-red-700'} />
                                                        <InfoIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600'} />
                                                    </TableCell> :
                                                    <TableCell key={column.id} align={column.align} className={'!text-lg'}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </>
    );
}

export default AdminInventory;