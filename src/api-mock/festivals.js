import wrap from './wrap';
import OrdInt from './OrdInt';

const festivals = {
  list(/* sortType = DESC */) {
    return wrap([{
      times: new OrdInt(60),
      theme: '瞬',
      imageUrl: 'http://satsukita-andon.com/files/grands/60th.jpg'
    }, {
      times: new OrdInt(61),
      theme: '晴',
      imageUrl: 'http://satsukita-andon.com/files/grands/61st.jpg'
    }]);
  }
};

export default festivals;
