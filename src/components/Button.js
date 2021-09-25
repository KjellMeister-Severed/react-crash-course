import PropTypes from "prop-types";

const Button = ({btnText, btnColor, onClick}) => {
    return (
        <button className='btn' style={{backgroundColor: btnColor}} onClick={onClick}>{btnText}</button>
    )
}

Button.propTypes = {
    btnText: PropTypes.string,
    btnColor: PropTypes.string,
    onClick: PropTypes.func,
}

Button.defaultProps = {
    btnColor: 'steelblue',
    btnText: 'NoText'
}

export default Button