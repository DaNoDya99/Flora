import {Button} from "@mui/material";
import React, { useEffect } from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import ProductImage from "../../assets/images/product.jpg"
import NoImage from "../../assets/images/no-pictures.png";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import ImgCarousel from "../../components/carousel.jsx";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {addProduct} from "../../store/slices/product_slice.js";
import { getCategories } from "../../store/slices/category_slice.js";
import { getSubCategories } from "../../store/slices/sub_category_slice.js";
import { getProducts } from "../../store/slices/product_slice.js";
import all from "../../utils/functions.js";
import {list} from "postcss";

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

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function createData(id, image, name, quantity, reorderLevel, price, category,actions) {
    return { id, image, name, quantity, reorderLevel, price, category,actions};
}

function AdminInventory() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.employeeAuth.loggedIn);
    const employee = useSelector(state => state.employeeAuth.localStorage);

    if (!isLoggedIn || employee.role !== 'admin') {
        window.location.href = '/employee/login';
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [openDeleteProduct, setOpenDeleteProduct] = React.useState(false);
    const [openProductInfo, setOpenProductInfo] = React.useState(false);
    const [openAddProduct, setOpenAddProduct] = React.useState(false);
    const [openEditProduct, setOpenEditProduct] = React.useState(false);
    const [product, setProduct] = React.useState({
        productName: '',
        reorderLevel: '',
        price: '',
        quantity: '',
        category: '',
        sub_category: '',
        description: '',
        lilies: false,
        chrysanthemums: false,
        roses: false,
        gerbera: false,
        liliesQuantity: '',
        chrysanthemumsQuantity: '',
        rosesQuantity: '',
        gerberaQuantity: '',
        images: []
    });
    const [productInfo,setProductInfo] = React.useState({});

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getSubCategories());
        dispatch(getProducts());
    }, [dispatch]);

    const categories = useSelector((state) => state.category.data.categories);
    const sub_categories = useSelector((state) => state.subCategory.data.subCategories);
    const products = useSelector((state) => state.product.data.products);

    const findSubCategory = (id) => {
        return sub_categories.find(sub_category => sub_category.id === id);
    }

    const rows = products.map((product) => {
        return createData(product.product_code, product.images[0].image_path, product.name, product.quantity, product.reorder_level, product.price, findSubCategory(product.sub_category).name, 'actions');
    });

    const handleEditProductOpen = (value) => {
        setOpenEditProduct(true);
        setProductInfo(products.find(product => product.product_code === value));
    }
    const handleEditProductClose = () => setOpenEditProduct(false);

    const handleDeleteProductOpen = () => setOpenDeleteProduct(true);

    const handleDeleteProductClose = () => setOpenDeleteProduct(false);

    const handleProductInfoOpen = (value) => {
        setOpenProductInfo(true)
        setProductInfo(products.find(product => product.product_code === value));
    }

    const handleProductInfoClose = () => setOpenProductInfo(false);

    const handleAddProductOpen = () => setOpenAddProduct(true);

    const handleAddProductClose = () => setOpenAddProduct(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleImagesUploadAdd = (e) => {
        setProduct({...product, images: e.target.files});
    }

    const handleChangeAdd = (e) => {
        if (e.target.name === 'lilies' || e.target.name === 'chrysanthemums' || e.target.name === 'roses' || e.target.name === 'gerbera'){
            setProduct({...product, [e.target.name]: e.target.checked});
        }else{
            setProduct({...product, [e.target.name]: e.target.value});
        }
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('reorderLevel', product.reorderLevel);
        formData.append('price', product.price);
        formData.append('quantity', product.quantity);
        formData.append('description', product.description);
        formData.append('lilies', product.lilies);
        formData.append('chrysanthemums', product.chrysanthemums);
        formData.append('roses', product.roses);
        formData.append('gerbera', product.gerbera);
        formData.append('liliesQuantity', product.liliesQuantity);
        formData.append('chrysanthemumsQuantity', product.chrysanthemumsQuantity);
        formData.append('rosesQuantity', product.rosesQuantity);
        formData.append('gerberaQuantity', product.gerberaQuantity);
        formData.append('category', product.category);
        formData.append('sub_category', product.sub_category);
        for (let i = 0; i < product.images.length; i++){
            formData.append('images', product.images[i]);
        }
        dispatch(addProduct(formData));
    }
    
    const handleChangeEdit = (e) => {
        if(e.target.name === 'lilies' || e.target.name === 'chrysanthemums' || e.target.name === 'roses' || e.target.name === 'gerbera'){
            setProductInfo({...productInfo, [e.target.name]: e.target.checked});
        }else if(e.target.name === 'liliesQuantity' || e.target.name === 'chrysanthemumsQuantity' || e.target.name === 'rosesQuantity' || e.target.name === 'gerberaQuantity'){
            setProductInfo({...productInfo, [e.target.name]: e.target.value});
        }else{
            setProductInfo({...productInfo, [e.target.name]: e.target.value});
        }
    }

    const handleImagesUploadEdit = (e) => {
        setProductInfo({...productInfo, images: e.target.files});  
    }

    const updateProduct = (e) => {
        e.preventDefault();

        console.log(productInfo.id);

        let formData = new FormData();

        formData.append('id', productInfo.id);
        formData.append('name', productInfo.name);
        formData.append('product_code', productInfo.product_code);
        formData.append('quantity', productInfo.quantity);
        formData.append('reorder_level', productInfo.reorder_level);
        formData.append('category', productInfo.category);
        formData.append('sub_category', productInfo.sub_category);
        formData.append('price', productInfo.price);
        formData.append('description', productInfo.description);

        if('lilies' in productInfo){
            formData.append('lilies', productInfo.lilies);
            formData.append('liliesQuantity', productInfo.liliesQuantity);
        }
        if('chrysanthemums' in productInfo){
            formData.append('chrysanthemums', productInfo.chrysanthemums);
            formData.append('chrysanthemumsQuantity', productInfo.chrysanthemumsQuantity);
        }
        if('roses' in productInfo){
            formData.append('roses', productInfo.roses);
            formData.append('rosesQuantity', productInfo.rosesQuantity);
        }
        if('gerbera' in productInfo){
            formData.append('gerbera', productInfo.gerbera);
            formData.append('gerberaQuantity', productInfo.gerberaQuantity);
        }

        formData.append('flowers', productInfo.flowers);

        for (let i = 0; i < productInfo.images.length; i++){
            formData.append('images', productInfo.images[i]);
        }

        console.log(formData.values);
    }

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
                    <Button variant="contained" color="secondary3" className={'w-[16.8em] h-8 2xl:h-10 !font-semibold'} onClick={handleAddProductOpen}>
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
                                                        <img src={'http://localhost:3000/'+value} alt={'product'} className={'w-20 h-20 rounded-md shadow-md'}/>
                                                    </TableCell> : column.id === 'actions' ? <TableCell key={column.id} align={column.align}
                                                                                                        className={'flex items-center justify-center gap-5'}>
                                                        <ModeEditIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-green-500'} onClick={() => handleEditProductOpen(row['id'])}/>
                                                        <DeleteIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-red-700'} onClick={handleDeleteProductOpen}/>
                                                        <InfoIcon className={'cursor-pointer mx-2 p-1 shadow-md rounded-md !h-8 !w-8 text-blue-600'} onClick={() => handleProductInfoOpen(row['id'])}/>
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

                {/*Remove Product*/}
                <Modal
                    open={openDeleteProduct}
                    onClose={handleDeleteProductClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[30em]'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Remove Product
                            </Typography>
                            <CloseIcon onClick={handleDeleteProductClose} className={'text-red-600'} />
                        </div>

                        <div className={'mt-10'}>
                            <Typography id="modal-modal-description" variant="p" component="p">
                                Are you sure you want to remove this product?
                            </Typography>
                        </div>
                        <div className={'flex justify-center mt-10'}>
                            <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'}>
                                Remove
                            </Button>
                        </div>
                    </Box>
                </Modal>
                {/*Product Info*/}
                <Modal
                    open={openProductInfo}
                    onClose={handleProductInfoClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[90%] max-h-[90vh] overflow-auto'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Product Information - {productInfo.name} ({productInfo.product_code})
                            </Typography>
                            <CloseIcon onClick={handleProductInfoClose} className={'text-red-600'} />
                        </div>

                        <div className={'p-1'}>
                            <div className={'flex w-full'}>
                                <div className={'w-[50%] mr-12'}>
                                    <ImgCarousel images={productInfo.images}/>
                                    <div className={'mt-10 max-2xl:mt-5 space-y-10 max-2xl:space-y-5 text-xl max-2xl:text-sm'}>
                                        <div className={'flex items-center'}>
                                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                                            <p className="text-justify">Introducing our stunning flower bouquet, where every bloom is
                                                carefully selected and wrapped in eco-friendly, biodegradable materials!</p>
                                        </div>
                                        <div className={'flex items-center'}>
                                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                                            <p className="text-justify">Free Message card - Customized message can be printed on the message card!!</p>
                                        </div>
                                        <div className={'flex items-center'}>
                                            <LocalOfferIcon className={'text-secondary3 mr-3'}/>
                                            <p className="text-justify">At Flower Hub, we prioritize your satisfaction. If necessary,
                                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                                we may substitute flowers with ones of equal or greater value that align with your arrangement's
                                                style and color scheme. Rest assured, we will always seek your approval for the replacement
                                                options. Your happiness is our utmost concern.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={'w-[50%] ml-12'}>
                                    <div className={'space-y-4 max-2xl:space-y-2'}>
                                        <h1 className={'text-3xl font-semibold'}>{productInfo.name}</h1>
                                        <div className={'flex text-2xl'}>
                                            <h1 className={'font-semibold'}>Product Code :</h1>
                                            <h1>&nbsp; {productInfo.product_code}</h1>
                                        </div>
                                        <div className={'text-2xl font-semibold'}>
                                            Rs. {productInfo.price}
                                        </div>
                                    </div>
                                    <div className={'space-y-10 mt-10'}>
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <p className={'text-justify text-xl max-2xl:text-sm'}>{productInfo.description}</p>

                                        <div className={'space-y-2'}>
                                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Bloom Contains:</h1>
                                            {
                                                openProductInfo ? productInfo.flowers.map((flower) => {
                                                    // eslint-disable-next-line react/jsx-key
                                                    return <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>{all.getFlowerByFlowerType(flower.flower_type.toString()).name}: {flower.quantity} stems</p>
                                                }) : null
                                            }
                                        </div>

                                        <div className={'space-y-2'}>
                                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Freshness Guaranteed:</h1>
                                            {
                                                openProductInfo ? productInfo.flowers.map((flower) => {
                                                    // eslint-disable-next-line react/jsx-key
                                                    return <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>{all.getFlowerByFlowerType(flower.flower_type.toString()).name}: {all.getFlowerByFlowerType(flower.flower_type.toString()).freshness} days</p>
                                                }) : null
                                            }
                                        </div>

                                        <div className={'space-y-2'}>
                                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Care Instructions:</h1>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>For everlasting blooms, trim the stem and let it dry inside a book and then you can keep it as a souvenir.</p>
                                        </div>

                                        <div className={'space-y-2'}>
                                            <h1 className={'text-2xl font-semibold max-2xl:text-xl'}>Care Tips:</h1>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Once you receive your flowers, trim the stems from the bottom and place the flowers in a vase filled with water. Again cut the stems to about 1-2 inches in a slanting direction.</p>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Always put the flowers in a clean vase and fresh water.</p>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Cut all the leaves immersed in water. Don’t remove the leaves on the stems.</p>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Keep a check on the water levels and try to change the water daily for a longer shelf life of flowers. Keep the flowers away from direct sunlight and excessive heat.</p>
                                            <p className={'text-justify text-xl ms-5 max-2xl:text-sm'}>• Sprinkle some water on the flowers for that refreshing brightness.</p>

                                            <div className={'pt-10 text-justify text-xl max-2xl:text-sm'}>
                                                Flower bunches are prepared by certified florists at Lassana Flora, and with our own fields of blooming flowers,
                                                we are able to ensure that our bunches are always made with the highest quality flowers available, picked at the
                                                peak of their beauty and freshness, and handled with care and safely transported in refrigerated vehicles.
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </Box>
                </Modal>
                {/*  Add Product  */}

                <Modal
                    open={openAddProduct}
                    onClose={handleAddProductClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[80%] max-h-[90vh] overflow-auto'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Add New Product
                            </Typography>
                            <CloseIcon onClick={handleAddProductClose} className={'text-red-600'} />
                        </div>

                        <form action="" className={'mt-10'} encType={'multipart/form-data'} onSubmit={handleAddProduct}>
                            <div className={'flex flex-col items-center w-full'}>
                                <div className={'flex justify-around w-full'}>
                                    <img src={product.images.length > 0 ? URL.createObjectURL(product.images[0]) : NoImage} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                    <img src={product.images.length > 1 ? URL.createObjectURL(product.images[1]) : NoImage} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                    <img src={product.images.length > 2 ? URL.createObjectURL(product.images[2]) : NoImage} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                    <img src={product.images.length > 3 ? URL.createObjectURL(product.images[3]) : NoImage} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                    <img src={product.images.length > 4 ? URL.createObjectURL(product.images[4]) : NoImage} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                </div>
                                <div className={'flex justify-between mt-10 gap-10'}>
                                    <span className={'w-[20em] h-10 flex items-center justify-center bg-secondary2 absolute left-[40%] rounded-md shadow-lg'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'} name={'images'} onChange={handleImagesUploadAdd} multiple/>
                                        <AddIcon className={'cursor-pointer !w-10 !h-10 text-gray-500 mr-2'}/>
                                        <div className={'font-semibold'}>Upload</div>
                                    </span>
                                </div>
                            </div>
                            <div className={'mt-20 w-full flex justify-between gap-5'}>
                                <div className={'w-[50%] space-y-8'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Product name</InputLabel>
                                        <Input id="productName" name={'productName'} onChange={handleChangeAdd} value={product.productName}/>
                                    </FormControl>
                                {/*    Reorder level*/}
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Reorder Level</InputLabel>
                                        <Input id="reorderLevel" name={'reorderLevel'} type={'number'} onChange={handleChangeAdd} value={product.reorderLevel}/>
                                    </FormControl>

                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'category',
                                                id: 'category',
                                            }}
                                            onChange={handleChangeAdd}
                                            value={product.category}
                                            name={'category'}
                                        >
                                            <option value={''}></option>
                                            {   
                                                categories.map((category) => {
                                                    return <option value={category.id}>{category.name}</option>
                                                })
                                            }
                                        </NativeSelect>
                                    </FormControl>

                                    <div className={'mt-5'}>
                                        <div className={'font-semibold text-xl'}>Select flower types</div>
                                        <FormGroup className={'ms-10'}>
                                            <FormControlLabel control={<Checkbox name={'lilies'} onChange={handleChangeAdd} value={product.lilies}/>} label="Lilies" />
                                            <FormControlLabel control={<Checkbox name={'chrysanthemums'} onChange={handleChangeAdd} value={product.chrysanthemums}/>} label="Chrysanthemums" />
                                            <FormControlLabel control={<Checkbox name={'roses'} onChange={handleChangeAdd} value={product.roses}/>} label="Roses"/>
                                            <FormControlLabel control={<Checkbox name={'gerbera'} onChange={handleChangeAdd} value={product.gerbera}/>} label="Gerbera" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={'w-[50%] space-y-8'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Quantity</InputLabel>
                                        <Input id="quantity" name={'quantity'} type={'number'} onChange={handleChangeAdd} value={product.quantity}/>
                                    </FormControl>
                                {/*    Price*/}
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Price</InputLabel>
                                        <Input id="price" name={'price'}  onChange={handleChangeAdd} value={product.price}/>
                                    </FormControl>

                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="sub_category">Sub Category</InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'sub_category',
                                                id: 'sub_category',
                                            }}
                                            onChange={handleChangeAdd}
                                            value={product.sub_category}
                                            name={'sub_category'}
                                        >
                                            <option value={''}></option>
                                            {
                                                sub_categories.map((sub_category) => {
                                                    return sub_category.category_id.toString() === product.category ? <option value={sub_category.id}>{sub_category.name}</option> : null;
                                                })
                                            }
                                        </NativeSelect>
                                    </FormControl>

                                    <div className={'space-y-8'}>
                                        <div className={'font-semibold text-xl'}>Select flower quantities</div>
                                        <div className={'flex w-full justify-between gap-5'}>
                                            <div className={'w-[50%] space-y-8'}>
                                                <FormControl className={'w-full'}>
                                                    <InputLabel htmlFor="firstName">Lilies Quantity</InputLabel>
                                                    <Input id="lilies" name={'liliesQuantity'} type={'number'} disabled={!product.lilies} onChange={handleChangeAdd} value={product.liliesQuantity}/>
                                                </FormControl>

                                                <FormControl className={'w-full'}>
                                                    <InputLabel htmlFor="chrysanthemums">Chrysanthemums Quantity</InputLabel>
                                                    <Input id="chrysanthemums" name={'chrysanthemumsQuantity'} type={'number'} disabled={!product.chrysanthemums}  onChange={handleChangeAdd} value={product.chrysanthemumsQuantity}/>
                                                </FormControl>
                                            </div>
                                            <div className={'w-[50%] space-y-8'}>
                                                <FormControl className={'w-full'}>
                                                    <InputLabel htmlFor="firstName">Roses Quantity</InputLabel>
                                                    <Input id="roses" name={'rosesQuantity'} type={'number'} disabled={!product.roses} onChange={handleChangeAdd} value={product.rosesQuantity}/>
                                                </FormControl>
                                                <FormControl className={'w-full'}>
                                                    <InputLabel htmlFor="firstName">Gerbera Quantity</InputLabel>
                                                    <Input id="gerbera" name={'gerberaQuantity'} type={'number'} disabled={!product.gerbera} onChange={handleChangeAdd} value={product.gerberaQuantity}/>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className={'mt-10 w-full'}>
                                <div className={'font-semibold text-xl'}>Bouquet Description</div>
                                <FormControl className={'w-full !mt-5'}>
                                    <TextareaAutosize id="description" name={'description'} className={'!border-gray-400'} minRows={10} onChange={handleChangeAdd} value={product.description}/>
                                </FormControl>
                            </div>

                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} type={'submit'}>
                                    Add Product
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>

                {/*Edit Product*/}

                <Modal
                    open={openEditProduct}
                    onClose={handleEditProductClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1} className={'w-[80%] max-h-[90vh] overflow-auto'}>
                        <div className={'flex justify-between items-center'}>
                            <Typography id="modal-modal-title" variant="h6" component="h3">
                                Edit Product Details
                            </Typography>
                            <CloseIcon onClick={handleEditProductClose} className={'text-red-600'} />
                        </div>
                        <form action="" className={'mt-10'} encType={'multipart/form-data'} onSubmit={updateProduct}>
                            <div className={'flex flex-col items-center w-full'}>
                                <div className={'flex justify-around w-full'}>
                                    {
                                        openEditProduct ? Array.isArray(productInfo.images) && productInfo.images.every((image) => typeof image === 'object') ? productInfo.images.map((image) => {
                                            // eslint-disable-next-line react/jsx-key
                                            return <img src={'http://localhost:3000/'+image.image_path} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                        }) : null : null
                                    }

                                    {
                                        openEditProduct ? productInfo.images instanceof FileList ? Array.from(productInfo.images).map((image) => {
                                            // eslint-disable-next-line react/jsx-key
                                            return <img src={URL.createObjectURL(image)} alt="Product image" className={'w-[10em] h-[10em] object-cover shadow-lg rounded-md'}/>
                                        }) : null : null
                                    }
                                </div>
                                <div className={'flex justify-between mt-10 gap-10'}>
                                    <span className={'w-[20em] h-10 flex items-center justify-center bg-secondary2 absolute left-[40%] rounded-md shadow-lg'}>
                                        <input type="file" className={'opacity-0 absolute overflow-hidden w-10 h-10'} name={'images'} onChange={handleImagesUploadEdit} multiple/>
                                        <AddIcon className={'cursor-pointer !w-10 !h-10 text-gray-500 mr-2'}/>
                                        <div className={'font-semibold'}>Change</div>
                                    </span>
                                </div>
                            </div>
                            <div className={'mt-20 w-full flex justify-between gap-5'}>
                                <div className={'w-[50%] space-y-8'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="productName">Product name</InputLabel>
                                        <Input id="productName" name={'productName'} value={productInfo.name} onChange={handleChangeEdit}/>
                                    </FormControl>
                                    {/*    Reorder level*/}
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Reorder Level</InputLabel>
                                        <Input id="reorderLevel" name={'reorderLevel'} type={'number'} value={productInfo.reorder_level} onChange={handleChangeEdit}/>
                                    </FormControl>

                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'category',
                                                id: 'category',
                                            }}
                                            // onChange={''}
                                            value={productInfo.category}
                                            name={'category'}
                                            onChange={handleChangeEdit}
                                        >
                                            <option value={''}></option>
                                            {
                                                categories.map((category) => {
                                                    // eslint-disable-next-line react/jsx-key
                                                    return <option value={category.id}>{category.name}</option>
                                                })
                                            }
                                        </NativeSelect>
                                    </FormControl>

                                    <div className={'mt-5'}>
                                        <div className={'font-semibold text-xl'}>Select flower types</div>
                                        <FormGroup className={'ms-10'}>
                                            {/*<FormControlLabel control={<Checkbox />} label="Lilies" checked={true}/>*/}
                                            {/*<FormControlLabel control={<Checkbox />} label="Chrysanthemums" />*/}
                                            {/*<FormControlLabel control={<Checkbox/>} label="Roses" />*/}
                                            {/*<FormControlLabel control={<Checkbox />} label="Gerbera" />*/}
                                            {
                                                openEditProduct ? all.getFlowerStatus(productInfo.flowers).map((flower) => {
                                                    // eslint-disable-next-line react/jsx-key
                                                    return <FormControlLabel control={<Checkbox name={flower.name.toLowerCase()} onChange={handleChangeEdit} defaultChecked={flower.status}/>} label={flower.name}/>
                                                }) : null
                                            }
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={'w-[50%] space-y-8'}>
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Quantity</InputLabel>
                                        <Input id="quantity" name={'quantity'} type={'number'} value={productInfo.quantity} onChange={handleChangeEdit}/>
                                    </FormControl>
                                    {/*    Price*/}
                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="firstName">Price</InputLabel>
                                        <Input id="price" name={'price'} value={productInfo.price} onChange={handleChangeEdit}/>
                                    </FormControl>

                                    <FormControl className={'w-full'}>
                                        <InputLabel htmlFor="sub_category">Sub Category</InputLabel>
                                        <NativeSelect
                                            defaultValue={'none'}
                                            inputProps={{
                                                name: 'sub_category',
                                                id: 'sub_category',
                                            }}
                                            onChange={handleChangeEdit}
                                            value={productInfo.sub_category}
                                            name={'sub_category'}
                                        >
                                            <option value={''}></option>
                                            {
                                                sub_categories.map((sub_category) => {
                                                    return openEditProduct ? sub_category.category_id.toString() === productInfo.category.toString() ? <option value={sub_category.id}>{sub_category.name}</option> : null : null;
                                                    // console.log(sub_category.category_id.toString() === productInfo.category.toString() ? 'True': 'False');
                                                })
                                            }
                                        </NativeSelect>
                                    </FormControl>

                                    <div className={'space-y-8'}>
                                        <div className={'font-semibold text-xl'}>Select flower quantities</div>
                                        <div className={'flex w-full justify-between gap-5'}>
                                            <div className={'w-[50%] space-y-8'}>

                                                {
                                                    openEditProduct ? all.getFlowerQuantityStatus(productInfo.flowers).map((flower,index) => {
                                                        // eslint-disable-next-line react/jsx-key
                                                        return index < 2 ? <FormControl className={'w-full'}>
                                                            <InputLabel htmlFor={flower.name}>{flower.name} Quantity</InputLabel>
                                                            <Input id={flower.name} name={flower.name.toLowerCase()+'Quantity'} type={'number'} value={flower.quantity} onChange={handleChangeEdit}/>
                                                        </FormControl> : null;
                                                    }) : null
                                                }

                                            </div>
                                            <div className={'w-[50%] space-y-8'}>

                                                {
                                                    openEditProduct ? all.getFlowerQuantityStatus(productInfo.flowers).map((flower,index) => {
                                                        // eslint-disable-next-line react/jsx-key
                                                        return index >= 2 ? <FormControl className={'w-full'}>
                                                            <InputLabel htmlFor={flower.name}>{flower.name} Quantity</InputLabel>
                                                            <Input id={flower.name} name={flower.name.toLowerCase()+'Quantity'} type={'number'} value={flower.quantity} onChange={handleChangeEdit}/>
                                                        </FormControl> : null;
                                                    }) : null
                                                }

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className={'mt-10 w-full'}>
                                <div className={'font-semibold text-xl'}>Bouquet Description</div>
                                <FormControl className={'w-full !mt-5'}>
                                    <TextareaAutosize id="description" name={'description'} className={'!border-gray-400'} minRows={10}
                                    value={productInfo.description} onChange={handleChangeEdit}/>
                                </FormControl>
                            </div>

                            <div className={'flex justify-center mt-10'}>
                                <Button variant="contained" color="secondary3" className={'w-[50%] h-8 2xl:h-10 mt-5 !font-semibold'} type={'submit'}>
                                    Add Product
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default AdminInventory;