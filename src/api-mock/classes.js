import wrap from './wrap';
import OrdInt from './OrdInt';

export default {
  listOfTimes(/* times */) {
    return wrap([
      { times: new OrdInt(60), grade: 3, clazz: 9, title: '魄焔', prizes: ['grand', 'alumni'],
        topImageUrl: 'http://satsukita-andon.com/files/gallery/thumbnail/60th/3/9/09071320.jpg'
      },
      { times: new OrdInt(60), grade: 3, clazz: 5, title: '風来葴画　黄泉の悷精', prizes: ['gold'],
        topImageUrl: 'http://satsukita-andon.com/files/gallery/thumbnail/60th/3/5/60th3-5_01.jpg'
      }
    ]);
  }
};
