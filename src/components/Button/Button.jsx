import css from './Button.module.css'
import PropTypes from 'prop-types'

export const Button = ({onClick}) => 
    (<button className={css.Button} onClick={onClick} type='submit'>Load more</button>)



Button.propTypes = {
    onlick: PropTypes.func,
}