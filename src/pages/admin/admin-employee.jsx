import {Button} from "@mui/material";
import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import ProfileImage from "../../assets/images/profile.jpg";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import UserImage from "../../assets/images/user.jpg";
import AddIcon from '@mui/icons-material/Add';
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";

const columns = [
    { id: 'id', label: 'Id', minWidth: 100 },
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'age', label: 'Age', minWidth: 100 },
    { id: 'contact', label: 'Contact', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100},
    { id: 'actions', label: 'Actions', minWidth: 100 },
];

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function createData(id, image, name, age, contact, email, role, actions) {
    return { id, image, name, age, contact, email, role, actions};
}

const rows = [
    createData(1, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 1),
    createData(2, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 2),
    createData(3, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(4, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(5, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(6, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(7, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(8, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(9, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),
    createData(10, ProfileImage, 'Edward Samuel', 25, '0771234567', 'edwardsam@gmail.com', 'Delivery', 3),

];

function AdminEmployee() {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [openAddEmp, setOpenAddEmp] = React.useState(false);
    const [openEditEmp, setOpenEditEmp] = React.useState(false);
    const [openDeleteEmp, setDeleteEmp] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);

    const handleClick = () => {
        setDisabled(!disabled);
    }

    const handleOpenAddEmp = () => setOpenAddEmp(true);
    const handleCloseAddEmp = () => setOpenAddEmp(false);

    const handleEditEmpOpen = () => setOpenEditEmp(true);

    const handleEditEmpClose = () => {
        setOpenEditEmp(false)
        setDisabled(true);
    }

    const handleDeleteEmpOpen = () => setDeleteEmp(true);

    const handleDeleteEmpClose = () => setDeleteEmp(false);

    return (
        <>
            <div className={'flex justify-between items-center'}>
                <div className={'text-3xl font-semibold'}>Inventory</div>
                <Button variant="contained" color="secondary3" className={'w-[16.8em] h-8 2xl:h-10 !font-semibold'} onClick={handleOpenAddEmp}>
                    Add Employee
                </Button>

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
                                                        <img src={value} alt={'product'} className={'w-20 h-20 rounded-full shadow-md object-cover'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                            <DeleteIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-red-700'} onClick={handleDeleteEmpOpen}/>
                                                            <InfoIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600'} onClick={handleEditEmpOpen}/>
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
                {/*Add employee*/}
                <Modal
                    open={openAddEmp}
                    onClose={handleCloseAddEmp}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[50%] max-h-[75vh] overflow-auto'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Add Employee Form
                            </Typography>
                            <CloseIcon onClick={handleCloseAddEmp} className={'text-red-600'} />
                        </div>
                        <form action="" className={'mt-10'}>
                            <div className={'flex gap-3 justify-between'}>
                                <div className={'w-[30%]'}>
                                    <img src={UserImage} alt="user-image" className={'w-48 h-48 rounded-full shadow-lg'}/>
                                    <span className={'w-10 h-10 flex items-center justify-center bg-secondary2 rounded-full absolute top-[15em] left-[11em]'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'}/>
                                        <AddIcon className={'cursor-pointer !w-12 !h-12 text-gray-500'}/>
                                    </span>
                                </div>
                                <div className={'w-[70%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">First name</InputLabel>
                                        <Input id="firstName" name={'firstName'}/>
                                    </FormControl>

                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="lastName">Last name</InputLabel>
                                        <Input id="lastName" name={'lastName'}/>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={'flex justify-between gap-3 mt-5'}>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" name={'email'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="emergencyContact">Emergency Contact</InputLabel>
                                        <Input id="emergencyContact" name={'emergencyContact'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address1">Address Line 1</InputLabel>
                                        <Input id="address1" name={'address1'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address3">Address Line 3</InputLabel>
                                        <Input id="address3" name={'address3'}/>
                                    </FormControl>
                                {/*     NIC*/}
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="nic">NIC</InputLabel>
                                        <Input id="nic" name={'nic'}/>
                                    </FormControl>
                                </div>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="contact">Contact</InputLabel>
                                        <Input id="contact" name={'contact'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="age">Age</InputLabel>
                                        <Input id="age" name={'age'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address2">Address Line 2</InputLabel>
                                        <Input id="address2" name={'address2'}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input id="city" name={'city'}/>
                                    </FormControl>
                                </div>
                            </div>
                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
                {/*  Edit Employee  */}
                <Modal
                    open={openEditEmp}
                    onClose={handleEditEmpClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[50%] max-h-[75vh] overflow-auto'}>
                        <div className={'flex justify-between items-center'}>
                            <div className={'flex gap-3'}>
                                <Typography id="modal-modal-title" variant="h6" component="h3">
                                    Employee Details
                                </Typography>
                                <ModeEditIcon className={'!h-8 !w-8 text-green-600 cursor-pointer p-1 rounded-md shadow-md'} onClick={handleClick}/>
                            </div>

                            <CloseIcon onClick={handleEditEmpClose} className={'text-red-600'} />
                        </div>
                        <form action="" className={'mt-10'}>
                            <div className={'flex gap-3 justify-between'}>
                                <div className={'w-[30%]'}>
                                    <img src={UserImage} alt="user-image" className={'w-48 h-48 rounded-full shadow-lg'}/>
                                    <span className={'w-10 h-10 flex items-center justify-center bg-secondary2 rounded-full absolute top-[15em] left-[11em]'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'}/>
                                        <AddIcon className={'cursor-pointer !w-12 !h-12 text-gray-500'}/>
                                    </span>
                                </div>
                                <div className={'w-[70%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">First name</InputLabel>
                                        <Input id="firstName" name={'firstName'} defaultValue={'Edward'} disabled={disabled}/>
                                    </FormControl>

                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="lastName">Last name</InputLabel>
                                        <Input id="lastName" name={'lastName'} defaultValue={'Samuel'} disabled={disabled}/>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={'flex justify-between gap-3 mt-5'}>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" name={'email'} defaultValue={'edwardsam@gmail.com'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="emergencyContact">Emergency Contact</InputLabel>
                                        <Input id="emergencyContact" name={'emergencyContact'} defaultValue={'077 1234567'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address1">Address Line 1</InputLabel>
                                        <Input id="address1" name={'address1'} defaultValue={'108 / 5 A'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address3">Address Line 3</InputLabel>
                                        <Input id="address3" name={'address3'} defaultValue={'Park Land'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="nic">NIC</InputLabel>
                                        <Input id="nic" name={'nic'} defaultValue={'200014152841'} disabled={disabled}/>
                                    </FormControl>
                                </div>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="contact">Contact</InputLabel>
                                        <Input id="contact" name={'contact'} defaultValue={'071 1234567'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="age">Age</InputLabel>
                                        <Input id="age" name={'age'} defaultValue={32} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address2">Address Line 2</InputLabel>
                                        <Input id="address2" name={'address2'} defaultValue={'Park Street'} disabled={disabled}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input id="city" name={'city'} defaultValue={'Colombo 7'} disabled={disabled}/>
                                    </FormControl>
                                </div>
                            </div>
                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} disabled={disabled}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                {/*  Delete Employee  */}

                <Modal
                    open={openDeleteEmp}
                    onClose={handleDeleteEmpClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[30em]'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Remove Employee
                            </Typography>
                            <CloseIcon onClick={handleDeleteEmpClose} className={'text-red-600'} />
                        </div>

                        <div className={'mt-10'}>
                            <Typography id="modal-modal-description" variant="p" component="p">
                                Are you sure you want to remove this employee?
                            </Typography>
                        </div>
                        <div className={'flex justify-center mt-10'}>
                            <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'}>
                                Remove
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default AdminEmployee;