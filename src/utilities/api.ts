interface gqlQModal {
    tags: string;
    tagsSimple: string;
    blogPosts: string;
    images: string;
    blogPostsB: string;
}
const gqlUrl: string = "https://api-eu-west-2.graphcms.com/v2/cl3ossjir6ju301z6grqwfdf9/master";
const gqlQ: gqlQModal = {
    tags: `
        tags {
            label
            url
            blogPosts {
                slug
                title
                tags {
                    label
                    url
                }
                content {
                    html
                    text
                }
            }
        }
    `,
    tagsSimple: `
        tags {
            label
            url
        }
    `,
    blogPosts: `
        blogPosts {
            slug
            title
            tags {
                label
                url
            }
            content {
                html
                text
            }
        }
    `,
    images: `
        images {
            img {
            url
            }
            caption
            alt
        }
    `,
    blogPostsB: `
        blogPostBs {
        title
        slug
        content {
          ... on Image {
            image {
              url
            }
            alt
            caption
            imageType
            typeName
          }
          ... on Paragraph {
            content {
              text
            }
            paragraphType
            typeName
          }
        }
      }
    `
}
export const gqlFetch = async (c: (q: gqlQModal) => string[]) =>
    fetch(gqlUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({query: gqlQueryResolver(c)})
    });

export const gqlQueryResolver = (c: (queries: gqlQModal) => string[]): string => 
    `query MyQuery {${c(gqlQ).join(" ")}}`;


