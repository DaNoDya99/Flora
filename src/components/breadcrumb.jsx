import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Breadcrumb(props) {

    const path = props.path;

    return (
        <div className={'nunito-sans-light'}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {path.map((item, key) => (
                    item.last ? <Link underline="hover" className={'font-semibold underline text-[1.2rem] max-2xl:text-sm'} key={key} color="inherit" to={item.path}>
                            {item.name}
                        </Link> :
                        <Link underline="hover" key={key} className={'text-[1.2rem] hover:font-semibold max-2xl:text-sm'} to={item.path}>
                            {item.name}
                        </Link>
                ))}
            </Breadcrumbs>
        </div>
    );
}

Breadcrumb.propTypes = {
    path: PropTypes.array.isRequired,
}

export default Breadcrumb;