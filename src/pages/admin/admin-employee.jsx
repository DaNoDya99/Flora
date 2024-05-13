import {Button, NativeSelect} from "@mui/material";
import React, {useEffect} from "react";
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
import {addEmployee, getEmployees, updateEmployee, deleteEmployee} from "../../store/slices/employee_slice.js";
import {useDispatch, useSelector} from "react-redux";

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

function AdminEmployee() {
    const dispatch = useDispatch();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [employee, setEmployee] = React.useState({});
    const [newEmp, setNewEmp] = React.useState({
        firstName: '',
        lastName: '',
        profilePicture: '',
        email: '',
        contact: '',
        emergencyContact: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        nic: '',
        age: '',
        role: '',
        gender: '',
        password: ''
    });

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
    const [deleteEmployee1, setDeleteEmployee1] = React.useState('');

    const handleClick = () => {
        setDisabled(!disabled);
    }

    const handleOpenAddEmp = () => setOpenAddEmp(true);
    const handleCloseAddEmp = () => setOpenAddEmp(false);

    const handleEditEmpOpen = (value) => {
        setEmployee(employees.find(emp => emp.id === value));
        setOpenEditEmp(true);
        setDisabled(true);
    }

    const handleEditEmpClose = () => {
        setOpenEditEmp(false)
        setDisabled(true);
    }

    const handleDeleteEmpOpen = (id) => {
        setDeleteEmp(true);
        setDeleteEmployee1(id)
    }

    const handleDeleteEmpClose = () => setDeleteEmp(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setNewEmp({
            ...newEmp,
            [e.target.name] : file
        })
    }

    const handleChange = (e) => {
        setNewEmp({
            ...newEmp,
            [e.target.name] : e.target.value
        });
    }

    const handleChangeEdit = (e) => {
        setEmployee({
            ...employee,
            [e.target.name] : e.target.value
        });
    }

    const handleImageUploadEdit = (e) => {
        const file = e.target.files[0];
        setEmployee({
            ...employee,
            [e.target.name] : file
        });
    }

    const handleEditEmpSubmit = (e) => {
        e.preventDefault();
        console.log(employee);
        dispatch(updateEmployee(employee));
        dispatch(getEmployees());
    }

    const handleAddEmpSubmit = (e) => {
        e.preventDefault();
        dispatch(addEmployee(newEmp));
    }

    const handleDeleteEmployee = () => {
        if(deleteEmployee1 !== '') {
            dispatch(deleteEmployee(deleteEmployee1));
        }
    }

    useEffect(() => {
        dispatch(getEmployees());
    }, [dispatch]);

    const employees = useSelector(state => state.employee.data.employees);

    const rows = employees.map((employee) => {
        return createData(employee.id, employee.image, `${employee.firstName} ${employee.lastName}`, employee.age, employee.contact, employee.email, employee.role, employee.id);
    });

    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employeeLogged = useSelector(state => state.employeeAuth.localStorage);

    if (!isLoggedIn || employeeLogged.role !== 'admin') {
        window.location.href = '/employee/login';
    }

    return (
        <>
            <div className={'flex justify-between items-center'}>
                <div className={'text-3xl font-semibold'}>Employee</div>
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
                                        className={'!font-semibold !text-xl max-2xl:!text-lg'}
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
                                                        <img src={'http://localhost:3000/'+value} alt={'product'} className={'w-20 h-20 rounded-full shadow-md object-cover max-2xl:w-16 max-2xl:h-16'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                            <DeleteIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-red-700'} onClick={() => handleDeleteEmpOpen(value)}/>
                                                            <InfoIcon key={value} className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600'} onClick={() => handleEditEmpOpen(value)}/>
                                                        </TableCell> :
                                                        <TableCell key={column.id} align={column.align} className={'!text-lg max-2xl:!text-sm'}>
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
                        <form action="" className={'mt-10'} encType={'multipart/form-data'} onSubmit={handleAddEmpSubmit}>
                            <div className={'flex gap-3 justify-between'}>
                                <div className={'w-[30%]'}>
                                    {/*<img src={UserImage} alt="user-image" className={'w-48 h-48 rounded-full shadow-lg'}/>*/}
                                    <img src={newEmp.profilePicture ? URL.createObjectURL(newEmp.profilePicture) : UserImage} alt="user-image" className={'w-48 h-48 rounded-full shadow-lg object-cover'}/>
                                    <span className={'w-10 h-10 flex items-center justify-center bg-secondary2 rounded-full absolute top-[15em] left-[11em]'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'} onChange={handleImageUpload} name={'profilePicture'}/>
                                        <AddIcon className={'cursor-pointer !w-12 !h-12 text-gray-500'}/>
                                    </span>
                                </div>
                                <div className={'w-[70%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">First name <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="firstName" name={'firstName'} onChange={handleChange} value={newEmp.firstName}/>
                                    </FormControl>

                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="lastName">Last name <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="lastName" name={'lastName'} onChange={handleChange} value={newEmp.lastName}/>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={'flex justify-between gap-3 mt-5'}>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="email">Email <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="email" name={'email'} onChange={handleChange} value={newEmp.email} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="emergencyContact">Emergency Contact <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="emergencyContact" name={'emergencyContact'} onChange={handleChange} value={newEmp.emergencyContact} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address1">Address Line 1 <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="address1" name={'address1'} onChange={handleChange} value={newEmp.address1} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address3">Address Line 3 <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="address3" name={'address3'} onChange={handleChange} value={newEmp.address3} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="nic">NIC <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="nic" name={'nic'} onChange={handleChange} value={newEmp.nic} required/>
                                    </FormControl>
                                    {/*Select Gender*/}
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="gender">Gender <span className={"text-red-700"}>*</span></InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'gender',
                                                id: 'gender',
                                            }}
                                            onChange={handleChange}
                                            value={newEmp.gender}
                                            name={'gender'}
                                            required
                                        >
                                            <option value={'none'}></option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="contact">Contact <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="contact" name={'contact'} onChange={handleChange} value={newEmp.contact} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="age">Age <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="age" name={'age'} onChange={handleChange} value={newEmp.age} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address2">Address Line 2 <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="address2" name={'address2'} onChange={handleChange} value={newEmp.address2} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="city">City <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="city" name={'city'} onChange={handleChange} value={newEmp.city} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="password">Password <span className={"text-red-700"}>*</span></InputLabel>
                                        <Input id="password" name={'password'} onChange={handleChange} value={newEmp.password} required/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="role">Role <span className={"text-red-700"}>*</span></InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'role',
                                                id: 'role',
                                            }}
                                            onChange={handleChange}
                                            value={newEmp.role}
                                            name={'role'}
                                            required
                                        >
                                            <option value={'none'}></option>
                                            <option value={'delivery'}>Delivery</option>
                                            <option value={'delivery-manger'}>Delivery Manager</option>
                                        </NativeSelect>
                                    </FormControl>
                                </div>
                            </div>
                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} type={'submit'}>
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
                        <form action="" className={'mt-10'} encType={'multipart/form-data'} onSubmit={handleEditEmpSubmit}>
                            <div className={'flex gap-3 justify-between'}>
                                <div className={'w-[30%]'}>
                                    <img src={employee ? typeof employee.image === 'object' ? URL.createObjectURL(employee.image) :'http://localhost:3000/'+employee.image : UserImage} alt="user-image" className={'w-48 h-48 rounded-full shadow-lg object-cover'}/>
                                    <span className={'w-10 h-10 flex items-center justify-center bg-secondary2 rounded-full absolute top-[15em] left-[11em]'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'} name={'image'} onChange={handleImageUploadEdit}/>
                                        <AddIcon className={'cursor-pointer !w-12 !h-12 text-gray-500'}/>
                                    </span>
                                </div>
                                <div className={'w-[70%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">First name</InputLabel>
                                        <Input id="firstName" name={'firstName'} defaultValue={employee.firstName} disabled={disabled} onChange={handleChangeEdit} value={employee.firstName}/>
                                    </FormControl>

                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="lastName">Last name</InputLabel>
                                        <Input id="lastName" name={'lastName'} defaultValue={employee.lastName} disabled={disabled} onChange={handleChangeEdit} value={employee.lastName}/>
                                    </FormControl>
                                </div>
                            </div>

                            <div className={'flex justify-between gap-3 mt-5'}>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <Input id="email" name={'email'} defaultValue={employee.email} disabled={disabled} onChange={handleChangeEdit} value={employee.email}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="emergencyContact">Emergency Contact</InputLabel>
                                        <Input id="emergencyContact" name={'emergencyContact'} defaultValue={employee.emergencyContact} disabled={disabled} onChange={handleChangeEdit} value={employee.emergencyContact}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address1">Address Line 1</InputLabel>
                                        <Input id="address1" name={'address1'} defaultValue={employee.addressLine1} disabled={disabled} onChange={handleChangeEdit} value={employee.address1}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address3">Address Line 3</InputLabel>
                                        <Input id="address3" name={'address3'} defaultValue={employee.addressLine3} disabled={disabled} onChange={handleChangeEdit} value={employee.address3}/>
                                    </FormControl>
                                </div>
                                <div className={'w-[50%] space-y-12'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="contact">Contact</InputLabel>
                                        <Input id="contact" name={'contact'} defaultValue={employee.contact} disabled={disabled} onChange={handleChangeEdit} value={employee.contact}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="age">Age</InputLabel>
                                        <Input id="age" name={'age'} defaultValue={employee.age} disabled={disabled} onChange={handleChangeEdit} value={employee.age}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="address2">Address Line 2</InputLabel>
                                        <Input id="address2" name={'address2'} defaultValue={employee.addressLine2} disabled={disabled} onChange={handleChangeEdit} value={employee.address2}/>
                                    </FormControl>
                                    <FormControl className={'w-full mt-5'}>
                                        <InputLabel htmlFor="city">City</InputLabel>
                                        <Input id="city" name={'city'} defaultValue={employee.city} disabled={disabled} onChange={handleChangeEdit} value={employee.city}/>
                                    </FormControl>
                                </div>
                            </div>
                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} disabled={disabled} type={'submit'}>
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
                            <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} onClick={handleDeleteEmployee}>
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