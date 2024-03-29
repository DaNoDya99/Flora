import PropTypes from 'prop-types';

function DescriptiveCard(props) {

    const collection = props.collection;
    const size = props.size;

    return (
        <>
            <div className={size ? 'p-5 space-y-2 bg-secondary rounded-xl shadow-lg mx-2 w-[30%] min-h-[9em]'
                : 'p-5 space-y-2 bg-secondary rounded-xl shadow-lg mx-2 w-[95%] min-h-[9em]'}>
                <h1 className={'text-3xl font-semibold max-2xl:text-2xl'}>{collection.name}</h1>
                <p className={'text-lg text-justify max-2xl:text-sm'}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    {collection.description}</p>
            </div>
        </>
    );
}

DescriptiveCard.propTypes = {
    collection: PropTypes.object.isRequired,
    size: PropTypes.bool.isRequired,
}

export default DescriptiveCard;