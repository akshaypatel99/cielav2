import svg01d from '../assets/icons/01d.svg';
import svg01n from '../assets/icons/01n.svg';
import svg02d from '../assets/icons/02d.svg';
import svg02n from '../assets/icons/02n.svg';
import svg03d from '../assets/icons/03d.svg';
import svg03n from '../assets/icons/03n.svg';
import svg04d from '../assets/icons/04d.svg';
import svg04n from '../assets/icons/04n.svg';
import svg09d from '../assets/icons/09d.svg';
import svg09n from '../assets/icons/09n.svg';
import svg10d from '../assets/icons/10d.svg';
import svg10n from '../assets/icons/10n.svg';
import svg11d from '../assets/icons/11d.svg';
import svg11n from '../assets/icons/11n.svg';
import svg13d from '../assets/icons/13d.svg';
import svg13n from '../assets/icons/13n.svg';
import svg50d from '../assets/icons/50d.svg';
import svg50n from '../assets/icons/50n.svg';

const convertIcon = (iconCode) => {
	switch (iconCode) {
		case '01d':
			return svg01d;
		case '01n':
			return svg01n;
		case '02d':
			return svg02d;
		case '02n':
			return svg02n;
		case '03d':
			return svg03d;
		case '03n':
			return svg03n;
		case '04d':
			return svg04d;
		case '04n':
			return svg04n;
		case '09d':
			return svg09d;
		case '09n':
			return svg09n;
		case '10d':
			return svg10d;
		case '10n':
			return svg10n;
		case '11d':
			return svg11d;
		case '11n':
			return svg11n;
		case '13d':
			return svg13d;
		case '13n':
			return svg13n;
		case '50d':
			return svg50d;
		case '50n':
			return svg50n;
		default:
			return null;
	}
};

export default convertIcon;
