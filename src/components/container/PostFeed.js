import React from 'react'
import { FlatList } from 'react-native'
import { Post } from '../presentation'

class PostFeed extends React.Component {

    renderPost({item}) {
        return <Post item={item}/>
    }
    returnKey(item) {
        return item.toString()
    }

    render() {
        return(
            <FlatList
                data={[1,2,3,4,5,6,7,8,9,10]}
                keyExtractor={this.returnKey}
                renderItem={this.renderPost}
            />
        )
    }
}

export default PostFeed
