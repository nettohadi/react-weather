import './index.css'
import sunny from '../../assets/images/sunny.png';

type PropsType = {
    width: string,
    height: string
}

export default function Sunny(props: PropsType) {
    return (
        <div>
            <h1 className='city-name'>Mataram, Indonesia</h1>
            <h2>
                Today
            </h2>
            <h5>24th july 2021</h5>
            <img width={props.width}
                 height={props.height}
                 src={sunny} alt="sunny-weather"/>
            <h3>30 °F</h3>
            <h5>Sunny</h5>
        </div>
    );
}