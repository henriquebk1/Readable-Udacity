import {sortOptions} from "../utils/constants";

export function valueInRange(value) {
    if (value > 99)
        return '99+';
    else if (value < -99)
        return '-99+';
    return value
}

export const empty = (v) => {
    let undef;
    let key;
    let i;
    let len;
    let emptyValues = [undef, null, false, 0, '', '0'];

    for (i = 0, len = emptyValues.length; i < len; i++) {
        if (v === emptyValues[i]) {
            return true
        }
    }

    if (typeof v === 'object') {
        for (key in v) {
            if (v.hasOwnProperty(key)) {
                return false
            }
        }
        return true
    }

    return false
};

export const sortPosts = (posts, by) => {
    if (empty(posts))//only sort posts if there are any post
        return posts;
    switch (by) {
        case sortOptions[0]://By date asc
            return posts.sort((a, b) => a.timestamp - b.timestamp);
        case sortOptions[1]://By date desc
            return posts.sort((a, b) => b.timestamp - a.timestamp);
        case sortOptions[2]://By score asc
            return posts.sort((a, b) => a.voteScore - b.voteScore);
        case sortOptions[3]://By score desc
            return posts.sort((a, b) => b.voteScore - a.voteScore);
        default:
            return posts;
    }
};

export const searchInPosts = (posts, search) => {
    if (empty(posts) || empty(search))//only seacrh in posts if there are any post and any search
        return posts;
    const searchWords = search.split(' ');
    searchWords.forEach((word) => {
        posts = posts.filter((post) => post.title.includes(word) || post.body.includes(word) || post.author.includes(word))
    });
    return posts
};