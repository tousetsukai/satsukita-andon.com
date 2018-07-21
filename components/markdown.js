import React from 'react'
import remark from 'remark'
import reactRenderer from 'remark-react'

export default class Markdown extends React.Component {
  render() {
    return (
      <div>
        {remark().use(reactRenderer).processSync(this.props.md).contents}
      </div>
    )
  }
}
