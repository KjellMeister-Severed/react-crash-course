import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({title}) => {
    const onClick = () => {
        console.log('click')
    }
    return (
        <header className={'header'}>
            <h1>{title}</h1>
            <Button btnText='Add' btnColor='green' onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header