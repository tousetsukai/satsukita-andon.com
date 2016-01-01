import { create } from 'jss';
import reactJss from 'react-jss';
import vendorPrefixer from 'jss-vendor-prefixer';
import nested from 'jss-nested';
import px from 'jss-px';
import extend from 'jss-extend';

const jss = create();

if (typeof window !== 'undefined') {
  // jss-vendor-prefixer does not work in server-side
  jss.use(vendorPrefixer());
}
jss.use(nested());
jss.use(px());
jss.use(extend());

export default reactJss(jss);
