import { create } from 'jss';
import reactJss from 'react-jss';
import vendorPrefixer from 'jss-vendor-prefixer';

const jss = create();

jss.use(vendorPrefixer);

export default reactJss(jss);
