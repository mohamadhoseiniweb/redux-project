import {getStrapiUrl} from './api'

export function getStrapiImage(image,size){
    if(image){
        let url
        if(image.attributes.formats)
        {
            if(size && size in image.attributes.formats)
            {
                url =image.attributes.formats[size].url
            }
            else{
                const keys = Object.keys(image.attributes.formats)
                url = image.attributes.formats[keys[0]].url
            }
        }
        else
           url=image.attributes.url

        const imageUrl=url.startsWith("/")?getStrapiUrl(url):url
        return imageUrl
    }
}


export function getStrapiMedia(media){
    const{url}=media.data.attributes
    const mediaUrl=url.startsWith("/")?getStrapiUrl(url):url
    return mediaUrl
}