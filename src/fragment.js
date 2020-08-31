// export const USER_FARGMENT = `
// fragment UserParts on User {
//     id
//     username
//     email
//     firstName
//     lastName
//     bio
//     posts {
//         id
//         caption
//     }
// }`;

export const COMMENT_FRAGMENT = `
        id
        text
        user {
            username
        }
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const USER_FRAGMENT = `
        id
        username
        avatar
`;

export const FULL_POST_FRAGMENT = `
    fragment PostParts on Post {

        id
        location
        caption

        files {
         ${FILE_FRAGMENT}
        }
        comments {
         ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to {
        ${USER_FRAGMENT}
    }
    from {
        ${USER_FRAGMENT}
    }
`;
export const CHATROOM_FRAGMENT = `
    fragment ChatRoomParts on ChatRoom {
        id
        
        participants {
            ${USER_FRAGMENT}
        }
        messages {
            ${MESSAGE_FRAGMENT}
        }
    }
`;
