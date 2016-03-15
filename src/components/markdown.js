import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import htmlparser from 'htmlparser2';
import Lightbox from 'react-images';
import classnames from 'classnames';

import fit from '../util/object-fit';

const toCamelCase = (k) => {
  return k.replace(/_./g, (s) => s.charAt(1).toUpperCase());
};
const cssToObj = (css) => {
  const result = {};
  const attrs = css.split(';');
  attrs.map((attr) => {
    const [key, value] = attr.split(':');
    result[toCamelCase(key)] = value;
  });
  return result;
};
const keyMap = (obj, key1, key2) => {
  if (obj[key1] !== undefined) {
    obj[key2] = obj[key1];
    delete obj[key1];
  }
};
const valueMap = (obj, key, f) => {
  if (obj[key] !== undefined) {
    obj[key] = f(obj[key]);
  }
};

class Img extends React.Component {
  state = {
    fit: undefined,
  };
  render() {
    return <img className={fit.className(this, 'fit')}
                onLoad={fit.handleLoad(this, 'fit')}
                {...this.props}/>;
  }
}

// is invalid ?

const toplevel = (elems) => {
  if (!Array.isArray(elems)) {
    return false;
  } else {
    return elems.some((e) => {
      if (['html', 'head', 'body'].indexOf(e.type) >= 0) {
        return true;
      } else {
        return e.props && e.props.children && toplevel(e.props.children);
      }
    });
  }
};

const blockInP = (elems) => {
  const go = (inP, children) => {
    if (!Array.isArray(children)) {
      return false;
    } else {
      return children.some((e) => {
        const next = (nextInP) => {
          return e.props && e.props.children && go(nextInP, e.props.children);
        };
        if (inP) {
          if (['p', 'div'].indexOf(e.type) >= 0) {
            return true;
          } else {
            return next(true);
          }
        } else {
          if (e.type === 'p') {
            return next(true);
          } else {
            return next(false);
          }
        }
      });
    }
  };
  return go(false, elems);
};

const isInvalid = (elems) => {
  try {
    const res = blockInP(elems) || toplevel(elems);
    return res;
  } catch (e) {
    console.log(e);
    return true;
  }
};

export default class Markdown extends React.Component {

  static propTypes = {
    md: React.PropTypes.string,
    debug: React.PropTypes.bool,
  };

  static defaultProps = {
    debug: false,
  };

  state = {
    lightboxIsOpen: false,
    currentImage: 0,
  };

  // lightbox methods
  openLightbox = (index) => (event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  };
  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  };
  gotoPrev = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };

  children = (node, opts = {}, ctx = {}) => (
    node.children.map((n, i) => this.conv(n, i, opts, ctx))
  );

  renderLightbox = (lightboxImages) => {
    // this is workaround for server-side react-images
    if (typeof document === 'undefined') {
      return <noscript/>;
    } else {
      return (
        <Lightbox currentImage={this.state.currentImage}
                  images={lightboxImages}
                  isOpen={this.state.lightboxIsOpen}
                  onClickPrev={this.gotoPrev}
                  onClickNext={this.gotoNext}
                  onClose={this.closeLightbox}
                  height={1500}
                  width={2000}
                  showImageCount={true}
                  showCloseButton={true}
                  backdropClosesModal={true}/>
      );
    }
  };

  /* transValidDOM */

  elem = (name, attrs, children, images) => {
    switch (name) {
    case 'a':
      const imageLink = /(.png|.PNG|.jpg|.JPG|.jpeg|.JPEG|.gif|.GIF)$/.test(attrs.href);
      const external = /https?:\/\//.test(attrs.href);
      if (imageLink) {
        const index = images.length;
        images.push({
          src: attrs.href,
          caption: attrs.title,
        });
        return <a key={attrs.key} onClick={this.openLightbox(index)} href="#">{children}</a>;
      } else if (external) {
        return <a key={attrs.key} href={attrs.href} target="_blank">{children}</a>;
      } else {
        return <Link key={attrs.key} to={attrs.href}>{children}</Link>;
      }
      break;
    case 'img':
      return <Img {...attrs}/>;
    case 'ul':
      const cs = children.filter(c => c !== '\n');
      const isImageList = cs.every((li) => (
        li.type === 'li' && [li.props.children].every((a) => ( // why not array?
          a.type === 'a' && a.props.children.every((img) => (
            img.props && img.props.src // if `img` variable has src property, we regard it as a img object
          ))
        ))
      ));
      const { className, ...others } = attrs;
      return <ul className={classnames(className, { 'image-list': isImageList })} {...others}>{cs}</ul>;
    default:
      return React.createElement(name, attrs, ...children);
    }
  };

  build = (htmlStr) => {
    const images = [];
    let keyId = 0;
    const tagStack = [];
    const childrenStack = [[]];
    const parser = new htmlparser.Parser({
      onopentag: (name, attrs) => {
        tagStack.push({ name, attrs });
        childrenStack.push([]);
      },
      ontext: (text) => {
        const children = childrenStack.pop();
        children.push(text);
        childrenStack.push(children);
      },
      onclosetag: (closeTagName) => {
        const children = childrenStack.pop();
        const { name, attrs } = tagStack.pop();
        let e = undefined;
        if (name !== closeTagName) {
          e = (
            <p key={keyId++} style={{ color: 'red' }}>
              エラー: 要素の名前が一致しません。expected: {name}, but got: {closeTagName}
            </p>
          );
        } else {
          // class -> className, for -> htmlFor, style (string) -> style (obj)
          keyMap(attrs, 'class', 'className');
          keyMap(attrs, 'for', 'htmlFor');
          keyMap(attrs, 'frameborder', 'frameBorder');
          keyMap(attrs, 'allowfullscreen', 'allowFullScreen');
          valueMap(attrs, 'style', cssToObj);
          // with key
          const attrsWithKey = { ...attrs, key: keyId++ };
          // tag mapper
          e = this.elem(name, attrsWithKey, children, images);
        }
        const parentChildren = childrenStack.pop();
        if (typeof e !== 'undefined') {
          parentChildren.push(e);
        }
        childrenStack.push(parentChildren);
      },
    }, {
      decodeEntities: true,
    });
    parser.parseComplete(htmlStr);
    return {
      elems: childrenStack.pop(),
      images,
    };
  };

  render() {
    if (this.props.md) {
      const htmlStr = marked(this.props.md, {
        breaks: true,
      });
      const { elems, images } = this.build(htmlStr);
      if (this.props.debug && isInvalid(elems)) {
        return (<div className="markdown">HTML部分が正しくありません。修正してください。</div>);
      } else {
        return (
          <div className="markdown">
            {this.renderLightbox(images)}
            {elems}
          </div>
        );
      }
    } else {
      return <div className="markdown"/>;
    }
  }
}
