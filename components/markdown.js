import React from 'react'

import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

export default class Markdown extends React.Component {

  static defaultProps = {
    md: ''
  }

  render() {
    const processor = unified()
      .use(parse)
      .use(remark2react)
    return (
      <div>
        {processor.processSync(this.props.md).contents}
      </div>
    )
  }
}
